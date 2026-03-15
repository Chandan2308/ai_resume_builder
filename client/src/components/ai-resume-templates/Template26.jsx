import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaLink, FaGithub } from "react-icons/fa";

const TechSpecialist = () => {
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
    updated[index] = { ...updated[index], [key]: value };
    setLocalData({ ...localData, [section]: updated });
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

  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" },
    page: {
      maxWidth: "800px", width: "100%", margin: "20px auto", padding: "0.5in 0.7in",
      backgroundColor: "#ffffff", color: "#000", boxSizing: "border-box",
      fontFamily: "'Times New Roman', Times, serif", lineHeight: "1.5", fontSize: "11.5pt",
      display: "flex", flexDirection: "column", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    sectionTitle: {
      fontWeight: "bold", fontSize: "12.5pt", textTransform: "uppercase", borderBottom: "1.5px solid #000",
      marginTop: "14pt", marginBottom: "5pt", display: "flex", justifyContent: "space-between", alignItems: "center"
    },
    bodyText: { fontSize: "11.5pt", color: "#000" },
    descText: { fontSize: "10.5pt", color: "#333", margin: "2pt 0" },
    input: { width: "100%", padding: "5px", border: "1px dashed #3b82f6", borderRadius: "3px", fontSize: "inherit", fontFamily: "serif", background: "#f0f7ff", outline: "none", marginBottom: "3px" },
    modernBtn: { display: "flex", alignItems: "center", gap: "8px", padding: "12px 28px", borderRadius: "12px", border: "none", fontWeight: "700", cursor: "pointer" }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={{ display: "flex", flexGrow: 1 }}>
        <Sidebar templateKey="template26" onEnhance={() => { }} resumeRef={resumeRef} />
        <div style={{ flexGrow: 1, padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <div ref={resumeRef} className="resume-page" style={styles.page}>
            {/* HEADER */}
            <header style={{ textAlign: "center", marginBottom: "10pt" }}>
              <div style={{ fontSize: "24pt", fontWeight: "bold", textTransform: "uppercase" }}>
                {editMode ? <input style={{...styles.input, textAlign: 'center'}} value={localData.name} onChange={e => handleFieldChange("name", e.target.value)} /> : (resumeData.name || "YOUR NAME")}
              </div>
              <div style={{ fontSize: "10.5pt", marginTop: "4pt" }}>
                {editMode ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
                    <input style={styles.input} value={localData.email} onChange={e => handleFieldChange("email", e.target.value)} placeholder="Email" />
                    <input style={styles.input} value={localData.phone} onChange={e => handleFieldChange("phone", e.target.value)} placeholder="Phone" />
                    <input style={styles.input} value={localData.location} onChange={e => handleFieldChange("location", e.target.value)} placeholder="Location" />
                    <input style={styles.input} value={localData.linkedin} onChange={e => handleFieldChange("linkedin", e.target.value)} placeholder="LinkedIn" />
                    <input style={styles.input} value={localData.github} onChange={e => handleFieldChange("github", e.target.value)} placeholder="GitHub" />
                    <input style={styles.input} value={localData.portfolio} onChange={e => handleFieldChange("portfolio", e.target.value)} placeholder="Portfolio" />
                  </div>
                ) : (
                  <>
                    <span>{resumeData.email} | {resumeData.phone} | {resumeData.location}</span><br />
                    <span>{resumeData.linkedin} {resumeData.github && `| ${resumeData.github}`} {resumeData.portfolio && `| ${resumeData.portfolio}`}</span>
                  </>
                )}
              </div>
            </header>

            {/* SUMMARY */}
            <div style={styles.sectionTitle}>Professional Summary</div>
            {editMode ? <textarea style={{...styles.input, minHeight: '70px'}} value={localData.summary} onChange={e => handleFieldChange("summary", e.target.value)} /> : <p style={{ margin: 0, textAlign: 'justify', fontSize: '11pt' }}>{resumeData.summary}</p>}

            {/* EXPERIENCE */}
            <div style={styles.sectionTitle}>
              Experience
              {editMode && <button onClick={() => handleAddItem("experience", { companyName: "", title: "", date: "", companyLocation: "", accomplishment: [""] })} style={{fontSize: '9px'}}>+ Add Job</button>}
            </div>
            {(localData.experience || []).map((exp, i) => (
              <div key={i} style={{ marginBottom: "10pt" }}>
                {editMode ? (
                  <div style={{display: 'grid', gap: '3px', border: '1px solid #ddd', padding: '8px', marginBottom: '8px'}}>
                    <input style={styles.input} value={exp.companyName} onChange={e => handleArrayFieldChange("experience", i, "companyName", e.target.value)} placeholder="Company" />
                    <input style={styles.input} value={exp.title} onChange={e => handleArrayFieldChange("experience", i, "title", e.target.value)} placeholder="Job Title" />
                    <input style={styles.input} value={exp.date} onChange={e => handleArrayFieldChange("experience", i, "date", e.target.value)} placeholder="Dates" />
                    <input style={styles.input} value={exp.companyLocation} onChange={e => handleArrayFieldChange("experience", i, "companyLocation", e.target.value)} placeholder="Location" />
                    <button onClick={() => handleRemoveItem("experience", i)} style={{color:'red', fontSize:'10px'}}>Remove Job</button>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}><span>{exp.companyName}</span><span>{exp.date}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontStyle: "italic", fontSize: '11pt' }}><span>{exp.title}</span><span>{exp.companyLocation}</span></div>
                  </>
                )}
                <ul style={{ margin: "3pt 0", paddingLeft: "1.5rem", fontSize: '10.5pt' }}>
                  {(exp.accomplishment || []).map((bullet, j) => (
                    <li key={j}>
                      {editMode ? <input style={styles.input} value={bullet} onChange={e => {
                        const newB = [...exp.accomplishment]; newB[j] = e.target.value;
                        handleArrayFieldChange("experience", i, "accomplishment", newB);
                      }} /> : bullet}
                    </li>
                  ))}
                  {editMode && <button onClick={() => { const newB = [...(exp.accomplishment || []), ""]; handleArrayFieldChange("experience", i, "accomplishment", newB); }} style={{fontSize: '9px'}}>+ Bullet</button>}
                </ul>
              </div>
            ))}

            {/* PROJECTS */}
            <div style={styles.sectionTitle}>
              Projects
              {editMode && <button onClick={() => handleAddItem("projects", { title: "", technologies: "", description: "", duration: "", link: "", githubLink: "" })} style={{fontSize: '9px'}}>+ Add Project</button>}
            </div>
            {(localData.projects || []).map((proj, i) => (
              <div key={i} style={{ marginBottom: "8pt" }}>
                {editMode ? (
                  <div style={{display:'grid', gap: '3px', border: '1px solid #eee', padding: '8px'}}>
                    <input style={styles.input} value={proj.title} onChange={e => handleArrayFieldChange("projects", i, "title", e.target.value)} placeholder="Project Name" />
                    <input style={styles.input} value={proj.duration} onChange={e => handleArrayFieldChange("projects", i, "duration", e.target.value)} placeholder="Year/Duration" />
                    <input style={styles.input} value={proj.technologies} onChange={e => handleArrayFieldChange("projects", i, "technologies", e.target.value)} placeholder="Technologies" />
                    <input style={styles.input} value={proj.link} onChange={e => handleArrayFieldChange("projects", i, "link", e.target.value)} placeholder="Demo URL" />
                    <input style={styles.input} value={proj.githubLink} onChange={e => handleArrayFieldChange("projects", i, "githubLink", e.target.value)} placeholder="GitHub URL" />
                    <textarea style={styles.input} value={proj.description} onChange={e => handleArrayFieldChange("projects", i, "description", e.target.value)} />
                    <button onClick={() => handleRemoveItem("projects", i)} style={{color:'red', fontSize:'10px'}}>Remove</button>
                  </div>
                ) : (
                  <>
                    <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{proj.title} | {Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies}</span>
                      <span>{proj.duration}</span>
                    </div>
                    <p style={styles.descText}>{proj.description}</p>
                    <div style={{fontSize: '9.5pt', display: 'flex', gap: '15px', color: '#444'}}>
                      {proj.link && <span><FaLink size={9}/> {proj.link}</span>}
                      {proj.githubLink && <span><FaGithub size={9}/> {proj.githubLink}</span>}
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* SKILLS & LANGUAGES */}
            <div style={styles.sectionTitle}>Skills & Languages</div>
            <div style={styles.bodyText}>
              {editMode ? <input style={styles.input} value={localData.skills?.join(", ")} onChange={e => handleFieldChange("skills", e.target.value.split(", "))} placeholder="React, Python, etc." /> : <div><strong>Technical Skills:</strong> {resumeData.skills?.join(", ")}</div>}
              <div style={{marginTop: '5pt'}}>
                <strong>Languages:</strong> {editMode && <button onClick={() => handleAddItem("languagesDetailed", { language: "", proficiency: "" })} style={{fontSize: '9px'}}>+</button>}
                <div style={{display: 'inline-flex', gap: '10px', marginLeft: '5px'}}>
                  {(localData.languagesDetailed || []).map((lang, i) => (
                    <span key={i}>
                      {editMode ? (
                        <span style={{display: 'flex', gap: '2px'}}>
                          <input style={{...styles.input, width: '70px'}} value={lang.language} onChange={e => handleArrayFieldChange("languagesDetailed", i, "language", e.target.value)} />
                          <FaTrash size={9} color="red" onClick={() => handleRemoveItem("languagesDetailed", i)} />
                        </span>
                      ) : `${lang.language} (${lang.proficiency})`}
                      {i < (localData.languagesDetailed?.length - 1) && !editMode ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* EDUCATION */}
            <div style={styles.sectionTitle}>
              Education
              {editMode && <button onClick={() => handleAddItem("education", { institution: "", degree: "", duration: "", grade: "" })} style={{fontSize: '9px'}}>+ Add</button>}
            </div>
            {(localData.education || []).map((edu, i) => (
              <div key={i} style={{ marginBottom: "5pt" }}>
                {editMode ? (
                  <div style={{display: 'grid', gap: '3px', border: '1px solid #eee', padding: '8px'}}>
                    <input style={styles.input} value={edu.institution} onChange={e => handleArrayFieldChange("education", i, "institution", e.target.value)} />
                    <input style={styles.input} value={edu.degree} onChange={e => handleArrayFieldChange("education", i, "degree", e.target.value)} />
                    <input style={styles.input} value={edu.duration} onChange={e => handleArrayFieldChange("education", i, "duration", e.target.value)} />
                    <input style={styles.input} value={edu.grade} onChange={e => handleArrayFieldChange("education", i, "grade", e.target.value)} />
                    <button onClick={() => handleRemoveItem("education", i)} style={{color:'red', fontSize:'10px'}}>Remove</button>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}><span>{edu.institution}</span><span>{edu.duration}</span></div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: '11pt' }}><span>{edu.degree}</span><span>{edu.grade && `GPA: ${edu.grade}`}</span></div>
                  </>
                )}
              </div>
            ))}

            {/* CERTIFICATIONS */}
            <div style={styles.sectionTitle}>
              Certifications
              {editMode && <button onClick={() => handleAddItem("certifications", { title: "", issuer: "", date: "" })} style={{fontSize: '9px'}}>+ Add</button>}
            </div>
            {(localData.certifications || []).map((cert, i) => (
              <div key={i} style={{ marginBottom: "4pt" }}>
                {editMode ? (
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '5px'}}>
                    <input style={styles.input} value={cert.title} onChange={e => handleArrayFieldChange("certifications", i, "title", e.target.value)} placeholder="Title" />
                    <input style={styles.input} value={cert.issuer} onChange={e => handleArrayFieldChange("certifications", i, "issuer", e.target.value)} placeholder="Issuer" />
                    <input style={styles.input} value={cert.date} onChange={e => handleArrayFieldChange("certifications", i, "date", e.target.value)} placeholder="Year" />
                    <FaTrash size={12} color="red" onClick={() => handleRemoveItem("certifications", i)} style={{cursor: 'pointer', alignSelf: 'center'}} />
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: '11pt' }}>
                    <span><strong>{cert.title}</strong>, {cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                )}
              </div>
            ))}

            {/* ACHIEVEMENTS */}
            <div style={styles.sectionTitle}>
              Achievements
              {editMode && <button onClick={() => handleAddItem("achievements", { title: "", year: "", description: "" })} style={{fontSize: '9px'}}>+ Add</button>}
            </div>
            {(localData.achievements || []).map((ach, i) => (
              <div key={i} style={{ marginBottom: "8pt" }}>
                {editMode ? (
                  <div style={{display: 'grid', gap: '3px', border: '1px solid #eee', padding: '8px'}}>
                    <input style={styles.input} value={ach.title} onChange={e => handleArrayFieldChange("achievements", i, "title", e.target.value)} placeholder="Achievement Title" />
                    <input style={styles.input} value={ach.year} onChange={e => handleArrayFieldChange("achievements", i, "year", e.target.value)} placeholder="Year" />
                    <textarea style={styles.input} value={ach.description} onChange={e => handleArrayFieldChange("achievements", i, "description", e.target.value)} placeholder="Description" />
                    <button onClick={() => handleRemoveItem("achievements", i)} style={{color:'red', fontSize:'10px'}}>Remove</button>
                  </div>
                ) : (
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

          <div style={{ marginTop: "2rem", display: "flex", gap: "1.5rem" }}>
            {!editMode ? (
              <button onClick={() => setEditMode(true)} style={{...styles.modernBtn, background: "#1e293b", color: "#fff"}}><FaEdit /> Quick Edit Specialist</button>
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

export default TechSpecialist;