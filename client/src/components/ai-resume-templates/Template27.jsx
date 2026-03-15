import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGithub, 
  FaLinkedin, FaPlus, FaTrash, FaEdit, 
  FaSave, FaTimes, FaGlobe, FaLink, FaAward, FaCode
} from "react-icons/fa";

const Template27 = () => {
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

  const theme = {
    primary: "#1d7a68", 
    sidebarText: "#ffffff",
    mainText: "#2d3748",
    mutedText: "#4a5568",
    border: "#e2e8f0"
  };

  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column" },
    page: {
      maxWidth: "850px", width: "100%", minHeight: "1123px", margin: "20px auto",
      backgroundColor: "#fff", display: "flex", boxSizing: "border-box",
      fontFamily: "'Open Sans', sans-serif", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    },
    leftCol: { width: "34%", backgroundColor: theme.primary, color: theme.sidebarText, padding: "40px 20px", display: "flex", flexDirection: "column", gap: "25px" },
    rightCol: { width: "66%", padding: "40px 35px", display: "flex", flexDirection: "column", gap: "30px" },
    sidebarHeading: { fontFamily: "'Montserrat', sans-serif", fontSize: "1.1rem", fontWeight: "800", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "5px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    mainHeading: { fontFamily: "'Montserrat', sans-serif", fontSize: "1.25rem", fontWeight: "900", color: theme.primary, textTransform: "uppercase", borderBottom: `3px solid ${theme.primary}`, paddingBottom: "4px", marginBottom: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    bodyText: { fontSize: "0.98rem", lineHeight: "1.6", color: theme.mainText },
    input: { width: "100%", padding: "8px", borderRadius: "4px", border: `1px solid ${theme.border}`, fontSize: "0.85rem", outline: "none" },
    textArea: { width: "100%", padding: "8px", borderRadius: "4px", border: `1px solid ${theme.border}`, fontSize: "0.9rem", minHeight: "100px", fontFamily: "inherit" },
    removeBtn: { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 'bold', marginTop: '5px' }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* <Sidebar onEnhance={() => { }} resumeRef={resumeRef} /> */}
        <Sidebar templateKey="template27" onEnhance={() => { }}/>
        <div style={{ flexGrow: 1, padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <div ref={resumeRef} className="resume-page" style={styles.page}>
            {/* --- SIDEBAR --- */}
            <aside style={styles.leftCol}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", margin: "0 auto 15px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>👤</div>
                {editMode ? (
                  <div style={{display:'grid', gap:'5px'}}>
                    <input style={styles.input} value={localData.name} onChange={e => handleFieldChange("name", e.target.value)} placeholder="Full Name" />
                    <input style={styles.input} value={localData.role} onChange={e => handleFieldChange("role", e.target.value)} placeholder="Target Role" />
                  </div>
                ) : (
                  <>
                    <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.5rem", fontWeight: "900", margin: 0 }}>{localData.name || "YOUR NAME"}</h1>
                    <p style={{ fontSize: "0.95rem", opacity: 0.9 }}>{localData.role}</p>
                  </>
                )}
              </div>

              {/* CONTACT & PORTFOLIO */}
              <section>
                <div style={styles.sidebarHeading}>Contact</div>
                <div style={{ fontSize: "0.88rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {editMode ? (
                    <div style={{display: 'grid', gap: '5px'}}>
                      <input style={styles.input} value={localData.email} onChange={e => handleFieldChange("email", e.target.value)} placeholder="Email"/>
                      <input style={styles.input} value={localData.phone} onChange={e => handleFieldChange("phone", e.target.value)} placeholder="Phone"/>
                      <input style={styles.input} value={localData.location} onChange={e => handleFieldChange("location", e.target.value)} placeholder="Location"/>
                      <input style={styles.input} value={localData.linkedin} onChange={e => handleFieldChange("linkedin", e.target.value)} placeholder="LinkedIn"/>
                      <input style={styles.input} value={localData.github} onChange={e => handleFieldChange("github", e.target.value)} placeholder="GitHub"/>
                      <input style={styles.input} value={localData.portfolio} onChange={e => handleFieldChange("portfolio", e.target.value)} placeholder="Portfolio"/>
                    </div>
                  ) : (
                    <>
                      <div style={{display:'flex', alignItems:'center', gap:'8px'}}><FaEnvelope /> {localData.email}</div>
                      <div style={{display:'flex', alignItems:'center', gap:'8px'}}><FaPhoneAlt /> {localData.phone}</div>
                      <div style={{display:'flex', alignItems:'center', gap:'8px'}}><FaMapMarkerAlt /> {localData.location}</div>
                      <div style={{display:'flex', gap:'12px', marginTop:'8px'}}>
                        {localData.linkedin && <a href={localData.linkedin} target="_blank" rel="noreferrer" style={{color:'#fff'}}><FaLinkedin size={18}/></a>}
                        {localData.github && <a href={localData.github} target="_blank" rel="noreferrer" style={{color:'#fff'}}><FaGithub size={18}/></a>}
                        {localData.portfolio && <a href={localData.portfolio} target="_blank" rel="noreferrer" style={{color:'#fff'}}><FaGlobe size={18}/></a>}
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* EDUCATION */}
              <section>
                <div style={styles.sidebarHeading}>
                  Education
                  {editMode && <FaPlus onClick={() => handleAddItem("education", { degree: "", institution: "", duration: "", grade: "" })} style={{cursor:'pointer', fontSize:'12px'}}/>}
                </div>
                {(localData.education || []).map((edu, i) => (
                  <div key={i} style={{ marginBottom: "15px", position: 'relative' }}>
                    {editMode ? (
                      <div style={{display: 'grid', gap: '4px', padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px'}}>
                        <input style={styles.input} value={edu.degree} onChange={e => handleArrayFieldChange("education", i, "degree", e.target.value)} placeholder="Degree"/>
                        <input style={styles.input} value={edu.institution} onChange={e => handleArrayFieldChange("education", i, "institution", e.target.value)} placeholder="University"/>
                        <input style={styles.input} value={edu.duration} onChange={e => handleArrayFieldChange("education", i, "duration", e.target.value)} placeholder="Year"/>
                        <input style={styles.input} value={edu.grade} onChange={e => handleArrayFieldChange("education", i, "grade", e.target.value)} placeholder="Grade/GPA"/>
                        <button onClick={() => handleRemoveItem("education", i)} style={{...styles.removeBtn, color: '#fff'}}><FaTrash/> Remove</button>
                      </div>
                    ) : (
                      <>
                        <div style={{fontWeight:'800', fontSize:'0.9rem'}}>{edu.degree}</div>
                        <div style={{fontSize:'0.85rem'}}>{edu.institution}</div>
                        <div style={{opacity:0.9, fontSize:'0.8rem'}}>{edu.duration} | GPA: {edu.grade}</div>
                      </>
                    )}
                  </div>
                ))}
              </section>

              {/* LANGUAGES */}
              <section>
                <div style={styles.sidebarHeading}>
                  Languages
                  {editMode && <FaPlus onClick={() => handleAddItem("languagesDetailed", { language: "", proficiency: "" })} style={{cursor:'pointer', fontSize:'12px'}}/>}
                </div>
                {(localData.languagesDetailed || []).map((lang, i) => (
                  <div key={i} style={{ marginBottom: "8px" }}>
                    {editMode ? (
                      <div style={{display:'flex', gap:'4px'}}>
                        <input style={styles.input} value={lang.language} onChange={e => handleArrayFieldChange("languagesDetailed", i, "language", e.target.value)} placeholder="Lang"/>
                        <input style={styles.input} value={lang.proficiency} onChange={e => handleArrayFieldChange("languagesDetailed", i, "proficiency", e.target.value)} placeholder="Proficiency"/>
                        <FaTrash onClick={() => handleRemoveItem("languagesDetailed", i)} style={{cursor:'pointer', color:'#fff'}}/>
                      </div>
                    ) : (
                      <div style={{fontSize:'0.85rem'}}><strong>{lang.language}</strong>: {lang.proficiency}</div>
                    )}
                  </div>
                ))}
              </section>

              {/* SKILLS */}
              <section>
                <div style={styles.sidebarHeading}>
                  Skills
                  {editMode && <FaPlus onClick={() => handleAddItem("skills", "New Skill")} style={{cursor: 'pointer', fontSize: '12px'}}/>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {(localData.skills || []).map((skill, i) => (
                    <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'0.85rem'}}>
                      {editMode ? (
                        <>
                          <input style={styles.input} value={skill} onChange={e => { const s = [...localData.skills]; s[i] = e.target.value; handleFieldChange("skills", s); }} />
                          <FaTrash onClick={() => handleRemoveItem("skills", i)} style={{cursor: 'pointer', marginLeft: '5px'}}/>
                        </>
                      ) : `• ${skill}`}
                    </div>
                  ))}
                </div>
              </section>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main style={styles.rightCol}>
              <section>
                <div style={styles.mainHeading}>Professional Summary</div>
                {editMode ? <textarea style={styles.textArea} value={localData.summary} onChange={e => handleFieldChange("summary", e.target.value)} /> : <p style={styles.bodyText}>{localData.summary}</p>}
              </section>

              <section>
                <div style={styles.mainHeading}>
                  Work Experience
                  {editMode && <FaPlus onClick={() => handleAddItem("experience", { companyName: "", title: "", date: "", accomplishment: [] })} style={{cursor: 'pointer'}}/>}
                </div>
                {(localData.experience || []).map((exp, i) => (
                  <div key={i} style={{ marginBottom: "20px" }}>
                    {editMode ? (
                      <div style={{ display: "grid", gap: "5px", padding: "10px", border: "1px dashed #ccc", borderRadius: "8px" }}>
                        <input style={styles.input} value={exp.title} onChange={e => handleArrayFieldChange("experience", i, "title", e.target.value)} placeholder="Title" />
                        <input style={styles.input} value={exp.companyName} onChange={e => handleArrayFieldChange("experience", i, "companyName", e.target.value)} placeholder="Company" />
                        <input style={styles.input} value={exp.date} onChange={e => handleArrayFieldChange("experience", i, "date", e.target.value)} placeholder="Duration" />
                        <textarea style={styles.textArea} value={exp.accomplishment?.join('\n')} onChange={e => handleArrayFieldChange("experience", i, "accomplishment", e.target.value.split('\n'))} placeholder="Accomplishments (one per line)" />
                        <button onClick={() => handleRemoveItem("experience", i)} style={styles.removeBtn}><FaTrash/> Remove Experience</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: "800" }}>{exp.title}</h3>
                          <span style={{ fontSize: "0.85rem", fontWeight: "700", color: theme.primary }}>{exp.date}</span>
                        </div>
                        <div style={{ color: theme.primary, fontWeight: "700", fontSize: "0.9rem", marginBottom: "5px" }}>{exp.companyName}</div>
                        <ul style={{ ...styles.bodyText, paddingLeft: "20px", margin: 0 }}>
                          {exp.accomplishment?.map((acc, idx) => <li key={idx}>{acc}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </section>

              <section>
                <div style={styles.mainHeading}>
                  Projects
                  {editMode && <FaPlus onClick={() => handleAddItem("projects", { title: "", duration: "", description: "", technologies: [], link: "", githubLink: "" })} style={{cursor: 'pointer'}}/>}
                </div>
                {(localData.projects || []).map((proj, i) => (
                  <div key={i} style={{ marginBottom: "20px" }}>
                    {editMode ? (
                      <div style={{ display: "grid", gap: "8px", padding: "12px", border: "1px dashed #ccc", borderRadius: "8px" }}>
                        <input style={styles.input} value={proj.title} onChange={e => handleArrayFieldChange("projects", i, "title", e.target.value)} placeholder="Project Title" />
                        <input style={styles.input} value={proj.duration} onChange={e => handleArrayFieldChange("projects", i, "duration", e.target.value)} placeholder="Duration" />
                        <input style={styles.input} value={proj.technologies?.join(", ")} onChange={e => handleArrayFieldChange("projects", i, "technologies", e.target.value.split(", "))} placeholder="Stack (comma separated)" />
                        <input style={styles.input} value={proj.link} onChange={e => handleArrayFieldChange("projects", i, "link", e.target.value)} placeholder="Live Link" />
                        <input style={styles.input} value={proj.githubLink} onChange={e => handleArrayFieldChange("projects", i, "githubLink", e.target.value)} placeholder="GitHub Link" />
                        <textarea style={styles.textArea} value={proj.description} onChange={e => handleArrayFieldChange("projects", i, "description", e.target.value)} placeholder="Description" />
                        <button onClick={() => handleRemoveItem("projects", i)} style={styles.removeBtn}><FaTrash/> Remove Project</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems:'center' }}>
                          <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: "800" }}>{proj.title}</h3>
                          <span style={{fontSize: '0.8rem', fontWeight: '700'}}>{proj.duration}</span>
                        </div>
                        {/* REFINED TECHNOLOGIES REPRESENTATION */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '6px 0' }}>
                          <FaCode size={12} color={theme.primary} style={{marginTop:'4px'}}/>
                          {proj.technologies?.map((tech, idx) => (
                            <span key={idx} style={{ fontSize: '0.75rem', fontWeight: '800', color: theme.primary, textTransform: 'uppercase' }}>
                              {tech}{idx !== proj.technologies.length - 1 ? " •" : ""}
                            </span>
                          ))}
                        </div>
                        <p style={{ ...styles.bodyText, margin: "5px 0" }}>{proj.description}</p>
                        <div style={{display:'flex', gap:'12px'}}>
                          {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" style={{fontSize:'0.75rem', color: theme.primary, fontWeight:'bold', textDecoration:'none'}}><FaLink/> LIVE DEMO</a>}
                          {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" style={{fontSize:'0.75rem', color: theme.primary, fontWeight:'bold', textDecoration:'none'}}><FaGithub/> SOURCE</a>}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </section>

              <section>
                <div style={styles.mainHeading}>
                  Certifications
                  {editMode && <FaPlus onClick={() => handleAddItem("certifications", { title: "", issuer: "", date: "" })} style={{cursor: 'pointer'}}/>}
                </div>
                {(localData.certifications || []).map((cert, i) => (
                  <div key={i} style={{ borderLeft: `3px solid ${theme.primary}`, paddingLeft: "12px", marginBottom: "12px" }}>
                    {editMode ? (
                      <div style={{display:'grid', gap:'4px'}}>
                        <input style={styles.input} value={cert.title} onChange={e => handleArrayFieldChange("certifications", i, "title", e.target.value)} placeholder="Cert Title"/>
                        <input style={styles.input} value={cert.issuer} onChange={e => handleArrayFieldChange("certifications", i, "issuer", e.target.value)} placeholder="Issuer"/>
                        <input style={styles.input} value={cert.date} onChange={e => handleArrayFieldChange("certifications", i, "date", e.target.value)} placeholder="Year"/>
                        <button onClick={() => handleRemoveItem("certifications", i)} style={styles.removeBtn}><FaTrash/> Remove Cert</button>
                      </div>
                    ) : (
                      <div style={styles.bodyText}><strong>{cert.title}</strong> — {cert.issuer} ({cert.date})</div>
                    )}
                  </div>
                ))}
              </section>

              <section>
                <div style={styles.mainHeading}>
                  Achievements
                  {editMode && <FaPlus onClick={() => handleAddItem("achievements", { title: "", description: "", year: "" })} style={{cursor: 'pointer'}}/>}
                </div>
                {(localData.achievements || []).map((ach, i) => (
                  <div key={i} style={{ marginBottom: "12px" }}>
                    {editMode ? (
                      <div style={{display:'grid', gap:'4px', border:'1px dashed #ccc', padding:'8px', borderRadius:'6px'}}>
                        <input style={styles.input} value={ach.title} onChange={e => handleArrayFieldChange("achievements", i, "title", e.target.value)} placeholder="Achievement"/>
                        <input style={styles.input} value={ach.description} onChange={e => handleArrayFieldChange("achievements", i, "description", e.target.value)} placeholder="Brief Description"/>
                        <input style={styles.input} value={ach.year} onChange={e => handleArrayFieldChange("achievements", i, "year", e.target.value)} placeholder="Year"/>
                        <button onClick={() => handleRemoveItem("achievements", i)} style={styles.removeBtn}><FaTrash/> Remove</button>
                      </div>
                    ) : (
                      <div style={styles.bodyText}><FaAward color={theme.primary}/> <strong>{ach.title}</strong>: {ach.description} ({ach.year})</div>
                    )}
                  </div>
                ))}
              </section>
            </main>
          </div>

          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            {!editMode ? (
              <button onClick={() => setEditMode(true)} style={{ padding: "12px 28px", background: theme.primary, color: "#fff", border: "none", borderRadius: "6px", cursor: 'pointer', fontWeight:'bold' }}><FaEdit /> Quick Edit</button>
            ) : (
              <>
                <button onClick={handleSave} style={{ padding: "12px 28px", background: "#10b981", color: "#fff", border: "none", borderRadius: "6px", cursor: 'pointer', fontWeight:'bold' }}><FaSave /> Save Changes</button>
                <button onClick={() => setEditMode(false)} style={{ padding: "12px 28px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: 'pointer', fontWeight:'bold' }}><FaTimes /> Discard</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template27;