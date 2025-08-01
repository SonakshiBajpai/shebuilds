import { NextRequest, NextResponse } from "next/server";

const OMNI_API_BASE = "https://api.omnidimension.ai/v1";
const AGENT_ID = process.env.OMNIDIM_AGENT_ID!;
const API_KEY = process.env.OMNIDIM_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId } = body as { message?: string; sessionId?: string };

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    const payload: Record<string, any> = {
      agent_id: AGENT_ID,
      input: message,
    };
    if (sessionId) payload.session_id = sessionId;

    const response = await fetch(`${OMNI_API_BASE}/agent/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("OmniDimension error:", text);
      return NextResponse.json({ error: "Agent call failed", detail: text }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Handler exception:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
} 