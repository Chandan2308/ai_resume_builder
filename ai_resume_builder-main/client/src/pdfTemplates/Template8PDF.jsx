import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 350;
  weight += (data.project?.length || 0) * 300;
  weight += (data.education?.length || 0) * 220;
  weight += (data.skills?.length || 0) * 60;
  weight += (data.certifications?.length || 0) * 80;
  weight += (data.achievements?.length || 0) * 120;
  weight += (data.languages?.length || 0) * 40;
  weight += (data.interests?.length || 0) * 40;

  if (weight > 6500) return 0.75;
  if (weight > 5500) return 0.82;
  if (weight > 4500) return 0.88;
  if (weight > 3500) return 0.94;
  return 1;
};

/* ================= COMPONENT ================= */

const Template8PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const scale = calculateScale(data);
  const orange = "#ff7b25";

  const safeArray = (v) => (Array.isArray(v) ? v : []);

  const renderSafe = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val.title || val.name || val.degree || "";
  };

  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const styles = StyleSheet.create({
    page: {
      padding: 36,
      fontSize: 9,
      fontFamily: "Helvetica",
      color: "#333",
    },

    container: {
      transformOrigin: "top left",
    },

    /* HEADER */

    headerWrapper: {
      textAlign: "center",
      marginBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: orange,
      paddingBottom: 15,
    },

    name: {
      fontSize: 22,
      fontWeight: 800,
      color: orange,
    },

    role: {
      fontSize: 13,
      fontWeight: 700,
      color: orange,
      marginTop: 4,
      marginBottom: 10,
    },

    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 15,
      fontSize: 8.5,
    },

    contactItem: {
      marginRight: 12,
    },

    link: {
      color: "#000",
      textDecoration: "none",
      fontSize: 8.5,
    },

    /* SECTIONS */

    sectionWrapper: {
      marginBottom: 18,
    },

    sectionTitle: {
      fontSize: 12,
      fontWeight: 700,
      color: orange,
      textTransform: "uppercase",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      paddingBottom: 4,
      marginBottom: 10,
    },

    paragraph: {
      fontSize: 9,
      lineHeight: 1.5,
    },

    block: {
      marginBottom: 10,
    },

    blockTitle: {
      fontSize: 10,
      fontWeight: 700,
    },

    blockSub: {
      fontSize: 8.5,
      fontStyle: "italic",
      marginBottom: 3,
    },

    skillContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    skillBox: {
      backgroundColor: orange,
      color: "#fff",
      paddingVertical: 3,
      paddingHorizontal: 8,
      marginRight: 6,
      marginBottom: 6,
      fontSize: 8,
      borderRadius: 3,
    },

    listItem: {
      fontSize: 9,
      marginBottom: 4,
    },
  });

  const renderSectionHeader = (title) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const renderSection = (key) => {
    switch (key) {
      case "summary":
        return data.summary ? (
          <View key="summary" style={styles.sectionWrapper}>
            {renderSectionHeader("Professional Summary")}
            <Text style={styles.paragraph}>
              {renderSafe(data.summary)}
            </Text>
          </View>
        ) : null;

      case "skills":
        return safeArray(data.skills).length ? (
          <View key="skills" style={styles.sectionWrapper}>
            {renderSectionHeader("Skills")}
            <View style={styles.skillContainer}>
              {safeArray(data.skills).map((skill, i) => (
                <Text key={i} style={styles.skillBox}>
                  {renderSafe(skill)}
                </Text>
              ))}
            </View>
          </View>
        ) : null;

      case "experience":
        return safeArray(data.experience).length ? (
          <View key="experience" style={styles.sectionWrapper}>
            {renderSectionHeader("Professional Experience")}
            {safeArray(data.experience).map((exp, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(exp.title)}{" "}
                  {exp.date ? `(${exp.date})` : ""}
                </Text>
                <Text style={styles.blockSub}>
                  {renderSafe(exp.companyName)}
                </Text>
                <Text style={styles.paragraph}>
                  {renderSafe(exp.description)}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "education":
        return safeArray(data.education).length ? (
          <View key="education" style={styles.sectionWrapper}>
            {renderSectionHeader("Education")}
            {safeArray(data.education).map((edu, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(edu.degree)}
                </Text>
                <Text style={styles.paragraph}>
                  {renderSafe(edu.institution)}{" "}
                  {edu.duration ? `(${edu.duration})` : ""}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "projects":
      case "project":
        return safeArray(data.project || data.projects).length ? (
          <View key="projects" style={styles.sectionWrapper}>
            {renderSectionHeader("Projects")}
            {safeArray(data.project || data.projects).map((prj, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(prj.title)}
                </Text>
                <Text style={styles.paragraph}>
                  {renderSafe(prj.description)}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "certifications":
        return safeArray(data.certifications).length ? (
          <View key="certifications" style={styles.sectionWrapper}>
            {renderSectionHeader("Certifications")}
            {safeArray(data.certifications).map((cert, i) => (
              <Text key={i} style={styles.listItem}>
                • {renderSafe(cert.name)}
              </Text>
            ))}
          </View>
        ) : null;

      case "achievements":
        return safeArray(data.achievements).length ? (
          <View key="achievements" style={styles.sectionWrapper}>
            {renderSectionHeader("Achievements")}
            {safeArray(data.achievements).map((ach, i) => (
              <Text key={i} style={styles.listItem}>
                • {renderSafe(ach.title)}
              </Text>
            ))}
          </View>
        ) : null;

      case "languages":
        return safeArray(data.languages).length ? (
          <View key="languages" style={styles.sectionWrapper}>
            {renderSectionHeader("Languages")}
            <Text style={styles.paragraph}>
              {safeArray(data.languages).join(" • ")}
            </Text>
          </View>
        ) : null;

      case "interests":
        return safeArray(data.interests).length ? (
          <View key="interests" style={styles.sectionWrapper}>
            {renderSectionHeader("Interests")}
            <Text style={styles.paragraph}>
              {safeArray(data.interests).join(" • ")}
            </Text>
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
          <View style={styles.headerWrapper}>
            <Text style={styles.name}>
              {data.name || "Your Name"}
            </Text>
            <Text style={styles.role}>
              {data.role}
            </Text>

            <View style={styles.contactRow}>
              {data.phone && (
                <Text style={styles.contactItem}>
                  {data.phone}
                </Text>
              )}
              {data.email && (
                <Text style={styles.contactItem}>
                  {data.email}
                </Text>
              )}
              {data.location && (
                <Text style={styles.contactItem}>
                  {data.location}
                </Text>
              )}
              {data.linkedin && (
                <Link
                  src={normalizeUrl(data.linkedin)}
                  style={styles.link}
                >
                  LinkedIn
                </Link>
              )}
              {data.github && (
                <Link
                  src={normalizeUrl(data.github)}
                  style={styles.link}
                >
                  GitHub
                </Link>
              )}
              {data.portfolio && (
                <Link
                  src={normalizeUrl(data.portfolio)}
                  style={styles.link}
                >
                  Portfolio
                </Link>
              )}
            </View>
          </View>

          {/* BODY */}
          <View>
            {(sectionOrder || []).map((key) =>
              renderSection(key)
            )}
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Template8PDF;