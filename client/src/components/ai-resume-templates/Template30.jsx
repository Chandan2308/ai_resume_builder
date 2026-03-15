import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGithub, 
  FaLinkedin, FaPlus, FaTrash, FaEdit, 
  FaSave, FaTimes, FaLink, FaGraduationCap, FaCertificate, FaAward, FaGlobe 
} from "react-icons/fa";

const Template30 = () => {
  const resumeRef = useRef(null);
  const { resumeData, updateResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData);

  useEffect(() => {
    setLocalData(resumeData);
  }, [resumeData]);

  // --- Logic Handlers ---
  const handleFieldChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (section, index, key, value) => {
    const updated = [...(localData[section] || [])];
    if (updated[index]) {
      updated[index] = { ...updated[index], [key]: value };
      setLocalData({ ...localData, [section]: updated });
    }
  };

  const handleAddItem = (section, blankItem) => {
    setLocalData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), blankItem]
    }));
  };

  const handleRemoveItem = (section, idx) => {
    setLocalData(prev => ({
      ...prev,
      [section]: (prev[section] || []).filter((_, i) => i !== idx)
    }));
  };

  const handleSave = () => {
    updateResumeData(localData);
    setEditMode(false);
  };

  // --- Styling ---
  const theme = {
    primary: "#0f172a", // Charcoal
    accent: "#059669",  // Emerald Green
    secondary: "#f1f5f9", // Light Slate
    border: "#cbd5e1",
    text: "#334155"
  };

  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#e2e8f0", display: "flex", flexDirection: "column" },
    page: {
      maxWidth: "850px", width: "100%", minHeight: "1123px", margin: "20px auto",
      backgroundColor: "#fff", padding: "40px", boxSizing: "border-box",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", display: "flex", flexDirection: "column",
      border: `12px solid ${theme.primary}`, position: "relative", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    },
    headerBox: {
      backgroundColor: theme.primary, color: "#fff", padding: "30px",
      marginTop: "-40px", marginLeft: "-40px", marginRight: "-40px",
      display: "flex", justifyContent: "space-between", alignItems: "center"
    },
    sectionHeading: {
      fontSize: "1.1rem", fontWeight: "800", color: theme.primary,
      borderLeft: `5px solid ${theme.accent}`, paddingLeft: "12px",
      marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center",
      textTransform: "uppercase", letterSpacing: "1px"
    },
    grid: { display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "30px", marginTop: "20px" },
    input: { 
      width: "100%", padding: "8px", borderRadius: "4px", border: `1px solid ${theme.border}`, 
      fontSize: "0.85rem", outline: "none", boxSizing: "border-box" 
    },
    textArea: {
      width: "100%", padding: "8px", borderRadius: "4px", border: `1px solid ${theme.border}`, 
      fontSize: "0.85rem", minHeight: "80px", fontFamily: "inherit"
    },
    actionBtn: { 
      padding: "12px 25px", borderRadius: "50px", color: "#fff", 
      border: "none", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px"
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={{ display: "flex", flexGrow: 1 }}>
        <Sidebar templateKey="template30" onEnhance={() => { }} resumeRef={resumeRef} />
        <div style={{ flexGrow: 1, padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <div ref={resumeRef} className="resume-page" style={styles.page}>
            
            {/* 1. HEADER SECTION */}
            <header style={styles.headerBox}>
              <div style={{ flex: 2 }}>
                {editMode ? (
                  <input 
                    style={{ ...styles.input, fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px" }} 
                    value={localData.name} 
                    onChange={e => handleFieldChange("name", e.target.value)} 
                    placeholder="Full Name"
                  />
                ) : (
                  <h1 style={{ margin: 0, fontSize: "2.4rem", fontWeight: "900", letterSpacing: "1px" }}>{resumeData.name || "YOUR NAME"}</h1>
                )}
                <div style={{ color: theme.accent, fontSize: "1.2rem", fontWeight: "600" }}>
                  {editMode ? (
                    <input style={styles.input} value={localData.role} onChange={e => handleFieldChange("role", e.target.value)} placeholder="Target Role" />
                  ) : resumeData.role}
                </div>
              </div>

              <div style={{ flex: 1.2, textAlign: "right", fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "4px" }}>
                {editMode ? (
                  <div style={{ display: "grid", gap: "5px" }}>
                    <input style={styles.input} value={localData.email} onChange={e => handleFieldChange("email", e.target.value)} placeholder="Email" />
                    <input style={styles.input} value={localData.phone} onChange={e => handleFieldChange("phone", e.target.value)} placeholder="Phone" />
                    <input style={styles.input} value={localData.location} onChange={e => handleFieldChange("location", e.target.value)} placeholder="Location" />
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}><FaEnvelope color={theme.accent}/> {resumeData.email}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}><FaPhoneAlt color={theme.accent}/> {resumeData.phone}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}><FaMapMarkerAlt color={theme.accent}/> {resumeData.location}</div>
                  </>
                )}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
                  {editMode ? (
                    <>
                      <input style={styles.input} value={localData.linkedin} onChange={e => handleFieldChange("linkedin", e.target.value)} placeholder="LinkedIn URL" />
                      <input style={styles.input} value={localData.github} onChange={e => handleFieldChange("github", e.target.value)} placeholder="GitHub URL" />
                    </>
                  ) : (
                    <>
                      {resumeData.linkedin && <a href={resumeData.linkedin} target="_blank" rel="noreferrer" style={{color: theme.accent}}><FaLinkedin size={18}/></a>}
                      {resumeData.github && <a href={resumeData.github} target="_blank" rel="noreferrer" style={{color: theme.accent}}><FaGithub size={18}/></a>}
                      {resumeData.portfolio && <a href={resumeData.portfolio} target="_blank" rel="noreferrer" style={{color: theme.accent}}><FaGlobe size={18}/></a>}
                    </>
                  )}
                </div>
              </div>
            </header>

            {/* 2. SUMMARY SECTION */}
            <section style={{ marginTop: "30px" }}>
              <div style={styles.sectionHeading}>Snapshot Summary</div>
              {editMode ? (
                <textarea style={styles.textArea} value={localData.summary} onChange={e => handleFieldChange("summary", e.target.value)} />
              ) : (
                <p style={{ margin: 0, fontSize: "0.95rem", color: theme.text, lineHeight: "1.6", textAlign: "justify" }}>{resumeData.summary}</p>
              )}
            </section>

            {/* 3. MAIN CONTENT GRID */}
            <div style={styles.grid}>
              {/* LEFT COLUMN */}
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                
                {/* EXPERIENCE */}
                <section>
                  <div style={styles.sectionHeading}>
                    Professional Journey
                    {editMode && <FaPlus onClick={() => handleAddItem("experience", { companyName: "", title: "", companyLocation: "", date: "", accomplishment: [] })} style={{cursor:'pointer', color: theme.accent}}/>}
                  </div>
                  {(localData.experience || []).map((exp, i) => (
                    <div key={i} style={{ marginBottom: "20px", position: "relative", padding: editMode ? "10px" : "0", border: editMode ? `1px dashed ${theme.border}` : "none" }}>
                      {editMode ? (
                        <div style={{ display: "grid", gap: "5px" }}>
                          <input style={styles.input} value={exp.title} onChange={e => handleArrayFieldChange("experience", i, "title", e.target.value)} placeholder="Job Title" />
                          <input style={styles.input} value={exp.companyName} onChange={e => handleArrayFieldChange("experience", i, "companyName", e.target.value)} placeholder="Company" />
                          <input style={styles.input} value={exp.date} onChange={e => handleArrayFieldChange("experience", i, "date", e.target.value)} placeholder="Dates" />
                          <textarea style={styles.textArea} value={Array.isArray(exp.accomplishment) ? exp.accomplishment.join('\n') : exp.accomplishment} onChange={e => handleArrayFieldChange("experience", i, "accomplishment", e.target.value.split('\n'))} placeholder="Bullet points (one per line)" />
                          <FaTrash onClick={() => handleRemoveItem("experience", i)} style={{color:'red', cursor:'pointer'}}/>
                        </div>
                      ) : (
                        <>
                          <div style={{ fontWeight: "800", color: theme.primary, fontSize: "1rem" }}>{exp.title}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: theme.accent, fontWeight: "600" }}>
                            <span>{exp.companyName}</span>
                            <span>{exp.date}</span>
                          </div>
                          <ul style={{ fontSize: "0.85rem", color: theme.text, marginTop: "8px", paddingLeft: "15px" }}>
                            {(exp.accomplishment || []).map((point, idx) => <li key={idx} style={{ marginBottom: "3px" }}>{point}</li>)}
                          </ul>
                        </>
                      )}
                    </div>
                  ))}
                </section>

                {/* PROJECTS */}
                <section>
                  <div style={styles.sectionHeading}>
                    Signature Projects
                    {editMode && <FaPlus onClick={() => handleAddItem("projects", { title: "", technologies: [], description: "", link: "", githubLink: "", duration: "" })} style={{cursor:'pointer', color: theme.accent}}/>}
                  </div>
                  {(localData.projects || []).map((proj, i) => (
                    <div key={i} style={{ marginBottom: "15px", padding: "15px", backgroundColor: theme.secondary, borderRadius: "8px", position: "relative" }}>
                      {editMode ? (
                       <div style={{ display: "grid", gap: "5px" }}>
                         <input style={styles.input} value={proj.title} onChange={e => handleArrayFieldChange("projects", i, "title", e.target.value)} placeholder="Project Title" />
                          {/* UPDATED: Changed from two inputs to one 'duration' input to match your form data */}
                          <input 
                           style={styles.input} 
                           value={proj.duration} 
                           onChange={e => handleArrayFieldChange("projects", i, "duration", e.target.value)} 
                           placeholder="Duration (e.g. Jan 2024 - Present)" 
                          />
                          
                         <input style={styles.input} value={Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies} onChange={e => handleArrayFieldChange("projects", i, "technologies", e.target.value.split(", "))} placeholder="Stack (comma separated)" />
        
        {/* ADDED: GitHub Link Input */}
        <div style={{ display: "flex", gap: "10px" }}>
           <input style={styles.input} value={proj.link} onChange={e => handleArrayFieldChange("projects", i, "link", e.target.value)} placeholder="Live Demo Link" />
           <input style={styles.input} value={proj.githubLink} onChange={e => handleArrayFieldChange("projects", i, "githubLink", e.target.value)} placeholder="GitHub Code Link" />
        </div>

        <textarea style={styles.textArea} value={proj.description} onChange={e => handleArrayFieldChange("projects", i, "description", e.target.value)} placeholder="Description" />
        <FaTrash onClick={() => handleRemoveItem("projects", i)} style={{color:'red', cursor:'pointer', marginTop: '5px'}}/>
      </div>
    ) : (
      <>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", color: theme.primary }}>
          <span>{proj.title}</span>
          {/* UPDATED: Displays 'duration' which contains the combined dates from your form */}
            <span style={{ fontSize: "0.75rem", color: theme.text, fontWeight: "600" }}>{proj.duration}</span>
          </div>
          

        <div style={{ fontSize: "0.75rem", color: theme.accent, margin: "5px 0", fontWeight: "bold" }}>
          Stack: {Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies}
        </div>

        {/* UPDATED: Added GitHub Link next to Live Link */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '5px' }}>
          {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" style={{color: theme.accent, fontSize: "0.75rem", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}><FaLink size={10}/> Live Demo</a>}
          {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" style={{color: theme.primary, fontSize: "0.75rem", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}><FaGithub size={10}/> GitHub</a>}
        </div>

        <p style={{ fontSize: "0.85rem", margin: 0, color: theme.text }}>{proj.description}</p>
      </>
    )}
  </div>
))}
                </section>
              </div>

              {/* RIGHT COLUMN */}
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                
                {/* SKILLS */}
                <section>
                  <div style={styles.sectionHeading}>Core Expertise</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {(localData.skills || []).map((skill, i) => (
                      <span key={i} style={{ backgroundColor: theme.primary, color: "#fff", padding: "5px 12px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}>
                        {editMode ? (
                          <input 
                            style={{ background: "transparent", border: "none", color: "#fff", width: "70px", fontSize: "0.7rem" }} 
                            value={skill} 
                            onChange={e => {
                              const newSkills = [...localData.skills];
                              newSkills[i] = e.target.value;
                              handleFieldChange("skills", newSkills);
                            }} 
                          />
                        ) : skill}
                        {editMode && <FaTimes style={{ cursor: "pointer", fontSize: "10px" }} onClick={() => handleRemoveItem("skills", i)} />}
                      </span>
                    ))}
                    {editMode && <button onClick={() => handleAddItem("skills", "New Skill")} style={{ background: theme.accent, color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>+</button>}
                  </div>
                </section>

                {/* EDUCATION */}
                <section>
                  <div style={styles.sectionHeading}>
                    Academic
                    {editMode && <FaPlus onClick={() => handleAddItem("education", { institution: "", degree: "", duration: "", grade: "" })} style={{fontSize: "12px", cursor: "pointer"}}/>}
                  </div>
                  {(localData.education || []).map((edu, i) => (
                    <div key={i} style={{ marginBottom: "12px", fontSize: "0.85rem", borderBottom: editMode ? "1px solid #eee" : "none", paddingBottom: "5px" }}>
                      {editMode ? (
                        <div style={{ display: "grid", gap: "4px" }}>
                          <input style={styles.input} value={edu.degree} onChange={e => handleArrayFieldChange("education", i, "degree", e.target.value)} placeholder="Degree" />
                          <input style={styles.input} value={edu.institution} onChange={e => handleArrayFieldChange("education", i, "institution", e.target.value)} placeholder="Institution" />
                          <input style={styles.input} value={edu.duration} onChange={e => handleArrayFieldChange("education", i, "duration", e.target.value)} placeholder="Year" />
                          <FaTrash onClick={() => handleRemoveItem("education", i)} style={{color: "red", cursor: "pointer"}}/>
                        </div>
                      ) : (
                        <>
                          <div style={{ fontWeight: "800", color: theme.primary }}>{edu.degree}</div>
                          <div style={{ color: theme.text }}>{edu.institution}</div>
                          <div style={{ fontSize: "0.75rem", color: theme.accent, fontWeight: "bold" }}>{edu.duration} | GPA: {edu.grade}</div>
                        </>
                      )}
                    </div>
                  ))}
                </section>

                {/* LANGUAGES */}
                <section>
                  <div style={styles.sectionHeading}>Languages</div>
                  {(localData.languagesDetailed || localData.languages || []).map((lang, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "5px" }}>
                      {editMode ? (
                        <>
                          <input style={{...styles.input, width: "45%"}} value={lang.language} onChange={e => handleArrayFieldChange("languagesDetailed", i, "language", e.target.value)} />
                          <input style={{...styles.input, width: "45%"}} value={lang.proficiency} onChange={e => handleArrayFieldChange("languagesDetailed", i, "proficiency", e.target.value)} />
                        </>
                      ) : (
                        <>
                          <span style={{fontWeight: "700"}}>{lang.language}</span>
                          <span style={{color: theme.accent, fontStyle: "italic"}}>{lang.proficiency}</span>
                        </>
                      )}
                    </div>
                  ))}
                </section>
              </div>
            </div>

            {/* 4. FOOTER: CERTIFICATIONS & ACHIEVEMENTS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginTop: "auto", borderTop: `2px dashed ${theme.border}`, paddingTop: "20px" }}>
              <section>
                <div style={styles.sectionHeading}>
                  Certifications
                  {editMode && <FaPlus onClick={() => handleAddItem("certifications", { title: "", issuer: "", date: "" })} style={{fontSize:'10px', cursor:'pointer'}}/>}
                </div>
                {(localData.certifications || []).map((cert, i) => (
                  <div key={i} style={{ fontSize: "0.85rem", marginBottom: "8px" }}>
                    {editMode ? (
                      <div style={{display:'grid', gap:'4px'}}>
                        <input style={styles.input} value={cert.title} onChange={e => handleArrayFieldChange("certifications", i, "title", e.target.value)} />
                        <FaTrash onClick={() => handleRemoveItem("certifications", i)} style={{color:'red', cursor:'pointer'}}/>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><FaCertificate color={theme.accent}/> <strong>{cert.title}</strong></div>
                        <div style={{ fontSize: "0.75rem", paddingLeft: "22px" }}>{cert.issuer} • {cert.date}</div>
                      </>
                    )}
                  </div>
                ))}
              </section>

              <section>
                <div style={styles.sectionHeading}>
                  Achievements
                  {editMode && <FaPlus onClick={() => handleAddItem("achievements", { title: "", description: "", year: "" })} style={{fontSize:'10px', cursor:'pointer'}}/>}
                </div>
                {(localData.achievements || []).map((ach, i) => (
                  <div key={i} style={{ fontSize: "0.85rem", marginBottom: "10px" }}>
                    {editMode ? (
                      <div style={{display:'grid', gap:'4px'}}>
                        <input style={styles.input} value={ach.title} onChange={e => handleArrayFieldChange("achievements", i, "title", e.target.value)} />
                        <FaTrash onClick={() => handleRemoveItem("achievements", i)} style={{color:'red', cursor:'pointer'}}/>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><FaAward color={theme.accent}/> <strong>{ach.title}</strong></div>
                        <div style={{ fontSize: "0.75rem", color: theme.text, paddingLeft: "22px" }}>{ach.description} ({ach.year})</div>
                      </>
                    )}
                  </div>
                ))}
              </section>
            </div>
          </div>

          {/* PERSISTENT ACTION BAR (Inspired by Template 29 structure) */}
          <div style={{ marginTop: "2rem", display: "flex", gap: "1.5rem", position: "sticky", bottom: "20px" }}>
            {!editMode ? (
              <button onClick={() => setEditMode(true)} style={{ ...styles.actionBtn, backgroundColor: theme.primary }}>
                <FaEdit /> Edit Career Snapshot
              </button>
            ) : (
              <>
                <button onClick={handleSave} style={{ ...styles.actionBtn, backgroundColor: "#10b981" }}>
                  <FaSave /> Save Changes
                </button>
                <button onClick={() => setEditMode(false)} style={{ ...styles.actionBtn, backgroundColor: "#ef4444" }}>
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

export default Template30;