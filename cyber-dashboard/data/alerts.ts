import { SecurityAlert } from "@/types/alert";

export const alerts: SecurityAlert[] = [
    {
        id: "1",
        title: "SQL Injection Attempt",
        sourceIp: "185.44.76.12",
        target: "/api/login",
        severity: "High",
        status: "Open",
        timestamp: "2026-05-06 9:46 PM",
        description: "Suspected SQL payload detected in a login request.",
    },
    {
        id: "2",
        title: "Multiple failed login attempts",
        sourceIp: "91.203.5.18",
        target: "/admin",
        severity: "High",
        status: "Investigating",
        timestamp: "2026-04-15 7:00 PM",
        description: "Repeated failed authentication attempts from the same IP address.",
    },
    {
        id: "3",
        title: "Unusual file upload",
        sourceIp: "45.67.89.10",
        target: "/upload",
        severity: "Medium",
        status: "Open",
        timestamp: "2026-02-23 5:30 PM",
        description: "Uploaded a file extension that does not match declared MIME type.",
    },
];
