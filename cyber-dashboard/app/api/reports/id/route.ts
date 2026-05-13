import {NextResponse} from "next/server";

import {
    deleteReport,
    updateReport,
} from "@/lib/reportStore";

import {CyberReport} from "@/types/report";

type RouteParams = {
    params: Promise<{
        id: string;
    }>;
};

export async function PUT(
    request: Request,
    {params}: RouteParams
) {
    const {id} = await params;
    const body = (await request.json()) as Partial<CyberReport>;
    const reportId = Number(id);

    const updatedReport = updateReport(
        reportId,
        body
    );

    if (!updatedReport) {
        return NextResponse.json(
            {
                message: "Report not found.",
            },
            {
                status: 404,
            }
        );
    }

    return NextResponse.json(updatedReport);
}

export async function DELETE(
    _request: Request,
    {params}: RouteParams
) {
    const {id} = await params;
    const reportId = Number(id);

    const deletedReport = deleteReport(reportId);

    if (!deletedReport) {
        return NextResponse.json(
            {
                message: "Report not found.",
            },
            {
                status: 404,
            }
        );
    }

    return NextResponse.json({
        message: "Report deleted Successfully.",
    });
}
