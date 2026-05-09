export type alertSeverity = "Low" | "Medium" | "High" | "Critical";

export type alertStatus = "Open" | "Investigating" | "Resolved";

export type securityAlert = {
    id: number;
    title: string;
    sourceIp: string;
    target: string;
    status: alertStatus;
    timeStamp: string;
    description: string;
    severity: alertSeverity;
};
