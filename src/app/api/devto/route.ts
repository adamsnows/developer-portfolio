import { NextRequest, NextResponse } from "next/server";

// Configure this route as dynamic
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Get the username from query parameters or use default
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "adamsnows";

    // Fetch posts from DEV.to API
    const response = await fetch(
      `https://dev.to/api/articles?username=${username}`,
      {
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
