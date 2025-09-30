const { createClient } = require("@supabase/supabase-js");

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

    console.log("\n✅ Storage test completed successfully!");
    console.log("\nNext steps:");
    console.log("1. If bucket is not public, make it public in dashboard");
    console.log("2. Set up storage policies (use dashboard method)");
    console.log("3. Test uploading images through your app");
  } catch (error) {
    console.error("❌ Storage test failed:", error);
  }
}

// Check if environment variables are set
if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  console.error("❌ Missing environment variables:");
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL:",
    !!process.env.NEXT_PUBLIC_SUPABASE_URL
  );
  console.error(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY:",
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  console.log("\nPlease make sure your .env.local file contains:");
  console.log("NEXT_PUBLIC_SUPABASE_URL=your_supabase_url");
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key");
  process.exit(1);
}

testStorage();
