import { afterEach, describe, expect, it, vi } from "vitest";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { NextRequest } from "next/server";

import { config, proxy } from "./proxy";

function previewRequest(credentials?: string): NextRequest {
  const headers = credentials
    ? { Authorization: `Basic ${Buffer.from(credentials).toString("base64")}` }
    : undefined;

  return new NextRequest("https://preview.example.test", { headers });
}

function enablePreviewAuth(): void {
  vi.stubEnv("PREVIEW_AUTH_ENABLED", "true");
  vi.stubEnv("PREVIEW_AUTH_USERNAME", "reviewer");
  vi.stubEnv("PREVIEW_AUTH_PASSWORD", "correct:horse:battery:staple");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("preview access proxy", () => {
  it("protects page routes without intercepting framework and public image assets", () => {
    expect(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url: "/" })).toBe(true);
    expect(
      unstable_doesMiddlewareMatch({
        config,
        nextConfig: {},
        url: "/eyeglasses/new-arrivals",
      }),
    ).toBe(true);

    for (const url of [
      "/_next/static/chunks/app.js",
      "/_next/image?url=%2Fimages%2Fhome%2Fhero-desktop.jpg&w=1920&q=75",
      "/images/home/hero-desktop.jpg",
      "/robots.txt",
      "/sitemap.xml",
    ]) {
      expect(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url })).toBe(false);
    }
  });

  it("does not challenge local and production requests when the gate is disabled", () => {
    vi.stubEnv("PREVIEW_AUTH_ENABLED", "false");

    const response = proxy(previewRequest());

    expect(response.status).toBe(200);
    expect(response.headers.get("www-authenticate")).toBeNull();
  });

  it("fails closed when the gate is enabled without both credentials", async () => {
    vi.stubEnv("PREVIEW_AUTH_ENABLED", "true");
    vi.stubEnv("PREVIEW_AUTH_USERNAME", "reviewer");
    vi.stubEnv("PREVIEW_AUTH_PASSWORD", "");

    const response = proxy(previewRequest());

    expect(response.status).toBe(503);
    await expect(response.text()).resolves.toBe("Preview access is not configured.");
    expect(response.headers.get("cache-control")).toBe("private, no-store");
  });

  it("challenges missing and incorrect credentials", () => {
    enablePreviewAuth();

    const missingResponse = proxy(previewRequest());
    const incorrectResponse = proxy(previewRequest("reviewer:incorrect"));

    for (const response of [missingResponse, incorrectResponse]) {
      expect(response.status).toBe(401);
      expect(response.headers.get("www-authenticate")).toContain('Basic realm="Eyewear Preview"');
      expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow, noarchive");
    }
  });

  it("allows exact credentials and keeps authenticated responses private", () => {
    enablePreviewAuth();

    const response = proxy(previewRequest("reviewer:correct:horse:battery:staple"));

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow, noarchive");
  });
});
