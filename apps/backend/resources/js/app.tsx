import { createInertiaApp } from "@inertiajs/react";
import type { ComponentType } from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

const appName = import.meta.env.VITE_APP_NAME ?? "Eyewear Platform";

void createInertiaApp({
  title: (title) => (title ? `${title} — ${appName}` : appName),
  resolve: (name) => {
    const pages = import.meta.glob<{ default: ComponentType }>("./pages/**/*.tsx", {
      eager: true,
    });
    const page = pages[`./pages/${name}.tsx`];

    if (!page) {
      throw new Error(`Inertia page not found: ${name}`);
    }

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  progress: {
    color: "#B4966B",
    showSpinner: false,
  },
});
