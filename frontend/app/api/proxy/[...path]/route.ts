/* ========================================
   Astrova — API Proxy Route
   ========================================
   Proxies requests from browser → Next.js → Backend.
   
   The API key is attached HERE (server-side),
   NOT in the browser.
   
   This eliminates NEXT_PUBLIC_DEMO_API_KEY exposure.
   ======================================== */

import { NextRequest, NextResponse } from "next/server";

// Backend URL - server-side only (not NEXT_PUBLIC)
const BACKEND_URL = process.env.API_BASE_URL || "http://localhost:3001";
const API_KEY = process.env.DEMO_API_KEY;

/**
 * Handle all proxy requests to the backend.
 * Browser calls: /api/proxy/heritage → Backend receives: /api/heritage
 */
async function proxyRequest(
  request: NextRequest,
  pathSegments: string[]
): Promise<NextResponse> {
  // Fail if API key not configured
  if (!API_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "PROXY_CONFIG_ERROR",
          message: "Server API key not configured.",
        },
      },
      { status: 500 }
    );
  }

  // Build backend URL
  const backendPath = `/api/${pathSegments.join("/")}`;
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${BACKEND_URL}${backendPath}${searchParams ? `?${searchParams}` : ""}`;

  // Forward request to backend with API key
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("X-API-Key", API_KEY);

  // Forward authorization if present
  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    headers.set("Authorization", authHeader);
  }

  try {
    const response = await fetch(url, {
      method: request.method,
      headers,
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? await request.text()
          : undefined,
    });

    // Get response body
    const data = await response.text();

    // Forward response with original status
    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("[Proxy] Backend request failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "PROXY_ERROR",
          message: "Failed to connect to backend service.",
        },
      },
      { status: 502 }
    );
  }
}

// Route handlers - Next.js 16: params is a Promise
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}
