export type ReportStatus = "Draft" | "Submitted" | "Archived";

export type CyberReport = {
    id: number;
    title: string;
    relatedIncident: string;
    author: string;
    status: ReportStatus;
    findings: string;
    recommendation: string;
    createdAt: string;
};
