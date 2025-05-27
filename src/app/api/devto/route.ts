import { NextRequest, NextResponse } from "next/server";

// Configure this route as dynamic and disable all caching
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(request: NextRequest) {
  try {
    // Get the username from query parameters or use default
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "adamsnows";

    // Fetch posts from DEV.to API with timestamp to bypass cache
    const timestamp = Date.now();
    const response = await fetch(
      `https://dev.to/api/articles?username=${username}&per_page=30&t=${timestamp}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`DEV.to API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Return the data with appropriate CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error in DEV.to API proxy:", error);
    return NextResponse.json(
      { error: "Failed to fetch DEV.to articles" },
      { status: 500 }
    );
  }
}
