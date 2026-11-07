type SSEClient = {
  id: string;
  articleId: string;
  controller: ReadableStreamDefaultController;
};

class SSEManager {
  private clients: Map<string, SSEClient> = new Map();

  subscribe(id: string, articleId: string, controller: ReadableStreamDefaultController) {
    this.clients.set(id, { id, articleId, controller });
  }

  unsubscribe(id: string) {
    this.clients.delete(id);
  }

  broadcast(articleId: string, event: string, payload: unknown) {
    const encoder = new TextEncoder();
    const data = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
    const encoded = encoder.encode(data);

    this.clients.forEach((client, id) => {
      if (client.articleId === articleId) {
        try {
          client.controller.enqueue(encoded);
        } catch {
          this.clients.delete(id);
        }
      }
    });
  }
}

const globalForSSE = globalThis as unknown as { sseManager?: SSEManager };
export const sseManager = globalForSSE.sseManager || new SSEManager();

if (process.env.NODE_ENV !== 'production') {
  globalForSSE.sseManager = sseManager;
}
