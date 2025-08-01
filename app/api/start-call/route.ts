import { NextRequest, NextResponse } from "next/server";

// Try multiple possible API endpoints for OmniDimension
// Agent URL pattern: http://omnidim.io/agent/8782
const POSSIBLE_API_BASES = [
  "https://omnidim.io/api/v1",
  "https://omnidim.io/api", 
  "https://omnidim.io/v1", 
  "https://api.omnidim.io/v1",
  "https://omnidim.io"  // Maybe the call endpoint is directly under the domain
];

const OMNI_API_BASE = POSSIBLE_API_BASES[0]; // Start with the most likely
const AGENT_ID = process.env.OMNIDIM_AGENT_ID!;
const API_KEY = process.env.OMNIDIM_API_KEY!;

// Agent Info: http://omnidim.io/agent/8782

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneNumber, countryCode } = body as { phoneNumber?: string; countryCode?: string };

    if (!phoneNumber) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    if (!countryCode) {
      return NextResponse.json({ error: "Country code is required" }, { status: 400 });
    }

    // Clean phone number (remove all non-digits)
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
    
    console.log("Backend validation:", { 
      receivedPhoneNumber: phoneNumber, 
      cleanPhoneNumber, 
      countryCode, 
      phoneLength: cleanPhoneNumber.length 
    });
    
    // Validate phone number format based on country
    let formattedPhoneNumber: string;
    let expectedLength: number;

    switch (countryCode) {
      case "IN":
        expectedLength = 10;
        if (cleanPhoneNumber.length !== expectedLength) {
          console.log(`Indian phone validation failed: expected ${expectedLength} digits, got ${cleanPhoneNumber.length}`);
          return NextResponse.json({ 
            error: `Please enter a valid 10-digit Indian phone number (received ${cleanPhoneNumber.length} digits: ${cleanPhoneNumber})` 
          }, { status: 400 });
        }
        formattedPhoneNumber = `+91${cleanPhoneNumber}`;
        break;
      
      case "US":
      case "CA":
        expectedLength = 10;
        if (cleanPhoneNumber.length !== expectedLength) {
          return NextResponse.json({ error: "Please enter a valid 10-digit US/Canada phone number" }, { status: 400 });
        }
        formattedPhoneNumber = `+1${cleanPhoneNumber}`;
        break;
      
      default:
        return NextResponse.json({ error: "Unsupported country code" }, { status: 400 });
    }

    const payload = {
      agent_id: AGENT_ID,
      phone_number: formattedPhoneNumber,
      // You can add additional context for the agent here
      context: "This is a roommate preference onboarding call for Ellemate. Please ask the user about their basic details, lifestyle preferences, personality traits, room preferences, and safety preferences. Be friendly, conversational, and speak clearly. If the user is from India, be culturally aware and respectful.",
    };

        console.log("Initiating call to:", formattedPhoneNumber, "with agent:", AGENT_ID, "for country:", countryCode);

    // Try multiple API endpoints until one works
    let response;
    let lastError;
    let workingEndpoint = null;

    // Try different endpoint patterns
    const ENDPOINT_PATTERNS = [
      "/agent/call",
      "/call", 
      "/api/call",
      "/v1/call"
    ];

    outerLoop: for (const apiBase of POSSIBLE_API_BASES) {
      for (const pattern of ENDPOINT_PATTERNS) {
        try {
          const endpoint = `${apiBase}${pattern}`;
          console.log("Trying API endpoint:", endpoint);
        
          response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(10000), // 10 second timeout
          });

          // If we get here without an error, this endpoint works
          workingEndpoint = endpoint;
          console.log("✅ Successfully connected to:", endpoint);
          break outerLoop; // Break out of both loops

        } catch (networkError: any) {
          console.log("❌ Failed to connect to:", `${apiBase}${pattern}`, "Error:", networkError.message);
          lastError = networkError;
          continue; // Try next endpoint pattern
        }
      }
    }

    // If none of the endpoints worked
    if (!workingEndpoint || !response) {
      console.error("All API endpoints failed. Last error:", lastError);
      
      // Generate list of all tested endpoints
      const allTestedEndpoints = [];
      for (const apiBase of POSSIBLE_API_BASES) {
        for (const pattern of ENDPOINT_PATTERNS) {
          allTestedEndpoints.push(`${apiBase}${pattern}`);
        }
      }
      
      return NextResponse.json({ 
        error: "❌ Cannot reach any OmniDimension API endpoints. Tested " + allTestedEndpoints.length + " different combinations.",
        detail: `Last error: ${lastError?.message}`,
        suggestion: "Please verify the correct API endpoint with OmniDimension support or check if the service is down",
        testedEndpoints: allTestedEndpoints,
        agentUrl: "http://omnidim.io/agent/8782"
      }, { status: 500 });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OmniDimension call error:", errorText);
      
      // Parse common error scenarios
      if (response.status === 401) {
        return NextResponse.json({ error: "Authentication failed. Please check API credentials." }, { status: 500 });
      } else if (response.status === 400) {
        return NextResponse.json({ error: "Invalid phone number or request format." }, { status: 400 });
      } else if (response.status === 429) {
        return NextResponse.json({ error: "Rate limit exceeded. Please try again in a few minutes." }, { status: 429 });
      }
      
      return NextResponse.json({ 
        error: "Failed to initiate call. Please try again.", 
        detail: errorText 
      }, { status: 500 });
    }

    const data = await response.json();
    console.log("Call initiated successfully:", data);

    return NextResponse.json({
      success: true,
      message: "Call initiated successfully",
      callId: data.call_id || data.id, // Different APIs might return different field names
      data: data
    });

  } catch (err) {
    console.error("Call API exception:", err);
    return NextResponse.json({ 
      error: "Server error while initiating call",
      detail: err instanceof Error ? err.message : "Unknown error"
    }, { status: 500 });
  }
} 