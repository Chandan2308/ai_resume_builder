import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLinkedin, FaGithub, FaGlobe, 
  FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaLink, FaCalendarAlt, FaAward, FaCertificate 
} from "react-icons/fa";
import { toast } from "react-toastify";

const Template22 = () => {
  const resumeRef = useRef(null);
  const { resumeData, updateResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData || {});

  useEffect(() => {
    if (resumeData) setLocalData(resumeData);
  }, [resumeData]);

  // --- Logic Handlers ---
  const handleFieldChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (section, index, key, value) => {
    const updated = [...(localData[section] || [])];
    if (updated[index]) {
      updated[index] = key ? { ...updated[index], [key]: value } : value;
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
    if (updateResumeData) updateResumeData(localData);
    setEditMode(false);
    toast.success("Resume updated successfully!");
  };

  const handleCancel = () => {
    setLocalData(resumeData);
    setEditMode(false);
  };

  const sectionTitleStyle = {
    fontSize: "1.6rem",
    fontWeight: "700",
    marginBottom: "0.75rem",
    color: "#1f2937",
    borderBottom: "2px solid #4f46e5",
    paddingBottom: "0.25rem",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const inputStyle = { width: "100%", padding: "6px", border: "1px solid #d1d5db", borderRadius: "4px", fontSize: "0.9rem", marginBottom: '5px' };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar templateKey="template22" resumeRef={resumeRef} />
        <div style={{ flexGrow: 1, padding: "2rem", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: "900px" }}>
            <div ref={resumeRef} style={{ backgroundColor: "#ffffff", display: "flex", width: "100%", border: "1px solid #d1d5db", borderRadius: "0.5rem", overflow: "hidden", fontFamily: "Arial, sans-serif", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", flexDirection: "row" }}>
              
              {/* --- LEFT COLUMN --- */}
              <div style={{ flex: 2, padding: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  {editMode ? (
                    <div style={{display:'grid', gap:'5px'}}>
                      <input style={{...inputStyle, fontSize:'2.5rem', fontWeight:'bold'}} value={localData.name || ""} onChange={e => handleFieldChange("name", e.target.value)} placeholder="Full Name" />
                      <input style={{...inputStyle, fontSize:'1.2rem', color:'#4f46e5'}} value={localData.role || ""} onChange={e => handleFieldChange("role", e.target.value)} placeholder="Role" />
                    </div>
                  ) : (
                    <>
                      <h1 style={{ fontSize: "2.5rem", fontWeight: "700", margin: 0 }}>{localData.name || "YOUR NAME"}</h1>
                      <h2 style={{ fontSize: "1.2rem", color: "#4f46e5", marginTop: "0.25rem" }}>{localData.role}</h2>
                    </>
                  )}
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 style={sectionTitleStyle}>Summary</h3>
                  {editMode ? (
                    <textarea style={{...inputStyle, minHeight: '100px'}} value={localData.summary || ""} onChange={e => handleFieldChange("summary", e.target.value)} />
                  ) : (
                    <p style={{ lineHeight: "1.6" }}>{localData.summary}</p>
                  )}
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 style={sectionTitleStyle}>
                    Experience
                    {editMode && <FaPlus size={16} onClick={() => handleAddItem("experience", { companyName: "", title: "", date: "", accomplishment: [] })} style={{cursor:'pointer'}}/>}
                  </h3>
                  {(localData.experience || []).map((exp, idx) => (
                    <div key={idx} style={{ marginBottom: "1.2rem" }}>
                      {editMode ? (
                        <div style={{display:'grid', gap:'4px', padding:'10px', border:'1px dashed #ccc'}}>
                          <input style={inputStyle} value={exp.title} onChange={e => handleArrayFieldChange("experience", idx, "title", e.target.value)} placeholder="Title" />
                          <input style={inputStyle} value={exp.companyName} onChange={e => handleArrayFieldChange("experience", idx, "companyName", e.target.value)} placeholder="Company" />
                          <input style={inputStyle} value={exp.date} onChange={e => handleArrayFieldChange("experience", idx, "date", e.target.value)} placeholder="Date Range" />
                          <textarea style={inputStyle} value={exp.accomplishment?.join('\n')} onChange={e => handleArrayFieldChange("experience", idx, "accomplishment", e.target.value.split('\n'))} placeholder="Bullets" />
                          <button onClick={() => handleRemoveItem("experience", idx)} style={{color:'red', border:'none', background:'none', cursor:'pointer', fontSize:'0.8rem'}}><FaTrash/> Remove Experience</button>
                        </div>
                      ) : (
                        <>
                          <div style={{display:'flex', justifyContent:'space-between', fontWeight:'bold'}}>
                            <span>{exp.title}</span>
                            <span style={{color: '#4f46e5'}}>{exp.date}</span>
                          </div>
                          <div style={{fontStyle:'italic', color:'#6b7280'}}>{exp.companyName}</div>
                          <ul style={{ paddingLeft: "1.25rem", lineHeight: "1.6" }}>
                            {exp.accomplishment?.map((a, i) => <li key={i}>{a}</li>)}
                          </ul>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 style={sectionTitleStyle}>
                    Projects
                    {editMode && <FaPlus size={16} onClick={() => handleAddItem("projects", { title: "", duration: "", description: "", technologies: [], link: "", githubLink: "" })} style={{cursor:'pointer'}}/>}
                  </h3>
                  {(localData.projects || []).map((proj, idx) => (
                    <div key={idx} style={{ marginBottom: "1.2rem" }}>
                      {editMode ? (
                        <div style={{display:'grid', gap:'4px', padding:'10px', border:'1px dashed #ccc'}}>
                          <input style={inputStyle} value={proj.title} onChange={e => handleArrayFieldChange("projects", idx, "title", e.target.value)} placeholder="Project Name" />
                          <input style={inputStyle} value={proj.duration} onChange={e => handleArrayFieldChange("projects", idx, "duration", e.target.value)} placeholder="Duration" />
                          <input style={inputStyle} value={proj.technologies?.join(', ')} onChange={e => handleArrayFieldChange("projects", idx, "technologies", e.target.value.split(', '))} placeholder="Tech Stack" />
                          <input style={inputStyle} value={proj.githubLink} onChange={e => handleArrayFieldChange("projects", idx, "githubLink", e.target.value)} placeholder="GitHub URL" />
                          <input style={inputStyle} value={proj.link} onChange={e => handleArrayFieldChange("projects", idx, "link", e.target.value)} placeholder="Live Demo URL" />
                          <textarea style={inputStyle} value={proj.description} onChange={e => handleArrayFieldChange("projects", idx, "description", e.target.value)} />
                          <button onClick={() => handleRemoveItem("projects", idx)} style={{color:'red', border:'none', background:'none'}}><FaTrash/> Remove Project</button>
                        </div>
                      ) : (
                        <>
                          <div style={{display:'flex', justifyContent:'space-between', fontWeight:'bold'}}>
                            <span>{proj.title}</span>
                            <span style={{fontSize:'0.85rem', color:'#6b7280'}}><FaCalendarAlt size={10}/> {proj.duration}</span>
                          </div>
                          {proj.technologies && <div style={{fontSize:'0.8rem', color:'#4f46e5', fontWeight:'bold'}}>Stack: {proj.technologies.join(", ")}</div>}
                          <p style={{fontSize:'0.9rem', margin:'4px 0'}}>{proj.description}</p>
                          <div style={{display:'flex', gap:'15px'}}>
                            {proj.githubLink && <a href={proj.githubLink} style={{fontSize:'0.8rem', color:'#4f46e5', textDecoration:'none'}}><FaGithub/> Code</a>}
                            {proj.link && <a href={proj.link} style={{fontSize:'0.8rem', color:'#4f46e5', textDecoration:'none'}}><FaLink/> Demo</a>}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* --- RIGHT COLUMN (SIDEBAR) --- */}
              <div style={{ flex: 1, backgroundColor: "#f3f4f6", padding: "2rem", borderLeft: "1px solid #e5e7eb" }}>
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={sectionTitleStyle}>Contact</h3>
                  <div style={{fontSize:'0.85rem', display:'flex', flexDirection:'column', gap:'10px'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}><FaMapMarkerAlt color="#4f46e5"/> {editMode ? <input style={inputStyle} value={localData.location || ""} onChange={e => handleFieldChange("location", e.target.value)}/> : <span>{localData.location}</span>}</div>
                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}><FaPhoneAlt color="#4f46e5"/> {editMode ? <input style={inputStyle} value={localData.phone || ""} onChange={e => handleFieldChange("phone", e.target.value)}/> : <span>{localData.phone}</span>}</div>
                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}><FaEnvelope color="#4f46e5"/> {editMode ? <input style={inputStyle} value={localData.email || ""} onChange={e => handleFieldChange("email", e.target.value)}/> : <span>{localData.email}</span>}</div>
                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}><FaLinkedin color="#4f46e5"/> {editMode ? <input style={inputStyle} value={localData.linkedin || ""} onChange={e => handleFieldChange("linkedin", e.target.value)}/> : <span>LinkedIn</span>}</div>
                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}><FaGithub color="#4f46e5"/> {editMode ? <input style={inputStyle} value={localData.github || ""} onChange={e => handleFieldChange("github", e.target.value)}/> : <span>GitHub</span>}</div>
                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}><FaGlobe color="#4f46e5"/> {editMode ? <input style={inputStyle} value={localData.portfolio || ""} onChange={e => handleFieldChange("portfolio", e.target.value)}/> : <span>Portfolio</span>}</div>
                  </div>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={sectionTitleStyle}>
                    Skills
                    {editMode && <FaPlus size={14} onClick={() => handleAddItem("skills", "New Skill")} style={{cursor:'pointer'}}/>}
                  </h3>
                  <ul style={{ paddingLeft: "1.25rem", lineHeight: "1.6", fontSize:'0.9rem' }}>
                    {(localData.skills || []).map((skill, idx) => (
                      <li key={idx} style={{marginBottom:'2px'}}>
                        {editMode ? (
                          <div style={{display:'flex', alignItems:'center'}}>
                            <input style={inputStyle} value={skill} onChange={e => { const s = [...localData.skills]; s[idx] = e.target.value; handleFieldChange("skills", s); }} />
                            <FaTrash size={10} color="red" onClick={() => handleRemoveItem("skills", idx)} style={{marginLeft:'5px', cursor:'pointer'}}/>
                          </div>
                        ) : skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={sectionTitleStyle}>
                    Languages
                    {editMode && <FaPlus size={14} onClick={() => handleAddItem("languagesDetailed", { language: "", proficiency: "" })} style={{cursor:'pointer'}}/>}
                  </h3>
                  {(localData.languagesDetailed || []).map((lang, idx) => (
                    <div key={idx} style={{marginBottom:'8px', fontSize:'0.9rem'}}>
                      {editMode ? (
                        <div style={{display:'grid', gap:'2px'}}>
                          <input style={inputStyle} value={lang.language} onChange={e => handleArrayFieldChange("languagesDetailed", idx, "language", e.target.value)} placeholder="Lang"/>
                          <input style={inputStyle} value={lang.proficiency} onChange={e => handleArrayFieldChange("languagesDetailed", idx, "proficiency", e.target.value)} placeholder="Lvl"/>
                          <FaTrash size={10} color="red" onClick={() => handleRemoveItem("languagesDetailed", idx)} />
                        </div>
                      ) : (
                        <div><strong>{lang.language}</strong>: {lang.proficiency}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={sectionTitleStyle}>
                    Education
                    {editMode && <FaPlus size={14} onClick={() => handleAddItem("education", { degree: "", institution: "", duration: "", grade: "" })} style={{cursor:'pointer'}}/>}
                  </h3>
                  {(localData.education || []).map((edu, idx) => (
                    <div key={idx} style={{marginBottom:'12px', fontSize:'0.9rem'}}>
                      {editMode ? (
                        <div style={{display:'grid', gap:'2px', padding:'5px', border:'1px dashed #ccc'}}>
                          <input style={inputStyle} value={edu.degree} onChange={e => handleArrayFieldChange("education", idx, "degree", e.target.value)} placeholder="Degree"/>
                          <input style={inputStyle} value={edu.institution} onChange={e => handleArrayFieldChange("education", idx, "institution", e.target.value)} placeholder="Institute"/>
                          <button onClick={() => handleRemoveItem("education", idx)} style={{color:'red', border:'none', background:'none'}}><FaTrash size={10}/></button>
                        </div>
                      ) : (
                        <>
                          <div style={{fontWeight:'bold'}}>{edu.degree}</div>
                          <div style={{fontSize:'0.8rem', color:'#6b7280'}}>{edu.institution}</div>
                          <div style={{fontSize:'0.75rem', color:'#4f46e5'}}>{edu.duration} {edu.grade && `| ${edu.grade}`}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={sectionTitleStyle}>
                   Achievements 
                    {editMode && <FaPlus size={14} onClick={() => handleAddItem("achievements", { title: "", year: "", description: "" })} style={{cursor:'pointer'}}/>}
                  </h3>
                  {(localData.achievements || []).map((ach, idx) => (
                    <div key={idx} style={{marginBottom:'10px', fontSize:'0.85rem'}}>
                      {editMode ? (
                        <div style={{display:'grid', gap:'2px', padding:'5px', border:'1px dashed #ccc'}}>
                          <input style={inputStyle} value={ach.title} onChange={e => handleArrayFieldChange("achievements", idx, "title", e.target.value)} placeholder="Achievement"/>
                          <input style={inputStyle} value={ach.year} onChange={e => handleArrayFieldChange("achievements", idx, "year", e.target.value)} placeholder="Year"/>
                          <textarea style={inputStyle} value={ach.description} onChange={e => handleArrayFieldChange("achievements", idx, "description", e.target.value)} />
                          <button onClick={() => handleRemoveItem("achievements", idx)} style={{color:'red', border:'none', background:'none'}}><FaTrash size={10}/></button>
                        </div>
                      ) : (
                        <div style={{display:'flex', gap:'8px'}}><FaAward color="#4f46e5" style={{marginTop:'3px'}}/> 
                          <div><strong>{ach.title}</strong> ({ach.year})<div style={{fontSize:'0.75rem', color:'#6b7280'}}>{ach.description}</div></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <h3 style={sectionTitleStyle}>
                    Certs
                    {editMode && <FaPlus size={14} onClick={() => handleAddItem("certifications", { title: "", issuer: "", date: "" })} style={{cursor:'pointer'}}/>}
                  </h3>
                  {(localData.certifications || []).map((cert, idx) => (
                    <div key={idx} style={{marginBottom:'10px', fontSize:'0.85rem'}}>
                      {editMode ? (
                        <div style={{display:'grid', gap:'2px', padding:'5px', border:'1px dashed #ccc'}}>
                          <input style={inputStyle} value={cert.title} onChange={e => handleArrayFieldChange("certifications", idx, "title", e.target.value)} />
                          <input style={inputStyle} value={cert.issuer} onChange={e => handleArrayFieldChange("certifications", idx, "issuer", e.target.value)} />
                          <button onClick={() => handleRemoveItem("certifications", idx)} style={{color:'red', border:'none', background:'none'}}><FaTrash size={10}/></button>
                        </div>
                      ) : (
                        <div style={{display:'flex', gap:'8px'}}><FaCertificate color="#4f46e5" style={{marginTop:'3px'}}/> 
                          <div><strong>{cert.title}</strong><div style={{fontSize:'0.75rem', color:'#6b7280'}}>{cert.issuer} • {cert.date}</div></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", textAlign: "center", paddingBottom:'2rem' }}>
              {editMode ? (
                <div style={{display:'flex', gap:'10px', justifyContent:'center'}}>
                  <button onClick={handleSave} style={{ backgroundColor: "#10b981", color: "white", padding: "0.6rem 1.5rem", borderRadius: "0.375rem", border: "none", cursor: 'pointer', fontWeight:'bold' }}><FaSave style={{marginRight:'5px'}}/> Save</button>
                  <button onClick={handleCancel} style={{ backgroundColor: "#6b7280", color: "white", padding: "0.6rem 1.5rem", borderRadius: "0.375rem", border: "none", cursor: 'pointer', fontWeight:'bold' }}><FaTimes style={{marginRight:'5px'}}/> Cancel</button>
                </div>
              ) : (
                <button onClick={() => setEditMode(true)} style={{ backgroundColor: "#3b82f6", color: "white", padding: "0.6rem 1.5rem", borderRadius: "0.375rem", border: "none", cursor: 'pointer', fontWeight:'bold' }}><FaEdit style={{marginRight:'5px'}}/> Edit Resume</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template22;