"use client";

import {useState} from "react";

import DashboardLayout from "@/components/DashboardLayout";
import AlertCard from "@/components/AlertCard";

import {alerts} from "@/data/alerts";

import { AlertSeverity, AlertStatus,} from "@/types/alert";

export default function AlertsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const [severityFilter, setSeverityFilter] = useState<AlertSeverity | "All">("All");

    const [statusFilter, setStatusFilter] = useState<AlertStatus | "All">("All");

    const filteredAlerts = alerts.filter((alert) => {
        const matchesSearch = 
        alert.title 
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

        alert.sourceIp
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

        alert.target
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

        const matchesSeverity = 
        severityFilter === "All" ||
        alert.severity === severityFilter;

        const matchesStatus = 
        statusFilter === "All" ||
        alert.status === statusFilter;

        return (
            matchesSearch &&
            matchesSeverity &&
            matchesStatus
        );
    });

    function resetFilters() {
        setSearchTerm("");
        setSeverityFilter("All");
        setStatusFilter("All");
    }

    return(
        <DashboardLayout>
            <section>

                {/* Recent Alerts */}

                <div className="mb-8">
                    <h1 className="text-4xl font-bold">
                        Security Alerts
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        Monitor and investigate deteted threats.
                    </p>
                </div>

                {/* Filtered Bar */}

                <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        
                        {/* SEARCH */}

                    </div>

                    <input
                        type="text"
                        placeholder="Search by title, IP, or target..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)    
                        }
                        className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500 lg:col-span-2"
                    />

                    {/* SEVERITY FILTER */}

                    <select
                    value={severityFilter}
                    onChange={(e) =>
                        setSeverityFilter(
                            e.target.value as
                            | AlertSeverity
                            | "All"
                        )
                    }
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500" 
                    >
                        <option value="All">
                            All Severities
                        </option>

                        <option value="Critical">
                            Critical
                        </option>

                        <option value="High">
                            High
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="Low">
                            Low
                        </option>
                    </select>

                    {/* STATUS FILTER */}

                    <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(
                        e.target.value as AlertStatus | "All"
                    )
                }

                className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                    <option value="All">
                        All Statuses
                    </option>

                    <option value="Open">
                        Open
                    </option>

                    <option value="Investigating">
                        Investigating
                    </option>

                    <option value="Resolved">
                        Resolved
                    </option>
                </select>
            </div>

                {/* FOOTER */}

                <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <p className="text-sm text-zinc-400">
                        Showing {filteredAlerts.length} of {alerts.length} alerts    
                    </p>

                    <button
                        onClick={resetFilters}
                        className="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700"
                    >
                        Reset Filters
                    </button>
                </div>

                {/* ALERT LIST */}

                <div className="space-y-5">

                    {filteredAlerts.length > 0 ? (
                        filteredAlerts.map((alert) => (
                        <AlertCard
                            key={alert.id}
                            alert={alert}
                        />
                    ))
                ) : (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
                    No alerts matched your filters. 
                </div>
            )}
            </div>
            </section>
        </DashboardLayout>
    );
}
