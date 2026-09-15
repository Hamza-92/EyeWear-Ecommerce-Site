import { createHash, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const privatePreviewHeaders = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

type Credentials = {
  password: string;
  username: string;
};

function parseBasicCredentials(value: string | null): Credentials | null {
  if (!value?.startsWith("Basic ")) {
    return null;
  }

  const encoded = value.slice("Basic ".length).trim();

  if (!encoded) {
    return null;
  }

  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex < 0) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

function securelyMatches(actual: string, expected: string): boolean {
  const actualDigest = createHash("sha256").update(actual).digest();
  const expectedDigest = createHash("sha256").update(expected).digest();

  return timingSafeEqual(actualDigest, expectedDigest);
}

function privateResponse(body: string, status: number): NextResponse {
  return new NextResponse(body, {
    status,
    headers: privatePreviewHeaders,
  });
}

export function proxy(request: NextRequest): NextResponse {
  if (process.env.PREVIEW_AUTH_ENABLED !== "true") {
    return NextResponse.next();
  }

  const expectedUsername = process.env.PREVIEW_AUTH_USERNAME;
  const expectedPassword = process.env.PREVIEW_AUTH_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return privateResponse("Preview access is not configured.", 503);
  }

  const credentials = parseBasicCredentials(request.headers.get("authorization"));
  const isAuthorized =
    credentials !== null &&
    securelyMatches(credentials.username, expectedUsername) &&
    securelyMatches(credentials.password, expectedPassword);

  if (!isAuthorized) {
    const response = privateResponse("Authentication required.", 401);
    response.headers.set("WWW-Authenticate", 'Basic realm="Eyewear Preview", charset="UTF-8"');

    return response;
  }

  const response = NextResponse.next();

  for (const [name, value] of Object.entries(privatePreviewHeaders)) {
    response.headers.set(name, value);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|favicon.ico|sitemap.xml|robots.txt).*)"],
};
