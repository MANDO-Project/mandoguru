/**
 * Feedback API Proxy
 * 
 * Proxies feedback submissions to the backend API.
 */

import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.SCAN_API_BASE_URL || process.env.NEXT_PUBLIC_SCAN_API_BASE_URL;

/**
 * POST /api/feedback
 * Submit user feedback
 */
export async function POST(request: NextRequest) {
    try {
        // Get the authorization header from the incoming request
        const authHeader = request.headers.get("Authorization");

        if (!authHeader) {
            return NextResponse.json(
                { error: "Authorization header required" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { feedback, rating, subscribe_to_news } = body;

        // Validate request body
        if (rating === undefined || rating === null) {
            return NextResponse.json(
                { error: "Missing required field: rating" },
                { status: 400 }
            );
        }

        // Forward the request to the backend API
        const backendResponse = await fetch(
            `${API_BASE_URL}/v1.0.0/vulnerability/detection/feedback`,
            {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Authorization": authHeader,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    feedback,
                    rating,
                    subscribe_to_news,
                }),
            }
        );

        const responseData = await backendResponse.json().catch(() => ({}));

        if (!backendResponse.ok) {
            return NextResponse.json(
                { error: responseData.message || "Failed to submit feedback" },
                { status: backendResponse.status }
            );
        }

        return NextResponse.json(responseData, { status: backendResponse.status });
    } catch (error: any) {
        console.error("Error submitting feedback:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}
