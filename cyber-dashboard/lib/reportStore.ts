import {CyberReport} from "@/types/report";

let reports: CyberReport[] = [
{
    id: 1,
    title: "SQL Injection Investigation Summary",
    relatedIncident: "SQL Injection Attack on Web Application",
    author: "SOC Analyst",
    status: "Draft",
    findings: "Multiple SQL injection attempts were detected against the login attempt.",
    recommendation: "Implement parameterized queries and input validation to prevent SQL injection.",
    createdAt: "2026-05-10 10:00 AM",
    },
];

export function getAllReports() {
    return reports;
}

export function addReport(report: Omit<CyberReport, "id">) {
    const newReport: CyberReport = {
        id: reports.length > 0 ? reports[reports.length - 1].id + 1 : 1,
        ...report,
    };
    reports.push(newReport);
    return newReport;
}

export function updateReport(id: number, updatedReport: Partial<CyberReport>) {
    let foundReport: CyberReport | null = null;
    
    reports = reports.map((report) => {
        if (report.id === id) {
            foundReport = {
                ...report,
                ...updatedReport,
            };

            return foundReport;
        }

        return report;
    });

    return foundReport;
}

export function deleteReport(id: number) {
    const reportToDelete = reports.find((report) => report.id === id);

    reports = reports.filter((report) => report.id !== id);

    return reportToDelete;
}
