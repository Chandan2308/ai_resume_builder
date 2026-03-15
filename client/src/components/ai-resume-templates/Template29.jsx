import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGithub, 
  FaLinkedin, FaPlus, FaTrash, FaEdit, 
  FaSave, FaTimes, FaLink, FaGraduationCap, FaCertificate, FaAward, FaGlobe, FaCalendarAlt 
} from "react-icons/fa";

const UICrafter = () => {
  const resumeRef = useRef(null);
  const { resumeData, updateResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData);

  useEffect(() => {
    setLocalData(resumeData);
  }, [resumeData]);

  // --- Handlers ---
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

  const theme = {
    primary: "#1e293b", 
    accent: "#6366f1",  
    border: "#e2e8f0",
    text: "#475569",
    lightBg: "#f8fafc"
  };

  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column" },
    page: {
      maxWidth: "850px", width: "100%", minHeight: "1123px", margin: "20px auto",
      backgroundColor: "#fff", padding: "50px", boxSizing: "border-box",
      fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column", gap: "25px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)", position: "relative"
    },
    sectionTitle: {
      fontSize: "1rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.2px",
      color: theme.primary, display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: `2px solid ${theme.accent}`, paddingBottom: "4px", marginBottom: "12px"
    },
    input: { width: "100%", padding: "8px", borderRadius: "6px", border: `1px solid ${theme.border}`, fontSize: "0.85rem", outline: "none", marginTop: "4px" },
    addBtn: { background: "none", border: "none", color: theme.accent, cursor: "pointer", fontWeight: "bold", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px" },
    modernBtn: { display: "flex", alignItems: "center", gap: "10px", padding: "12px 24px", borderRadius: "10px", border: "none", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s" }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={{ display: "flex", flexGrow: 1 }}>
        <Sidebar templateKey="template29" onEnhance={() => { }} resumeRef={resumeRef} />
        <div style={{ flexGrow: 1, padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <div ref={resumeRef} className="resume-page" style={styles.page}>
            
            {/* 1. HEADER */}
            <header style={{ display: "flex", justifyContent: "space-between", borderBottom: `4px solid ${theme.primary}`, paddingBottom: "20px" }}>
              <div style={{ flex: 2 }}>
                {editMode ? (
                  <input style={{...styles.input, fontSize: "2rem", fontWeight: "bold", color: theme.primary}} value={localData.name} onChange={e => handleFieldChange("name", e.target.value)} placeholder="Full Name" />
                ) : (
                  <h1 style={{ margin: 0, fontSize: "2.8rem", fontWeight: "900", color: theme.primary }}>{resumeData.name || "YOUR NAME"}</h1>
                )}
                <div style={{ color: theme.accent, fontWeight: "600", fontSize: "1.2rem", marginTop: "4px" }}>
                  {editMode ? <input style={styles.input} value={localData.role} onChange={e => handleFieldChange("role", e.target.value)} placeholder="Role" /> : resumeData.role}
                </div>
              </div>

              <div style={{ flex: 1.5, textAlign: "right", fontSize: "0.85rem", color: theme.text, display: "flex", flexDirection: "column", gap: "4px" }}>
                {editMode ? (
                   <div style={{ display: "grid", gap: "6px" }}>
                     <input style={styles.input} value={localData.email} onChange={e => handleFieldChange("email", e.target.value)} placeholder="Email" />
                     <input style={styles.input} value={localData.phone} onChange={e => handleFieldChange("phone", e.target.value)} placeholder="Phone" />
                     <input style={styles.input} value={localData.location} onChange={e => handleFieldChange("location", e.target.value)} placeholder="Location" />
                     <input style={styles.input} value={localData.linkedin} onChange={e => handleFieldChange("linkedin", e.target.value)} placeholder="LinkedIn Link" />
                     <input style={styles.input} value={localData.github} onChange={e => handleFieldChange("github", e.target.value)} placeholder="GitHub Link" />
                     <input style={styles.input} value={localData.portfolio} onChange={e => handleFieldChange("portfolio", e.target.value)} placeholder="Portfolio Link" />
                   </div>
                ) : (
                  <>
                    <div>{resumeData.email} | {resumeData.phone}</div>
                    <div>{resumeData.location}</div>
                    <div style={{ color: theme.accent, fontWeight: "bold", display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "5px" }}>
                      {resumeData.linkedin && <a href={resumeData.linkedin} target="_blank" rel="noreferrer" style={{color:'inherit'}}><FaLinkedin size={14}/></a>}
                      {resumeData.github && <a href={resumeData.github} target="_blank" rel="noreferrer" style={{color:'inherit'}}><FaGithub size={14}/></a>}
                      {resumeData.portfolio && <a href={resumeData.portfolio} target="_blank" rel="noreferrer" style={{color:'inherit'}}><FaGlobe size={14}/></a>}
                    </div>
                  </>
                )}
              </div>
            </header>

            {/* 2. SUMMARY */}
            <section>
              <div style={styles.sectionTitle}>Profile</div>
              {editMode ? <textarea style={{...styles.input, height: "80px"}} value={localData.summary} onChange={e => handleFieldChange("summary", e.target.value)} /> : <p style={{ fontSize: "0.95rem", color: theme.text, lineHeight: "1.6", textAlign: "justify", margin: 0 }}>{resumeData.summary}</p>}
            </section>

            {/* 3. MAIN CONTENT GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: "35px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                
                {/* EXPERIENCE */}
                <section>
                  <div style={styles.sectionTitle}>
                    Experience
                    {editMode && <button onClick={() => handleAddItem("experience", { companyName: "", title: "", companyLocation: "", date: "", accomplishment: [] })} style={styles.addBtn}><FaPlus/> Add</button>}
                  </div>
                  {(localData.experience || []).map((exp, i) => (
                    <div key={i} style={{ marginBottom: "18px" }}>
                      {editMode ? (
                        <div style={{ display: "grid", gap: "5px", padding: "10px", border: "1px dashed #ccc", borderRadius: "8px" }}>
                          <input style={styles.input} value={exp.title} onChange={e => handleArrayFieldChange("experience", i, "title", e.target.value)} placeholder="Job Title" />
                          <input style={styles.input} value={exp.companyName} onChange={e => handleArrayFieldChange("experience", i, "companyName", e.target.value)} placeholder="Company" />
                          <input style={styles.input} value={exp.companyLocation} onChange={e => handleArrayFieldChange("experience", i, "companyLocation", e.target.value)} placeholder="Location" />
                          <input style={styles.input} value={exp.date} onChange={e => handleArrayFieldChange("experience", i, "date", e.target.value)} placeholder="Dates (e.g. 2020 - Present)" />
                          <textarea style={styles.input} value={Array.isArray(exp.accomplishment) ? exp.accomplishment.join('\n') : exp.accomplishment} onChange={e => handleArrayFieldChange("experience", i, "accomplishment", e.target.value.split('\n'))} placeholder="Accomplishments (one per line)" />
                          <button onClick={() => handleRemoveItem("experience", i)} style={{color: "red", background: "none", border: "none", cursor: "pointer"}}><FaTrash/> Remove</button>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", color: theme.primary }}>
                            <span>{exp.title}</span>
                            <span style={{ color: theme.accent, fontSize: "0.8rem" }}>{exp.date}</span>
                          </div>
                          <div style={{ fontSize: "0.9rem", color: theme.text, fontStyle: "italic" }}>{exp.companyName} | {exp.companyLocation}</div>
                          <ul style={{ fontSize: "0.85rem", color: theme.text, marginTop: "5px", paddingLeft: "18px" }}>
                            {(exp.accomplishment || []).map((point, idx) => <li key={idx}>{point}</li>)}
                          </ul>
                        </>
                      )}
                    </div>
                  ))}
                </section>

                {/* PROJECTS */}
                <section>
                  <div style={styles.sectionTitle}>
                    Projects
                    {editMode && <button onClick={() => handleAddItem("projects", { title: "", duration: "", description: "", technologies: [], link: "", githubLink: "" })} style={styles.addBtn}><FaPlus/> Add</button>}
                  </div>
                  {(localData.projects || []).map((proj, i) => (
                    <div key={i} style={{ marginBottom: "15px", padding: "12px", background: theme.lightBg, borderRadius: "8px", borderLeft: `4px solid ${theme.primary}` }}>
                      {editMode ? (
                        <div style={{ display: "grid", gap: "5px" }}>
                          <input style={styles.input} value={proj.title} onChange={e => handleArrayFieldChange("projects", i, "title", e.target.value)} placeholder="Project Title" />
                          <input style={styles.input} value={proj.duration} onChange={e => handleArrayFieldChange("projects", i, "duration", e.target.value)} placeholder="Duration" />
                          <input style={styles.input} value={Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies} onChange={e => handleArrayFieldChange("projects", i, "technologies", e.target.value.split(", "))} placeholder="Tech Stack (comma separated)" />
                          <input style={styles.input} value={proj.link} onChange={e => handleArrayFieldChange("projects", i, "link", e.target.value)} placeholder="Demo Link" />
                          <input style={styles.input} value={proj.githubLink} onChange={e => handleArrayFieldChange("projects", i, "githubLink", e.target.value)} placeholder="GitHub Link" />
                          <textarea style={styles.input} value={proj.description} onChange={e => handleArrayFieldChange("projects", i, "description", e.target.value)} placeholder="Description" />
                          <button onClick={() => handleRemoveItem("projects", i)} style={{color: "red", border: "none", background: "none", cursor: "pointer"}}><FaTrash/></button>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700" }}>
                            <span>{proj.title}</span>
                            <span style={{ fontSize: "0.75rem", color: theme.text }}>{proj.duration}</span>
                          </div>
                          <div style={{ fontSize: "0.75rem", color: theme.accent, fontWeight: "bold", margin: "4px 0" }}>Stack: {Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies}</div>
                          <div style={{fontSize: '0.75rem', display: 'flex', gap: '12px', margin: '4px 0'}}>
                            {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" style={{color: theme.accent, textDecoration: "none"}}><FaLink size={10}/> Demo</a>}
                            {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" style={{color: theme.primary, textDecoration: "none"}}><FaGithub size={10}/> Code</a>}
                          </div>
                          <p style={{ fontSize: "0.8rem", color: theme.text, margin: 0 }}>{proj.description}</p>
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
                  <div style={styles.sectionTitle}>Skills</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {(localData.skills || []).map((skill, i) => (
                      <span key={i} style={{ background: theme.primary, color: "#fff", padding: "4px 10px", borderRadius: "5px", fontSize: "0.75rem", fontWeight: "500", display: "flex", alignItems: "center", gap: "5px" }}>
                        {editMode ? (
                          <input style={{background: "transparent", border: "none", color: "#fff", width: "60px", fontSize: "0.7rem"}} value={skill} onChange={e => {
                            const newSkills = [...localData.skills];
                            newSkills[i] = e.target.value;
                            handleFieldChange("skills", newSkills);
                          }} />
                        ) : skill}
                        {editMode && <FaTimes style={{cursor: "pointer"}} onClick={() => handleRemoveItem("skills", i)} />}
                      </span>
                    ))}
                    {editMode && <button onClick={() => handleAddItem("skills", "New Skill")} style={styles.addBtn}>+</button>}
                  </div>
                </section>

                {/* EDUCATION */}
                <section>
                  <div style={styles.sectionTitle}>
                    Education
                    {editMode && <button onClick={() => handleAddItem("education", { institution: "", degree: "", duration: "", grade: "" })} style={styles.addBtn}><FaPlus/></button>}
                  </div>
                  {(localData.education || []).map((edu, i) => (
                    <div key={i} style={{ marginBottom: "12px", fontSize: "0.85rem" }}>
                      {editMode ? (
                        <div style={{display: "grid", gap: "4px"}}>
                          <input style={styles.input} value={edu.institution} onChange={e => handleArrayFieldChange("education", i, "institution", e.target.value)} placeholder="Institution" />
                          <input style={styles.input} value={edu.degree} onChange={e => handleArrayFieldChange("education", i, "degree", e.target.value)} placeholder="Degree" />
                          <input style={styles.input} value={edu.duration} onChange={e => handleArrayFieldChange("education", i, "duration", e.target.value)} placeholder="Year" />
                          <input style={styles.input} value={edu.grade} onChange={e => handleArrayFieldChange("education", i, "grade", e.target.value)} placeholder="Grade" />
                          <button onClick={() => handleRemoveItem("education", i)} style={{color: "red", border: "none", background: "none", cursor: "pointer"}}><FaTrash/></button>
                        </div>
                      ) : (
                        <>
                          <div style={{ fontWeight: "700", color: theme.primary }}>{edu.institution}</div>
                          <div style={{ color: theme.text }}>{edu.degree}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", color: theme.accent, fontWeight: "600" }}>
                            <span>{edu.duration}</span>
                            <span>{edu.grade && `GPA: ${edu.grade}`}</span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </section>

                {/* LANGUAGES */}
                <section>
                  <div style={styles.sectionTitle}>
                    Languages
                    {editMode && <button onClick={() => handleAddItem("languagesDetailed", { language: "", proficiency: "" })} style={styles.addBtn}><FaPlus/></button>}
                  </div>
                  {(localData.languagesDetailed || []).map((lang, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "6px" }}>
                      {editMode ? (
                        <>
                          <input style={{...styles.input, width: "45%"}} value={lang.language} onChange={e => handleArrayFieldChange("languagesDetailed", i, "language", e.target.value)} />
                          <input style={{...styles.input, width: "45%"}} value={lang.proficiency} onChange={e => handleArrayFieldChange("languagesDetailed", i, "proficiency", e.target.value)} />
                          <FaTrash style={{color: "red", cursor: "pointer"}} onClick={() => handleRemoveItem("languagesDetailed", i)} />
                        </>
                      ) : (
                        <>
                          <span style={{ fontWeight: "600" }}>{lang.language}</span>
                          <span style={{ color: theme.accent, fontStyle: "italic" }}>{lang.proficiency}</span>
                        </>
                      )}
                    </div>
                  ))}
                </section>
              </div>
            </div>

            {/* 4. FOOTER GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "35px", borderTop: `1px solid ${theme.border}`, paddingTop: "20px" }}>
              <section>
                <div style={styles.sectionTitle}>
                  Certifications
                  {editMode && <button onClick={() => handleAddItem("certifications", { title: "", issuer: "", date: "" })} style={styles.addBtn}><FaPlus/></button>}
                </div>
                {(localData.certifications || []).map((cert, i) => (
                  <div key={i} style={{ marginBottom: "10px", fontSize: "0.8rem" }}>
                    {editMode ? (
                      <div style={{display: "grid", gap: "4px"}}>
                        <input style={styles.input} value={cert.title} onChange={e => handleArrayFieldChange("certifications", i, "title", e.target.value)} placeholder="Cert Title" />
                        <input style={styles.input} value={cert.issuer} onChange={e => handleArrayFieldChange("certifications", i, "issuer", e.target.value)} placeholder="Issuer" />
                        <input style={styles.input} value={cert.date} onChange={e => handleArrayFieldChange("certifications", i, "date", e.target.value)} placeholder="Year" />
                        <button onClick={() => handleRemoveItem("certifications", i)} style={{color: "red", border: "none", background: "none", cursor: "pointer"}}><FaTrash/></button>
                      </div>
                    ) : (
                      <>
                        <div style={{ fontWeight: "700" }}>{cert.title}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", color: theme.text }}>
                          <span>{cert.issuer}</span>
                          <span style={{color: theme.accent}}>{cert.date}</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </section>

              <section>
                <div style={styles.sectionTitle}>
                  Achievements
                  {editMode && <button onClick={() => handleAddItem("achievements", { title: "", description: "", year: "" })} style={styles.addBtn}><FaPlus/></button>}
                </div>
                {(localData.achievements || []).map((ach, i) => (
                  <div key={i} style={{ marginBottom: "10px", fontSize: "0.8rem" }}>
                    {editMode ? (
                      <div style={{display: "grid", gap: "4px"}}>
                        <input style={styles.input} value={ach.title} onChange={e => handleArrayFieldChange("achievements", i, "title", e.target.value)} placeholder="Achievement Title" />
                        <input style={styles.input} value={ach.year} onChange={e => handleArrayFieldChange("achievements", i, "year", e.target.value)} placeholder="Year" />
                        <textarea style={styles.input} value={ach.description} onChange={e => handleArrayFieldChange("achievements", i, "description", e.target.value)} placeholder="Description" />
                        <button onClick={() => handleRemoveItem("achievements", i)} style={{color: "red", border: "none", background: "none", cursor: "pointer"}}><FaTrash/></button>
                      </div>
                    ) : (
                      <>
                        <div style={{ fontWeight: "700" }}>{ach.title}</div>
                        <div style={{ color: theme.text, fontSize: "0.75rem", lineHeight: "1.4" }}>{ach.description}</div>
                        <div style={{ textAlign: "right", color: theme.accent, fontSize: "0.7rem", fontWeight: "bold" }}>{ach.year}</div>
                      </>
                    )}
                  </div>
                ))}
              </section>
            </div>
          </div>

          {/* ACTION BAR */}
          <div style={{ marginTop: "2rem", display: "flex", gap: "1.5rem" }}>
            {!editMode ? (
              <button onClick={() => setEditMode(true)} style={{...styles.modernBtn, background: theme.primary, color: "#fff"}}><FaEdit /> Quick Edit Mode</button>
            ) : (
              <>
                <button onClick={handleSave} style={{...styles.modernBtn, background: "#10b981", color: "#fff"}}><FaSave /> Save Changes</button>
                <button onClick={() => setEditMode(false)} style={{...styles.modernBtn, background: "#fff", color: "#ef4444", border: "2px solid #ef4444"}}><FaTimes /> Discard</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UICrafter;