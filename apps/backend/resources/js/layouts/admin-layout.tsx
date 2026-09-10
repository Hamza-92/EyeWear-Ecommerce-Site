import { usePage } from "@inertiajs/react";
import type { PageProps } from "@inertiajs/core";
import type { ReactNode } from "react";
import type { StoreIdentity } from "@eyewear/types";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

interface SharedProps extends PageProps {
  appName: string;
  store: StoreIdentity;
}

const navigation = [
  "Overview",
  "Catalog",
  "Lens Studio",
  "Virtual Try-On",
  "Commerce",
  "Customers",
  "Marketing",
  "Content",
  "Settings",
];

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const { appName, store } = usePage<SharedProps>().props;

  return (
    <div className="admin-shell">
      <a className="skip-link" href="#admin-content">
        Skip to content
      </a>
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <div>
          <p className="admin-wordmark">{store.name}</p>
          <p className="admin-label">Administration</p>
        </div>

        <nav>
          <ul className="admin-nav-list">
            {navigation.map((item, index) => (
              <li key={item}>
                {index === 0 ? (
                  <a
                    className="admin-nav-link admin-nav-link--active"
                    href="/admin"
                    aria-current="page"
                  >
                    {item}
                  </a>
                ) : (
                  <span className="admin-nav-link admin-nav-link--disabled" aria-disabled="true">
                    {item}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <p className="admin-version">Foundation · v0.1</p>
      </aside>

      <div className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="ui-eyebrow">{appName}</p>
            <h1>{title}</h1>
          </div>
          <div className="admin-store-context" aria-label="Current store">
            <span className="admin-status-dot" aria-hidden="true" />
            <span>{store.domain}</span>
          </div>
        </header>
        <main id="admin-content" className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
