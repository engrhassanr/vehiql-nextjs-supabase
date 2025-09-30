/**
 * Cleanup old AI search images from Supabase storage
 * Removes files starting with "ai-search-" that are older than 7 days
 * Run this periodically to free up storage space
 * Usage: node scripts/cleanup-search-images.js
 */

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

async function cleanupSearchImages() {
  try {
    console.log("🧹 Starting AI search images cleanup...\n");

    // Create admin client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // List all files in car-images/cars/ folder
    const { data: files, error: listError } = await supabase.storage
      .from("car-images")
      .list("cars", {
        limit: 1000,
        sortBy: { column: "created_at", order: "asc" },
      });

    if (listError) {
      console.error("❌ Error listing files:", listError.message);
      return;
    }

    if (!files || files.length === 0) {
      console.log("✅ No files found in cars folder!");
      return;
    }

    // Filter for AI search images only (files starting with "ai-search-")
    const searchImages = files.filter((file) =>
      file.name.startsWith("ai-search-")
    );

    if (searchImages.length === 0) {
      console.log("✅ No AI search images to clean up!");
      return;
    }

    console.log(`📊 Found ${searchImages.length} AI search images\n`);

    // Delete images older than 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const filesToDelete = searchImages
      .filter((file) => {
        const fileDate = new Date(file.created_at);
        return fileDate < sevenDaysAgo;
      })
      .map((file) => `cars/${file.name}`);

    if (filesToDelete.length === 0) {
      console.log(
        "✅ No old search images to delete (keeping images < 7 days old)"
      );
      return;
    }

    console.log(`🗑️  Deleting ${filesToDelete.length} old AI search images...`);

    // Delete files
    const { data: deleteData, error: deleteError } = await supabase.storage
      .from("car-images")
      .remove(filesToDelete);

    if (deleteError) {
      console.error("❌ Error deleting files:", deleteError.message);
      return;
    }

    console.log(
      `✅ Successfully deleted ${filesToDelete.length} old AI search images!`
    );
    console.log(`💾 Freed up storage space\n`);

    // Show remaining files
    const remaining = searchImages.length - filesToDelete.length;
    console.log(`📊 Summary:`);
    console.log(`   - Deleted: ${filesToDelete.length} AI search images`);
    console.log(`   - Remaining: ${remaining} AI search images`);
    console.log(`   - Car listing images: Not affected`);
  } catch (error) {
    console.error("❌ Cleanup failed:", error.message);
  }
}

cleanupSearchImages();
