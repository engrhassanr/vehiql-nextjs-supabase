const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGeminiAPI() {
  try {
    console.log("🧪 Testing Gemini API connection...");

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY is not set in environment variables");
      console.log("Please add GEMINI_API_KEY to your .env.local file");
      return;
    }

    console.log("✅ API key found");

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Test different model names
    const modelsToTest = [
      "gemini-1.5-flash",
      "gemini-1.0-pro",
      "gemini-pro",
      "gemini-1.5-pro",
    ];

    for (const modelName of modelsToTest) {
      try {
        console.log(`\n🔍 Testing model: ${modelName}`);

        const model = genAI.getGenerativeModel({ model: modelName });

        // Test with a simple text prompt first
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        const text = response.text();

        console.log(`✅ ${modelName} is working!`);
        console.log(`   Response: ${text.substring(0, 50)}...`);

        // If this model works, update the environment variable suggestion
        console.log(`\n💡 Success! Use this model name in your .env.local:`);
        console.log(`GEMINI_MODEL=${modelName}`);
        return;
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message}`);
      }
    }

    console.log("\n❌ All model names failed. Please check:");
    console.log("1. Your GEMINI_API_KEY is correct");
    console.log("2. You have access to the Gemini API");
    console.log("3. Your API key has the necessary permissions");
  } catch (error) {
    console.error("❌ Gemini API test failed:", error.message);
  }
}

// Set a test API key if provided
if (process.argv[2]) {
  process.env.GEMINI_API_KEY = process.argv[2];
  console.log("Using provided API key for testing");
}

testGeminiAPI();
