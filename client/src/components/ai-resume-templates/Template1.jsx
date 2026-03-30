import React, { useState, useRef, useEffect } from "react";
import { toast } from 'react-toastify';
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { useAuth } from "../../context/AuthContext";
import resumeService from "../../services/resumeService";
import LoginPrompt from "../auth/LoginPrompt";
import useResumeBodyStyle from "../../hooks/useResumeBodyStyle";

const defaultLocalData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  website: "",
  experience: [],
  projects: [],
  education: [],
  skills: [],
  languages: [],
  references: [],
  textColor: "#000000",
  font: "serif"
};

const Template26 = () => {
  const resumeContext = useResume();
  const { isAuthenticated } = useAuth();

  const resumeData = resumeContext?.resumeData || {};
  const updateResumeData = resumeContext?.updateResumeData;

  const [localData, setLocalData] = useState(resumeData);
  const [editMode, setEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [isSavingToDatabase, setIsSavingToDatabase] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const resumeRef = useRef();
  const resumeBodyStyle = useResumeBodyStyle();

  useEffect(() => {
    if (!isAuthenticated) setShowLoginPrompt(true);
  }, [isAuthenticated]);

  useEffect(() => {
    if (resumeData) setLocalData(JSON.parse(JSON.stringify(resumeData)));
  }, [resumeData]);

  const handleInputChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    localStorage.setItem('resumeData', JSON.stringify(updatedData));
  };

  const handleObjectChange = (section, index, field, value) => {
    const updatedSection = [...(localData[section] || [])];
    if (updatedSection[index]) {
      updatedSection[index] = { ...updatedSection[index], [field]: value };
    }
    const updatedData = { ...localData, [section]: updatedSection };
    setLocalData(updatedData);
    localStorage.setItem('resumeData', JSON.stringify(updatedData));
  };

  const addItem = (section, newItem) => {
    const updatedData = { ...localData, [section]: [...(localData[section] || []), newItem] };
    setLocalData(updatedData);
    localStorage.setItem('resumeData', JSON.stringify(updatedData));
  };

  const removeItem = (section, index) => {
    const updatedSection = (localData[section] || []).filter((_, i) => i !== index);
    const updatedData = { ...localData, [section]: updatedSection };
    setLocalData(updatedData);
    localStorage.setItem('resumeData', JSON.stringify(updatedData));
  };

  const handleSave = async () => {
    try {
      setSaveStatus('Saving...');
      setIsSavingToDatabase(true);
      if (!resumeContext) throw new Error('Resume context is not available.');
      if (typeof updateResumeData !== 'function') throw new Error('updateResumeData is not a function.');
      await updateResumeData(localData);
      if (isAuthenticated) {
        const structuredData = {
          templateId: 26,
          personalInfo: {
            name: localData.name || '', role: localData.role || '', email: localData.email || '',
            phone: localData.phone || '', location: localData.location || '',
            linkedin: localData.linkedin || '', github: localData.github || '', portfolio: localData.portfolio || ''
          },
          summary: localData.summary || '',
          skills: localData.skills || [],
          experience: localData.experience || [],
          education: localData.education || [],
          projects: localData.projects || [],
          certifications: localData.certifications || [],
          achievements: localData.achievements || [],
          interests: localData.interests || [],
          languages: localData.languages || []
        };
        const saveResult = await resumeService.saveResumeData(structuredData);
        if (saveResult.success) toast.success('Resume saved to database');
        else toast.error('Failed to save');
      }
      setEditMode(false);
      setSaveStatus('Data saved successfully');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error("Error saving:", error);
      setSaveStatus(`Error: ${error.message}`);
      toast.error('Failed to save');
      setTimeout(() => setSaveStatus(''), 5000);
    } finally {
      setIsSavingToDatabase(false);
    }
  };

  const handleCancel = () => {
    setLocalData(resumeData ? JSON.parse(JSON.stringify(resumeData)) : {});
    setEditMode(false);
    setSaveStatus('');
  };

  const handleSaveLocal = () => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(localData));
      setEditMode(false);
      setSaveStatus('Saved locally!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Error saving locally');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleEnhance = (section) => {};
  const handleFontChange = (font) => setLocalData({ ...localData, font });
  const handleColorChange = (color) => setLocalData({ ...localData, textColor: color });
  const handleDownload = () => {};

  // ─── Data guards ──────────────────────────────────────────────────────────────
  const hasSkillData = Array.isArray(localData.skills) && localData.skills.some(s => typeof s === "string" && s.trim());
  const hasEducationData = Array.isArray(localData.education) && localData.education.some(e => e?.degree?.trim() || e?.institution?.trim() || e?.year?.trim());
  const hasAchievementData = Array.isArray(localData.achievements) && localData.achievements.some(a => typeof a === "string" && a.trim());
  const hasCertificationData = Array.isArray(localData.certifications) && localData.certifications.some(c => c?.name?.trim() || c?.organization?.trim());
  const hasInterestData = Array.isArray(localData.interests) && localData.interests.some(i => typeof i === "string" && i.trim());
  const hasExperienceData = Array.isArray(localData.experience) && localData.experience.some(e => e?.title?.trim() || e?.company?.trim() || e?.description?.trim());
  const hasLanguagesData = Array.isArray(localData.languages) && localData.languages.some(l => l?.language?.trim() || l?.proficiency?.trim());
  const hasProjectData = Array.isArray(localData.projects) && localData.projects.some(p => p?.name?.trim() || p?.description?.trim());
  const hasReferencesData = Array.isArray(localData.references) && localData.references.some(r => r?.name?.trim() || r?.title?.trim());

  const accentColor = localData.textColor || "#0a91b2";

  // ─── Shared heading style ─────────────────────────────────────────────────────
  const sectionHeading = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    borderBottom: `2px solid ${accentColor}`,
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
    color: accentColor,
  };

  const enhanceBtn = {
    backgroundColor: "#f59e0b",
    color: "white",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    fontSize: "0.75rem",
    cursor: "pointer",
    border: "none",
  };

  const inputStyle = (extra = {}) => ({
    border: "1px solid #d1d5db",
    borderRadius: "0.25rem",
    padding: "0.5rem",
    outline: "none",
    width: "100%",
    ...extra,
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar
          onEnhance={handleEnhance}
          resumeRef={resumeRef}
          onFontChange={handleFontChange}
          onColorChange={handleColorChange}
          onDownload={handleDownload}
        />

        <div style={{ flexGrow: 1, padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* ── Resume root — receives all live style settings ── */}
          <div
            ref={resumeRef}
            className="resume-root"
            style={{
              backgroundColor: "#ffffff",
              color: "#1f2937",
              maxWidth: "72rem",
              width: "100%",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              padding: "2.5rem",
              // Live style from Design & Formatting panel
              ...resumeBodyStyle,
            }}
          >
            {/* ── Header ── */}
            <div style={{ borderBottom: `4px solid ${accentColor}`, paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={localData.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        style={{ ...inputStyle({ fontSize: "2.25rem", fontWeight: "bold", color: accentColor, marginBottom: "0.5rem" }) }}
                        placeholder="Your Name"
                      />
                      <input
                        type="text"
                        value={localData.domain || ""}
                        onChange={(e) => handleInputChange("domain", e.target.value)}
                        style={{ ...inputStyle({ fontSize: "1.25rem", color: "#6b7280" }) }}
                        placeholder="Your Professional Domain"
                      />
                    </>
                  ) : (
                    <>
                      <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: accentColor }}>
                        {localData.name || "Your Name"}
                      </h1>
                      <p style={{ fontSize: "1.25rem", color: "#6b7280" }}>
                        {localData.domain || "Your Professional Domain"}
                      </p>
                    </>
                  )}
                </div>

                <div style={{ flex: 1, maxWidth: "20rem" }}>
                  {editMode ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {["email", "phone", "location", "linkedin"].map((field) => (
                        <input
                          key={field}
                          type={field === "email" ? "email" : field === "linkedin" ? "url" : "text"}
                          value={localData[field] || ""}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          style={{ ...inputStyle({ fontSize: "0.875rem" }) }}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: "0.875rem", lineHeight: "1.5", textAlign: "right" }}>
                      {localData.email && <div>{localData.email}</div>}
                      {localData.phone && <div>{localData.phone}</div>}
                      {localData.location && <div>{localData.location}</div>}
                      {localData.linkedin && <div>{localData.linkedin}</div>}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Summary ── */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={sectionHeading}>Professional Summary</h3>
                {editMode && <button style={enhanceBtn} onClick={() => handleEnhance("summary")}>Enhance</button>}
              </div>
              {editMode ? (
                <textarea
                  value={localData.summary || ""}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  style={{ ...inputStyle({ minHeight: "4rem", resize: "vertical" }), fontSize: "0.875rem", lineHeight: "1.5" }}
                  placeholder="Write your professional summary here..."
                />
              ) : (
                <p style={{ fontSize: "0.875rem", lineHeight: "1.5", textAlign: "justify" }}>
                  {localData.summary || "Your professional summary will appear here."}
                </p>
              )}
            </div>

            {/* ── Main columns ── */}
            <div style={{ display: "flex", gap: "2rem" }}>
              {/* Left column */}
              <div style={{ width: "35%" }}>

                {/* Skills */}
                {(editMode || hasSkillData) && (
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={sectionHeading}>Skills</h3>
                      {editMode && <button style={enhanceBtn} onClick={() => handleEnhance("skills")}>Enhance</button>}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {localData.skills?.map((skill, idx) => (
                        <div key={idx} style={{ backgroundColor: `${accentColor}20`, color: accentColor, padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "500", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {editMode ? (
                            <>
                              <input type="text" value={skill} onChange={(e) => { const s = [...localData.skills]; s[idx] = e.target.value; setLocalData({ ...localData, skills: s }); }} style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.75rem", fontWeight: "500", minWidth: "50px" }} />
                              <button onClick={() => removeItem("skills", idx)} style={{ color: "#ef4444", border: "none", background: "none", fontWeight: "bold", cursor: "pointer" }}>×</button>
                            </>
                          ) : skill}
                        </div>
                      ))}
                      {editMode && <button onClick={() => addItem("skills", "New Skill")} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "0.75rem", border: "none", background: "none", cursor: "pointer" }}>+ Add Skill</button>}
                    </div>
                  </div>
                )}

                {/* Education */}
                {(editMode || hasEducationData) && (
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={sectionHeading}>Education</h3>
                      {editMode && <button style={enhanceBtn} onClick={() => handleEnhance("education")}>Enhance</button>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {localData.education?.map((edu, idx) => (
                        <div key={idx}>
                          {editMode ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              <input type="text" value={edu.degree} onChange={(e) => handleObjectChange("education", idx, "degree", e.target.value)} style={inputStyle({ fontSize: "0.875rem", fontWeight: "600" })} placeholder="Degree" />
                              <input type="text" value={edu.institution} onChange={(e) => handleObjectChange("education", idx, "institution", e.target.value)} style={inputStyle({ fontSize: "0.75rem" })} placeholder="Institution" />
                              <input type="text" value={edu.year} onChange={(e) => handleObjectChange("education", idx, "year", e.target.value)} style={inputStyle({ fontSize: "0.75rem" })} placeholder="Year" />
                              <button onClick={() => removeItem("education", idx)} style={{ color: "#ef4444", fontWeight: "bold", border: "none", background: "none", cursor: "pointer", alignSelf: "flex-start" }}>Remove</button>
                            </div>
                          ) : (
                            <>
                              <h4 style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.25rem" }}>{edu.degree}</h4>
                              <p style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>{edu.institution}</p>
                              <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>{edu.year}</p>
                            </>
                          )}
                        </div>
                      ))}
                      {editMode && <button onClick={() => addItem("education", { degree: "", institution: "", year: "" })} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "0.875rem", border: "none", background: "none", cursor: "pointer", alignSelf: "flex-start" }}>+ Add Education</button>}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {(editMode || hasAchievementData) && (
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={sectionHeading}>Achievements</h3>
                      {editMode && <button style={enhanceBtn} onClick={() => handleEnhance("achievements")}>Enhance</button>}
                    </div>
                    <ul style={{ paddingLeft: "1rem", fontSize: "0.875rem", lineHeight: "1.5" }}>
                      {localData.achievements?.map((achievement, idx) => (
                        <li key={idx} style={{ marginBottom: "0.5rem" }}>
                          {editMode ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <input type="text" value={achievement} onChange={(e) => { const a = [...localData.achievements]; a[idx] = e.target.value; setLocalData({ ...localData, achievements: a }); }} style={inputStyle({ flex: 1, fontSize: "0.875rem" })} placeholder="Achievement" />
                              <button onClick={() => removeItem("achievements", idx)} style={{ color: "#ef4444", fontWeight: "bold", border: "none", background: "none", cursor: "pointer" }}>×</button>
                            </div>
                          ) : achievement}
                        </li>
                      ))}
                      {editMode && <li><button onClick={() => addItem("achievements", "")} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "0.875rem", border: "none", background: "none", cursor: "pointer" }}>+ Add Achievement</button></li>}
                    </ul>
                  </div>
                )}

                {/* Certifications */}
                {(editMode || hasCertificationData) && (
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={sectionHeading}>Certifications</h3>
                      {editMode && <button style={enhanceBtn} onClick={() => handleEnhance("certifications")}>Enhance</button>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {localData.certifications?.map((cert, idx) => (
                        <div key={idx} style={{ padding: "0.75rem", backgroundColor: "#f8f9fa", borderRadius: "0.5rem", border: `1px solid ${accentColor}20` }}>
                          {editMode ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              <input type="text" value={cert.name} onChange={(e) => handleObjectChange("certifications", idx, "name", e.target.value)} style={inputStyle({ fontSize: "0.875rem", fontWeight: "600" })} placeholder="Certification Name" />
                              <input type="text" value={cert.organization} onChange={(e) => handleObjectChange("certifications", idx, "organization", e.target.value)} style={inputStyle({ fontSize: "0.75rem" })} placeholder="Issuing Organization" />
                              <input type="text" value={cert.year} onChange={(e) => handleObjectChange("certifications", idx, "year", e.target.value)} style={inputStyle({ fontSize: "0.75rem" })} placeholder="Year" />
                              <input type="text" value={cert.credentialId || ""} onChange={(e) => handleObjectChange("certifications", idx, "credentialId", e.target.value)} style={inputStyle({ fontSize: "0.75rem" })} placeholder="Credential ID (optional)" />
                              <button onClick={() => removeItem("certifications", idx)} style={{ color: "#ef4444", fontWeight: "bold", border: "none", background: "none", cursor: "pointer", alignSelf: "flex-start" }}>Remove</button>
                            </div>
                          ) : (
                            <>
                              <h4 style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.25rem" }}>{cert.name}</h4>
                              <p style={{ fontSize: "0.75rem", color: accentColor, fontWeight: "500", marginBottom: "0.25rem" }}>{cert.organization}</p>
                              <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>{cert.year}</p>
                              {cert.credentialId && <p style={{ fontSize: "0.75rem", color: "#6b7280", fontStyle: "italic" }}>Credential ID: {cert.credentialId}</p>}
                            </>
                          )}
                        </div>
                      ))}
                      {editMode && <button onClick={() => addItem("certifications", { name: "", organization: "", year: "", credentialId: "" })} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "0.875rem", border: "none", background: "none", cursor: "pointer", alignSelf: "flex-start" }}>+ Add Certification</button>}
                    </div>
                  </div>
                )}

                {/* Interests */}
                {(editMode || hasInterestData) && (
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={sectionHeading}>Interests</h3>
                      {editMode && <button style={enhanceBtn} onClick={() => handleEnhance("interests")}>Enhance</button>}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {localData.interests?.map((interest, idx) => (
                        <div key={idx} style={{ backgroundColor: "#f3f4f6", color: "#374151", padding: "0.5rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: "500", border: `1px solid ${accentColor}30`, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {editMode ? (
                            <>
                              <input type="text" value={interest} onChange={(e) => { const i = [...(localData.interests || [])]; i[idx] = e.target.value; setLocalData({ ...localData, interests: i }); }} style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.875rem", minWidth: "60px", color: "#374151" }} />
                              <button onClick={() => removeItem("interests", idx)} style={{ color: "#ef4444", fontWeight: "bold", border: "none", background: "none", cursor: "pointer" }}>×</button>
                            </>
                          ) : (
                            <>
                              <span>
                                {(() => {
                                  const map = { reading: '📚', books: '📚', music: '🎵', sports: '⚽', football: '⚽', basketball: '🏀', swimming: '🏊', running: '🏃', travel: '✈️', traveling: '✈️', photography: '📷', cooking: '👨‍🍳', art: '🎨', painting: '🎨', technology: '💻', coding: '💻', gaming: '🎮', movies: '🎬', yoga: '🧘', chess: '♟️', writing: '✍️' };
                                  const lower = interest.toLowerCase();
                                  for (const [k, v] of Object.entries(map)) { if (lower.includes(k)) return v; }
                                  return '🌟';
                                })()}
                              </span>
                              {interest}
                            </>
                          )}
                        </div>
                      ))}
                      {editMode && <button onClick={() => addItem("interests", "New Interest")} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "0.875rem", border: "1px dashed #2563eb", background: "none", padding: "0.5rem 0.75rem", borderRadius: "0.5rem", cursor: "pointer" }}>+ Add Interest</button>}
                    </div>
                  </div>
                )}
              </div>

              {/* Right column */}
              <div style={{ width: "65%" }}>

                {/* Experience */}
                {(editMode || hasExperienceData) && (
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={sectionHeading}>Experience</h3>
                      {editMode && <button style={enhanceBtn} onClick={() => handleEnhance("experience")}>Enhance</button>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      {localData.experience?.map((exp, idx) => (
                        <div key={idx}>
                          {editMode ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              <input type="text" value={exp.title} onChange={(e) => handleObjectChange("experience", idx, "title", e.target.value)} style={inputStyle({ fontSize: "1rem", fontWeight: "600" })} placeholder="Job Title" />
                              <input type="text" value={exp.company} onChange={(e) => handleObjectChange("experience", idx, "company", e.target.value)} style={inputStyle({ fontSize: "0.875rem", color: accentColor })} placeholder="Company" />
                              <input type="text" value={exp.duration} onChange={(e) => handleObjectChange("experience", idx, "duration", e.target.value)} style={inputStyle({ fontSize: "0.75rem" })} placeholder="Duration" />
                              <textarea value={exp.description} onChange={(e) => handleObjectChange("experience", idx, "description", e.target.value)} style={{ ...inputStyle({ fontSize: "0.875rem", lineHeight: "1.5", minHeight: "4rem", resize: "vertical" }) }} placeholder="Job description and responsibilities" />
                              <button onClick={() => removeItem("experience", idx)} style={{ color: "#ef4444", fontWeight: "bold", border: "none", background: "none", cursor: "pointer", alignSelf: "flex-start" }}>Remove Experience</button>
                            </div>
                          ) : (
                            <>
                              <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" }}>{exp.title}</h4>
                              <p style={{ fontSize: "0.875rem", color: accentColor, fontWeight: "500", marginBottom: "0.25rem" }}>{exp.company}</p>
                              <p style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.5rem" }}>{exp.duration}</p>
                              <p style={{ fontSize: "0.875rem", lineHeight: "1.5", textAlign: "justify" }}>{exp.description}</p>
                            </>
                          )}
                        </div>
                      ))}
                      {editMode && <button onClick={() => addItem("experience", { title: "", company: "", duration: "", description: "" })} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "0.875rem", border: "none", background: "none", cursor: "pointer", alignSelf: "flex-start" }}>+ Add Experience</button>}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {(editMode || hasLanguagesData) && (
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={sectionHeading}>Languages</h3>
                      {editMode && <button style={enhanceBtn} onClick={() => handleEnhance("languages")}>Enhance</button>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {localData.languages?.map((lang, idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", backgroundColor: "#f8f9fa", borderRadius: "0.5rem", border: `1px solid ${accentColor}20` }}>
                          {editMode ? (
                            <>
                              <div style={{ display: "flex", gap: "0.5rem", flex: 1 }}>
                                <input type="text" value={lang.language} onChange={(e) => handleObjectChange("languages", idx, "language", e.target.value)} style={{ ...inputStyle({ flex: 1, fontSize: "0.875rem", fontWeight: "600" }), width: "auto" }} placeholder="Language" />
                                <select value={lang.proficiency} onChange={(e) => handleObjectChange("languages", idx, "proficiency", e.target.value)} style={{ fontSize: "0.875rem", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.25rem 0.5rem", outline: "none", backgroundColor: "white" }}>
                                  {["Native", "Fluent", "Advanced", "Intermediate", "Basic"].map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                              </div>
                              <button onClick={() => removeItem("languages", idx)} style={{ color: "#ef4444", fontWeight: "bold", border: "none", background: "none", cursor: "pointer", marginLeft: "0.5rem" }}>×</button>
                            </>
                          ) : (
                            <>
                              <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151" }}>{lang.language}</span>
                              <span style={{ fontSize: "0.75rem", backgroundColor: { Native: '#10b981', Fluent: '#3b82f6', Advanced: '#8b5cf6', Intermediate: '#f59e0b', Basic: '#ef4444' }[lang.proficiency] || '#6b7280', color: "white", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontWeight: "500" }}>{lang.proficiency}</span>
                            </>
                          )}
                        </div>
                      ))}
                      {editMode && <button onClick={() => addItem("languages", { language: "New Language", proficiency: "Intermediate" })} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "0.875rem", border: "none", background: "none", cursor: "pointer" }}>+ Add Language</button>}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {(editMode || hasProjectData) && (
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={sectionHeading}>Projects</h3>
                      {editMode && <button style={enhanceBtn} onClick={() => handleEnhance("projects")}>Enhance</button>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      {localData.projects?.map((project, idx) => (
                        <div key={idx}>
                          {editMode ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              <input type="text" value={project.name} onChange={(e) => handleObjectChange("projects", idx, "name", e.target.value)} style={inputStyle({ fontSize: "1rem", fontWeight: "600" })} placeholder="Project Name" />
                              <input type="text" value={project.technologies} onChange={(e) => handleObjectChange("projects", idx, "technologies", e.target.value)} style={inputStyle({ fontSize: "0.875rem", color: accentColor })} placeholder="Technologies Used" />
                              <textarea value={project.description} onChange={(e) => handleObjectChange("projects", idx, "description", e.target.value)} style={{ ...inputStyle({ fontSize: "0.875rem", lineHeight: "1.5", minHeight: "4rem", resize: "vertical" }) }} placeholder="Project description" />
                              <button onClick={() => removeItem("projects", idx)} style={{ color: "#ef4444", fontWeight: "bold", border: "none", background: "none", cursor: "pointer", alignSelf: "flex-start" }}>Remove Project</button>
                            </div>
                          ) : (
                            <>
                              <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" }}>{project.name}</h4>
                              <p style={{ fontSize: "0.875rem", color: accentColor, fontWeight: "500", marginBottom: "0.5rem" }}>{project.technologies}</p>
                              <p style={{ fontSize: "0.875rem", lineHeight: "1.5", textAlign: "justify" }}>{project.description}</p>
                            </>
                          )}
                        </div>
                      ))}
                      {editMode && <button onClick={() => addItem("projects", { name: "", technologies: "", description: "" })} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "0.875rem", border: "none", background: "none", cursor: "pointer", alignSelf: "flex-start" }}>+ Add Project</button>}
                    </div>
                  </div>
                )}

                {/* References */}
                {(editMode || hasReferencesData) && (
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={sectionHeading}>References</h3>
                      {editMode && <button style={enhanceBtn} onClick={() => handleEnhance("references")}>Enhance</button>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {localData.references?.map((ref, idx) => (
                        <div key={idx} style={{ padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "0.5rem", border: `1px solid ${accentColor}20` }}>
                          {editMode ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              <input type="text" value={ref.name} onChange={(e) => handleObjectChange("references", idx, "name", e.target.value)} style={inputStyle({ fontSize: "0.875rem", fontWeight: "600" })} placeholder="Reference Name" />
                              <input type="text" value={ref.title} onChange={(e) => handleObjectChange("references", idx, "title", e.target.value)} style={inputStyle({ fontSize: "0.75rem" })} placeholder="Title/Position" />
                              <input type="email" value={ref.contact} onChange={(e) => handleObjectChange("references", idx, "contact", e.target.value)} style={inputStyle({ fontSize: "0.75rem" })} placeholder="Contact Information" />
                              <button onClick={() => removeItem("references", idx)} style={{ color: "#ef4444", fontWeight: "bold", border: "none", background: "none", cursor: "pointer", alignSelf: "flex-start" }}>Remove Reference</button>
                            </div>
                          ) : (
                            <>
                              <h4 style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.25rem" }}>{ref.name}</h4>
                              <p style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.25rem" }}>{ref.title}</p>
                              <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>{ref.contact}</p>
                            </>
                          )}
                        </div>
                      ))}
                      {editMode && <button onClick={() => addItem("references", { name: "", title: "", contact: "" })} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "0.875rem", border: "none", background: "none", cursor: "pointer" }}>+ Add Reference</button>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Edit / Save buttons ── */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", alignItems: "center" }}>
            {editMode ? (
              <>
                <button
                  onClick={typeof updateResumeData === 'function' ? handleSave : handleSaveLocal}
                  disabled={saveStatus === 'Saving...'}
                  style={{ backgroundColor: saveStatus === 'Saving...' ? "#9ca3af" : "#10b981", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none", fontSize: "1rem", fontWeight: "600", cursor: saveStatus === 'Saving...' ? "not-allowed" : "pointer" }}
                >
                  {saveStatus === 'Saving...' ? 'Saving...' : 'Save Changes'}
                </button>
                <button onClick={handleCancel} disabled={saveStatus === 'Saving...'} style={{ backgroundColor: "#6b7280", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none", fontSize: "1rem", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
                {saveStatus && <span style={{ fontSize: "0.875rem", color: saveStatus.includes('Error') ? "#ef4444" : "#10b981", fontWeight: "500" }}>{saveStatus}</span>}
              </>
            ) : (
              <button onClick={() => setEditMode(true)} style={{ backgroundColor: "#2563eb", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none", fontSize: "1rem", fontWeight: "600", cursor: "pointer" }}>Edit Resume</button>
            )}
          </div>
        </div>
      </div>

      {showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} />}
    </div>
  );
};

export default Template26;