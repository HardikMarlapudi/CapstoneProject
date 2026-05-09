// types/alert.ts

export type AlertSeverity = "Low" | "Medium" | "High" | "Critical";
export type AlertStatus = "Open" | "Investigating" | "Resolved";

export type SecurityAlert = {
    id: string;
    title: string;
    description: string;
    severity: AlertSeverity;
    status: AlertStatus;
    timestamp: string;
    sourceIp: string;
    target: string;
};
