const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const mapPath = path.join(__dirname, "..", "src", "lib", "cloudinary-map.json");
const urlMap = JSON.parse(fs.readFileSync(mapPath, "utf-8"));

console.log(`Loaded ${Object.keys(urlMap).length} Cloudinary mappings.`);

// 1. Files to update
const targetFiles = [
  path.join(__dirname, "..", "src", "lib", "projects.ts"),
  path.join(__dirname, "..", "src", "components", "home", "BrandExecutionPillars.tsx"),
  path.join(__dirname, "..", "src", "components", "home", "EditorialWorkShowcase.tsx"),
  path.join(__dirname, "..", "src", "app", "services", "[slug]", "page.tsx"),
  path.join(__dirname, "..", "prisma", "seed.ts"),
];

for (const filePath of targetFiles) {
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, "utf-8");
  let replacedCount = 0;

  for (const [localPath, cldUrl] of Object.entries(urlMap)) {
    // Replace all occurrences of "localPath" or 'localPath' with the cldUrl
    if (content.includes(localPath)) {
      const regex = new RegExp(localPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
      content = content.replace(regex, cldUrl);
      replacedCount++;
    }
  }

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✓ Updated ${path.basename(filePath)} with ${replacedCount} Cloudinary URLs`);
}

// 2. Update SQLite Database CaseStudy records
async function updateDatabase() {
  const prisma = new PrismaClient();
  try {
    const caseStudies = await prisma.caseStudy.findMany();
    for (const cs of caseStudies) {
      let updatedCover = cs.coverImage;
      if (urlMap[cs.coverImage]) {
        updatedCover = urlMap[cs.coverImage];
      }

      let updatedGallery = cs.galleryImages;
      if (cs.galleryImages) {
        try {
          const parsed = JSON.parse(cs.galleryImages);
          if (Array.isArray(parsed)) {
            const mapped = parsed.map((img) => urlMap[img] || img);
            updatedGallery = JSON.stringify(mapped);
          }
        } catch {}
      }

      await prisma.caseStudy.update({
        where: { id: cs.id },
        data: {
          coverImage: updatedCover,
          galleryImages: updatedGallery,
        },
      });
      console.log(`✓ Updated DB CaseStudy: ${cs.slug} with Cloudinary CDN assets`);
    }
  } catch (err) {
    console.error("DB update error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

updateDatabase().then(() => {
  console.log("🎉 All code references and database records now point to Cloudinary CDN!");
});
