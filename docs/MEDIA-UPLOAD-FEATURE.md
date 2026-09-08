# Astrova — Media Upload Feature

## Overview

Administrators can upload images and videos directly from their local computer through the Admin Portal, without manually entering filesystem paths or URLs.

## Supported Formats

### Images
| Format | MIME Type | Extension |
|--------|-----------|-----------|
| JPEG | image/jpeg | .jpg, .jpeg |
| PNG | image/png | .png |
| WebP | image/webp | .webp |

**Max size:** 5 MB

### Videos
| Format | MIME Type | Extension |
|--------|-----------|-----------|
| MP4 | video/mp4 | .mp4 |
| WebM | video/webm | .webm |
| MOV | video/quicktime | .mov |

**Max size:** 50 MB

## Admin Workflow

1. Open Admin Portal → Media tab
2. Click "+ Add Media"
3. Select a heritage entity
4. Select media type (Image or Video) — auto-detected from file
5. Click "Browse / Choose Media"
6. Select a valid image or video file
7. See file info and preview
8. Optionally add caption, alt text, credit
9. Click "Upload & Save"
10. Media appears in the admin list and on the public heritage page

## API Endpoint

```
POST /api/admin/media/upload
Content-Type: multipart/form-data
Authorization: JWT (admin only)

Fields:
- file: Image or video file
- entity_id: Heritage entity UUID
- caption: Optional caption
- alt_text: Optional alt text
- credit: Optional credit
- is_primary: "true" or "false"
- display_order: Number
```

### Success Response
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "url": "/api/uploads/heritage/heritage_1234567890_abc123.jpg",
    "type": "image",
    "caption": "...",
    "alt_text": "...",
    "credit": "...",
    "is_primary": true,
    "display_order": 0,
    "filename": "heritage_1234567890_abc123.jpg",
    "originalname": "bandhani.jpg",
    "size": 1048576,
    "mimetype": "image/jpeg"
  }
}
```

### Error Responses

| Code | Message |
|------|---------|
| NO_FILE | No file uploaded. Please select a file. |
| INVALID_PAYLOAD | entity_id is required. |
| INVALID_UUID | Invalid entity ID. |
| NOT_FOUND | Heritage entity not found. |
| UPLOAD_ERROR | Failed to upload media. Please try again. |
| 413 | File exceeds maximum allowed size |
| 400 | Unsupported file type (from multer validation) |

## Security

- Admin-only endpoint (JWT + role verification)
- Server-side MIME type validation
- Server-side extension validation
- MIME/extension consistency check
- Safe generated filenames (timestamp + random)
- Path traversal prevention
- File size limits enforced server-side
- No original filename used as storage path

## Storage

- Files stored in `backend/uploads/heritage/`
- Served via Express static middleware at `/api/uploads/heritage/`
- Safe filenames: `heritage_{timestamp}_{random}.{ext}`
- Old files cleaned up on replacement (if safe)

## Frontend Rendering

### Heritage Detail Page
- Hero section: Renders `<video>` for video media, `<img>` for images
- Gallery: Renders `<video>` for video thumbnails, `<img>` for images
- GalleryLightbox: Full video playback with controls

### Media Type Detection
- `primaryMedia?.type === 'video'` for database type
- `.match(/\.mp4|\.webm|\.ogg|video/i)` for URL-based detection

## Database

The existing `media` table already supports `type = 'video'`:
```sql
type VARCHAR(50) NOT NULL CHECK (type IN ('image', 'document', 'audio', 'video'))
```

No migration required.

## Known Limitations

1. **Production storage:** Files are stored on the local filesystem. In serverless deployments (e.g., Vercel), local uploads are not persistent. For production, consider cloud storage (S3, Cloudinary, etc.).

2. **Video thumbnails:** No automatic thumbnail generation for videos. Videos show a `<video>` element preview in the admin and gallery.

3. **File cleanup:** Orphaned files are not automatically detected. Old files are only cleaned up when a media record is replaced.

## Deployment Considerations

- Ensure `backend/uploads/heritage/` directory exists and is writable
- Ensure Express static middleware serves `/api/uploads/heritage/`
- Consider disk space for video uploads (50 MB per video)
- For serverless: implement cloud storage adapter
