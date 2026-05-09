import DashboardLayout from "@/components/DashboardLayout";

const incidents = [
    {
        id: 1,
        title: "Unauthorized Access Attempt",
        severity: "Critical",
        status: "Investigating",
        affectedSystems: [
            "/api/login",
            "/admin",
        ],
        assignedTo: "Security Team Alpha",
        createdAt: "2026-05-08 8:30 PM",
        description: "Multiple SQL injection attempts detected across authentication endpoints.",
    },
    {
        id: 2,
        title: "Brute Force Login Attempts",
        severity: "High",
        status: "Open",
        affectedSystems: [
            "/admin",
            "/dashboard",
        ],
        assignedTo: "SOC Analyst Team",
        createdAt: "2026-05-08 7:45 PM",
        description: "Repeated failed authentication attempts from several IP addresses.",
    },
    {
        id: 3,
        title: "Brute Force Login Attempts",
        severity: "High",
        status: "Open",
        affectedSystems: [
            "/admin",
            "/dashboard",
        ],
        assignedTo: "SOC Analyst Team",
        createdAt: "2026-05-08 7:45 PM",
        description: "Repeated failed authentication attempts from several IP addresses.",
    }
]

function getSeverityStyles(severity: string) {
    switch(severity) {
        case "Critical":
            return "border-red-500/30 bg-red-500/10 text-red-400";
        case "High":
            return "border-orange-500/30 bg-orange-500/10 text-orange-400";
        case "Medium":
            return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
        default:
            return "border-zinc-800 bg-zinc-800 text-zinc-300";
    }
}

function getStatusStyles(status: string) {
    switch(status) {
        case "Open":
            return "bg-blue-500/10 text-blue-400 border-blue-500/30";
        case "Investigating":
            return "bg-purple-500/10 text-purple-400 border-purple-500/30";
        case "Resolved":
            return "bg-green-500/10 text-green-400 border-green-500/30";
        default:
            return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
}

export default function IncidentsPage() {
    return (
      <DashboardLayout>
        <section>
  
          {/* PAGE HEADER */}
  
          <div className="mb-10">
            <h1 className="text-5xl font-bold tracking-tight">
              Security Incidents
            </h1>
  
            <p className="mt-3 text-lg text-zinc-400">
              Investigate grouped cybersecurity threats and response activity.
            </p>
          </div>
  
          {/* INCIDENT CARDS */}
  
          <div className="space-y-6">
  
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
              >
  
                {/* TOP ROW */}
  
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
  
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {incident.title}
                    </h2>
  
                    <p className="mt-3 max-w-3xl text-zinc-400 leading-relaxed">
                      {incident.description}
                    </p>
                  </div>
  
                  <div className="flex gap-3">
  
                    {/* SEVERITY */}
  
                    <span
                      className={`rounded-full border px-4 py-2 text-sm font-semibold ${getSeverityStyles(
                        incident.severity
                      )}`}
                    >
                      {incident.severity}
                    </span>
  
                    {/* STATUS */}
  
                    <span
                      className={`rounded-full border px-4 py-2 text-sm font-semibold ${getStatusStyles(
                        incident.status
                      )}`}
                    >
                      {incident.status}
                    </span>
                  </div>
                </div>
  
                {/* INCIDENT DETAILS */}
  
                <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-zinc-400 lg:grid-cols-3">
  
                  <div>
                    <p className="font-semibold text-zinc-300">
                      Assigned Team
                    </p>
  
                    <p className="mt-1">
                      {incident.assignedTo}
                    </p>
                  </div>
  
                  <div>
                    <p className="font-semibold text-zinc-300">
                      Created At
                    </p>
  
                    <p className="mt-1">
                      {incident.createdAt}
                    </p>
                  </div>
  
                  <div>
                    <p className="font-semibold text-zinc-300">
                      Affected Systems
                    </p>
  
                    <div className="mt-2 flex flex-wrap gap-2">
  
                      {incident.affectedSystems.map((system) => (
                        <span
                          key={system}
                          className="rounded-md bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                        >
                          {system}
                        </span>
                      ))}
  
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </DashboardLayout>
    );
}
