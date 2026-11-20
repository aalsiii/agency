const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const PUBLIC_DIR = path.join(__dirname, "..", "public");

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function uploadAll() {
  console.log("🚀 Starting Cloudinary upload for NextCurrent Media assets...");

  const imagesDir = path.join(PUBLIC_DIR, "images");
  const allImageFiles = getAllFiles(imagesDir);

  // Also include logo.png if present
  const logoPath = path.join(PUBLIC_DIR, "logo.png");
  if (fs.existsSync(logoPath)) {
    allImageFiles.push(logoPath);
  }

  console.log(`Found ${allImageFiles.length} images to upload.`);

  const urlMap = {};

  for (let i = 0; i < allImageFiles.length; i++) {
    const fileFullPath = allImageFiles[i];
    // Calculate relative path from public directory, e.g. /images/marketing/meta-ads-dashboard.jpg
    const relFromPublic = path.relative(PUBLIC_DIR, fileFullPath).replace(/\\/g, "/");
    const localWebPath = `/${relFromPublic}`;

    // Cloudinary public_id: agency/marketing/meta-ads-dashboard (without file extension)
    const ext = path.extname(relFromPublic);
    const idWithoutExt = relFromPublic.slice(0, -ext.length);
    const publicId = `agency/${idWithoutExt}`;

    try {
      console.log(`[${i + 1}/${allImageFiles.length}] Uploading ${localWebPath}...`);
      const result = await cloudinary.uploader.upload(fileFullPath, {
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
      });

      // Construct optimized URL using f_auto,q_auto
      // e.g. https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/agency/...
      const optimizedUrl = result.secure_url.replace(
        "/image/upload/",
        "/image/upload/f_auto,q_auto/"
      );

      urlMap[localWebPath] = optimizedUrl;
      console.log(`  ✓ Uploaded -> ${optimizedUrl}`);
    } catch (err) {
      console.error(`  ✗ Error uploading ${localWebPath}:`, err.message);
    }
  }

  // Write mapping file
  const mapPath = path.join(__dirname, "..", "src", "lib", "cloudinary-map.json");
  fs.writeFileSync(mapPath, JSON.stringify(urlMap, null, 2), "utf-8");
  console.log(`\n🎉 All done! Saved ${Object.keys(urlMap).length} mappings to src/lib/cloudinary-map.json`);
}

uploadAll().catch(console.error);
