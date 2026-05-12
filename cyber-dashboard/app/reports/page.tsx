"use client";

import { FormEvent, useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { CyberReport, ReportStatus } from "@/types/report";

type ReportFormState = {
  title: string;
  relatedIncident: string;
  author: string;
  status: ReportStatus;
  findings: string;
  recommendation: string;
};

const emptyForm: ReportFormState = {
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

export default function ReportsPage() {
  const [reports, setReports] = useState<CyberReport[]>([]);
  const [formData, setFormData] = useState<ReportFormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function loadReports() {
    const response = await fetch("/api/reports");
    const data = (await response.json()) as CyberReport[];
    setReports(data);
  }

  useEffect(() => {
    loadReports();
  }, []);

  function updateField(name: keyof ReportFormState, value: string) {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      ...formData,
      createdAt: new Date().toLocaleString(),
    };

    if (editingId) {
      await fetch(`/api/reports/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    setFormData(emptyForm);
    setEditingId(null);
    await loadReports();
  }

  function startEdit(report: CyberReport) {
    setEditingId(report.id);

    setFormData({
      title: report.title,
      relatedIncident: report.relatedIncident,
      author: report.author,
      status: report.status,
      findings: report.findings,
      recommendation: report.recommendation,
    });
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this cybersecurity report?"
    );

    if (!confirmed) return;

    await fetch(`/api/reports/${id}`, {
      method: "DELETE",
    });

    await loadReports();
  }

  function resetForm() {
    setFormData(emptyForm);
    setEditingId(null);
  }

  return (
    <DashboardLayout>
      <section>
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight">
            Cybersecurity Reports
          </h1>

          <p className="mt-3 text-lg text-zinc-400">
            Create, edit, review, and delete analyst investigation reports.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <h2 className="mb-5 text-2xl font-semibold">
            {editingId ? "Edit Report" : "Add New Report"}
          </h2>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <input
              value={formData.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Report title"
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500 text-white"
              required
            />

            <input
              value={formData.relatedIncident}
              onChange={(event) =>
                updateField("relatedIncident", event.target.value)
              }
              placeholder="Related incident"
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500 text-white"
              required
            />

            <input
              value={formData.author}
              onChange={(event) => updateField("author", event.target.value)}
              placeholder="Author / Analyst"
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500 text-white"
              required
            />

            <select
              value={formData.status}
              onChange={(event) =>
                updateField("status", event.target.value as ReportStatus)
              }
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500 text-white"
            >
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Reviewed">Reviewed</option>
            </select>

            <textarea
              value={formData.findings}
              onChange={(event) => updateField("findings", event.target.value)}
              placeholder="Investigation findings"
              className="min-h-28 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500 lg:col-span-2 text-white"
              required
            />

            <textarea
              value={formData.recommendation}
              onChange={(event) =>
                updateField("recommendation", event.target.value)
              }
              placeholder="Recommended response actions"
              className="min-h-28 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500 lg:col-span-2 text-white"
              required
            />
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
            >
              {editingId ? "Save Changes" : "Add Report"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-zinc-700 px-5 py-3 text-zinc-300 hover:bg-zinc-800"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="space-y-5">
          {reports.map((report) => (
            <div
              key={report.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{report.title}</h2>

                  <p className="mt-2 text-zinc-400">
                    Related Incident: {report.relatedIncident}
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    Author: {report.author} | Created: {report.createdAt}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${getStatusClass(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-xl bg-zinc-950 p-4">
                  <h3 className="font-semibold text-zinc-300">Findings</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    {report.findings}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-950 p-4">
                  <h3 className="font-semibold text-zinc-300">
                    Recommendation
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    {report.recommendation}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => startEdit(report)}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(report.id)}
                  className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {reports.length === 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
              No cybersecurity reports found.
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}
