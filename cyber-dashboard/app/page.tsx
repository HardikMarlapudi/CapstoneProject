import AlertCard from "@/components/AlertCard";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { alerts } from "@/data/alerts";

export default function Home() {
  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "Critical"
  ).length;

  const openAlerts = alerts.filter(
    (alert) => alert.status === "Open"
  ).length;

  return (
    <DashboardLayout>
      <section>
        <div className="mb-10">
          <h2 className="text-5xl font-bold tracking-tight">
            Security Overview
          </h2>

          <p className="mt-3 text-zinc-400 text-lg">
            Monitor active threats, incidents,
            and suspicious activity.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatsCard
            title="Total Alerts"
            value={alerts.length}
            description="Security alerts detected today"
          />

          <StatsCard
            title="Open Alerts"
            value={openAlerts}
            description="Alerts still requiring review"
          />

          <StatsCard
            title="Critical Alerts"
            value={criticalAlerts}
            description="Highest severity threats"
          />
        </div>

        <div>
          <h3 className="mb-5 text-3xl font-semibold">
            Recent Alerts
          </h3>

          <div className="space-y-5">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
              />
            ))}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
