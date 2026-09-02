import { NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

// Serves files saved by src/lib/upload.ts from <project root>/uploads/,
// which sits outside `public/` and so isn't reachable by Next's static file
// server on its own — this route is the only way those files are exposed.
const UPLOADS_ROOT = path.join(process.cwd(), "uploads");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".pdf": "application/pdf",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;

  if (!segments?.length || segments.some((s) => s.includes("..") || s.includes("\\"))) {
    return NextResponse.json({ success: false, error: "Invalid path" }, { status: 400 });
  }

  const filePath = path.join(UPLOADS_ROOT, ...segments);

  // Defense in depth: the resolved path must still live under UPLOADS_ROOT.
  if (!filePath.startsWith(UPLOADS_ROOT + path.sep)) {
    return NextResponse.json({ success: false, error: "Invalid path" }, { status: 400 });
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file");

    const buffer = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || "application/octet-stream";

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "File not found" }, { status: 404 });
  }
}
