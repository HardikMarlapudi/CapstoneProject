import { SecurityAlert } from "@/types/alert";

type AlertCardProps = {
    alert: SecurityAlert;
};

function getSeverityClass(severity: SecurityAlert["severity"]) {
    switch(severity) {
        case "Critical":
            return "border-red-500/30 bg-red-500/10 text-red-400";
        case "High":
            return "border-orange-500/30 bg-orange-500/10 text-orange-400";
        case "Medium":
            return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
        case "Low":
            return "border-green-500/30 bg-green-500/10 text-green-400";
    }
}

export default function AlertCard({alert}: AlertCardProps) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold">{alert.title}</h3>
                    <h3 className="text-lg font-semibold">{alert.description}</h3>
                </div>

                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getSeverityClass(alert.severity)}`}>
                    {alert.severity}
                </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-zinc-400 md:grid-cols-3">
                <p>Source IP: {alert.sourceIp}</p>
                <p>Target: {alert.target}</p>
                <p>Status: {alert.status}</p>
            </div>

            <p className="mt-3 text-xs text-zinc-400">{alert.timestamp}</p>
        </div>
    );
}
