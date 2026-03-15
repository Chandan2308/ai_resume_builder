/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { useAuth } from "../../context/AuthContext";
import resumeService from "../../services/resumeService";
import { toast } from "react-toastify";
import { handleGlobalDownload } from "../../utils/downloadResume";
import {
  FaPhoneAlt, FaEnvelope, FaLinkedin, FaMapMarkerAlt,
  FaGithub, FaGlobe, FaAward, FaCertificate, FaPlus, FaTrash, 
  FaEdit, FaSave, FaTimes, FaLink, FaCalendarAlt, FaGraduationCap
} from "react-icons/fa";

const Template21 = () => {
  const resumeRef = useRef(null);
  const { resumeData, updateResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData || {});

  useEffect(() => { setLocalData(resumeData || {}); }, [resumeData]);

  // --- Logic Handlers (Unified Template 29 Style) ---
  const handleFieldChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
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
    if (typeof updateResumeData === "function") updateResumeData(localData);
    setEditMode(false);
    toast.success("Resume updated successfully!");
  };

  // --- Styles ---
  const colors = {
    headerBg: "#E6F3FF",
    border: "#87CEEB",
    textDark: "#000000",
    textMuted: "#4b5563",
    cardBg: "#f8f9fa"
  };

  const sectionTitleStyle = { 
    fontWeight: "bold", 
    fontSize: "1.1rem", 
    borderBottom: `2px solid ${colors.border}`, 
    color: colors.textDark, 
    marginTop: "1.5rem", 
    paddingBottom: "0.25rem", 
    textTransform: "uppercase",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const inputStyle = { width: "100%", border: `1px solid ${colors.border}`, borderRadius: "4px", padding: "6px", fontSize: "0.85rem", background: "#f0f9ff", marginBottom: '4px' };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar templateKey="template21" resumeRef={resumeRef} onDownload={() => handleGlobalDownload(resumeRef, localData.name)} />
        <div style={{ flexGrow: 1, padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <div ref={resumeRef} className="resume-page" style={{ maxWidth: "210mm", width: "100%", minHeight: "297mm", padding: "1.5rem", backgroundColor: "#ffffff", boxSizing: "border-box", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            
            {/* HEADER */}
            <div style={{ backgroundColor: colors.headerBg, padding: "2rem", borderRadius: "0.5rem", border: `1px solid ${colors.border}`, textAlign: "center" }}>
              {editMode ? (
                <div style={{display:'grid', gap:'5px'}}>
                  <input value={localData.name} onChange={(e) => handleFieldChange("name", e.target.value)} style={{ ...inputStyle, fontSize: "2rem", textAlign: "center", fontWeight: 'bold' }} placeholder="Full Name" />
                  <input value={localData.role} onChange={(e) => handleFieldChange("role", e.target.value)} style={{ ...inputStyle, textAlign: "center", fontSize: '1.1rem' }} placeholder="Current Role" />
                </div>
              ) : (
                <>
                  <h1 style={{ fontSize: "2.4rem", fontWeight: "bold", textTransform: "uppercase", margin: 0 }}>{localData.name || "FULL NAME"}</h1>
                  <h2 style={{ fontSize: "1.2rem", margin: "5px 0", color: colors.textMuted }}>{localData.role || "Target Role"}</h2>
                </>
              )}

              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem", marginTop: "15px", fontSize: "0.9rem" }}>
                {editMode ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", width: "100%" }}>
                    <input value={localData.email} onChange={(e) => handleFieldChange("email", e.target.value)} style={inputStyle} placeholder="Email" />
                    <input value={localData.phone} onChange={(e) => handleFieldChange("phone", e.target.value)} style={inputStyle} placeholder="Phone" />
                    <input value={localData.location} onChange={(e) => handleFieldChange("location", e.target.value)} style={inputStyle} placeholder="Location" />
                    <input value={localData.linkedin} onChange={(e) => handleFieldChange("linkedin", e.target.value)} style={inputStyle} placeholder="LinkedIn URL" />
                    <input value={localData.github} onChange={(e) => handleFieldChange("github", e.target.value)} style={inputStyle} placeholder="GitHub URL" />
                    <input value={localData.portfolio} onChange={(e) => handleFieldChange("portfolio", e.target.value)} style={inputStyle} placeholder="Portfolio URL" />
                  </div>
                ) : (
                  <>
                    <span><FaEnvelope color={colors.border}/> {localData.email}</span>
                    <span><FaPhoneAlt color={colors.border}/> {localData.phone}</span>
                    <span><FaMapMarkerAlt color={colors.border}/> {localData.location}</span>
                    {localData.linkedin && <a href={localData.linkedin} style={{color: 'inherit', textDecoration: 'none'}}><FaLinkedin color={colors.border}/> LinkedIn</a>}
                    {localData.github && <a href={localData.github} style={{color: 'inherit', textDecoration: 'none'}}><FaGithub color={colors.border}/> GitHub</a>}
                    {localData.portfolio && <a href={localData.portfolio} style={{color: 'inherit', textDecoration: 'none'}}><FaGlobe color={colors.border}/> Portfolio</a>}
                  </>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "2rem", marginTop: '1rem' }}>
              {/* LEFT COLUMN */}
              <div style={{ width: "35%" }}>
                <h3 style={sectionTitleStyle}>
                  Skills
                  {editMode && <FaPlus size={12} onClick={() => handleAddItem("skills", "New Skill")} style={{cursor:'pointer'}}/>}
                </h3>
                <div style={{ padding: "0.5rem" }}>
                  {(localData.skills || []).map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      {editMode ? (
                        <>
                          <input value={s} onChange={(e) => {
                            const newSkills = [...localData.skills]; newSkills[i] = e.target.value; handleFieldChange("skills", newSkills);
                          }} style={inputStyle} />
                          <FaTrash size={10} color="red" onClick={() => handleRemoveItem("skills", i)} style={{cursor:'pointer', marginLeft:'5px'}}/>
                        </>
                      ) : <div>• {s}</div>}
                    </div>
                  ))}
                </div>

                <h3 style={sectionTitleStyle}>
                  Languages
                  {editMode && <FaPlus size={12} onClick={() => handleAddItem("languagesDetailed", { language: "", proficiency: "" })} style={{cursor:'pointer'}}/>}
                </h3>
                <div style={{ padding: "0.5rem" }}>
                  {(localData.languagesDetailed || []).map((lang, i) => (
                    <div key={i} style={{ marginBottom: '8px' }}>
                      {editMode ? (
                        <div style={{display:'grid', gap:'2px'}}>
                          <input value={lang.language} onChange={(e) => handleArrayFieldChange("languagesDetailed", i, "language", e.target.value)} style={inputStyle} placeholder="Language"/>
                          <input value={lang.proficiency} onChange={(e) => handleArrayFieldChange("languagesDetailed", i, "proficiency", e.target.value)} style={inputStyle} placeholder="Level"/>
                          <FaTrash size={10} color="red" onClick={() => handleRemoveItem("languagesDetailed", i)} />
                        </div>
                      ) : <div><strong>{lang.language}</strong>: {lang.proficiency}</div>}
                    </div>
                  ))}
                </div>

                <h3 style={sectionTitleStyle}>
                  Achievements
                  {editMode && <FaPlus size={12} onClick={() => handleAddItem("achievements", { title: "", description: "", year: "" })} style={{cursor:'pointer'}}/>}
                </h3>
                <div style={{ padding: "0.5rem" }}>
                  {(localData.achievements || []).map((a, i) => (
                    <div key={i} style={{ marginBottom: "10px", borderLeft: `2px solid ${colors.border}`, paddingLeft: '8px' }}>
                      {editMode ? (
                        <div style={{display:'grid', gap:'4px'}}>
                          <input value={a.title} onChange={(e) => handleArrayFieldChange("achievements", i, "title", e.target.value)} style={inputStyle} placeholder="Title"/>
                          <input value={a.year} onChange={(e) => handleArrayFieldChange("achievements", i, "year", e.target.value)} style={inputStyle} placeholder="Year"/>
                          <textarea value={a.description} onChange={(e) => handleArrayFieldChange("achievements", i, "description", e.target.value)} style={inputStyle} placeholder="Details"/>
                          <FaTrash size={10} color="red" onClick={() => handleRemoveItem("achievements", i)} />
                        </div>
                      ) : (
                        <>
                          <div style={{fontWeight: 'bold', fontSize:'0.9rem'}}>{a.title} {a.year && `(${a.year})`}</div>
                          <div style={{fontSize:'0.8rem', color: colors.textMuted}}>{a.description}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div style={{ width: "65%" }}>
                <h3 style={sectionTitleStyle}>Profile Summary</h3>
                <div style={{ padding: "0.5rem" }}>
                  {editMode ? <textarea value={localData.summary} onChange={(e) => handleFieldChange("summary", e.target.value)} style={{ ...inputStyle, minHeight: "100px" }} /> : <p style={{ fontSize: "0.95rem", lineHeight: '1.5', margin: 0 }}>{localData.summary}</p>}
                </div>

                <h3 style={sectionTitleStyle}>
                  Work Experience
                  {editMode && <FaPlus size={12} onClick={() => handleAddItem("experience", { companyName: "", title: "", date: "", accomplishment: [] })} style={{cursor:'pointer'}}/>}
                </h3>
                {(localData.experience || []).map((exp, i) => (
                  <div key={i} style={{ marginBottom: "15px" }}>
                    {editMode ? (
                      <div style={{display:'grid', gap:'5px', border: '1px dashed #ccc', padding: '10px'}}>
                        <input value={exp.title} onChange={(e) => handleArrayFieldChange("experience", i, "title", e.target.value)} style={inputStyle} placeholder="Job Title" />
                        <input value={exp.companyName} onChange={(e) => handleArrayFieldChange("experience", i, "companyName", e.target.value)} style={inputStyle} placeholder="Company" />
                        <input value={exp.date} onChange={(e) => handleArrayFieldChange("experience", i, "date", e.target.value)} style={inputStyle} placeholder="Duration" />
                        <textarea value={exp.accomplishment?.join('\n')} onChange={(e) => handleArrayFieldChange("experience", i, "accomplishment", e.target.value.split('\n'))} style={inputStyle} placeholder="Accomplishments (one per line)" />
                        <button onClick={() => handleRemoveItem("experience", i)} style={{color:'red', border:'none', background:'none', cursor:'pointer'}}><FaTrash/> Remove Position</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: "bold" }}>
                          <span>{exp.title}</span>
                          <span style={{color: colors.border}}>{exp.date}</span>
                        </div>
                        <div style={{ fontStyle: "italic", fontSize: "0.9rem", marginBottom: '5px' }}>{exp.companyName}</div>
                        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', margin: 0 }}>
                          {exp.accomplishment?.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                ))}

                <h3 style={sectionTitleStyle}>
                  Technical Projects
                  {editMode && <FaPlus size={12} onClick={() => handleAddItem("projects", { title: "", duration: "", description: "", technologies: [], link: "", githubLink: "" })} style={{cursor:'pointer'}}/>}
                </h3>
                {(localData.projects || []).map((proj, i) => (
                  <div key={i} style={{ marginBottom: "15px", padding: '10px', backgroundColor: colors.cardBg, borderRadius: '8px' }}>
                    {editMode ? (
                      <div style={{display:'grid', gap:'5px'}}>
                        <input value={proj.title} onChange={(e) => handleArrayFieldChange("projects", i, "title", e.target.value)} style={inputStyle} placeholder="Project Name" />
                        <input value={proj.duration} onChange={(e) => handleArrayFieldChange("projects", i, "duration", e.target.value)} style={inputStyle} placeholder="Duration" />
                        <input value={proj.technologies?.join(', ')} onChange={(e) => handleArrayFieldChange("projects", i, "technologies", e.target.value.split(', '))} style={inputStyle} placeholder="Stack (comma separated)" />
                        <input value={proj.link} onChange={(e) => handleArrayFieldChange("projects", i, "link", e.target.value)} style={inputStyle} placeholder="Live Demo Link" />
                        <input value={proj.githubLink} onChange={(e) => handleArrayFieldChange("projects", i, "githubLink", e.target.value)} style={inputStyle} placeholder="GitHub URL" />
                        <textarea value={proj.description} onChange={(e) => handleArrayFieldChange("projects", i, "description", e.target.value)} style={inputStyle} />
                        <button onClick={() => handleRemoveItem("projects", i)} style={{color:'red', border:'none', background:'none'}}><FaTrash/> Remove Project</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ fontWeight: "bold", display: 'flex', justifyContent:'space-between' }}>
                          <span>{proj.title}</span>
                          <span style={{fontSize:'0.8rem', color: colors.textMuted}}><FaCalendarAlt size={10}/> {proj.duration}</span>
                        </div>
                        <div style={{display:'flex', gap:'10px', marginTop: '4px'}}>
                          {proj.githubLink && <a href={proj.githubLink} target="_blank" rel="noreferrer" style={{color: colors.textDark}}><FaGithub size={14}/></a>}
                          {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" style={{color: colors.textDark}}><FaLink size={14}/></a>}
                        </div>
                        <div style={{fontSize: '0.8rem', color: colors.border, fontWeight: 'bold', marginTop: '4px'}}>Stack: {proj.technologies?.join(', ')}</div>
                        <p style={{ fontSize: "0.88rem", margin: "5px 0" }}>{proj.description}</p>
                      </>
                    )}
                  </div>
                ))}

                <h3 style={sectionTitleStyle}>
                  Education
                  {editMode && <FaPlus size={12} onClick={() => handleAddItem("education", { degree: "", institution: "", duration: "", grade: "" })} style={{cursor:'pointer'}}/>}
                </h3>
                {(localData.education || []).map((edu, i) => (
                  <div key={i} style={{ marginBottom: "12px" }}>
                    {editMode ? (
                      <div style={{display:'grid', gap:'4px', border: '1px dashed #ccc', padding: '10px'}}>
                        <input value={edu.degree} onChange={(e) => handleArrayFieldChange("education", i, "degree", e.target.value)} style={inputStyle} placeholder="Degree" />
                        <input value={edu.institution} onChange={(e) => handleArrayFieldChange("education", i, "institution", e.target.value)} style={inputStyle} placeholder="Institution" />
                        <input value={edu.duration} onChange={(e) => handleArrayFieldChange("education", i, "duration", e.target.value)} style={inputStyle} placeholder="Year" />
                        <input value={edu.grade} onChange={(e) => handleArrayFieldChange("education", i, "grade", e.target.value)} style={inputStyle} placeholder="Grade/GPA" />
                        <button onClick={() => handleRemoveItem("education", i)} style={{color:'red', border:'none', background:'none', cursor:'pointer'}}><FaTrash/> Remove</button>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: "bold" }}>
                          <span>{edu.degree}</span>
                          <span style={{color: colors.border}}>{edu.duration}</span>
                        </div>
                        <div style={{ fontSize: "0.9rem" }}>{edu.institution} {edu.grade && `| GPA: ${edu.grade}`}</div>
                      </>
                    )}
                  </div>
                ))}

                <h3 style={sectionTitleStyle}>
                  Certifications
                  {editMode && <FaPlus size={12} onClick={() => handleAddItem("certifications", { title: "", issuer: "", date: "" })} style={{cursor:'pointer'}}/>}
                </h3>
                {(localData.certifications || []).map((cert, i) => (
                  <div key={i} style={{ marginBottom: '8px' }}>
                    {editMode ? (
                      <div style={{display:'grid', gap:'4px', padding:'5px', border:'1px dashed #ccc'}}>
                        <input value={cert.title} onChange={(e) => handleArrayFieldChange("certifications", i, "title", e.target.value)} style={inputStyle} placeholder="Certificate Name" />
                        <input value={cert.issuer} onChange={(e) => handleArrayFieldChange("certifications", i, "issuer", e.target.value)} style={inputStyle} placeholder="Issuer" />
                        <input value={cert.date} onChange={(e) => handleArrayFieldChange("certifications", i, "date", e.target.value)} style={inputStyle} placeholder="Year" />
                        <FaTrash size={12} color="red" onClick={() => handleRemoveItem("certifications", i)} style={{cursor:'pointer'}}/>
                      </div>
                    ) : (
                      <div style={{ fontSize: "0.9rem", display:'flex', gap:'8px', alignItems:'center' }}>
                        <FaCertificate color={colors.border}/>
                        <span><strong>{cert.title}</strong> — {cert.issuer} ({cert.date})</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ marginTop: "2rem", display: "flex", gap: "1.5rem" }}>
            {!editMode ? (
              <button onClick={() => setEditMode(true)} style={{ backgroundColor: colors.border, color: "#fff", padding: "12px 30px", borderRadius: "30px", border: "none", cursor: "pointer", fontWeight: "bold" }}><FaEdit /> Edit Innovator Profile</button>
            ) : (
              <>
                <button onClick={handleSave} style={{ backgroundColor: "#16a34a", color: "#fff", padding: "12px 30px", borderRadius: "30px", border: "none", cursor: "pointer", fontWeight: "bold" }}><FaSave /> Save Changes</button>
                <button onClick={() => setEditMode(false)} style={{ backgroundColor: "#ef4444", color: "#fff", padding: "12px 30px", borderRadius: "30px", border: "none", cursor: "pointer", fontWeight: "bold" }}><FaTimes /> Discard</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template21;