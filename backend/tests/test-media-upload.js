/* ========================================
   Astrova — Media Upload Test Script
   ========================================
   Tests the admin media upload endpoint.
   Run with: node tests/test-media-upload.js
   ======================================== */

const http = require('http');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const API_BASE = 'http://localhost:3001';
const TEST_IMAGE_PATH = path.join(__dirname, 'test-image.jpg');

// Create a test image if it doesn't exist
function createTestImage() {
  if (!fs.existsSync(TEST_IMAGE_PATH)) {
    // Create a minimal JPEG file
    const jpegBuffer = Buffer.from([
      0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
      0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
      0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
      0x09, 0x08, 0x0A, 0x0C, 0x14, 0x0D, 0x0C, 0x0B, 0x0B, 0x0C, 0x19, 0x12,
      0x13, 0x0F, 0x14, 0x1D, 0x1A, 0x1F, 0x1E, 0x1D, 0x1A, 0x1C, 0x1C, 0x20,
      0x24, 0x2E, 0x27, 0x20, 0x22, 0x2C, 0x23, 0x1C, 0x1C, 0x28, 0x37, 0x29,
      0x2C, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1F, 0x27, 0x39, 0x3D, 0x38, 0x32,
      0x3C, 0x2E, 0x33, 0x34, 0x32, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00, 0x01,
      0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4, 0x00, 0x1F, 0x00, 0x00,
      0x01, 0x05, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
      0x09, 0x0A, 0x0B, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F,
      0x00, 0x7B, 0x40, 0x1B, 0xFF, 0xD9
    ]);
    fs.writeFileSync(TEST_IMAGE_PATH, jpegBuffer);
    console.log('✓ Created test image');
  }
}

// Make HTTP request
function makeRequest(options, formData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);

    if (formData) {
      formData.pipe(req);
    } else {
      req.end();
    }
  });
}

// Test cases
async function runTests() {
  console.log('\n========================================');
  console.log('Astrova Media Upload Tests');
  console.log('========================================\n');

  createTestImage();

  // Test 1: No file uploaded
  console.log('Test 1: No file uploaded');
  try {
    const res = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/admin/media/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cookie': 'astrova_session=test-token'
      }
    });
    console.log(`  Status: ${res.status}`);
    console.log(`  Expected: 400`);
    console.log(`  Result: ${res.status === 400 ? '✓ PASS' : '✗ FAIL'}\n`);
  } catch (err) {
    console.log(`  Error: ${err.message}\n`);
  }

  // Test 2: Invalid file type
  console.log('Test 2: Invalid file type');
  try {
    const form = new FormData();
    form.append('file', Buffer.from('test'), { filename: 'test.txt', contentType: 'text/plain' });
    form.append('entity_id', '00000000-0000-0000-0000-000000000000');

    const res = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/admin/media/upload',
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        'Cookie': 'astrova_session=test-token'
      }
    }, form);
    console.log(`  Status: ${res.status}`);
    console.log(`  Expected: 400`);
    console.log(`  Result: ${res.status === 400 ? '✓ PASS' : '✗ FAIL'}\n`);
  } catch (err) {
    console.log(`  Error: ${err.message}\n`);
  }

  // Test 3: No entity_id
  console.log('Test 3: No entity_id');
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(TEST_IMAGE_PATH), {
      filename: 'test.jpg',
      contentType: 'image/jpeg'
    });

    const res = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/admin/media/upload',
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        'Cookie': 'astrova_session=test-token'
      }
    }, form);
    console.log(`  Status: ${res.status}`);
    console.log(`  Expected: 400`);
    console.log(`  Result: ${res.status === 400 ? '✓ PASS' : '✗ FAIL'}\n`);
  } catch (err) {
    console.log(`  Error: ${err.message}\n`);
  }

  // Test 4: Invalid entity_id
  console.log('Test 4: Invalid entity_id');
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(TEST_IMAGE_PATH), {
      filename: 'test.jpg',
      contentType: 'image/jpeg'
    });
    form.append('entity_id', 'invalid-uuid');

    const res = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/admin/media/upload',
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        'Cookie': 'astrova_session=test-token'
      }
    }, form);
    console.log(`  Status: ${res.status}`);
    console.log(`  Expected: 400`);
    console.log(`  Result: ${res.status === 400 ? '✓ PASS' : '✗ FAIL'}\n`);
  } catch (err) {
    console.log(`  Error: ${err.message}\n`);
  }

  // Test 5: Non-existent entity_id
  console.log('Test 5: Non-existent entity_id');
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(TEST_IMAGE_PATH), {
      filename: 'test.jpg',
      contentType: 'image/jpeg'
    });
    form.append('entity_id', '00000000-0000-0000-0000-000000000000');

    const res = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/admin/media/upload',
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        'Cookie': 'astrova_session=test-token'
      }
    }, form);
    console.log(`  Status: ${res.status}`);
    console.log(`  Expected: 404`);
    console.log(`  Result: ${res.status === 404 ? '✓ PASS' : '✗ FAIL'}\n`);
  } catch (err) {
    console.log(`  Error: ${err.message}\n`);
  }

  // Cleanup
  if (fs.existsSync(TEST_IMAGE_PATH)) {
    fs.unlinkSync(TEST_IMAGE_PATH);
    console.log('✓ Cleaned up test image');
  }

  console.log('\n========================================');
  console.log('Tests completed');
  console.log('========================================\n');
}

// Run tests
runTests().catch(console.error);
