import {NextResponse} from "next/server";

import {
    addReport,
    getAllReports,
} from "@/lib/reportStore";

import {CyberReport} from "@/types/report";

export async function GET() {
    return NextResponse.json(getAllReports());
}

export async function POST(request: Request) {
    const body = (await request.json() as Omit<CyberReport, "id">);

    if (
        !body.title ||
        !body.relatedIncident ||
        !body.author ||
        !body.status ||
        !body.findings ||
        !body.recommendation
    ) {
        return NextResponse.json({
            message:
             "Missing the required fields.",   
        },
        {
            status: 400,
        }
    )
}

const newReport = addReport(body);

return NextResponse.json(newReport, {
    status: 201
    });
}
