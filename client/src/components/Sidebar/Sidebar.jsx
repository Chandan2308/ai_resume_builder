/* src/components/Sidebar/Sidebar.jsx */
import React, { useState, useEffect } from "react";
import { useResume } from "../../context/ResumeContext";
import { useAuth } from "../../context/AuthContext";
import resumeService from "../../services/resumeService";
import { enhanceTextWithGemini } from "../../services/geminiService";
import { toast } from "react-toastify";
import {
  FaFileAlt,
  FaPaintBrush,
  FaPlusCircle,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaBold,
  FaItalic,
  FaUnderline,
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const enhancementOptions = [
  "summary",
  "experience",
  "education",
  "skills",
  "achievements",
  "projects",
  "certifications",
  "languages",
  "interests",
];

const FONT_OPTIONS = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times New Roman", value: "Times New Roman, Times, serif" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Open Sans", value: "Open Sans, sans-serif" },
  { label: "Playfair Display", value: "Playfair Display, serif" },
  { label: "Merriweather", value: "Merriweather, serif" },
];

const Sidebar = ({ onEnhance, resumeRef }) => {
  const { resumeData, setResumeData, updateResumeData } = useResume();
  const { isAuthenticated } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [enhancingSection, setEnhancingSection] = useState(null);
  const [downloadRequested, setDownloadRequested] = useState(false);
  const [saving, setSaving] = useState(false);

  // ─── PDF Download ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!downloadRequested) return;
    if (!resumeRef?.current) {
      toast.error("Resume element not found");
      setDownloadRequested(false);
      return;
    }

    (async () => {
      let originalStyles = [];
      try {
        await new Promise((r) => setTimeout(r, 200));
        const element = resumeRef.current;

        const hideElements = element.querySelectorAll(".hide-in-pdf");
        hideElements.forEach((el) => {
          originalStyles.push({
            element: el,
            display: el.style.display,
            visibility: el.style.visibility,
            opacity: el.style.opacity,
            height: el.style.height,
            margin: el.style.margin,
            padding: el.style.padding,
          });
          el.style.display = "none";
          el.style.visibility = "hidden";
          el.style.opacity = "0";
          el.style.height = "0";
          el.style.margin = "0";
          el.style.padding = "0";
        });

        let canvas;
        try {
          canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            allowTaint: true,
            backgroundColor: "#ffffff",
            ignoreElements: (el) => el.classList?.contains("hide-in-pdf"),
          });
        } catch (colorError) {
          if (
            colorError.message &&
            (colorError.message.includes("oklab") ||
              colorError.message.includes("oklch") ||
              colorError.message.toLowerCase().includes("color"))
          ) {
            console.warn("Color parsing error, retrying…");
            const allElements = element.querySelectorAll("*");
            const styleBackups = [];
            allElements.forEach((el) => {
              const computed = window.getComputedStyle(el);
              const backup = { element: el, styles: {} };
              const set = (prop, val) => {
                if (!(prop in backup.styles)) backup.styles[prop] = el.style[prop];
                el.style[prop] = val;
              };
              if ((computed.backgroundImage || "").includes("oklch")) set("backgroundImage", "none");
              if ((computed.background || "").includes("oklch")) set("background", "#ffffff");
              if ((computed.backgroundColor || "").includes("oklch")) set("backgroundColor", "#ffffff");
              if ((computed.color || "").includes("oklch")) set("color", "#000000");
              if ((computed.borderColor || "").includes("oklch")) set("borderColor", "#000000");
              if ((computed.boxShadow || "").includes("oklch")) set("boxShadow", "none");
              if (Object.keys(backup.styles).length > 0) styleBackups.push(backup);
            });
            try {
              canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                allowTaint: true,
                backgroundColor: "#ffffff",
              });
            } finally {
              styleBackups.forEach(({ element: el, styles }) =>
                Object.entries(styles).forEach(([p, v]) => (el.style[p] = v))
              );
            }
          } else throw colorError;
        }

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * pageWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft > 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save("My_Resume.pdf");
        toast.success("Resume downloaded");
      } catch (err) {
        console.error("PDF Error:", err);
        toast.error("Failed to generate PDF.");
      } finally {
        originalStyles.forEach(({ element, display, visibility, opacity, height, margin, padding }) => {
          element.style.display = display;
          element.style.visibility = visibility;
          element.style.opacity = opacity;
          element.style.height = height;
          element.style.margin = margin;
          element.style.padding = padding;
        });
        setDownloadRequested(false);
      }
    })();
  }, [downloadRequested, resumeRef]);

  const handleDownloadPDF = () => setDownloadRequested(true);

  // ─── Style helpers ───────────────────────────────────────────────────────────
  const styleSettings = resumeData?.styleSettings || {};

  const applyStyleSetting = (updates) => {
    const updated = {
      ...(resumeData || {}),
      styleSettings: { ...(resumeData?.styleSettings || {}), ...updates },
    };
    if (typeof updateResumeData === "function") updateResumeData(updated);
    else setResumeData(updated);
  };

  // ─── Enhancement logic ───────────────────────────────────────────────────────
  const handleEnhanceSection = async (section) => {
    setEnhancingSection(section);
    try {
      let contentToSend = "";
      switch (section) {
        case "summary":
          contentToSend = resumeData.summary || "";
          break;
        case "skills":
          contentToSend = Array.isArray(resumeData.skills)
            ? resumeData.skills.join(", ")
            : resumeData.skills || "";
          break;
        case "education":
          contentToSend = JSON.stringify(resumeData.education || []);
          break;
        case "experience":
          contentToSend = (resumeData.experience || [])
            .map((e) =>
              e.description || (Array.isArray(e.accomplishment) ? e.accomplishment.join("\n") : e.accomplishment) || ""
            )
            .filter(Boolean)
            .join("\n\n");
          break;
        default:
          contentToSend = JSON.stringify(resumeData[section] || "");
      }

      if (!contentToSend.trim()) { toast.info("Nothing to enhance."); return; }

      const aiResponse = await enhanceTextWithGemini(section, contentToSend);
      if (!aiResponse) { toast.error("AI enhancement failed"); return; }

      const updated = { ...resumeData };
      if (section === "summary") {
        updated[section] = aiResponse.trim();
      } else if (["achievements", "languages", "interests"].includes(section)) {
        updated[section] = aiResponse.split("\n").map((s) => s.replace(/^[-*•]\s*/, "").trim()).filter(Boolean);
      } else if (section === "skills") {
        updated.skills = aiResponse.split(/,|\n/).map((s) => s.trim()).filter(Boolean);
      } else if (section === "experience") {
        const lines = aiResponse.split("\n").filter(Boolean);
        if (!updated.experience?.length) {
          updated.experience = [{ title: "", company: "", companyName: "", duration: "", date: "", description: aiResponse.trim(), accomplishment: lines }];
        } else {
          updated.experience[0] = { ...updated.experience[0], description: aiResponse.trim(), accomplishment: lines };
        }
      } else if (section === "education") {
        if (!updated.education?.length) {
          updated.education = [{ degree: aiResponse.split("\n")[0] || "", institution: "", year: "" }];
        } else {
          updated.education[0] = { ...updated.education[0], degree: aiResponse.split("\n")[0] || updated.education[0].degree };
        }
      } else if (section === "projects") {
        if (!updated.projects) updated.projects = [{}];
        updated.projects[0].description = aiResponse;
      } else {
        updated[section] = aiResponse;
      }

      setResumeData(updated);
      if (onEnhance) onEnhance(section, updated);
      toast.success("Enhanced!");
    } catch (e) {
      console.error(e);
      toast.error("Enhancement failed");
    } finally {
      setEnhancingSection(null);
    }
  };

  // ─── Save to account ─────────────────────────────────────────────────────────
  const normalizeForSave = (data) => {
    const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
    return {
      templateId: data?.templateId || null,
      personalInfo: {
        name: data?.name || "", role: data?.role || "", email: data?.email || "",
        phone: data?.phone || "", location: data?.location || "",
        linkedin: data?.linkedin || "", github: data?.github || "", portfolio: data?.portfolio || "",
      },
      summary: data?.summary || "",
      skills: Array.isArray(data?.skills) ? data.skills : [],
      experience: toArray(data.experience).map((e) => ({
        title: e?.title || "", company: e?.company || e?.companyName || "",
        duration: e?.duration || e?.date || "",
        description: Array.isArray(e?.accomplishment) ? e.accomplishment.join("\n") : e?.description || "",
      })),
      education: toArray(data.education).map((ed) => ({
        degree: ed?.degree || "", institution: ed?.institution || "", year: ed?.year || ed?.duration || "",
      })),
      projects: toArray(data.projects).map((p) => ({
        name: p?.name || "",
        description: Array.isArray(p?.description) ? p.description.join("\n") : p?.description || "",
        technologies: Array.isArray(p?.technologies) ? p.technologies : (p?.technologies || "").split(",").map((s) => s.trim()).filter(Boolean),
      })),
      certifications: toArray(data.certifications).map((c) => ({
        name: c?.name || c?.title || "", organization: c?.organization || c?.issuer || "", year: c?.year || c?.date || "",
      })),
      achievements: toArray(data?.achievements),
      interests: toArray(data?.interests),
      languages: toArray(data?.languages).map((l) => (typeof l === "string" ? l : l?.language || "")).filter(Boolean),
    };
  };

  const handleSaveToAccount = async () => {
    if (!isAuthenticated) { toast.info("Please login to save."); return; }
    try {
      setSaving(true);
      const structured = normalizeForSave(resumeData || {});
      const title = (resumeData?.title || resumeData?.name || "Resume") + "";
      const result = await resumeService.saveResumeData(structured, title);
      if (result?.success) toast.success("✅ Saved to My Resumes");
      else toast.error(result?.error || "Failed to save");
    } catch (e) {
      console.error(e);
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // ─── Sub-components ──────────────────────────────────────────────────────────
  const SidebarItem = ({ icon, label, onClick, active }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 py-4 rounded-lg transition-all
        ${collapsed ? "px-2" : "px-4"}
        ${active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
    >
      <span className="text-xl">{icon}</span>
      {!collapsed && (
        <span className="text-xs font-medium text-center leading-tight">{label}</span>
      )}
    </button>
  );

  // ─── Design Panel ────────────────────────────────────────────────────────────
  const DesignPanel = () => {
    const s = styleSettings;
    const fontSize = s.fontSize || 16;

    return (
      <div
        style={{
          position: "absolute",
          left: collapsed ? "5rem" : "7.5rem",
          top: 0,
          width: "260px",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "0.75rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
          zIndex: 50,
          overflow: "hidden",
        }}
      >
        {/* Panel header */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "0.875rem 1rem",
            color: "white",
          }}
        >
          <div style={{ fontWeight: "700", fontSize: "0.9rem", letterSpacing: "0.02em" }}>
            🎨 Design & Formatting
          </div>
          <div style={{ fontSize: "0.7rem", opacity: 0.85, marginTop: "0.2rem" }}>
            Changes apply to your resume live
          </div>
        </div>

        <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Font Family */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.4rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Font Family
            </label>
            <select
              value={s.fontFamily || "Arial, sans-serif"}
              onChange={(e) => applyStyleSetting({ fontFamily: e.target.value })}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1.5px solid #e5e7eb",
                borderRadius: "0.5rem",
                fontSize: "0.85rem",
                color: "#374151",
                backgroundColor: "#f9fafb",
                cursor: "pointer",
                outline: "none",
                appearance: "none",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                paddingRight: "2rem",
              }}
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                  {f.label}
                </option>
              ))}
            </select>
            {/* Font preview */}
            <div
              style={{
                marginTop: "0.4rem",
                padding: "0.4rem 0.6rem",
                backgroundColor: "#f3f4f6",
                borderRadius: "0.35rem",
                fontSize: "0.85rem",
                fontFamily: s.fontFamily || "Arial, sans-serif",
                color: "#6b7280",
              }}
            >
              The quick brown fox…
            </div>
          </div>

          {/* Font Size */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.4rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#374151",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Font Size
              </label>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  color: "#667eea",
                  backgroundColor: "#eef2ff",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "0.35rem",
                }}
              >
                {fontSize}px
              </span>
            </div>
            {/* Quick size buttons */}
            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.5rem" }}>
              {[12, 14, 16, 18, 20].map((size) => (
                <button
                  key={size}
                  onClick={() => applyStyleSetting({ fontSize: size })}
                  style={{
                    flex: 1,
                    padding: "0.3rem",
                    border: `1.5px solid ${fontSize === size ? "#667eea" : "#e5e7eb"}`,
                    borderRadius: "0.35rem",
                    backgroundColor: fontSize === size ? "#eef2ff" : "#f9fafb",
                    color: fontSize === size ? "#667eea" : "#6b7280",
                    fontSize: "0.72rem",
                    fontWeight: fontSize === size ? "700" : "500",
                    cursor: "pointer",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            <input
              type="range"
              min="10"
              max="24"
              value={fontSize}
              onChange={(e) => applyStyleSetting({ fontSize: Number(e.target.value) })}
              style={{ width: "100%", accentColor: "#667eea" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.65rem",
                color: "#9ca3af",
                marginTop: "0.15rem",
              }}
            >
              <span>Small (10)</span>
              <span>Large (24)</span>
            </div>
          </div>

          {/* Text Style toggles */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Text Style
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[
                { key: "bold", icon: <FaBold />, label: "Bold", style: { fontWeight: "700" } },
                { key: "italic", icon: <FaItalic />, label: "Italic", style: { fontStyle: "italic" } },
                { key: "underline", icon: <FaUnderline />, label: "Underline", style: { textDecoration: "underline" } },
              ].map(({ key, icon, label }) => {
                const active = !!s[key];
                return (
                  <button
                    key={key}
                    onClick={() => applyStyleSetting({ [key]: !s[key] })}
                    title={label}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: "0.6rem 0.4rem",
                      border: `2px solid ${active ? "#667eea" : "#e5e7eb"}`,
                      borderRadius: "0.5rem",
                      backgroundColor: active ? "#eef2ff" : "#f9fafb",
                      color: active ? "#667eea" : "#6b7280",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <span style={{ fontSize: "1rem" }}>{icon}</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: "600" }}>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live preview */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.4rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Preview
            </label>
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#f9fafb",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                fontFamily: s.fontFamily || "Arial, sans-serif",
                fontSize: `${fontSize}px`,
                fontWeight: s.bold ? "700" : "400",
                fontStyle: s.italic ? "italic" : "normal",
                textDecoration: s.underline ? "underline" : "none",
                color: "#1f2937",
                lineHeight: "1.5",
              }}
            >
              Your resume text will look like this
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={() =>
              applyStyleSetting({ fontFamily: "Arial, sans-serif", fontSize: 16, bold: false, italic: false, underline: false })
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1.5px solid #e5e7eb",
              borderRadius: "0.5rem",
              backgroundColor: "#ffffff",
              color: "#6b7280",
              fontSize: "0.8rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            ↺ Reset to Defaults
          </button>
        </div>
      </div>
    );
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      className={`min-h-screen bg-white border-r border-gray-200 shadow-sm 
        flex flex-col items-center gap-2 pt-6 transition-all duration-300
        ${collapsed ? "w-20" : "w-28"}`}
      style={{ position: "relative" }}
    >
      {/* Toggle */}
      <button
        className="absolute -right-4 top-6 bg-white border-2 border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 z-10"
        onClick={() => setCollapsed((p) => !p)}
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Nav items */}
      <div className="flex flex-col gap-1 w-full">
        <SidebarItem icon={<FaFileAlt />} label="Templates" collapsed={collapsed} />

        <SidebarItem
          icon={<FaPaintBrush />}
          label="Design & Formatting"
          collapsed={collapsed}
          active={activePanel === "design"}
          onClick={() => setActivePanel((p) => (p === "design" ? null : "design"))}
        />

        <SidebarItem icon={<FaPlusCircle />} label="Add Section" collapsed={collapsed} />
        <SidebarItem icon={<FaCheckCircle />} label="Spell Check" collapsed={collapsed} />
      </div>

      {/* Design panel — floats to the right of sidebar */}
      {activePanel === "design" && <DesignPanel />}
    </div>
  );
};

export default Sidebar;