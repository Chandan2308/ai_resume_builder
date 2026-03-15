import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { 
  FaPlus, FaTrash, FaEdit, FaSave, FaTimes, 
  FaGithub, FaLinkedin, FaGlobe, FaLink, FaAward, 
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaTools, FaCertificate, FaCalendarAlt
} from "react-icons/fa";

const ResumePreview = () => {
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
    setLocalData(prev => ({ ...prev, [section]: [...(prev[section] || []), blankItem] }));
  };

  const handleRemoveItem = (section, idx) => {
    setLocalData(prev => ({ ...prev, [section]: (prev[section] || []).filter((_, i) => i !== idx) }));
  };

  const handleSave = () => {
    updateResumeData(localData);
    setEditMode(false);
  };

  const theme = {
    primary: "#4f46e5", 
    dark: "#1e293b",    
    light: "#f8fafc",   
    border: "#e2e8f0",
    textMuted: "#64748b"
  };

  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#f1f5f9", display: "flex", flexDirection: "column" },
    page: {
      maxWidth: "850px", width: "100%", minHeight: "1123px", margin: "20px auto",
      backgroundColor: "#fff", padding: "40px", boxSizing: "border-box",
      fontFamily: "'Inter', sans-serif", color: theme.dark, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
      borderRadius: "16px", overflow: "hidden"
    },
    headerCard: {
      backgroundColor: theme.dark, color: "#fff", padding: "30px",
      borderRadius: "12px", marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center"
    },
    sectionHeading: {
      fontSize: "0.9rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px",
      color: theme.primary, marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "space-between"
    },
    sidebarBox: { backgroundColor: theme.light, padding: "20px", borderRadius: "12px", height: "fit-content", display: 'flex', flexDirection: 'column', gap: '25px' },
    mainContent: { flex: 1, paddingLeft: "25px" },
    input: { width: "100%", padding: "8px", borderRadius: "6px", border: `1px solid ${theme.primary}`, fontSize: "0.9rem" },
    textArea: { width: "100%", padding: "8px", borderRadius: "6px", border: `1px solid ${theme.primary}`, fontSize: "0.9rem", minHeight: '80px', fontFamily: 'inherit' },
    tag: { background: "#e0e7ff", color: theme.primary, padding: "2px 8px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "700" }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={{ display: "flex", flexGrow: 1 }}>
        <Sidebar templateKey="template18" onEnhance={() => { }} resumeRef={resumeRef} />
        <div style={{ flexGrow: 1, padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <div ref={resumeRef} className="resume-page" style={styles.page}>
            {/* 1. FLOATING HEADER WITH SOCIALS */}
            <header style={styles.headerCard}>
              <div style={{ flex: 1.5 }}>
                {editMode ? (
                  <div style={{display:'grid', gap:'5px'}}>
                    <input style={styles.input} value={localData.name} onChange={e => handleFieldChange("name", e.target.value)} placeholder="Full Name" />
                    <input style={styles.input} value={localData.role} onChange={e => handleFieldChange("role", e.target.value)} placeholder="Role" />
                  </div>
                ) : (
                  <>
                    <h1 style={{ margin: 0, fontSize: "2.2rem", fontWeight: "900", letterSpacing: "-1px" }}>{localData.name || "NAME"}</h1>
                    <div style={{ color: "#a5b4fc", fontWeight: "600", fontSize: "1.1rem" }}>{localData.role}</div>
                  </>
                )}
                <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                  {localData.linkedin && <a href={localData.linkedin} style={{color: "#fff"}}><FaLinkedin size={18}/></a>}
                  {localData.github && <a href={localData.github} style={{color: "#fff"}}><FaGithub size={18}/></a>}
                  {localData.portfolio && <a href={localData.portfolio} style={{color: "#fff"}}><FaGlobe size={18}/></a>}
                </div>
              </div>
              <div style={{ flex: 1, textAlign: "right", fontSize: "0.85rem", opacity: 0.9 }}>
                {editMode ? (
                   <div style={{display:'grid', gap:'5px'}}>
                     <input style={styles.input} value={localData.email} onChange={e => handleFieldChange("email", e.target.value)} placeholder="Email"/>
                     <input style={styles.input} value={localData.phone} onChange={e => handleFieldChange("phone", e.target.value)} placeholder="Phone"/>
                     <input style={styles.input} value={localData.location} onChange={e => handleFieldChange("location", e.target.value)} placeholder="Location"/>
                   </div>
                ) : (
                  <>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'8px'}}><FaEnvelope/> {localData.email}</div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'8px'}}><FaPhoneAlt/> {localData.phone}</div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'8px'}}><FaMapMarkerAlt/> {localData.location}</div>
                  </>
                )}
              </div>
            </header>

            <div style={{ display: "flex", gap: "30px" }}>
              {/* --- SIDEBAR --- */}
              <aside style={{ width: "32%" }}>
                <div style={styles.sidebarBox}>
                  {/* SKILLS */}
                  <section>
                    <div style={styles.sectionHeading}>
                      <span><FaTools/> Expertise</span>
                      {editMode && <FaPlus onClick={() => handleAddItem("skills", "New Skill")} style={{cursor:'pointer'}}/>}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {(localData.skills || []).map((skill, i) => (
                        <div key={i} style={{display:'flex', alignItems:'center', background:'#e0e7ff', padding:'4px 8px', borderRadius:'6px'}}>
                          {editMode ? (
                            <input style={{border:'none', background:'transparent', width:'60px', fontSize:'0.75rem'}} value={skill} onChange={e => {
                              const s = [...localData.skills]; s[i] = e.target.value; handleFieldChange("skills", s);
                            }} />
                          ) : <span style={{fontSize:'0.8rem', fontWeight:'700', color:theme.primary}}>{skill}</span>}
                          {editMode && <FaTrash size={10} onClick={() => handleRemoveItem("skills", i)} style={{marginLeft:'5px', cursor:'pointer', color:theme.primary}}/>}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* EDUCATION */}
                  <section>
                    <div style={styles.sectionHeading}>
                      <span><FaGraduationCap/> Education</span>
                      {editMode && <FaPlus onClick={() => handleAddItem("education", { degree: "", institution: "", duration: "" })} style={{cursor:'pointer'}}/>}
                    </div>
                    {(localData.education || []).map((edu, i) => (
                      <div key={i} style={{ marginBottom: "15px", fontSize: "0.85rem", position:'relative' }}>
                        {editMode ? (
                          <div style={{display:'grid', gap:'4px', border:'1px dashed #ccc', padding:'5px'}}>
                            <input style={styles.input} value={edu.degree} onChange={e => handleArrayFieldChange("education", i, "degree", e.target.value)} placeholder="Degree" />
                            <input style={styles.input} value={edu.institution} onChange={e => handleArrayFieldChange("education", i, "institution", e.target.value)} placeholder="Institute" />
                            <FaTrash onClick={() => handleRemoveItem("education", i)} color="red" size={10} />
                          </div>
                        ) : (
                          <>
                            <div style={{fontWeight: "800"}}>{edu.degree}</div>
                            <div style={{color: theme.textMuted}}>{edu.institution}</div>
                            <div style={{fontWeight: "700", color: theme.primary}}>{edu.duration}</div>
                          </>
                        )}
                      </div>
                    ))}
                  </section>

                  {/* LANGUAGES */}
                  <section>
                    <div style={styles.sectionHeading}>
                      <span><FaGlobe/> Languages</span>
                      {editMode && <FaPlus onClick={() => handleAddItem("languagesDetailed", { language: "", proficiency: "" })} style={{cursor:'pointer'}}/>}
                    </div>
                    {(localData.languagesDetailed || []).map((lang, i) => (
                      <div key={i} style={{ fontSize: "0.85rem", marginBottom: "8px" }}>
                        {editMode ? (
                          <div style={{display:'flex', gap:'5px'}}>
                            <input style={styles.input} value={lang.language} onChange={e => handleArrayFieldChange("languagesDetailed", i, "language", e.target.value)} />
                            <FaTrash onClick={() => handleRemoveItem("languagesDetailed", i)} size={10}/>
                          </div>
                        ) : <div><strong>{lang.language}</strong>: {lang.proficiency}</div>}
                      </div>
                    ))}
                  </section>
                </div>
              </aside>

              {/* --- MAIN CONTENT --- */}
              <main style={styles.mainContent}>
                <section>
                  <div style={styles.sectionHeading}>Professional Summary</div>
                  {editMode ? (
                    <textarea style={styles.textArea} value={localData.summary} onChange={e => handleFieldChange("summary", e.target.value)} />
                  ) : (
                    <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: theme.dark, margin: 0 }}>{localData.summary}</p>
                  )}
                </section>

                <section style={{marginTop: "30px"}}>
                  <div style={styles.sectionHeading}>
                    <span><FaBriefcase/> Work History</span>
                    {editMode && <FaPlus onClick={() => handleAddItem("experience", { companyName: "", title: "", date: "", accomplishment: [] })} style={{cursor:'pointer'}}/>}
                  </div>
                  {(localData.experience || []).map((exp, i) => (
                    <div key={i} style={{ marginBottom: "25px", borderLeft: `2px solid ${theme.border}`, paddingLeft: "20px", position: "relative" }}>
                      <div style={{ width: "10px", height: "10px", backgroundColor: theme.primary, borderRadius: "50%", position: "absolute", left: "-6px", top: "6px" }}></div>
                      {editMode ? (
                        <div style={{display:'grid', gap:'5px', border:'1px dashed #ccc', padding:'10px'}}>
                          <input style={styles.input} value={exp.title} onChange={e => handleArrayFieldChange("experience", i, "title", e.target.value)} placeholder="Job Title" />
                          <input style={styles.input} value={exp.companyName} onChange={e => handleArrayFieldChange("experience", i, "companyName", e.target.value)} placeholder="Company" />
                          <textarea style={styles.textArea} value={exp.accomplishment?.join('\n')} onChange={e => handleArrayFieldChange("experience", i, "accomplishment", e.target.value.split('\n'))} placeholder="Accomplishments" />
                          <button onClick={() => handleRemoveItem("experience", i)} style={{color:'red', border:'none', background:'none'}}><FaTrash/> Remove</button>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800" }}>
                            <span>{exp.title}</span>
                            <span style={{ color: theme.primary, fontSize: "0.8rem" }}>{exp.date}</span>
                          </div>
                          <div style={{ fontWeight: "700", fontSize: "0.9rem", color: theme.textMuted, marginBottom: "8px" }}>{exp.companyName}</div>
                          <ul style={{ paddingLeft: "18px", fontSize: "0.9rem", color: theme.dark, margin: 0 }}>
                            {exp.accomplishment?.map((a, idx) => <li key={idx}>{a}</li>)}
                          </ul>
                        </>
                      )}
                    </div>
                  ))}
                </section>

                <section style={{marginTop: "30px"}}>
                  <div style={styles.sectionHeading}>
                    <span><FaLink/> Projects</span>
                    {editMode && <FaPlus onClick={() => handleAddItem("projects", { title: "", duration: "", description: "", technologies: [], link: "", githubLink: "" })} style={{cursor:'pointer'}}/>}
                  </div>
                  {(localData.projects || []).map((proj, i) => (
                    <div key={i} style={{ marginBottom: "25px", backgroundColor: theme.light, padding: "15px", borderRadius: "10px" }}>
                      {editMode ? (
                        <div style={{display:'grid', gap:'5px'}}>
                          <input style={styles.input} value={proj.title} onChange={e => handleArrayFieldChange("projects", i, "title", e.target.value)} />
                          <input style={styles.input} value={proj.duration} onChange={e => handleArrayFieldChange("projects", i, "duration", e.target.value)} placeholder="Duration"/>
                          <input style={styles.input} value={proj.technologies?.join(', ')} onChange={e => handleArrayFieldChange("projects", i, "technologies", e.target.value.split(', '))} placeholder="Tech Stack (comma separated)"/>
                          <input style={styles.input} value={proj.githubLink} onChange={e => handleArrayFieldChange("projects", i, "githubLink", e.target.value)} placeholder="GitHub Link"/>
                          <input style={styles.input} value={proj.link} onChange={e => handleArrayFieldChange("projects", i, "link", e.target.value)} placeholder="Demo Link"/>
                          <textarea style={styles.textArea} value={proj.description} onChange={e => handleArrayFieldChange("projects", i, "description", e.target.value)} />
                          <FaTrash color="red" onClick={() => handleRemoveItem("projects", i)} style={{cursor:'pointer'}}/>
                        </div>
                      ) : (
                        <>
                          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "1rem" }}>
                            <span>{proj.title}</span>
                            <span style={{fontSize: "0.8rem", color:theme.primary}}>{proj.duration}</span>
                          </div>
                          <div style={{display:'flex', flexWrap:'wrap', gap:'5px', margin:'8px 0'}}>
                            {proj.technologies?.map((tech, idx) => <span key={idx} style={styles.tag}>{tech}</span>)}
                          </div>
                          <p style={{ fontSize: "0.9rem", margin: "5px 0", color: theme.textMuted }}>{proj.description}</p>
                          <div style={{display:'flex', gap:'15px', marginTop:'8px'}}>
                            {proj.githubLink && <a href={proj.githubLink} style={{fontSize:'0.8rem', color:theme.dark, textDecoration:'none', fontWeight:'700'}}><FaGithub/> Code</a>}
                            {proj.link && <a href={proj.link} style={{fontSize:'0.8rem', color:theme.primary, textDecoration:'none', fontWeight:'700'}}><FaLink/> Demo</a>}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </section>
              </main>
            </div>

            {/* EXPANDED FOOTER: ACHIEVEMENTS & CERTIFICATIONS */}
            <footer style={{ marginTop: "30px", borderTop: `1px solid ${theme.border}`, paddingTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
              <section>
                <div style={styles.sectionHeading}>
                  <span><FaAward/> Achievements</span>
                  {editMode && <FaPlus onClick={() => handleAddItem("achievements", { title: "", description: "", year: "" })} style={{cursor:'pointer'}}/>}
                </div>
                {(localData.achievements || []).map((ach, i) => (
                  <div key={i} style={{ marginBottom: "12px", fontSize: "0.85rem" }}>
                    {editMode ? (
                      <div style={{display:'grid', gap:'4px', border:'1px dashed #ccc', padding:'5px'}}>
                        <input style={styles.input} value={ach.title} onChange={e => handleArrayFieldChange("achievements", i, "title", e.target.value)} placeholder="Title"/>
                        <input style={styles.input} value={ach.year} onChange={e => handleArrayFieldChange("achievements", i, "year", e.target.value)} placeholder="Year"/>
                        <textarea style={styles.textArea} value={ach.description} onChange={e => handleArrayFieldChange("achievements", i, "description", e.target.value)} />
                        <FaTrash onClick={() => handleRemoveItem("achievements", i)} color="red" size={10}/>
                      </div>
                    ) : (
                      <>
                        <div style={{fontWeight:'800'}}>{ach.title} ({ach.year})</div>
                        <div style={{color:theme.textMuted}}>{ach.description}</div>
                      </>
                    )}
                  </div>
                ))}
              </section>

              <section>
                <div style={styles.sectionHeading}>
                  <span><FaCertificate/> Certifications</span>
                  {editMode && <FaPlus onClick={() => handleAddItem("certifications", { title: "", issuer: "", date: "" })} style={{cursor:'pointer'}}/>}
                </div>
                {(localData.certifications || []).map((cert, i) => (
                  <div key={i} style={{ marginBottom: "12px", fontSize: "0.85rem" }}>
                    {editMode ? (
                      <div style={{display:'grid', gap:'4px', border:'1px dashed #ccc', padding:'5px'}}>
                        <input style={styles.input} value={cert.title} onChange={e => handleArrayFieldChange("certifications", i, "title", e.target.value)} placeholder="Cert Name"/>
                        <input style={styles.input} value={cert.issuer} onChange={e => handleArrayFieldChange("certifications", i, "issuer", e.target.value)} placeholder="Issuer"/>
                        <input style={styles.input} value={cert.date} onChange={e => handleArrayFieldChange("certifications", i, "date", e.target.value)} placeholder="Year"/>
                        <FaTrash onClick={() => handleRemoveItem("certifications", i)} color="red" size={10}/>
                      </div>
                    ) : (
                      <>
                        <div style={{fontWeight:'800'}}>{cert.title}</div>
                        <div style={{color:theme.textMuted}}>{cert.issuer} • {cert.date}</div>
                      </>
                    )}
                  </div>
                ))}
              </section>
            </footer>
          </div>

          {/* ACTIONS */}
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            {!editMode ? (
              <button onClick={() => setEditMode(true)} style={{ padding: "12px 28px", background: theme.dark, color: "#fff", border: "none", borderRadius: "10px", cursor: 'pointer', fontWeight:'bold' }}><FaEdit /> Edit Resume</button>
            ) : (
              <>
                <button onClick={handleSave} style={{ padding: "12px 28px", background: "#10b981", color: "#fff", border: "none", borderRadius: "10px", cursor: 'pointer', fontWeight:'bold' }}><FaSave /> Save Changes</button>
                <button onClick={() => setEditMode(false)} style={{ padding: "12px 28px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "10px", cursor: 'pointer', fontWeight:'bold' }}><FaTimes /> Discard</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;