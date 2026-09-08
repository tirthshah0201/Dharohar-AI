/* ========================================
   Astrova — File Upload Utility
   ========================================
   Handles media file uploads with validation.
   Uses multer for multipart/form-data processing.
   Supports images (JPG, JPEG, PNG, WebP) and videos (MP4, WebM, MOV).
   ======================================== */

import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// ---- Allowed MIME types ----
const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const ALLOWED_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime", // MOV
];

const ALLOWED_MIME_TYPES = [...ALLOWED_IMAGE_MIME_TYPES, ...ALLOWED_VIDEO_MIME_TYPES];

// ---- Allowed file extensions ----
const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const ALLOWED_VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];
const ALLOWED_EXTENSIONS = [...ALLOWED_IMAGE_EXTENSIONS, ...ALLOWED_VIDEO_EXTENSIONS];

// ---- File size limits ----
const IMAGE_MAX_SIZE = 5 * 1024 * 1024;   // 5 MB
const VIDEO_MAX_SIZE = 50 * 1024 * 1024;  // 50 MB
const MAX_FILE_SIZE = VIDEO_MAX_SIZE;       // multer limit (highest possible)

// ---- Upload directory ----
const UPLOAD_DIR = path.join(__dirname, "../../uploads/heritage");

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/**
 * Determine if a MIME type is a video
 */
function isVideoMime(mimetype: string): boolean {
  return ALLOWED_VIDEO_MIME_TYPES.includes(mimetype);
}

/**
 * Determine if a file extension is a video extension
 */
function isVideoExtension(ext: string): boolean {
  return ALLOWED_VIDEO_EXTENSIONS.includes(ext);
}

/**
 * Generate a safe filename using timestamp + random string
 */
function generateSafeFilename(originalname: string): string {
  const ext = path.extname(originalname).toLowerCase();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `heritage_${timestamp}_${random}${ext}`;
}

/**
 * Validate file type, extension, and size
 */
function validateFile(file: Express.Multer.File): { valid: boolean; error?: string } {
  const ext = path.extname(file.originalname).toLowerCase();
  const isVideo = isVideoMime(file.mimetype) || isVideoExtension(ext);

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return {
      valid: false,
      error: `Unsupported file type: ${file.mimetype}. Please upload JPG, JPEG, PNG, WebP, MP4, WebM, or MOV.`,
    };
  }

  // Check extension
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `Unsupported file extension: ${ext}. Please upload JPG, JPEG, PNG, WebP, MP4, WebM, or MOV.`,
    };
  }

  // Check MIME/extension consistency
  const extIsVideo = isVideoExtension(ext);
  const mimeIsVideo = isVideoMime(file.mimetype);
  if (extIsVideo !== mimeIsVideo) {
    return {
      valid: false,
      error: `File extension ${ext} does not match type ${file.mimetype}. Please select a matching file.`,
    };
  }

  // Check file size
  if (isVideo) {
    if (file.size > VIDEO_MAX_SIZE) {
      return {
        valid: false,
        error: `Video exceeds the maximum allowed size of ${VIDEO_MAX_SIZE / (1024 * 1024)} MB.`,
      };
    }
  } else {
    if (file.size > IMAGE_MAX_SIZE) {
      return {
        valid: false,
        error: `Image exceeds the maximum allowed size of ${IMAGE_MAX_SIZE / (1024 * 1024)} MB.`,
      };
    }
  }

  return { valid: true };
}

/**
 * Sanitize filename to prevent path traversal
 */
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[\\/\\]/g, "")
    .replace(/\.\./g, "")
    .replace(/[^a-zA-Z0-9_.\-]/g, "_");
}

/**
 * Determine media type from MIME type
 */
export function getMediaType(mimetype: string): string {
  if (isVideoMime(mimetype)) return "video";
  return "image";
}

/**
 * Multer storage configuration
 */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const safeFilename = generateSafeFilename(file.originalname);
    cb(null, safeFilename);
  },
});

/**
 * File filter for multer
 */
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const validation = validateFile(file);
  if (validation.valid) {
    cb(null, true);
  } else {
    cb(new Error(validation.error));
  }
};

/**
 * Multer upload middleware
 */
export const uploadMedia = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
});

/**
 * Get the public URL for an uploaded file
 */
export function getMediaUrl(filename: string): string {
  return `/api/uploads/heritage/${filename}`;
}

/**
 * Get the absolute path for an uploaded file
 */
export function getMediaPath(filename: string): string {
  return path.join(UPLOAD_DIR, filename);
}

/**
 * Delete a media file
 */
export function deleteMediaFile(filename: string): boolean {
  try {
    const filePath = getMediaPath(filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Extract filename from a media URL
 */
export function extractFilenameFromUrl(url: string): string | null {
  const match = url.match(/\/uploads\/heritage\/([^\/\?]+)$/);
  return match ? match[1] : null;
}

export {
  UPLOAD_DIR,
  IMAGE_MAX_SIZE,
  VIDEO_MAX_SIZE,
  MAX_FILE_SIZE,
  ALLOWED_MIME_TYPES,
  ALLOWED_EXTENSIONS,
  ALLOWED_IMAGE_MIME_TYPES,
  ALLOWED_VIDEO_MIME_TYPES,
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_VIDEO_EXTENSIONS,
  isVideoMime,
  isVideoExtension,
};
