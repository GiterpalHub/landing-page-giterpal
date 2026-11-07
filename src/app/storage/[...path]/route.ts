import { NextRequest } from "next/server";
import { minioClient, MINIO_BUCKET } from "@/lib/minio";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    if (!params.path || params.path.length === 0) {
      return new Response("Missing path", { status: 400 });
    }

    const objectKey = params.path.join("/");
    const stat = await minioClient.statObject(MINIO_BUCKET, objectKey);
    const dataStream = await minioClient.getObject(MINIO_BUCKET, objectKey);

    const ext = objectKey.split(".").pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      webp: "image/webp",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      svg: "image/svg+xml",
      gif: "image/gif",
      ico: "image/x-icon",
      avif: "image/avif",
    };

    const contentType = (ext && mimeTypes[ext]) || stat.metaData?.["content-type"] || "application/octet-stream";

    // Convert NodeJS Readable to Web ReadableStream
    const readable = new ReadableStream({
      start(controller) {
        dataStream.on("data", (chunk) => controller.enqueue(chunk));
        dataStream.on("end", () => controller.close());
        dataStream.on("error", (err) => controller.error(err));
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
        ETag: stat.etag,
      },
    });
  } catch (error) {
    console.error("Reverse proxy storage error:", error);
    return new Response("Object Not Found", { status: 404 });
  }
}

