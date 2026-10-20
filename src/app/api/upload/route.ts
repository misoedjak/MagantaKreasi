import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // Set up directory in public folder
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    const urls: string[] = [];

    for (const file of files) {
      // Validate file type (allow images and videos)
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      if (!isImage && !isVideo) {
        return NextResponse.json({ error: "Only image and video files are allowed" }, { status: 400 });
      }

      // Convert file stream to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate secure unique filename
      const fileExt = path.extname(file.name) || (isImage ? ".jpg" : ".mp4");
      const fileName = `${crypto.randomUUID()}${fileExt}`;
      const filePath = path.join(uploadDir, fileName);

      try {
        await mkdir(uploadDir, { recursive: true });
        // Write file locally
        await writeFile(filePath, buffer);
        urls.push(`/uploads/${fileName}`);
      } catch (fsErr) {
        console.warn("Filesystem write not permitted or failed, falling back to base64 data URL:", fsErr);
        const mimeType = file.type || (isImage ? "image/jpeg" : "video/mp4");
        const base64 = buffer.toString("base64");
        urls.push(`data:${mimeType};base64,${base64}`);
      }
    }

    return NextResponse.json({ urls });
  } catch (err: any) {
    console.error("Upload Error:", err);
    return NextResponse.json({ error: err.message || "Upload process failed" }, { status: 500 });
  }
}
