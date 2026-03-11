/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import "./Template11.css";

const Template11 = () => {
  const { resumeData, sectionOrder } = useResume();

  const resumeRef = useRef();
  const [localData, setLocalData] = useState({});
  const [editMode, setEditMode] = useState(false);

  // ===== SYNC CONTEXT DATA =====
  // load resume data ONLY first time (not while typing)
    useEffect(() => {
  if (resumeData) setLocalData(resumeData);
}, [resumeData]);

  // ===== SAFE VALUE RENDER =====
  const renderSafe = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val.name || val.title || val.degree || val.description || "";
  };

  // ===== UPDATE FIELD =====
  const updateField = (field, value) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ===== REUSABLE SECTION WRAPPER =====
  const Section = ({ title, children }) => (
    <div className="resume-section">
      <h3 className="section-title">{title}</h3>
      {children}
    </div>
  );

  // ===== DEFAULT SECTION ORDER =====
  const defaultSections = [
    "summary",
    "skills",
    "languages",
    "interests",
    "experience",
    "education",
    "projects",
    "certifications",
    "achievements",
  ];

  const activeSections =
    sectionOrder && sectionOrder.length > 0
      ? sectionOrder
      : defaultSections;

  // ===== SECTION COMPONENTS =====
  const sectionComponents = {
    summary: (
      <Section title="Summary">
        {editMode ? (
          <textarea
            className="edit-input"
            value={localData.summary || ""}
            onChange={(e) => updateField("summary", e.target.value)}
          />
        ) : (
          <p>{renderSafe(localData.summary)}</p>
        )}
      </Section>
    ),

    skills: (
      <Section title="Skills">
        {editMode ? (
          <input
            className="edit-input"
            value={(localData.skills || []).join(", ")}
            onChange={(e) =>
              updateField("skills", e.target.value.split(","))
            }
          />
        ) : (
          <p>{(localData.skills || []).map(renderSafe).join(", ")}</p>
        )}
      </Section>
    ),

    languages: (
      <Section title="Languages">
        {editMode ? (
          <input
            className="edit-input"
            value={(localData.languages || []).join(", ")}
            onChange={(e) =>
              updateField("languages", e.target.value.split(","))
            }
          />
        ) : (
          <p>{(localData.languages || []).map(renderSafe).join(", ")}</p>
        )}
      </Section>
    ),

    interests: (
      <Section title="Interests">
        {editMode ? (
          <input
            className="edit-input"
            value={(localData.interests || []).join(", ")}
            onChange={(e) =>
              updateField("interests", e.target.value.split(","))
            }
          />
        ) : (
          <p>{(localData.interests || []).map(renderSafe).join(", ")}</p>
        )}
      </Section>
    ),

    experience: (
      <Section title="Experience">
        {(localData.experience || []).map((exp, i) => (
          <div key={i} className="block">
            {editMode ? (
              <>
                <input
                  className="edit-input"
                  value={exp.title || ""}
                  placeholder="Role"
                  onChange={(e) => {
                    const updated = [...localData.experience];
                    updated[i].title = e.target.value;
                    updateField("experience", updated);
                  }}
                />
                <input
                  className="edit-input"
                  value={exp.companyName || ""}
                  placeholder="Company"
                  onChange={(e) => {
                    const updated = [...localData.experience];
                    updated[i].companyName = e.target.value;
                    updateField("experience", updated);
                  }}
                />
              </>
            ) : (
              <>
                <strong>{renderSafe(exp.title)}</strong>
                <p>{renderSafe(exp.companyName)}</p>
              </>
            )}
          </div>
        ))}
      </Section>
    ),

    education: (
      <Section title="Education">
        {(localData.education || []).map((edu, i) => (
          <div key={i} className="block">
            {editMode ? (
              <>
                <input
                  className="edit-input"
                  value={edu.degree || ""}
                  placeholder="Degree"
                  onChange={(e) => {
                    const updated = [...localData.education];
                    updated[i].degree = e.target.value;
                    updateField("education", updated);
                  }}
                />
                <input
                  className="edit-input"
                  value={edu.institution || ""}
                  placeholder="Institution"
                  onChange={(e) => {
                    const updated = [...localData.education];
                    updated[i].institution = e.target.value;
                    updateField("education", updated);
                  }}
                />
              </>
            ) : (
              <>
                <strong>{renderSafe(edu.degree)}</strong>
                <p>{renderSafe(edu.institution)}</p>
              </>
            )}
          </div>
        ))}
      </Section>
    ),

    projects: (
      <Section title="Projects">
        {(localData.projects || []).map((proj, i) => (
          <div key={i} className="block">
            {editMode ? (
              <>
                <input
                  className="edit-input"
                  value={proj.name || ""}
                  placeholder="Project Name"
                  onChange={(e) => {
                    const updated = [...localData.projects];
                    updated[i].name = e.target.value;
                    updateField("projects", updated);
                  }}
                />
                <textarea
                  className="edit-input"
                  value={proj.description || ""}
                  placeholder="Description"
                  onChange={(e) => {
                    const updated = [...localData.projects];
                    updated[i].description = e.target.value;
                    updateField("projects", updated);
                  }}
                />
              </>
            ) : (
              <>
                <strong>{renderSafe(proj.name)}</strong>
                <p>{renderSafe(proj.description)}</p>
              </>
            )}
          </div>
        ))}
      </Section>
    ),

    certifications: (
      <Section title="Certifications">
        {editMode ? (
          <input
            className="edit-input"
            value={(localData.certifications || []).join(", ")}
            onChange={(e) =>
              updateField("certifications", e.target.value.split(","))
            }
          />
        ) : (
          (localData.certifications || []).map((c, i) => (
            <p key={i}>• {renderSafe(c)}</p>
          ))
        )}
      </Section>
    ),

    achievements: (
      <Section title="Achievements">
        {editMode ? (
          <input
            className="edit-input"
            value={(localData.achievements || []).join(", ")}
            onChange={(e) =>
              updateField("achievements", e.target.value.split(","))
            }
          />
        ) : (
          (localData.achievements || []).map((a, i) => (
            <p key={i}>• {renderSafe(a)}</p>
          ))
        )}
      </Section>
    ),
  };

  return (
    <div className="template11-wrapper">
      <Navbar />

      <div className="layout">
        <Sidebar resumeRef={resumeRef} />

        <div className="preview-area">

          {/* ===== RESUME PAPER ONLY ===== */}
          <div ref={resumeRef} className="resume-paper">

            {/* HEADER */}
            <div className="resume-header">
              {editMode ? (
                <input
                  className="edit-name"
                  value={localData.name || ""}
                  placeholder="Your Name"
                  onChange={(e) => updateField("name", e.target.value)}
                />
              ) : (
                <h1 className="resume-name">
                  {localData.name || "Your Name"}
                </h1>
              )}

              {editMode ? (
                <input
                  className="edit-input"
                  value={localData.role || ""}
                  placeholder="Your Role"
                  onChange={(e) => updateField("role", e.target.value)}
                />
              ) : (
                <div className="resume-role">
                  {localData.role || "Your Role"}
                </div>
              )}

              <div className="contact-grid">
                {["email", "phone", "location", "linkedin"].map((field) =>
                  editMode ? (
                    <input
                      key={field}
                      className="edit-input"
                      placeholder={field}
                      value={localData[field] || ""}
                      onChange={(e) =>
                        updateField(field, e.target.value)
                      }
                    />
                  ) : (
                    localData[field] && <div key={field}>{localData[field]}</div>
                  )
                )}
              </div>
            </div>

            {/* DYNAMIC SECTIONS */}
            {activeSections.map((key) => {
              const section = sectionComponents[key?.toLowerCase()];
              if (!section) return null;
              return <div key={key}>{section}</div>;
            })}
          </div>

          {/* ===== ACTION BUTTONS OUTSIDE PAPER ===== */}
          <div className="action-buttons">
            {editMode ? (
              <>
                <button
                  className="save-btn"
                  onClick={() => setEditMode(false)}
                >
                  Save Changes
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="edit-btn"
                onClick={() => setEditMode(true)}
              >
                Edit Resume
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Template11;