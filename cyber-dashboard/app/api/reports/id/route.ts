import {NextResponse} from "next/server";
import {deleteReport, updateReport} from "@/lib/reportStore";
import {CyberReport} from "@/types/report";

type RouteParams = {
    params: Promise<{id: string}>;
};

export async function PUT(request: Request, {params}: RouteParams) {
    const {id} = await params;
    // Implementation for fetching a specific report by ID
    const reportID = Number(id);
    const body = (await request.json()) as Partial<CyberReport>;

    const updatedReport = updateReport(reportID, body);

    if (!updatedReport) {
        return NextResponse.json({message: "Report not found"}, {status: 404});
    }

    return NextResponse.json(updatedReport);
}

export async function DELETE(_request: Request, {params}: RouteParams) {
    const {id} = await params;
    const reportID = Number(id);

    const deletedReport = deleteReport(reportID);

    if (!deletedReport) {
        return NextResponse.json({message: "Report not found."}, {status: 404});
    }

    return NextResponse.json({message: "Report deleted successfully."});
}
