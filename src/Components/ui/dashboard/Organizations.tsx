import { DashboardCard, DashboardHeader } from "./DashboardShell";

export default function Organizations() {
  return (
    <DashboardCard>
      <DashboardHeader
        kicker="Administration"
        title="Organizations"
        subtitle="Organization management will appear here once the backend endpoints are ready."
      />
      <div className="text-gray-400 text-center py-10">Organizations API not provided yet</div>
    </DashboardCard>
  );
}
