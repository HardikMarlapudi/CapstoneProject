"use client";

import { FormEvent, useEffect, useState } from "react";

import DashboardLayout from "@/components/DashboardLayout";
import {CyberReport, ReportStatus,} from "@/types/report";

type ReportFromState = {
    title: string;
    relatedIncident: string;
    author: string;
    status: ReportStatus;
    findings: string;
    recommendation: string;
};

const emptyForm: ReportFromState = {
    title: "",
    relatedIncident: "",
    author: "",
    status: "Draft",
    findings: "",
    recommendation: "",
};

function getStatusClass(status: ReportStatus) {
    switch (status) {
        case "Draft":
            return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
        case "Submitted":
            return "border-blue-500/30 bg-blue-500/10 text-blue-400";
        case "Archived":
            return "border-green-500/30 bg-green-500/10 text-green-400";
    }
}

export default async function ReportsPage() {
    const [reports, setReports] = useState<CyberReport[]>([]);
    const [formData, setFormData] = useState<ReportFromState>(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);

    async function loadReports() {
        const response = await fetch("/api/reports");
        const data = (await response.json()) as CyberReport[];
        setReports(data);
    }

    useEffect(() => {
        loadReports();
    }, []);

    function updateField(name: keyof ReportFromState, value: string) {
        setFormData((current) => ({
            ...current,
            [name] : value,
        }))
    }
}

// async function handleSubmit goes here:
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
}
