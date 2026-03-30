// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react/prop-types */
// import { createContext, useContext, useState, useEffect } from "react";

// const ResumeContext = createContext();

// /**
//  * 🔹 ROLE_ORDERS Configuration
//  * These keys MUST match the keys used in your template's sectionMap.
//  */
// const ROLE_ORDERS = {
//   fresher: [
//     "summary", 
//     "education", 
//     "skills", 
//     "projects", 
//     "experience", 
//     "certifications", 
//     "languages", 
//     "achievements", 
//     "interests"
//   ],
//   experienced: [
//     "summary", 
//     "experience", 
//     "skills", 
//     "projects", 
//     "education", 
//     "certifications", 
//     "languages", 
//     "achievements", 
//     "interests"
//   ],
//   custom: [
//     "summary", 
//     "experience", 
//     "projects", 
//     "skills", 
//     "education", 
//     "certifications", 
//     "languages", 
//     "interests", 
//     "achievements"
//   ],
// };

// const defaultResumeData = {
//   name: "",
//   role: "",
//   email: "",
//   phone: "",
//   location: "",
//   linkedin: "",
//   github: "",
//   portfolio: "",
//   profileImage: "", 
//   resumeMode: "custom", // Defaulting to custom mode
//   summary: "",
//   skills: [],
//   languages: [],
//   interests: [],
//   experience: [],
//   education: [],
//   projects: [],
//   certifications: [],
//   achievements: [],
// };

// export const ResumeProvider = ({ children }) => {
//   const [resumeData, setResumeData] = useState(defaultResumeData);
  
//   /**
//    * 🔹 sectionOrder State
//    * This is the "Source of Truth" for section placement in all 30 templates.
//    */
//   const [sectionOrder, setSectionOrder] = useState(ROLE_ORDERS.custom);

//   /**
//    * 🔹 Live Synchronization Effect
//    * Triggers whenever resumeData.resumeMode is updated by the Sidebar.
//    */
//   useEffect(() => {
//     const currentMode = resumeData.resumeMode || "custom";
//     if (ROLE_ORDERS[currentMode]) {
//       setSectionOrder(ROLE_ORDERS[currentMode]);
//     }
//   }, [resumeData.resumeMode]);

//   // Load persistent data from localStorage on mount
//   useEffect(() => {
//     const savedData = localStorage.getItem('resumeData');
//     if (savedData) {
//       try {
//         const parsedData = JSON.parse(savedData);
//         setResumeData(prev => ({ ...prev, ...parsedData }));
//       } catch (error) {
//         console.error('❌ Error parsing saved resume data:', error);
//       }
//     }
//   }, []);

//   /**
//    * 🔹 updateResumeData
//    * Updates state and persists to localStorage.
//    */
//   const updateResumeData = (newData) => {
//   setResumeData(prev => {
//     const updated =
//       typeof newData === "function"
//         ? newData(prev)
//         : { ...prev, ...newData };

//     localStorage.setItem("resumeData", JSON.stringify(updated));
//     return updated;
//   });
// };


//   /**
//    * 🔹 resetResumeData
//    * Reverts to defaults and clears storage.
//    */
//   const resetResumeData = () => {
//     setResumeData(defaultResumeData);
//     setSectionOrder(ROLE_ORDERS.custom);
//     localStorage.removeItem('resumeData');
//   };

//   return (
//     <ResumeContext.Provider value={{ 
//       resumeData, 
//       updateResumeData, 
//       resetResumeData,
//       sectionOrder,    // 🔹 Exported for Template mapping
//       setSectionOrder, // 🔹 Exported for manual reordering in 'custom' mode
//       roleOrders: ROLE_ORDERS 
//     }}>
//       {children}
//     </ResumeContext.Provider>
//   );
// };

// export const useResume = () => useContext(ResumeContext);
// export { ResumeContext };

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const ResumeContext = createContext();

/**
 * 🔹 ROLE_ORDERS Configuration
 * These keys MUST match the keys used in your template's sectionMap.
 * Now includes all 7 roles from the sidebar: fresher, experienced, tech, design, management, academic, custom
 */
const ROLE_ORDERS = {
  fresher: [
    "summary", 
    "education", 
    "skills", 
    "projects", 
    "experience", 
    "certifications", 
    "languages", 
    "achievements", 
    "interests"
  ],
  experienced: [
    "summary", 
    "experience", 
    "skills", 
    "projects", 
    "education", 
    "certifications", 
    "languages", 
    "achievements", 
    "interests"
  ],
  tech: [
    "summary",
    "skills",
    "projects",
    "experience",
    "education",
    "certifications",
    "achievements",
    "languages",
    "interests"
  ],
  design: [
    "summary",
    "skills",
    "projects",
    "experience",
    "education",
    "certifications",
    "achievements",
    "languages",
    "interests"
  ],
  management: [
    "summary",
    "experience",
    "achievements",
    "skills",
    "education",
    "projects",
    "certifications",
    "languages",
    "interests"
  ],
  academic: [
    "summary",
    "education",
    "skills",
    "projects",
    "experience",
    "certifications",
    "achievements",
    "languages",
    "interests"
  ],
  custom: [
    "summary", 
    "experience", 
    "projects", 
    "skills", 
    "education", 
    "certifications", 
    "languages", 
    "interests", 
    "achievements"
  ],
};

// Export ROLE_ORDERS for use in other components
export const ROLE_SECTION_ORDER = ROLE_ORDERS;

const defaultResumeData = {
  name: "",
  role: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  portfolio: "",
  profileImage: "", 
  resumeMode: "custom", // Defaulting to custom mode
  summary: "",
  skills: [],
  languages: [],
  interests: [],
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  achievements: [],
  hiddenData: {}, // For storing hidden sections data
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  
  /**
   * 🔹 sectionOrder State
   * This is the "Source of Truth" for section placement in all 30 templates.
   */
  const [sectionOrder, setSectionOrder] = useState(ROLE_ORDERS.custom);

  /**
   * 🔹 Live Synchronization Effect
   * Triggers whenever resumeData.resumeMode is updated by the Sidebar.
   */
  useEffect(() => {
    const currentMode = resumeData.resumeMode || "custom";
    if (ROLE_ORDERS[currentMode]) {
      setSectionOrder(ROLE_ORDERS[currentMode]);
    }
  }, [resumeData.resumeMode]);

  // Load persistent data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setResumeData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('❌ Error parsing saved resume data:', error);
      }
    }
  }, []);

  /**
   * 🔹 updateResumeData
   * Updates state and persists to localStorage.
   */
  const updateResumeData = (newData) => {
    setResumeData(prev => {
      const updated =
        typeof newData === "function"
          ? newData(prev)
          : { ...prev, ...newData };

      localStorage.setItem("resumeData", JSON.stringify(updated));
      return updated;
    });
  };

  /**
   * 🔹 reorderSectionsByRole
   * Reorders sections based on selected role
   * Used by the enhanced sidebar
   */
  const reorderSectionsByRole = (role) => {
    if (role === 'custom') {
      // For custom mode, keep current order but update the mode
      updateResumeData({ ...resumeData, resumeMode: role });
    } else {
      // For all other roles, set the predefined order
      const newOrder = ROLE_ORDERS[role] || ROLE_ORDERS.fresher;
      setSectionOrder(newOrder);
      updateResumeData({ ...resumeData, resumeMode: role });
    }
  };

  /**
   * 🔹 getSectionOrder
   * Returns the current section order based on mode
   * Used by templates and hooks
   */
  const getSectionOrder = () => {
    const mode = resumeData?.resumeMode || 'custom';
    if (mode === 'custom') {
      return sectionOrder; // Return manually ordered sections
    }
    return ROLE_ORDERS[mode] || ROLE_ORDERS.fresher;
  };

  /**
   * 🔹 resetResumeData
   * Reverts to defaults and clears storage.
   */
  const resetResumeData = () => {
    setResumeData(defaultResumeData);
    setSectionOrder(ROLE_ORDERS.custom);
    localStorage.removeItem('resumeData');
  };

  return (
    <ResumeContext.Provider value={{ 
      resumeData, 
      updateResumeData, 
      resetResumeData,
      sectionOrder,           // 🔹 Exported for Template mapping
      setSectionOrder,        // 🔹 Exported for manual reordering in 'custom' mode
      reorderSectionsByRole,  // 🔹 NEW: Function for role-based reordering
      getSectionOrder,        // 🔹 NEW: Helper to get current order
      ROLE_SECTION_ORDER,     // 🔹 NEW: Export the role orders for preview
      roleOrders: ROLE_ORDERS 
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export { ResumeContext };