import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { testUrl } = body as { testUrl?: string };

    if (!testUrl) {
      return NextResponse.json({ error: "testUrl is required" }, { status: 400 });
    }

    console.log("Testing connectivity to:", testUrl);

    try {
      const response = await fetch(testUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      return NextResponse.json({
        success: true,
        status: response.status,
        statusText: response.statusText,
        url: testUrl,
        reachable: true,
        message: `Successfully reached ${testUrl}`
      });

    } catch (networkError: any) {
      console.error("Network test error:", networkError);
      
      return NextResponse.json({
        success: false,
        reachable: false,
        url: testUrl,
        error: networkError.message,
        code: networkError.code,
        message: `Cannot reach ${testUrl}`
      });
    }

  } catch (err) {
    console.error("Test endpoint error:", err);
    return NextResponse.json({ 
      error: "Server error during connectivity test",
      detail: err instanceof Error ? err.message : "Unknown error"
    }, { status: 500 });
  }
} 