import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { 
  FaPlus, FaTrash, FaEdit, FaSave, FaTimes, 
  FaGithub, FaLinkedin, FaGlobe, FaLink, FaAward, FaCode, FaCalendarAlt, FaCertificate 
} from "react-icons/fa";

const CodeArchitect = () => {
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
    primary: "#0f172a", 
    accent: "#334155",  
    border: "#1e293b",
    highlight: "#64748b"
  };

  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" },
    page: {
      maxWidth: "850px", width: "100%", minHeight: "1123px", margin: "20px auto",
      backgroundColor: "#fff", padding: "50px", boxSizing: "border-box",
      fontFamily: "'Inter', sans-serif", color: theme.primary, boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
    },
    header: { textAlign: "center", marginBottom: "30px", borderBottom: `3px solid ${theme.primary}`, paddingBottom: "20px" },
    sectionHeading: {
      fontFamily: "'Lexend', sans-serif", fontSize: "1.15rem", fontWeight: "800", 
      textTransform: "uppercase", letterSpacing: "1.5px", borderBottom: `1.5px solid ${theme.primary}`,
      paddingBottom: "4px", marginTop: "30px", marginBottom: "15px",
      display: "flex", justifyContent: "center", alignItems: "center", position: 'relative'
    },
    input: { width: "100%", padding: "8px", borderRadius: "4px", border: `1px solid ${theme.highlight}`, fontSize: "0.9rem" },
    tag: { fontSize: '0.75rem', fontWeight: '800', background: theme.primary, color: '#fff', padding: '2px 8px', borderRadius: '4px' },
    removeBtn: { color: "#ef4444", cursor: "pointer", border: "none", background: "none", fontSize: "0.8rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "4px" }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={{ display: "flex", flexGrow: 1 }}>
        <Sidebar onEnhance={() => { }} resumeRef={resumeRef} />
        <div style={{ flexGrow: 1, padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <div ref={resumeRef} className="resume-page" style={styles.page}>
            {/* 1. HEADER */}
            <header style={styles.header}>
              <h1 style={{ fontFamily: "'Lexend', sans-serif", margin: 0, fontSize: "2.6rem", fontWeight: "800" }}>
                {editMode ? <input style={{...styles.input, textAlign: 'center'}} value={localData.name} onChange={e => handleFieldChange("name", e.target.value)} /> : (localData.name || "YOUR NAME")}
              </h1>
              <div style={{ fontWeight: "600", fontSize: "1.1rem", textTransform: "uppercase", marginTop: "5px", color: theme.highlight }}>
                {editMode ? <input style={{...styles.input, textAlign: 'center'}} value={localData.role} onChange={e => handleFieldChange("role", e.target.value)} /> : localData.role}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "12px", fontSize: "0.95rem" }}>
                <span>{localData.email}</span> | <span>{localData.phone}</span> | <span>{localData.location}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "12px" }}>
                {localData.github && <a href={localData.github} style={{color: theme.primary}}><FaGithub size={18}/></a>}
                {localData.linkedin && <a href={localData.linkedin} style={{color: theme.primary}}><FaLinkedin size={18}/></a>}
                {localData.portfolio && <a href={localData.portfolio} style={{color: theme.primary}}><FaGlobe size={18}/></a>}
              </div>
            </header>

            {/* 2. SUMMARY */}
            <section>
              <div style={styles.sectionHeading}>Executive Summary</div>
              {editMode ? <textarea style={styles.input} value={localData.summary} onChange={e => handleFieldChange("summary", e.target.value)} /> : <p style={{ fontSize: "1rem", lineHeight: "1.6", textAlign: 'center', margin: 0 }}>{localData.summary}</p>}
            </section>

            {/* 3. TECHNICAL SKILLS */}
            <section>
              <div style={styles.sectionHeading}>Technical Stack</div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
                {(localData.skills || []).map((skill, i) => (
                  <span key={i} style={{ border: `1.5px solid ${theme.primary}`, padding: "4px 12px", borderRadius: "2px", fontSize: "0.85rem", fontWeight: "800" }}>
                    {editMode ? (
                      <input style={{border:'none', width:'70px'}} value={skill} onChange={e => {
                        const s = [...localData.skills]; s[i] = e.target.value; handleFieldChange("skills", s);
                      }} />
                    ) : skill}
                    {editMode && <FaTrash size={10} onClick={() => handleRemoveItem("skills", i)} style={{marginLeft: '5px', cursor: 'pointer', color: 'red'}}/>}
                  </span>
                ))}
                {editMode && <button onClick={() => handleAddItem("skills", "Skill")}>+</button>}
              </div>
            </section>

            {/* 4. PROFESSIONAL EXPERIENCE */}
            <section>
              <div style={styles.sectionHeading}>
                Professional Experience
                {editMode && <FaPlus size={14} style={{position:'absolute', right: 0, cursor:'pointer'}} onClick={() => handleAddItem("experience", { companyName: "", title: "", date: "", accomplishment: [] })}/>}
              </div>
              {(localData.experience || []).map((exp, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontWeight: "800", fontSize: "1.05rem" }}>
                    <span>{exp.title}</span>
                    <span style={{fontSize: '0.9rem'}}>{exp.date}</span>
                  </div>
                  <div style={{ fontWeight: "700", color: theme.highlight, marginBottom: "8px" }}>{exp.companyName}</div>
                  {editMode ? (
                    <div style={{display:'grid', gap:'5px', marginBottom:'10px'}}>
                      <textarea style={styles.input} value={exp.accomplishment?.join('\n')} onChange={e => handleArrayFieldChange("experience", i, "accomplishment", e.target.value.split('\n'))} placeholder="Bullets (one per line)" />
                      <button onClick={() => handleRemoveItem("experience", i)} style={styles.removeBtn}><FaTrash/> Remove Position</button>
                    </div>
                  ) : (
                    <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "1rem", lineHeight: "1.5" }}>
                      {exp.accomplishment?.map((a, idx) => <li key={idx}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>

            {/* 5. PROJECTS */}
            <section>
              <div style={styles.sectionHeading}>
                Technical Projects
                {editMode && <FaPlus size={14} style={{position:'absolute', right: 0, cursor:'pointer'}} onClick={() => handleAddItem("projects", { title: "", duration: "", description: "", technologies: [], githubLink: "", link: "" })}/>}
              </div>
              {(localData.projects || []).map((proj, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <span style={{fontWeight:'800', fontSize:'1rem'}}>{proj.title}</span>
                      <div style={{display: 'flex', gap: '5px'}}>
                        {proj.technologies?.map((tech, idx) => <span key={idx} style={styles.tag}>{tech}</span>)}
                      </div>
                    </div>
                    <span style={{ fontSize: "0.85rem", fontWeight: "800" }}><FaCalendarAlt size={10}/> {proj.duration}</span>
                  </div>
                  {editMode ? (
                    <div style={{display:'grid', gap:'5px', marginTop:'10px', border:'1px dashed #ccc', padding:'10px'}}>
                      <input style={styles.input} value={proj.title} onChange={e => handleArrayFieldChange("projects", i, "title", e.target.value)} placeholder="Title" />
                      <input style={styles.input} value={proj.duration} onChange={e => handleArrayFieldChange("projects", i, "duration", e.target.value)} placeholder="Duration" />
                      <input style={styles.input} value={proj.technologies?.join(', ')} onChange={e => handleArrayFieldChange("projects", i, "technologies", e.target.value.split(', '))} placeholder="Stack (comma separated)" />
                      <textarea style={styles.input} value={proj.description} onChange={e => handleArrayFieldChange("projects", i, "description", e.target.value)} placeholder="Description" />
                      <button onClick={() => handleRemoveItem("projects", i)} style={styles.removeBtn}><FaTrash/> Remove Project</button>
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: "0.95rem", margin: "5px 0" }}>{proj.description}</p>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        {proj.githubLink && <a href={proj.githubLink} style={{fontSize: '0.8rem', color: theme.primary, textDecoration: 'none', fontWeight:'bold'}}><FaGithub/> Code</a>}
                        {proj.link && <a href={proj.link} style={{fontSize: '0.8rem', color: theme.primary, textDecoration: 'none', fontWeight:'bold'}}><FaLink/> Demo</a>}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </section>

            {/* 6. ACHIEVEMENTS */}
            <section>
              <div style={styles.sectionHeading}>
                Honors & Achievements
                {editMode && <FaPlus size={14} style={{position:'absolute', right: 0, cursor:'pointer'}} onClick={() => handleAddItem("achievements", { title: "", description: "", year: "" })}/>}
              </div>
              {(localData.achievements || []).map((ach, i) => (
                <div key={i} style={{ marginBottom: "15px" }}>
                  {editMode ? (
                    <div style={{display:'grid', gap:'5px', border:'1px dashed #ccc', padding:'10px'}}>
                      <input style={styles.input} value={ach.title} onChange={e => handleArrayFieldChange("achievements", i, "title", e.target.value)} placeholder="Title" />
                      <input style={styles.input} value={ach.year} onChange={e => handleArrayFieldChange("achievements", i, "year", e.target.value)} placeholder="Year" />
                      <textarea style={styles.input} value={ach.description} onChange={e => handleArrayFieldChange("achievements", i, "description", e.target.value)} placeholder="Description" />
                      <FaTrash onClick={() => handleRemoveItem("achievements", i)} color="red" style={{cursor:'pointer'}}/>
                    </div>
                  ) : (
                    <div style={{display:'flex', gap:'12px'}}>
                      <FaAward color={theme.primary} size={18} style={{marginTop:'4px'}}/>
                      <div>
                        <div style={{fontWeight:'800', fontSize:'1rem'}}>{ach.title} <span style={{fontWeight:'400', fontSize:'0.85rem'}}>({ach.year})</span></div>
                        <p style={{margin:0, fontSize:'0.95rem', color: theme.accent}}>{ach.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* 7. BOTTOM GRID: CERTIFICATIONS & LANGUAGES */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", borderTop: `2px solid ${theme.primary}`, paddingTop: "20px" }}>
              <section>
                <div style={{...styles.sectionHeading, marginTop: 0}}>Certifications</div>
                {(localData.certifications || []).map((cert, i) => (
                  <div key={i} style={{ marginBottom: "10px", fontSize: "0.95rem" }}>
                    {editMode ? (
                      <div style={{display:'grid', gap:'4px'}}>
                        <input style={styles.input} value={cert.title} onChange={e => handleArrayFieldChange("certifications", i, "title", e.target.value)} placeholder="Cert Name" />
                        <input style={styles.input} value={cert.issuer} onChange={e => handleArrayFieldChange("certifications", i, "issuer", e.target.value)} placeholder="Issuer" />
                        <input style={styles.input} value={cert.date} onChange={e => handleArrayFieldChange("certifications", i, "date", e.target.value)} placeholder="Year" />
                        <FaTrash onClick={() => handleRemoveItem("certifications", i)} color="red" size={12}/>
                      </div>
                    ) : (
                      <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                        <FaCertificate color={theme.primary}/>
                        <span><strong>{cert.title}</strong> — {cert.issuer} ({cert.date})</span>
                      </div>
                    )}
                  </div>
                ))}
                {editMode && <button onClick={() => handleAddItem("certifications", { title: "", issuer: "", date: "" })}>+ Add</button>}
              </section>

              <section>
                <div style={{...styles.sectionHeading, marginTop: 0}}>Languages</div>
                <div style={{textAlign: 'center'}}>
                  {(localData.languagesDetailed || []).map((lang, i) => (
                    <div key={i} style={{ marginBottom: "8px", fontSize: "0.95rem" }}>
                      {editMode ? (
                        <div style={{display:'flex', gap:'4px'}}>
                          <input style={styles.input} value={lang.language} onChange={e => handleArrayFieldChange("languagesDetailed", i, "language", e.target.value)} />
                          <FaTrash onClick={() => handleRemoveItem("languagesDetailed", i)} color="red" size={12}/>
                        </div>
                      ) : (
                        <div><strong>{lang.language}</strong> — {lang.proficiency}</div>
                      )}
                    </div>
                  ))}
                  {editMode && <button onClick={() => handleAddItem("languagesDetailed", { language: "", proficiency: "" })}>+ Add</button>}
                </div>
              </section>
            </div>
          </div>

          {/* ACTIONS */}
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            {!editMode ? (
              <button onClick={() => setEditMode(true)} style={{ padding: "12px 28px", background: theme.primary, color: "#fff", border: "none", borderRadius: "6px", cursor: 'pointer', fontWeight:'bold' }}>Initialize Code Architect</button>
            ) : (
              <>
                <button onClick={handleSave} style={{ padding: "12px 28px", background: "#10b981", color: "#fff", border: "none", borderRadius: "6px", cursor: 'pointer', fontWeight:'bold' }}>Save System State</button>
                <button onClick={() => setEditMode(false)} style={{ padding: "12px 28px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: 'pointer', fontWeight:'bold' }}>Discard Changes</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeArchitect;