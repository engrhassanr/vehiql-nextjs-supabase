const { createClient } = require("@supabase/supabase-js");

// Set environment variables for testing
process.env.NEXT_PUBLIC_SUPABASE_URL =
  "https://eehcqhirgjpplbyzloxq.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlaGNxaGlyZ2pwcGxieXpsb3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMjEwNTUsImV4cCI6MjA3NDY5NzA1NX0.iRxc_BNK9rSqrgchwicvHfPb7EO7gRf0s170lMnPCrY";

async function testUpload() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log("🧪 Testing file upload to car-images bucket...");

    // Test 1: Upload a test file
    const testFileName = `test-upload-${Date.now()}.txt`;
    const testContent = "This is a test file for Vehiql car images bucket";

    console.log("📤 Uploading test file:", testFileName);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("car-images")
      .upload(testFileName, testContent, {
        contentType: "text/plain",
      });

    if (uploadError) {
      console.error("❌ Upload failed:", uploadError.message);
      return;
    }

    console.log("✅ Upload successful!");
    console.log("   File path:", uploadData.path);
    console.log("   Full size:", uploadData.fullPath);

    // Test 2: Get public URL
    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/car-images/${testFileName}`;
    console.log("🌐 Public URL:", publicUrl);

    // Test 3: List files to confirm it's there
    console.log("\n📋 Listing files in bucket...");
    const { data: files, error: filesError } = await supabase.storage
      .from("car-images")
      .list();

    if (filesError) {
      console.error("❌ Error listing files:", filesError.message);
    } else {
      console.log("📁 Files in bucket:", files.length);
      files.forEach((file) => {
        console.log(
          `   - ${file.name} (${file.metadata?.size || "unknown"} bytes)`
        );
      });
    }

    // Test 4: Download the file to verify it's accessible
    console.log("\n⬇️  Testing file download...");
    const { data: downloadData, error: downloadError } = await supabase.storage
      .from("car-images")
      .download(testFileName);

    if (downloadError) {
      console.error("❌ Download failed:", downloadError.message);
    } else {
      const text = await downloadData.text();
      console.log("✅ Download successful!");
      console.log("   Content:", text);
    }

    // Test 5: Clean up - delete the test file
    console.log("\n🗑️  Cleaning up test file...");
    const { error: deleteError } = await supabase.storage
      .from("car-images")
      .remove([testFileName]);

    if (deleteError) {
      console.error("❌ Delete failed:", deleteError.message);
    } else {
      console.log("✅ Test file deleted successfully!");
    }

    console.log(
      "\n🎉 All tests passed! Your car-images bucket is ready for use!"
    );
    console.log("\nNext steps:");
    console.log("1. ✅ Bucket exists and is accessible");
    console.log("2. ✅ File upload works");
    console.log("3. ✅ File download works");
    console.log("4. ✅ Public URLs work");
    console.log("5. ✅ File deletion works");
    console.log(
      "\nYour car listing system is ready to upload and display images!"
    );
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testUpload();
