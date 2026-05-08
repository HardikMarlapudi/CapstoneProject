import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import AlertCard from "@/components/AlertCard";
import {alerts} from "@/data/alerts";

export default function Home() {
  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "Critical"
  ).length;

  const openAlerts = alerts.filter((alert) => alert.status === "Open").length;

  return (
    <DashboardLayout>
      <section>
        <div className="mb-8">
            <h2 className="text-4xl font-bold">Security Overview</h2>
            <p className="mt-2 text-zinc-400">
              Monitor active threats, incidents, and suspicious activity.
            </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          
          <StatsCard
            title="Total Alerts"
            value={alerts.length}
            description="Security alerts detected today"
          />

          <StatsCard
              title="Open Alerts"
              value={openAlerts}
              description="Open Security Alerts open today"
          />

          <StatsCard
              title="Critical Alerts"
              value={criticalAlerts}
              description="Highest severity threats"
          />
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-semibold">Recent Alerts</h3>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
