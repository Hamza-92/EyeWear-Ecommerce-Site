import { Head } from "@inertiajs/react";
import { AdminLayout } from "@/layouts/admin-layout";

interface FoundationSection {
  description: string;
  label: string;
}

interface DashboardProps {
  sections: FoundationSection[];
}

export default function Dashboard({ sections }: DashboardProps) {
  return (
    <AdminLayout title="Overview">
      <Head title="Overview" />

      <section className="admin-intro" aria-labelledby="admin-intro-title">
        <p className="ui-eyebrow">Platform foundation</p>
        <h2 id="admin-intro-title">The operational layer is ready for its first domain.</h2>
        <p>
          This shell establishes the shared admin language and module boundaries. Authentication,
          permissions, and production modules are intentionally reserved for the next milestones.
        </p>
      </section>

      <section aria-labelledby="module-map-title">
        <div className="admin-section-heading">
          <h2 id="module-map-title">Planned workspaces</h2>
          <p>{sections.length} bounded areas</p>
        </div>
        <ul className="admin-module-list">
          {sections.map((section, index) => (
            <li key={section.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{section.label}</h3>
                <p>{section.description}</p>
              </div>
              <small>Planned</small>
            </li>
          ))}
        </ul>
      </section>
    </AdminLayout>
  );
}
