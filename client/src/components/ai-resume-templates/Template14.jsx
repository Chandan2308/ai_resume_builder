import { useResume } from "../../context/ResumeContext";
import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Template14 = () => {
  const resumeRef = useRef(null);
  const {
  resumeData,
  updateResumeData,
  sectionOrder,
  updateSectionOrder
} = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData || {});

  

  useEffect(() => {
    setLocalData(resumeData);
  }, [resumeData]);

  const handleFieldChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  const handleArrayFieldChange = (section, index, key, value) => {
    const updated = [...(localData[section] || [])];
    updated[index][key] = value;
    const updatedData = { ...localData, [section]: updated };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  const handleAddItem = (section, emptyItem) => {
    const updated = [...(localData[section] || []), emptyItem];
    const updatedData = { ...localData, [section]: updated };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  const handleRemoveItem = (section, index) => {
    const updated = [...(localData[section] || [])];
    updated.splice(index, 1);
    const updatedData = { ...localData, [section]: updated };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  const handleSave = () => {
    setResumeData(localData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalData(resumeData);
    setEditMode(false);
  };

  const moveSection = (index, direction) => {

     console.log("clicked", index, direction); // ADD THIS
  const newOrder = [...sectionOrder];
  const targetIndex = index + direction;

  if (targetIndex < 0 || targetIndex >= newOrder.length) return;

  [newOrder[index], newOrder[targetIndex]] = [
    newOrder[targetIndex],
    newOrder[index],
  ];

  updateSectionOrder(newOrder)
};

  const {
    name,
    role,
    email,
    phone,
    linkedin,
    github,
    portfolio,
    location,
    summary,
    skills = [],
    experience = [],
    education = [],
    certifications = [],
    projects = [],
    languages = [],
  } = localData;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <div
          ref={resumeRef}
          className="flex-1 p-6 bg-white text-gray-900 font-sans shadow border border-gray-300 m-4 rounded-lg"
        >
          {/* HEADER */}
          <div
            className={`p-6 rounded-t-xl text-left ${
              editMode ? "bg-transparent text-black" : "bg-blue-600 text-white"
            }`}
          >
            {editMode ? (
              <>
                <input
                  type="text"
                  value={name || ""}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className="w-full border border-gray-400 p-2 mb-2 rounded"
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  value={role || ""}
                  onChange={(e) => handleFieldChange("role", e.target.value)}
                  className="w-full border border-gray-400 p-2 mb-2 rounded"
                  placeholder="Your Role"
                />
                <input
                  type="text"
                  value={email || ""}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className="w-full border border-gray-400 p-2 mb-2 rounded"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={phone || ""}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  className="w-full border border-gray-400 p-2 mb-2 rounded"
                  placeholder="Phone"
                />
                <input
  type="text"
  value={linkedin || ""}
  onChange={(e) => handleFieldChange("linkedin", e.target.value)}
  className="w-full border border-gray-400 p-2 mb-2 rounded"
  placeholder="LinkedIn"
/>
<input
  type="text"
  value={github || ""}
  onChange={(e) => handleFieldChange("github", e.target.value)}
  className="w-full border border-gray-400 p-2 mb-2 rounded"
  placeholder="GitHub"
/>
<input
  type="text"
  value={portfolio || ""}
  onChange={(e) => handleFieldChange("portfolio", e.target.value)}
  className="w-full border border-gray-400 p-2 mb-2 rounded"
  placeholder="Portfolio"
/>
<input
  type="text"
  value={location || ""}
  onChange={(e) => handleFieldChange("location", e.target.value)}
  className="w-full border border-gray-400 p-2 mb-2 rounded"
  placeholder="Location"
/>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold">{name || "Your Name"}</h1>
                <p className="text-lg">{role || "Your Job Title"}</p>
                <div className="flex flex-wrap gap-2 mt-2 text-sm">
  {email && (
  <p>
    <a
      href={`mailto:${email}`}
      className="text-white hover:underline"
    >
      {email}
    </a>
  </p>
)}

  {phone && <p>• {phone}</p>}
  {linkedin && (
    <p>
      • <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
        LinkedIn
      </a>
    </p>
  )}
  {github && (
    <p>
      • <a href={github} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
        GitHub
      </a>
    </p>
  )}
  {portfolio && (
    <p>
      • <a href={portfolio} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
        Portfolio
      </a>
    </p>
  )}
  {location && <p>• {location}</p>}
</div>
              </>
            )}
          </div>

            <div className="p-8">
              {sectionOrder.map((section, index) => {
                const arrows = (
                    <div className="flex gap-2 ml-2 relative z-50">
                      <button
                        type="button"
                        style={{ pointerEvents: "auto" }}
                        onClick={() => {
                          console.log("UP CLICKED");
                          moveSection(index, -1);
                        }}
                        className="cursor-pointer px-2 bg-gray-200"
                      >
                        ⬆
                      </button>

                      <button
                        type="button"
                        style={{ pointerEvents: "auto" }}
                        onClick={() => {
                          console.log("DOWN CLICKED");
                          moveSection(index, 1);
                        }}
                        className="cursor-pointer px-2 bg-gray-200"
                      >
                        ⬇
                      </button>
                    </div>
                  );

                switch (section) {

                /* SUMMARY */
case "summary":
  return (
    (summary || editMode) && (
      <section key={section} className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          {arrows}
        </div>

        {editMode ? (
          <textarea
            value={summary || ""}
            onChange={(e) =>
              handleFieldChange("summary", e.target.value)
            }
            className="w-full border p-2 rounded min-h-[80px]"
            placeholder="Write a short summary..."
          />
        ) : (
          <p className="text-gray-700 leading-relaxed">
            {summary}
          </p>
        )}
      </section>
    )
  );

/* EXPERIENCE */
case "experience":
  return (
    (experience.length > 0 || editMode) && (
      <section key={section} className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1">
            Experience
          </h2>
          <div className="flex items-center gap-2">
            {arrows}
            {editMode && (
              <button
                onClick={() =>
                  handleAddItem("experience", {
                    title: "",
                    companyName: "",
                    date: "",
                    accomplishment: [],
                  })
                }
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                +
              </button>
            )}
          </div>
        </div>

        {experience.map((exp, i) => (
          <div key={i} className="mb-4">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "experience",
                      i,
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full border p-2 mb-1 rounded"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  value={exp.companyName}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "experience",
                      i,
                      "companyName",
                      e.target.value
                    )
                  }
                  className="w-full border p-2 mb-1 rounded"
                  placeholder="Company Name"
                />
                <input
                  type="text"
                  value={exp.date}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "experience",
                      i,
                      "date",
                      e.target.value
                    )
                  }
                  className="w-full border p-2 mb-1 rounded"
                  placeholder="Duration"
                />
                <textarea
                  value={(exp.accomplishment || []).join("\n")}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "experience",
                      i,
                      "accomplishment",
                      e.target.value.split("\n")
                    )
                  }
                  className="w-full border p-2 rounded min-h-[80px]"
                  placeholder="Achievements (one per line)"
                />
                <button
                  onClick={() => handleRemoveItem("experience", i)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-black">
                  {exp.title}
                </h3>
                <p className="italic text-gray-700">
                  {exp.companyName}
                  {exp.date && (
                    <span className="text-gray-500">
                      {" "}— {exp.date}
                    </span>
                  )}
                </p>
                <ul className="list-disc list-inside text-gray-700">
                  {(exp.accomplishment || []).map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </section>
    )
  );

/* EDUCATION */
case "education":
  return (
    (education.length > 0 || editMode) && (
      <section key={section} className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="flex items-center gap-2">
            {arrows}
            {editMode && (
              <button
                onClick={() =>
                  handleAddItem("education", {
                    degree: "",
                    institution: "",
                    duration: "",
                  })
                }
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                +
              </button>
            )}
          </div>
        </div>

        {education.map((edu, i) => (
          <div key={i} className="mb-3">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "education",
                      i,
                      "degree",
                      e.target.value
                    )
                  }
                  className="w-full border p-2 mb-1 rounded"
                  placeholder="Degree"
                />
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "education",
                      i,
                      "institution",
                      e.target.value
                    )
                  }
                  className="w-full border p-2 mb-1 rounded"
                  placeholder="Institution"
                />
                <input
                  type="text"
                  value={edu.duration}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "education",
                      i,
                      "duration",
                      e.target.value
                    )
                  }
                  className="w-full border p-2 rounded"
                  placeholder="Duration"
                />
                <button
                  onClick={() => handleRemoveItem("education", i)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-black">
                  {edu.degree}
                </h3>
                <p className="italic text-gray-700">
                  {edu.institution}
                  {edu.duration && (
                    <span className="text-gray-500">
                      {" "}— {edu.duration}
                    </span>
                  )}
                </p>
              </>
            )}
          </div>
        ))}
      </section>
    )
  );

    case "projects":
  return (
    (projects.length > 0 || editMode) && (
      <section key={section} className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="flex items-center gap-2">
            {arrows}
            {editMode && (
              <button
                onClick={() =>
                  handleAddItem("projects", {
                    name: "",
                    description: "",
                  })
                }
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                +
              </button>
            )}
          </div>
        </div>

        {projects.map((proj, i) => (
          <div key={i} className="mb-3">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "projects",
                      i,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full border p-2 mb-1 rounded"
                  placeholder="Project Name"
                />
                <textarea
                  value={proj.description}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "projects",
                      i,
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full border p-2 rounded min-h-[60px]"
                  placeholder="Project Description"
                />
                <button
                  onClick={() => handleRemoveItem("projects", i)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-black">
                  {proj.name}
                </h3>
                <p className="text-gray-700">{proj.description}</p>
              </>
            )}
          </div>
        ))}
      </section>
    )
  );        
  
case "skills":
  return (
    (skills.length > 0 || editMode) && (
      <section key={section} className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="flex items-center gap-2">
            {arrows}
            {editMode && (
              <button
                onClick={() => handleAddItem("skills", "")}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                +
              </button>
            )}
          </div>
        </div>

        {skills.map((skill, i) => (
          <div key={i} className="mb-3">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => {
                    const updatedSkills = [...skills];
                    updatedSkills[i] = e.target.value;
                    handleFieldChange("skills", updatedSkills);
                  }}
                  className="w-full border p-2 mb-1 rounded"
                  placeholder="Skill"
                />
                <button
                  onClick={() => handleRemoveItem("skills", i)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Remove
                </button>
              </>
            ) : (
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium mr-2">
                {skill}
              </span>
            )}
          </div>
        ))}
      </section>
    )
  );

  case "languages":
  return (
    (languages.length > 0 || editMode) && (
      <section key={section} className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1">
            Languages
          </h2>
          <div className="flex items-center gap-2">
            {arrows}
            {editMode && (
              <button
                onClick={() =>
                  handleAddItem("languages", { name: "" })
                }
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                +
              </button>
            )}
          </div>
        </div>

        {languages.map((lang, i) => (
          <div key={i} className="mb-3">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "languages",
                      i,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full border p-2 mb-1 rounded"
                  placeholder="Language"
                />
                <button
                  onClick={() => handleRemoveItem("languages", i)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Remove
                </button>
              </>
            ) : (
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium mr-2">
                {lang.name}
              </span>
            )}
          </div>
        ))}
      </section>
    )
  );


  case "certifications":
  return (
    (certifications.length > 0 || editMode) && (
      <section key={section}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold border-b border-gray-300 pb-1">
            Certifications
          </h2>
          <div className="flex items-center gap-2">
            {arrows}
            {editMode && (
              <button
                onClick={() =>
                  handleAddItem("certifications", { title: "" })
                }
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                +
              </button>
            )}
          </div>
        </div>

        {certifications.map((cert, i) => (
          <div key={i} className="mb-2">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={cert.title || ""}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "certifications",
                      i,
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full border p-2 mb-1 rounded"
                  placeholder="Certification Title"
                />
                <button
                  onClick={() =>
                    handleRemoveItem("certifications", i)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Remove
                </button>
              </>
            ) : (
              <li className="list-disc list-inside text-black font-medium">
                {cert.title}
              </li>
            )}
          </div>
        ))}
            </section>
            )
          );

        default:
          return null;

            }
          })}
   </div>


          {/* BUTTONS */}
          <div className="text-center mt-4 mb-6">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template14;
