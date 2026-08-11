import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

// Extracted from the repeated inline upload logic in every content API route
// (achievements/books/calendar/curriculum/facilities/forms/gallery). Files are
// stored under public/uploads/<subfolder> and served directly by Next's static
// file handling, matching the existing convention already used by this app.
export async function saveUploadedFile(file: File, subfolder: string): Promise<string> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("File is too large (max 15MB)");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const safeName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "");
  const filename = `${uniqueSuffix}-${safeName}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads", subfolder);
  if (!fs.existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/${subfolder}/${filename}`;
}

export async function deleteUploadedFile(publicUrl: string | null | undefined): Promise<void> {
  if (!publicUrl || !publicUrl.startsWith("/uploads/")) return;
  const filePath = path.join(process.cwd(), "public", publicUrl);
  if (fs.existsSync(filePath)) {
    await unlink(filePath);
  }
}

export function isUsableUploadedFile(file: FormDataEntryValue | null): file is File {
  return file instanceof File && file.size > 0;
}
