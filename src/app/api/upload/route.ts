import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { minioClient, MINIO_BUCKET } from "@/lib/minio";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "article";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);
    const originalSize = inputBuffer.length;

    // Compress & convert image to WebP with sharp
    const webpBuffer = await sharp(inputBuffer)
      .webp({
        quality: 80,
        effort: 6,
      })
      .toBuffer();

    const compressedSize = webpBuffer.length;
    const savingsPercent = ((1 - compressedSize / originalSize) * 100).toFixed(1);

    // Generate safe filename with .webp extension
    const baseName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 50);

    const filename = `${Date.now()}-${baseName}.webp`;
    const objectKey = `${folder}/${filename}`;

    // Upload to MinIO
    await minioClient.putObject(MINIO_BUCKET, objectKey, webpBuffer, webpBuffer.length, {
      "Content-Type": "image/webp",
    });

    const storageBaseUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "http://localhost:9000/ldp";
    const publicUrl = `${storageBaseUrl}/${objectKey}`;

    return NextResponse.json({
      success: true,
      filename,
      objectKey,
      url: publicUrl,
      originalSize,
      compressedSize,
      savings: `${savingsPercent}%`,
    });
  } catch (error) {
    console.error("Image upload & compression failed:", error);
    return NextResponse.json(
      { error: "Image processing or upload failed" },
      { status: 500 }
    );
  }
}

