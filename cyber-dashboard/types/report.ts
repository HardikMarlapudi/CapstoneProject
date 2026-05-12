export type ReportStatus = "Draft" | "Published" | "Archived";

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
