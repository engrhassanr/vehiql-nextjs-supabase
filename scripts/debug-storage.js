const { createClient } = require("@supabase/supabase-js");

// Set environment variables for testing
process.env.NEXT_PUBLIC_SUPABASE_URL =
  "https://eehcqhirgjpplbyzloxq.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlaGNxaGlyZ2pwcGxieXpsb3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMjEwNTUsImV4cCI6MjA3NDY5NzA1NX0.iRxc_BNK9rSqrgchwicvHfPb7EO7gRf0s170lMnPCrY";

async function debugStorage() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log("🔍 Debugging Supabase Storage...");
    console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    // Test 1: List buckets with detailed error info
    console.log("\n1. Testing bucket listing...");
    const { data: buckets, error: bucketsError } =
      await supabase.storage.listBuckets();

    if (bucketsError) {
      console.error("❌ Error listing buckets:", bucketsError);
      console.log("This might be a permissions issue with the anon key");
      return;
    }

    console.log("📦 Available buckets:", buckets.length);
    buckets.forEach((bucket) => {
      console.log(`  - ${bucket.id} (public: ${bucket.public})`);
    });

    // Test 2: Try to access car-images bucket directly
    console.log("\n2. Testing direct bucket access...");

    // Try different possible names
    const possibleNames = [
      "car-images",
      "car_images",
      "carimages",
      "carImages",
    ];

    for (const bucketName of possibleNames) {
      try {
        const { data: files, error: filesError } = await supabase.storage
          .from(bucketName)
          .list();

        if (!filesError) {
          console.log(`✅ Found bucket: ${bucketName}`);
          console.log(`   Files: ${files.length}`);
          return;
        } else {
          console.log(`❌ ${bucketName}: ${filesError.message}`);
        }
      } catch (err) {
        console.log(`❌ ${bucketName}: ${err.message}`);
      }
    }

    // Test 3: Try to create a test file (this will help identify the issue)
    console.log("\n3. Testing file upload to car-images...");
    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("car-images")
        .upload("test-file.txt", "test content", {
          contentType: "text/plain",
        });

      if (uploadError) {
        console.log("❌ Upload error:", uploadError.message);

        if (uploadError.message.includes("not found")) {
          console.log("💡 The bucket 'car-images' doesn't exist");
          console.log("   Please check:");
          console.log("   1. Bucket name is exactly 'car-images'");
          console.log("   2. Bucket is created in the correct project");
          console.log("   3. Bucket is public");
        }
      } else {
        console.log("✅ Upload successful!");
        console.log("   File path:", uploadData.path);

        // Clean up
        await supabase.storage.from("car-images").remove(["test-file.txt"]);
        console.log("   Test file cleaned up");
      }
    } catch (uploadErr) {
      console.log("❌ Upload exception:", uploadErr.message);
    }

    // Test 4: Check if we can access the bucket via public URL
    console.log("\n4. Testing public URL access...");
    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/car-images/test-image.jpg`;
    console.log("Public URL:", publicUrl);
    console.log("Try accessing this URL in your browser to test public access");
  } catch (error) {
    console.error("❌ Debug failed:", error);
  }
}

debugStorage();
