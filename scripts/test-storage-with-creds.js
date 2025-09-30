const { createClient } = require("@supabase/supabase-js");

// Set environment variables for testing
process.env.NEXT_PUBLIC_SUPABASE_URL =
  "https://eehcqhirgjpplbyzloxq.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlaGNxaGlyZ2pwcGxieXpsb3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMjEwNTUsImV4cCI6MjA3NDY5NzA1NX0.iRxc_BNK9rSqrgchwicvHfPb7EO7gRf0s170lMnPCrY";

// Test Supabase storage access
async function testStorage() {
  try {
    // Initialize Supabase client with anon key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log("Testing Supabase storage access...");
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    // Test 1: List buckets
    console.log("\n1. Testing bucket access...");
    const { data: buckets, error: bucketsError } =
      await supabase.storage.listBuckets();

    if (bucketsError) {
      console.error("Error listing buckets:", bucketsError);
      return;
    }

    console.log(
      "Available buckets:",
      buckets.map((b) => ({ id: b.id, public: b.public }))
    );

    // Check if car-images bucket exists
    const carImagesBucket = buckets.find((b) => b.id === "car-images");
    if (!carImagesBucket) {
      console.error("❌ car-images bucket not found!");
      console.log("Please create the bucket in your Supabase dashboard:");
      console.log("1. Go to Storage");
      console.log('2. Click "New bucket"');
      console.log("3. Name: car-images");
      console.log("4. Make it Public");
      console.log("5. Click 'Create bucket'");
      return;
    }

    console.log("✅ car-images bucket found:", {
      id: carImagesBucket.id,
      public: carImagesBucket.public,
    });

    // Test 2: List files in bucket (should be empty initially)
    console.log("\n2. Testing file listing...");
    const { data: files, error: filesError } = await supabase.storage
      .from("car-images")
      .list();

    if (filesError) {
      console.error("Error listing files:", filesError);
      if (filesError.message.includes("not found")) {
        console.log("This might be because the bucket doesn't exist yet.");
      }
    } else {
      console.log(
        "Files in car-images bucket:",
        files.length > 0 ? files : "No files found"
      );
    }

    // Test 3: Test public URL access
    console.log("\n3. Testing public URL construction...");
    const testPath = "test/image.jpg";
    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/car-images/${testPath}`;
    console.log("Public URL format:", publicUrl);

    // Test 4: Test upload capability (without actually uploading)
    console.log("\n4. Testing upload permissions...");
    try {
      // This will test if we can access the upload functionality
      const { data: uploadTest, error: uploadError } = await supabase.storage
        .from("car-images")
        .upload("test-upload.txt", "test content", {
          contentType: "text/plain",
        });

      if (uploadError) {
        if (uploadError.message.includes("not found")) {
          console.log("⚠️  Upload test failed - bucket doesn't exist yet");
        } else {
          console.log("⚠️  Upload test failed:", uploadError.message);
        }
      } else {
        console.log("✅ Upload test successful!");
        // Clean up test file
        await supabase.storage.from("car-images").remove(["test-upload.txt"]);
      }
    } catch (uploadTestError) {
      console.log("⚠️  Upload test error:", uploadTestError.message);
    }

    console.log("\n✅ Storage test completed!");
    console.log("\nNext steps:");
    if (!carImagesBucket) {
      console.log("1. Create the car-images bucket in Supabase dashboard");
    } else {
      console.log("1. ✅ Bucket exists");
      if (!carImagesBucket.public) {
        console.log("2. Make the bucket public in dashboard");
      } else {
        console.log("2. ✅ Bucket is public");
      }
    }
    console.log("3. Set up storage policies (use dashboard method)");
    console.log("4. Test uploading images through your app");
  } catch (error) {
    console.error("❌ Storage test failed:", error);
  }
}

testStorage();
