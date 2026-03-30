import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { 
  FaPlus, FaTrash, FaEdit, FaSave, FaTimes, 
  FaLink, FaGithub, FaGlobe, FaLinkedin, 
  FaEnvelope, FaPhone, FaMapMarkerAlt 
} from "react-icons/fa";

const TechSpecialist = () => {
  const resumeRef = useRef(null);
  const { resumeData, updateResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData);

  /**
   * Sync local data with global context when resumeData changes
   * This ensures the component reflects the latest data from context
   */
  useEffect(() => {
    setLocalData(resumeData);
  }, [resumeData]);

  // --- Logic Handlers ---

  /**
   * Handle changes to simple text fields
   * @param {string} field - The field name to update
   * @param {string|Array} value - The new value
   */
  const handleFieldChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Handle changes to array fields like experience, education, etc.
   * @param {string} section - The section name (e.g., 'experience')
   * @param {number} index - The index of the item in the array
   * @param {string} key - The property name within the item
   * @param {any} value - The new value
   */
  const handleArrayFieldChange = (section, index, key, value) => {
    const updated = [...(localData[section] || [])];
    updated[index] = { ...updated[index], [key]: value };
    setLocalData({ ...localData, [section]: updated });
  };

  /**
   * Add a new blank item to an array section
   * @param {string} section - The section name
   * @param {Object} blankItem - Template object for new item
   */
  const handleAddItem = (section, blankItem) => {
    setLocalData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), blankItem]
    }));
  };

  /**
   * Remove an item from an array section
   * @param {string} section - The section name
   * @param {number} idx - Index of item to remove
   */
  const handleRemoveItem = (section, idx) => {
    setLocalData(prev => ({
      ...prev,
      [section]: (prev[section] || []).filter((_, i) => i !== idx)
    }));
  };

  /**
   * Save local changes to global context and exit edit mode
   */
  const handleSave = () => {
    updateResumeData(localData);
    setEditMode(false);
  };

  /**
   * Helper function to safely open external links
   * Validates URLs and ensures they open in new tabs securely
   * @param {string} url - The URL to open
   * @param {string} type - Type of link for fallback/default behavior
   */
  const openExternalLink = (url, type = 'web') => {
    if (!url) return;
    
    let finalUrl = url;
    
    // Add protocol if missing for web URLs
    if (type === 'web' && !url.startsWith('http')) {
      finalUrl = 'https://' + url;
    }
    
    // Handle email links
    if (type === 'email') {
      finalUrl = url.includes('@') ? `mailto:${url}` : url;
    }
    
    // Handle phone links
    if (type === 'phone') {
      const cleanPhone = url.replace(/[^0-9+]/g, '');
      finalUrl = `tel:${cleanPhone}`;
    }
    
    // Open in new tab with security attributes
    window.open(finalUrl, '_blank', 'noopener noreferrer');
  };

  /**
   * Format URL for display (remove https://, trailing slashes, etc.)
   * @param {string} url - The URL to format
   * @returns {string} - Formatted URL for display
   */
  const formatUrlForDisplay = (url) => {
    if (!url) return '';
    return url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '');
  };

  const styles = {
    container: { 
      minHeight: "100vh", 
      backgroundColor: "#f8fafc", 
      display: "flex", 
      flexDirection: "column" 
    },
    page: {
      maxWidth: "800px", 
      width: "100%", 
      margin: "20px auto", 
      padding: "0.5in 0.7in",
      backgroundColor: "#ffffff", 
      color: "#000", 
      boxSizing: "border-box",
      fontFamily: "'Times New Roman', Times, serif", 
      lineHeight: "1.5", 
      fontSize: "11.5pt",
      display: "flex", 
      flexDirection: "column", 
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    sectionTitle: {
      fontWeight: "bold", 
      fontSize: "12.5pt", 
      textTransform: "uppercase", 
      borderBottom: "1.5px solid #000",
      marginTop: "14pt", 
      marginBottom: "5pt", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center"
    },
    bodyText: { 
      fontSize: "11.5pt", 
      color: "#000" 
    },
    descText: { 
      fontSize: "10.5pt", 
      color: "#333", 
      margin: "2pt 0" 
    },
    input: { 
      width: "100%", 
      padding: "5px", 
      border: "1px dashed #3b82f6", 
      borderRadius: "3px", 
      fontSize: "inherit", 
      fontFamily: "serif", 
      background: "#f0f7ff", 
      outline: "none", 
      marginBottom: "3px" 
    },
    modernBtn: { 
      display: "flex", 
      alignItems: "center", 
      gap: "8px", 
      padding: "12px 28px", 
      borderRadius: "12px", 
      border: "none", 
      fontWeight: "700", 
      cursor: "pointer" 
    },
    /**
     * Link styles - make links look like links but with professional appearance
     */
    link: {
      color: "#2563eb",
      textDecoration: "none",
      cursor: "pointer",
      borderBottom: "1px dotted #2563eb",
      transition: "all 0.2s ease"
    },
    linkHover: {
      color: "#1d4ed8",
      borderBottom: "1px solid #1d4ed8"
    },
    linkIcon: {
      marginRight: "4px",
      verticalAlign: "middle"
    },
    linkContainer: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      flexWrap: "wrap" 
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={{ display: "flex", flexGrow: 1 }}>
        <Sidebar onEnhance={() => { }} resumeRef={resumeRef} />
        <div style={{ 
          flexGrow: 1, 
          padding: "2rem 1rem", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center" 
        }}>
          
          <div ref={resumeRef} className="resume-page" style={styles.page}>
            {/* ========== HEADER SECTION ========== */}
            <header style={{ textAlign: "center", marginBottom: "10pt" }}>
              {/* Name */}
              <div style={{ fontSize: "24pt", fontWeight: "bold", textTransform: "uppercase" }}>
                {editMode ? (
                  <input 
                    style={{...styles.input, textAlign: 'center'}} 
                    value={localData.name || ''} 
                    onChange={e => handleFieldChange("name", e.target.value)} 
                    placeholder="YOUR NAME"
                  />
                ) : (
                  resumeData.name || "YOUR NAME"
                )}
              </div>

              {/* Contact Information with Dynamic Links */}
              <div style={{ fontSize: "10.5pt", marginTop: "4pt" }}>
                {editMode ? (
                  /* ===== EDIT MODE: Contact form fields ===== */
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
                    <input 
                      style={styles.input} 
                      value={localData.email || ''} 
                      onChange={e => handleFieldChange("email", e.target.value)} 
                      placeholder="Email" 
                    />
                    <input 
                      style={styles.input} 
                      value={localData.phone || ''} 
                      onChange={e => handleFieldChange("phone", e.target.value)} 
                      placeholder="Phone" 
                    />
                    <input 
                      style={styles.input} 
                      value={localData.location || ''} 
                      onChange={e => handleFieldChange("location", e.target.value)} 
                      placeholder="Location" 
                    />
                    <input 
                      style={styles.input} 
                      value={localData.linkedin || ''} 
                      onChange={e => handleFieldChange("linkedin", e.target.value)} 
                      placeholder="LinkedIn URL" 
                    />
                    <input 
                      style={styles.input} 
                      value={localData.github || ''} 
                      onChange={e => handleFieldChange("github", e.target.value)} 
                      placeholder="GitHub URL" 
                    />
                    <input 
                      style={styles.input} 
                      value={localData.portfolio || ''} 
                      onChange={e => handleFieldChange("portfolio", e.target.value)} 
                      placeholder="Portfolio URL" 
                    />
                  </div>
                ) : (
                  /* ===== VIEW MODE: Contact information with clickable links ===== */
                  <>
                    {/* Email with mailto link */}
                    <span style={styles.linkContainer}>
                      <FaEnvelope size={10} style={styles.linkIcon} />
                      {resumeData.email ? (
                        <span 
                          style={styles.link}
                          onClick={() => openExternalLink(resumeData.email, 'email')}
                          onMouseEnter={e => e.currentTarget.style.color = styles.linkHover.color}
                          onMouseLeave={e => e.currentTarget.style.color = styles.link.color}
                          title={`Send email to ${resumeData.email}`}
                        >
                          {resumeData.email}
                        </span>
                      ) : resumeData.email}
                    </span>

                    {/* Phone with tel link */}
                    {resumeData.phone && (
                      <>
                        <span> | </span>
                        <span style={styles.linkContainer}>
                          <FaPhone size={9} style={styles.linkIcon} />
                          <span 
                            style={styles.link}
                            onClick={() => openExternalLink(resumeData.phone, 'phone')}
                            onMouseEnter={e => e.currentTarget.style.color = styles.linkHover.color}
                            onMouseLeave={e => e.currentTarget.style.color = styles.link.color}
                            title={`Call ${resumeData.phone}`}
                          >
                            {resumeData.phone}
                          </span>
                        </span>
                      </>
                    )}

                    {/* Location */}
                    {resumeData.location && (
                      <>
                        <span> | </span>
                        <span style={styles.linkContainer}>
                          <FaMapMarkerAlt size={9} style={styles.linkIcon} />
                          {resumeData.location}
                        </span>
                      </>
                    )}
                  </>
                )}
                
                {/* ===== SOCIAL LINKS SECTION (View Mode Only) ===== */}
                {!editMode && (resumeData.linkedin || resumeData.github || resumeData.portfolio) && (
                  <>
                    <br />
                    <div style={{ marginTop: "4px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                      {/* LinkedIn Link */}
                      {resumeData.linkedin && (
                        <span 
                          style={styles.linkContainer}
                          onClick={() => openExternalLink(resumeData.linkedin)}
                          onMouseEnter={e => e.currentTarget.style.color = styles.linkHover.color}
                          onMouseLeave={e => e.currentTarget.style.color = styles.link.color}
                          title="Visit LinkedIn profile"
                        >
                          <FaLinkedin size={12} style={styles.linkIcon} />
                          <span style={styles.link}>
                            {formatUrlForDisplay(resumeData.linkedin)}
                          </span>
                        </span>
                      )}

                      {/* GitHub Link */}
                      {resumeData.github && (
                        <span 
                          style={styles.linkContainer}
                          onClick={() => openExternalLink(resumeData.github)}
                          onMouseEnter={e => e.currentTarget.style.color = styles.linkHover.color}
                          onMouseLeave={e => e.currentTarget.style.color = styles.link.color}
                          title="Visit GitHub profile"
                        >
                          <FaGithub size={12} style={styles.linkIcon} />
                          <span style={styles.link}>
                            {formatUrlForDisplay(resumeData.github)}
                          </span>
                        </span>
                      )}

                      {/* Portfolio Link */}
                      {resumeData.portfolio && (
                        <span 
                          style={styles.linkContainer}
                          onClick={() => openExternalLink(resumeData.portfolio)}
                          onMouseEnter={e => e.currentTarget.style.color = styles.linkHover.color}
                          onMouseLeave={e => e.currentTarget.style.color = styles.link.color}
                          title="Visit portfolio website"
                        >
                          <FaGlobe size={12} style={styles.linkIcon} />
                          <span style={styles.link}>
                            {formatUrlForDisplay(resumeData.portfolio)}
                          </span>
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </header>

            {/* ========== PROFESSIONAL SUMMARY SECTION ========== */}
            <div style={styles.sectionTitle}>Professional Summary</div>
            {editMode ? (
              <textarea 
                style={{...styles.input, minHeight: '70px'}} 
                value={localData.summary || ''} 
                onChange={e => handleFieldChange("summary", e.target.value)} 
                placeholder="Write your professional summary here..."
              />
            ) : (
              <p style={{ margin: 0, textAlign: 'justify', fontSize: '11pt' }}>
                {resumeData.summary}
              </p>
            )}

            {/* ========== EXPERIENCE SECTION ========== */}
            <div style={styles.sectionTitle}>
              Experience
              {editMode && (
                <button 
                  onClick={() => handleAddItem("experience", { 
                    companyName: "", 
                    title: "", 
                    date: "", 
                    companyLocation: "", 
                    accomplishment: [""] 
                  })} 
                  style={{fontSize: '9px'}}
                >
                  + Add Job
                </button>
              )}
            </div>
            
            {(localData.experience || []).map((exp, i) => (
              <div key={i} style={{ marginBottom: "10pt" }}>
                {editMode ? (
                  /* Edit mode form for experience */
                  <div style={{display: 'grid', gap: '3px', border: '1px solid #ddd', padding: '8px', marginBottom: '8px'}}>
                    <input 
                      style={styles.input} 
                      value={exp.companyName || ''} 
                      onChange={e => handleArrayFieldChange("experience", i, "companyName", e.target.value)} 
                      placeholder="Company" 
                    />
                    <input 
                      style={styles.input} 
                      value={exp.title || ''} 
                      onChange={e => handleArrayFieldChange("experience", i, "title", e.target.value)} 
                      placeholder="Job Title" 
                    />
                    <input 
                      style={styles.input} 
                      value={exp.date || ''} 
                      onChange={e => handleArrayFieldChange("experience", i, "date", e.target.value)} 
                      placeholder="Dates (e.g., Jan 2020 - Present)" 
                    />
                    <input 
                      style={styles.input} 
                      value={exp.companyLocation || ''} 
                      onChange={e => handleArrayFieldChange("experience", i, "companyLocation", e.target.value)} 
                      placeholder="Location" 
                    />
                    <button onClick={() => handleRemoveItem("experience", i)} style={{color:'red', fontSize:'10px'}}>
                      Remove Job
                    </button>
                  </div>
                ) : (
                  /* View mode for experience */
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                      <span>{exp.companyName}</span>
                      <span>{exp.date}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontStyle: "italic", fontSize: '11pt' }}>
                      <span>{exp.title}</span>
                      <span>{exp.companyLocation}</span>
                    </div>
                  </>
                )}
                
                {/* Experience Bullet Points */}
                <ul style={{ margin: "3pt 0", paddingLeft: "1.5rem", fontSize: '10.5pt' }}>
                  {(exp.accomplishment || []).map((bullet, j) => (
                    <li key={j}>
                      {editMode ? (
                        <input 
                          style={styles.input} 
                          value={bullet} 
                          onChange={e => {
                            const newB = [...exp.accomplishment]; 
                            newB[j] = e.target.value;
                            handleArrayFieldChange("experience", i, "accomplishment", newB);
                          }} 
                        />
                      ) : bullet}
                    </li>
                  ))}
                  {editMode && (
                    <button 
                      onClick={() => { 
                        const newB = [...(exp.accomplishment || []), ""]; 
                        handleArrayFieldChange("experience", i, "accomplishment", newB); 
                      }} 
                      style={{fontSize: '9px'}}
                    >
                      + Add Bullet Point
                    </button>
                  )}
                </ul>
              </div>
            ))}

            {/* ========== PROJECTS SECTION ========== */}
            <div style={styles.sectionTitle}>
              Projects
              {editMode && (
                <button 
                  onClick={() => handleAddItem("projects", { 
                    title: "", 
                    technologies: "", 
                    description: "", 
                    duration: "", 
                    link: "", 
                    githubLink: "" 
                  })} 
                  style={{fontSize: '9px'}}
                >
                  + Add Project
                </button>
              )}
            </div>
            
            {(localData.projects || []).map((proj, i) => (
              <div key={i} style={{ marginBottom: "8pt" }}>
                {editMode ? (
                  /* Edit mode form for projects */
                  <div style={{display:'grid', gap: '3px', border: '1px solid #eee', padding: '8px'}}>
                    <input 
                      style={styles.input} 
                      value={proj.title || ''} 
                      onChange={e => handleArrayFieldChange("projects", i, "title", e.target.value)} 
                      placeholder="Project Name" 
                    />
                    <input 
                      style={styles.input} 
                      value={proj.duration || ''} 
                      onChange={e => handleArrayFieldChange("projects", i, "duration", e.target.value)} 
                      placeholder="Year/Duration" 
                    />
                    <input 
                      style={styles.input} 
                      value={proj.technologies || ''} 
                      onChange={e => handleArrayFieldChange("projects", i, "technologies", e.target.value)} 
                      placeholder="Technologies used" 
                    />
                    <input 
                      style={styles.input} 
                      value={proj.link || ''} 
                      onChange={e => handleArrayFieldChange("projects", i, "link", e.target.value)} 
                      placeholder="Demo URL" 
                    />
                    <input 
                      style={styles.input} 
                      value={proj.githubLink || ''} 
                      onChange={e => handleArrayFieldChange("projects", i, "githubLink", e.target.value)} 
                      placeholder="GitHub URL" 
                    />
                    <textarea 
                      style={styles.input} 
                      value={proj.description || ''} 
                      onChange={e => handleArrayFieldChange("projects", i, "description", e.target.value)} 
                      placeholder="Project description..."
                    />
                    <button onClick={() => handleRemoveItem("projects", i)} style={{color:'red', fontSize:'10px'}}>
                      Remove Project
                    </button>
                  </div>
                ) : (
                  /* View mode for projects with clickable links */
                  <>
                    <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{proj.title} | {Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies}</span>
                      <span>{proj.duration}</span>
                    </div>
                    <p style={styles.descText}>{proj.description}</p>
                    
                    {/* Project Links - Dynamically rendered */}
                    <div style={{fontSize: '9.5pt', display: 'flex', gap: '15px', color: '#444', flexWrap: 'wrap'}}>
                      {/* Demo Link */}
                      {proj.link && (
                        <span 
                          style={styles.linkContainer}
                          onClick={() => openExternalLink(proj.link)}
                          onMouseEnter={e => e.currentTarget.style.color = styles.linkHover.color}
                          onMouseLeave={e => e.currentTarget.style.color = styles.link.color}
                          title="View live demo"
                        >
                          <FaLink size={9} style={styles.linkIcon} />
                          <span style={styles.link}>
                            {formatUrlForDisplay(proj.link)}
                          </span>
                        </span>
                      )}
                      
                      {/* GitHub Link */}
                      {proj.githubLink && (
                        <span 
                          style={styles.linkContainer}
                          onClick={() => openExternalLink(proj.githubLink)}
                          onMouseEnter={e => e.currentTarget.style.color = styles.linkHover.color}
                          onMouseLeave={e => e.currentTarget.style.color = styles.link.color}
                          title="View source code"
                        >
                          <FaGithub size={9} style={styles.linkIcon} />
                          <span style={styles.link}>
                            {formatUrlForDisplay(proj.githubLink)}
                          </span>
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* ========== SKILLS & LANGUAGES SECTION ========== */}
            <div style={styles.sectionTitle}>Skills & Languages</div>
            <div style={styles.bodyText}>
              {/* Technical Skills */}
              {editMode ? (
                <input 
                  style={styles.input} 
                  value={Array.isArray(localData.skills) ? localData.skills.join(", ") : localData.skills || ''} 
                  onChange={e => handleFieldChange("skills", e.target.value.split(",").map(s => s.trim()))} 
                  placeholder="React, Python, etc. (comma separated)" 
                />
              ) : (
                <div>
                  <strong>Technical Skills:</strong> {Array.isArray(resumeData.skills) ? resumeData.skills.join(", ") : resumeData.skills}
                </div>
              )}
              
              {/* Languages */}
              <div style={{marginTop: '5pt'}}>
                <strong>Languages:</strong> 
                {editMode && (
                  <button 
                    onClick={() => handleAddItem("languagesDetailed", { language: "", proficiency: "" })} 
                    style={{fontSize: '9px', marginLeft: '5px'}}
                  >
                    +
                  </button>
                )}
                
                <div style={{display: 'inline-flex', gap: '10px', marginLeft: '5px', flexWrap: 'wrap'}}>
                  {(localData.languagesDetailed || []).map((lang, i) => (
                    <span key={i} style={styles.linkContainer}>
                      {editMode ? (
                        <span style={{display: 'flex', gap: '2px', alignItems: 'center'}}>
                          <input 
                            style={{...styles.input, width: '70px'}} 
                            value={lang.language || ''} 
                            onChange={e => handleArrayFieldChange("languagesDetailed", i, "language", e.target.value)} 
                            placeholder="Language"
                          />
                          <input 
                            style={{...styles.input, width: '50px'}} 
                            value={lang.proficiency || ''} 
                            onChange={e => handleArrayFieldChange("languagesDetailed", i, "proficiency", e.target.value)} 
                            placeholder="Level"
                          />
                          <FaTrash 
                            size={9} 
                            color="red" 
                            onClick={() => handleRemoveItem("languagesDetailed", i)} 
                            style={{cursor: 'pointer'}} 
                          />
                        </span>
                      ) : (
                        `${lang.language} (${lang.proficiency})`
                      )}
                      {i < (localData.languagesDetailed?.length - 1) && !editMode ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ========== EDUCATION SECTION ========== */}
            <div style={styles.sectionTitle}>
              Education
              {editMode && (
                <button 
                  onClick={() => handleAddItem("education", { 
                    institution: "", 
                    degree: "", 
                    duration: "", 
                    grade: "" 
                  })} 
                  style={{fontSize: '9px'}}
                >
                  + Add
                </button>
              )}
            </div>
            
            {(localData.education || []).map((edu, i) => (
              <div key={i} style={{ marginBottom: "5pt" }}>
                {editMode ? (
                  /* Edit mode form for education */
                  <div style={{display: 'grid', gap: '3px', border: '1px solid #eee', padding: '8px'}}>
                    <input 
                      style={styles.input} 
                      value={edu.institution || ''} 
                      onChange={e => handleArrayFieldChange("education", i, "institution", e.target.value)} 
                      placeholder="Institution" 
                    />
                    <input 
                      style={styles.input} 
                      value={edu.degree || ''} 
                      onChange={e => handleArrayFieldChange("education", i, "degree", e.target.value)} 
                      placeholder="Degree" 
                    />
                    <input 
                      style={styles.input} 
                      value={edu.duration || ''} 
                      onChange={e => handleArrayFieldChange("education", i, "duration", e.target.value)} 
                      placeholder="Duration" 
                    />
                    <input 
                      style={styles.input} 
                      value={edu.grade || ''} 
                      onChange={e => handleArrayFieldChange("education", i, "grade", e.target.value)} 
                      placeholder="Grade/GPA" 
                    />
                    <button onClick={() => handleRemoveItem("education", i)} style={{color:'red', fontSize:'10px'}}>
                      Remove
                    </button>
                  </div>
                ) : (
                  /* View mode for education */
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                      <span>{edu.institution}</span>
                      <span>{edu.duration}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: '11pt' }}>
                      <span>{edu.degree}</span>
                      <span>{edu.grade && `GPA: ${edu.grade}`}</span>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* ========== CERTIFICATIONS SECTION ========== */}
            <div style={styles.sectionTitle}>
              Certifications
              {editMode && (
                <button 
                  onClick={() => handleAddItem("certifications", { 
                    title: "", 
                    issuer: "", 
                    date: "" 
                  })} 
                  style={{fontSize: '9px'}}
                >
                  + Add
                </button>
              )}
            </div>
            
            {(localData.certifications || []).map((cert, i) => (
              <div key={i} style={{ marginBottom: "4pt" }}>
                {editMode ? (
                  /* Edit mode form for certifications */
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '5px', alignItems: 'center'}}>
                    <input 
                      style={styles.input} 
                      value={cert.title || ''} 
                      onChange={e => handleArrayFieldChange("certifications", i, "title", e.target.value)} 
                      placeholder="Title" 
                    />
                    <input 
                      style={styles.input} 
                      value={cert.issuer || ''} 
                      onChange={e => handleArrayFieldChange("certifications", i, "issuer", e.target.value)} 
                      placeholder="Issuer" 
                    />
                    <input 
                      style={styles.input} 
                      value={cert.date || ''} 
                      onChange={e => handleArrayFieldChange("certifications", i, "date", e.target.value)} 
                      placeholder="Year" 
                    />
                    <FaTrash 
                      size={12} 
                      color="red" 
                      onClick={() => handleRemoveItem("certifications", i)} 
                      style={{cursor: 'pointer', alignSelf: 'center'}} 
                    />
                  </div>
                ) : (
                  /* View mode for certifications */
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: '11pt' }}>
                    <span>
                      <strong>{cert.title}</strong>
                      {cert.issuer && `, ${cert.issuer}`}
                    </span>
                    <span>{cert.date}</span>
                  </div>
                )}
              </div>
            ))}

            {/* ========== ACHIEVEMENTS SECTION ========== */}
            <div style={styles.sectionTitle}>
              Achievements
              {editMode && (
                <button 
                  onClick={() => handleAddItem("achievements", { 
                    title: "", 
                    year: "", 
                    description: "" 
                  })} 
                  style={{fontSize: '9px'}}
                >
                  + Add
                </button>
              )}
            </div>
            
            {(localData.achievements || []).map((ach, i) => (
              <div key={i} style={{ marginBottom: "8pt" }}>
                {editMode ? (
                  /* Edit mode form for achievements */
                  <div style={{display: 'grid', gap: '3px', border: '1px solid #eee', padding: '8px'}}>
                    <input 
                      style={styles.input} 
                      value={ach.title || ''} 
                      onChange={e => handleArrayFieldChange("achievements", i, "title", e.target.value)} 
                      placeholder="Achievement Title" 
                    />
                    <input 
                      style={styles.input} 
                      value={ach.year || ''} 
                      onChange={e => handleArrayFieldChange("achievements", i, "year", e.target.value)} 
                      placeholder="Year" 
                    />
                    <textarea 
                      style={styles.input} 
                      value={ach.description || ''} 
                      onChange={e => handleArrayFieldChange("achievements", i, "description", e.target.value)} 
                      placeholder="Description of achievement..." 
                    />
                    <button onClick={() => handleRemoveItem("achievements", i)} style={{color:'red', fontSize:'10px'}}>
                      Remove
                    </button>
                  </div>
                ) : (
                  /* View mode for achievements */
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: '11pt' }}>
                      <span>{ach.title}</span>
                      <span>{ach.year}</span>
                    </div>
                    <p style={styles.descText}>{ach.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* ========== EDIT/SAVE BUTTONS ========== */}
          <div style={{ marginTop: "2rem", display: "flex", gap: "1.5rem" }}>
            {!editMode ? (
              <button 
                onClick={() => setEditMode(true)} 
                style={{...styles.modernBtn, background: "#1e293b", color: "#fff"}}
                title="Edit resume content"
              >
                <FaEdit /> Quick Edit Specialist
              </button>
            ) : (
              <>
                <button 
                  onClick={handleSave} 
                  style={{...styles.modernBtn, background: "#10b981", color: "#fff"}}
                  title="Save all changes"
                >
                  <FaSave /> Save Changes
                </button>
                <button 
                  onClick={() => setEditMode(false)} 
                  style={{...styles.modernBtn, background: "#fff", color: "#ef4444", border: "2px solid #ef4444"}}
                  title="Discard all changes"
                >
                  <FaTimes /> Discard
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSpecialist;