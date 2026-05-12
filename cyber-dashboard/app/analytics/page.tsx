import DashboardLayout from "@/components/DashboardLayout";
import {alerts} from "@/data/alerts";

const countBySeverity = (severity: string) => {
    return alerts.filter((alert) => alert.severity === severity).length;
}

const countByStatus = (status: string) => {
    return alerts.filter((alert) => alert.status === status).length;
}

export default function AnalyticsPage() {
    const severityData = [
        {label: "Critical", count: countBySeverity("Critical") },
        {label: "High", count: countBySeverity("High") },
        {label: "Medium", count: countBySeverity("Medium") },
        {label: "Low", count: countBySeverity("Low") },
    ];

    const mostTargetedEndpoints = alerts.reduce<Record<string, number>>(
        (accumulator, alert) => {
            accumulator[alert.target] = (accumulator[alert.target] || 0) + 1;
            return accumulator;
        },
        {}
    );

    return (
    <DashboardLayout>
      <section>
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight">
            Security Analytics
          </h1>

          <p className="mt-3 text-lg text-zinc-400">
            Analyze alert severity, investigation status, and targeted systems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold">Alerts by Severity</h2>

            <div className="mt-6 space-y-4">
              {severityData.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-zinc-300">{item.label}</span>
                    <span className="text-zinc-400">{item.count}</span>
                  </div>

                  <div className="h-3 rounded-full bg-zinc-800">
                    <div
                      className="h-3 rounded-full bg-blue-600"
                      style={{
                        width: `${Math.max(item.count * 25, 8)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold">Alerts by Status</h2>

            <div className="mt-6 space-y-4">
              {severityData.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-zinc-300">{item.label}</span>
                    <span className="text-zinc-400">{item.count}</span>
                  </div>

                  <div className="h-3 rounded-full bg-zinc-800">
                    <div
                      className="h-3 rounded-full bg-green-600"
                      style={{
                        width: `${Math.max(item.count * 25, 8)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold">Most Targeted Endpoints</h2>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {Object.entries(mostTargetedEndpoints).map(([target, count]) => (
                <div
                  key={target}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
                >
                  <p className="text-sm text-zinc-400">Endpoint</p>
                  <p className="mt-2 text-xl font-semibold">{target}</p>
                  <p className="mt-3 text-sm text-zinc-500">
                    {count} alert{count !== 1 ? "s" : ""} detected
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
