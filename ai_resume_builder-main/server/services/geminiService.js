const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Get enhanced text using Google Gemini AI
 * @param {string} prompt - The prompt to send to Gemini
 * @returns {Promise<string>} - The enhanced text response
 */
const getEnhancedText = async (prompt) => {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY not found in environment variables");
      throw new Error("Gemini API key not configured");
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("❌ Error in getEnhancedText:", error.message);
    
    // Return a fallback message if API fails
    if (error.message.includes("API key")) {
      throw new Error("Gemini API key not configured. Please set GEMINI_API_KEY in your .env file");
    }
    
    throw new Error(`Failed to enhance text: ${error.message}`);
  }
};

/**
 * Constructs the prompt for resume enhancement and cleans the output
 * @param {string} section - The resume section (e.g., 'summary', 'experience')
 * @param {string} content - The user's current text
 * @param {string} tone - The desired enhancement tone
 * @returns {Promise<string>} - The cleaned, enhanced text
 */
const enhanceSectionContent = async (section, content, tone) => {
  const prompt = `
    You are an expert resume writer and career coach. 
    Please improve the following resume section: "${section}".
    The desired tone/style is: "${tone}".
    
    Here is the user's current content:
    """
    ${content}
    """
    
    Instructions:
    - Fix any grammatical errors.
    - Make the language more professional and impactful.
    - If the tone is "ATS Optimized", naturally include strong action verbs and industry keywords.
    - Return ONLY the improved text. Do not include any conversational filler, introductory phrases, or markdown formatting (like **).
    - If the input looks like a JSON array, return a valid JSON array string with the improved items.
  `;

  try {
    // Call your existing function to talk to Gemini
    let enhancedText = await getEnhancedText(prompt);
    // Clean up potential markdown formatting (Gemini sometimes adds ```json at the start)
    return enhancedText.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '').trim();
  } catch (error) {
    console.error("❌ Error in enhanceSectionContent:", error.message);
    throw error;
  }
};


module.exports = {
  getEnhancedText,
  enhanceSectionContent, 
};
