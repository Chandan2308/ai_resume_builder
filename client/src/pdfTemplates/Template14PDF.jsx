import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link
} from "@react-pdf/renderer";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 450;
  weight += (data.projects?.length || 0) * 350;
  weight += (data.education?.length || 0) * 250;
  weight += (data.skills?.length || 0) * 50;
  weight += (data.certifications?.length || 0) * 90;
  weight += (data.achievements?.length || 0) * 120;
  weight += (data.languages?.length || 0) * 60;
  weight += (data.interests?.length || 0) * 40;

  if (weight > 8000) return 0.72;
  if (weight > 7000) return 0.80;
  if (weight > 6000) return 0.88;
  if (weight > 5000) return 0.94;
  return 1;
};

const Template14PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const personalInfo = data.personalInfo || {};
  const scale = calculateScale(data);

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const safe = (v) =>
    typeof v === "string"
      ? v
      : v?.name || v?.title || v?.degree || "";

  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const proficiencyShort = ["Beg", "Elem", "Int", "Adv", "Flt", "Nat"];

  /* ================= STYLES ================= */

  const styles = StyleSheet.create({
    page: {
      padding: 0,
      fontSize: 9,
      fontFamily: "Helvetica",
      color: "#111827"
    },

    container: {
      transformOrigin: "top left"
    },

    /* HEADER */

    header: {
      padding: 30,
      backgroundColor: data.bgColor || "#2563eb",
      color: data.textColor || "#ffffff"
    },

    name: {
      fontSize: 26,
      fontWeight: 800
    },

    role: {
      fontSize: 12,
      marginTop: 6
    },

    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 10
    },

    contactItem: {
      fontSize: 8,
      marginRight: 10,
      marginBottom: 4
    },

    link: {
      fontSize: 8,
      color: data.textColor || "#ffffff",
      textDecoration: "none",
      marginRight: 10
    },

    /* BODY */

    body: {
      padding: 30
    },

    section: {
      marginBottom: 18
    },

    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      borderBottomWidth: 1,
      borderBottomColor: "#d1d5db",
      paddingBottom: 4,
      marginBottom: 8
    },

    paragraph: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151"
    },

    block: {
      marginBottom: 10
    },

    blockTitle: {
      fontSize: 10,
      fontWeight: 700
    },

    blockSub: {
      fontSize: 8.5,
      color: "#6b7280"
    },

    bulletRow: {
      flexDirection: "row",
      marginBottom: 3
    },

    bulletText: {
      fontSize: 8.5,
      color: "#374151"
    },

    badgeContainer: {
      flexDirection: "row",
      flexWrap: "wrap"
    },

    badgePurple: {
      backgroundColor: "#ede9fe",
      color: "#6b21a8",
      paddingVertical: 3,
      paddingHorizontal: 8,
      marginRight: 6,
      marginBottom: 6,
      borderRadius: 12,
      fontSize: 8
    },

    badgeBlue: {
      backgroundColor: "#dbeafe",
      color: "#1e40af",
      paddingVertical: 3,
      paddingHorizontal: 8,
      marginRight: 6,
      marginBottom: 6,
      borderRadius: 12,
      fontSize: 8
    },

    badgeGreen: {
      backgroundColor: "#dcfce7",
      color: "#166534",
      paddingVertical: 3,
      paddingHorizontal: 8,
      marginRight: 6,
      marginBottom: 6,
      borderRadius: 12,
      fontSize: 8
    }
  });

  const renderSectionHeader = (title) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const renderSection = (key) => {
    switch (key) {
      case "summary":
        return data.summary ? (
          <View key="summary" style={styles.section}>
            {renderSectionHeader("Professional Summary")}
            <Text style={styles.paragraph}>{safe(data.summary)}</Text>
          </View>
        ) : null;

      case "experience":
        return safeArray(data.experience).length ? (
          <View key="experience" style={styles.section}>
            {renderSectionHeader("Experience")}
            {safeArray(data.experience).map((exp, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>{safe(exp.title)}</Text>
                <Text style={styles.blockSub}>
                  {exp.company}
                  {exp.duration && ` — ${exp.duration}`}
                </Text>
                {safeArray(exp.accomplishments).map((a, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={styles.bulletText}>• </Text>
                    <Text style={styles.bulletText}>{a}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null;

      case "education":
        return safeArray(data.education).length ? (
          <View key="education" style={styles.section}>
            {renderSectionHeader("Education")}
            {safeArray(data.education).map((edu, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>{safe(edu.degree)}</Text>
                <Text style={styles.blockSub}>
                  {edu.institution}
                  {edu.duration && ` — ${edu.duration}`}
                  {edu.gpa && ` | GPA: ${edu.gpa}`}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "projects":
        return safeArray(data.projects).length ? (
          <View key="projects" style={styles.section}>
            {renderSectionHeader("Projects")}
            {safeArray(data.projects).map((proj, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {proj.name}
                  {proj.link && (
                    <Link
                      src={normalizeUrl(proj.link)}
                      style={{ fontSize: 8, marginLeft: 6 }}
                    >
                        Live
                    </Link>
                  )}
                </Text>
                <Text style={styles.paragraph}>{proj.description}</Text>
                {proj.technologies?.length > 0 && (
                  <Text style={[styles.paragraph, { fontSize: 8 }]}>
                    Tech: {proj.technologies.join(", ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ) : null;

      case "skills":
        return safeArray(data.skills).length ? (
          <View key="skills" style={styles.section}>
            {renderSectionHeader("Skills")}
            <View style={styles.badgeContainer}>
              {safeArray(data.skills).map((skill, i) => (
                <Text key={i} style={styles.badgePurple}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        ) : null;

      case "languages":
        return safeArray(data.languages).length ? (
          <View key="languages" style={styles.section}>
            {renderSectionHeader("Languages")}
            <View style={styles.badgeContainer}>
              {safeArray(data.languages).map((lang, i) => (
                <Text key={i} style={styles.badgeBlue}>
                  {lang.name}{" "}
                  {lang.proficiency &&
                    `(${proficiencyShort[lang.proficiency - 1]})`}
                </Text>
              ))}
            </View>
          </View>
        ) : null;

      case "achievements":
        return safeArray(data.achievements).length ? (
          <View key="achievements" style={styles.section}>
            {renderSectionHeader("Achievements")}
            {safeArray(data.achievements).map((a, i) => (
              <Text key={i} style={styles.paragraph}>
                • {safe(a)}
              </Text>
            ))}
          </View>
        ) : null;

      case "interests":
        return safeArray(data.interests).length ? (
          <View key="interests" style={styles.section}>
            {renderSectionHeader("Interests")}
            <View style={styles.badgeContainer}>
              {safeArray(data.interests).map((int, i) => (
                <Text key={i} style={styles.badgeGreen}>
                  {int}
                </Text>
              ))}
            </View>
          </View>
        ) : null;

      case "certifications":
        return safeArray(data.certifications).length ? (
          <View key="certifications" style={styles.section}>
            {renderSectionHeader("Certifications")}
            {safeArray(data.certifications).map((cert, i) => (
              <Text key={i} style={styles.paragraph}>
                • {cert.name}
                {cert.organization && ` — ${cert.organization}`}
                {cert.year && ` (${cert.year})`}
              </Text>
            ))}
          </View>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.name}>
              {personalInfo.name || "Your Name"}
            </Text>
            <Text style={styles.role}>
              {personalInfo.role || "Job Title"}
            </Text>

            <View style={styles.contactRow}>
              {personalInfo.email && (
                <Link
                  src={`mailto:${personalInfo.email}`}
                  style={styles.link}
                >
                  {personalInfo.email}
                </Link>
              )}
              {personalInfo.phone && (
                <Text style={styles.contactItem}>
                  {personalInfo.phone}
                </Text>
              )}
              {personalInfo.linkedin && (
                <Link
                  src={normalizeUrl(personalInfo.linkedin)}
                  style={styles.link}
                >
                  LinkedIn
                </Link>
              )}
              {personalInfo.github && (
                <Link
                  src={normalizeUrl(personalInfo.github)}
                  style={styles.link}
                >
                  GitHub
                </Link>
              )}
              {personalInfo.portfolio && (
                <Link
                  src={normalizeUrl(personalInfo.portfolio)}
                  style={styles.link}
                >
                  Portfolio
                </Link>
              )}
              {personalInfo.location && (
                <Text style={styles.contactItem}>
                  {personalInfo.location}
                </Text>
              )}
            </View>
          </View>

          {/* BODY */}
          <View style={styles.body}>
            {(sectionOrder && sectionOrder.length > 0
              ? sectionOrder
              : [
                  "summary",
                  "experience",
                  "education",
                  "projects",
                  "skills",
                  "languages",
                  "achievements",
                  "interests",
                  "certifications"
                ]
            ).map((key) => renderSection(key))}
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Template14PDF;