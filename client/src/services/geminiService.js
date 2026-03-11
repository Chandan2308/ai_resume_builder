import authService from "./authService";

const API_BASE = "http://localhost:5000/api";

/**
 * Enhanced text using Gemini AI
 * @param {string} section - The section to enhance (summary, experience, projects, skills, achievements, certifications)
 * @param {string|Array} data - The content to enhance
 * @param {string} targetRole - The target role/profile mode (fresher, experienced, tech, etc.)
 * @param {string} tone - The enhancement tone (Professional, ATS Optimized, Impact-Driven, Concise, Creative)
 * @returns {Promise<string|Array|null>} - Enhanced content
 */
export const enhanceTextWithGemini = async (section, data, targetRole, tone = "Professional") => {
  try {
    // Validate input
    if (!data || (Array.isArray(data) && data.length === 0) || 
        (typeof data === "string" && data.trim() === "")) {
      console.warn(`No content to enhance for section: ${section}`);
      return null;
    }

    const payload = {
      section,
      data,
      targetRole,
      tone,
    };

    console.log("🚀 Sending request to:", `${API_BASE}/enhance`);
    console.log("📦 Payload:", payload);

    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE}/enhance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      return null;
    }

    const result = await response.json();
    console.log("📥 Response:", result);

    return result.enhancedContent;
  } catch (error) {
    console.error("❌ Enhance API error:", error);
    return null;
  }
};

/**
 * Get ATS score from AI
 * @param {Object} resumeData - The resume data to analyze
 * @returns {Promise<Object|null>} - ATS score and feedback
 */
/**
 * Get ATS score from AI
 * @param {Object} resumeData - The resume data to analyze
 * @returns {Promise<Object|null>} - ATS score and feedback
 */
export const getAtsScoreFromAI = async (resumeData) => {
  try {
    const token = localStorage.getItem('auth_token');
    
    // Convert resumeData to text format if needed
    // This depends on what your backend expects
    const resumeText = typeof resumeData === 'string' 
      ? resumeData 
      : JSON.stringify(resumeData, null, 2);
    
    const response = await fetch(`${API_BASE}/ats/analyze-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
      body: JSON.stringify({ 
        resumeText: resumeText  // CHANGED: from resumeData to resumeText
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ ATS Score API error:", error);
    return null;
  }
};

/**
 * Bulk enhance multiple sections at once
 * @param {Object} sectionsData - Object with section names as keys and content as values
 * @param {string} targetRole - The target role/profile mode
 * @param {string} tone - The enhancement tone
 * @returns {Promise<Object|null>} - Enhanced sections object
 */
export const enhanceMultipleSections = async (sectionsData, targetRole, tone = "Professional") => {
  try {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE}/enhance/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
      body: JSON.stringify({
        sections: sectionsData,
        targetRole,
        tone,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Server error:", result);
      return null;
    }

    return result.enhancedContent;
  } catch (error) {
    console.error("❌ Bulk enhance API error:", error);
    return null;
  }
};

/**
 * Get enhancement suggestions for a specific field
 * @param {string} section - Section name
 * @param {string} field - Field name within the section
 * @param {string} content - Current content
 * @param {string} targetRole - Target role
 * @param {string} tone - Enhancement tone
 * @returns {Promise<Array<string>|null>} - Array of suggestions
 */
export const getEnhancementSuggestions = async (section, field, content, targetRole, tone = "Professional") => {
  try {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE}/enhance/suggestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
      body: JSON.stringify({
        section,
        field,
        content,
        targetRole,
        tone,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Server error:", result);
      return null;
    }

    return result.suggestions;
  } catch (error) {
    console.error("❌ Suggestions API error:", error);
    return null;
  }
};

/**
 * Get available tone options
 * @returns {Promise<Array<string>|null>} - Array of tone options
 */
export const getToneOptions = async () => {
  try {
    const response = await fetch(`${API_BASE}/enhance/tones`);
    const result = await response.json();
    return result.tones;
  } catch (error) {
    console.error("❌ Get tones error:", error);
    return null;
  }
};

/**
 * Get available role options
 * @returns {Promise<Array<string>|null>} - Array of role options
 */
export const getRoleOptions = async () => {
  try {
    const response = await fetch(`${API_BASE}/enhance/roles`);
    const result = await response.json();
    return result.roles;
  } catch (error) {
    console.error("❌ Get roles error:", error);
    return null;
  }
};

/**
 * Check if AI service is healthy
 * @returns {Promise<Object|null>} - Health status
 */
export const checkAIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE}/enhance/health`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Health check error:", error);
    return null;
  }
};

// Default export for convenience
const geminiService = {
  enhanceTextWithGemini,
  enhanceMultipleSections,
  getEnhancementSuggestions,
  getToneOptions,
  getRoleOptions,
  checkAIHealth,
  getAtsScoreFromAI,
};

export default geminiService;