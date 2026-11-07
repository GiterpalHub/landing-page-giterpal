import { NextRequest } from "next/server";
import { sseManager } from "@/lib/sse";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get("articleId");

  if (!articleId) {
    return new Response("Missing articleId parameter", { status: 400 });
  }

  const clientId = `${articleId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const encoder = new TextEncoder();
  let keepAliveInterval: NodeJS.Timeout | null = null;

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connect frame
      controller.enqueue(encoder.encode(`event: connected\ndata: {"clientId":"${clientId}"}\n\n`));

      // Register subscriber
      sseManager.subscribe(clientId, articleId, controller);

      // Keepalive heartbeat every 15s to keep connection alive
      keepAliveInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": keepalive\n\n"));
        } catch {
          if (keepAliveInterval) clearInterval(keepAliveInterval);
          sseManager.unsubscribe(clientId);
        }
      }, 15000);
    },
    cancel() {
      if (keepAliveInterval) clearInterval(keepAliveInterval);
      sseManager.unsubscribe(clientId);
    },
  });

  request.signal.addEventListener("abort", () => {
    if (keepAliveInterval) clearInterval(keepAliveInterval);
    sseManager.unsubscribe(clientId);
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

