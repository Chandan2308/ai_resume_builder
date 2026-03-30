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
  weight += (data.experience?.length || 0) * 400;
  weight += (data.projects?.length || 0) * 300;
  weight += (data.education?.length || 0) * 220;
  weight += (data.skills?.length || 0) * 60;
  weight += (data.certifications?.length || 0) * 90;
  weight += (data.achievements?.length || 0) * 120;
  weight += (data.languages?.length || 0) * 40;
  weight += (data.interests?.length || 0) * 40;

  if (weight > 7000) return 0.72;
  if (weight > 6000) return 0.8;
  if (weight > 5000) return 0.88;
  if (weight > 4000) return 0.94;
  return 1;
};

/* ================= COMPONENT ================= */

const Template9PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const scale = calculateScale(data);

  const primary = "#1e40af";
  const secondary = "#3b82f6";

  const safeArray = (v) => (Array.isArray(v) ? v : []);

  const renderSafe = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return (
      val.title ||
      val.name ||
      val.degree ||
      val.label ||
      val.language ||
      ""
    );
  };

  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const styles = StyleSheet.create({
    page: {
      padding: 48,
      fontSize: 9,
      fontFamily: "Helvetica",
      color: "#111827",
    },

    container: {
      transformOrigin: "top left",
    },

    /* HEADER */

    headerWrapper: {
      textAlign: "center",
      borderBottomWidth: 4,
      borderBottomColor: primary,
      paddingBottom: 20,
      marginBottom: 30,
    },

    name: {
      fontSize: 26,
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: 2,
    },

    role: {
      fontSize: 12,
      color: secondary,
      fontWeight: 700,
      marginTop: 6,
      textTransform: "uppercase",
    },

    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 16,
      gap: 14,
      fontSize: 8.5,
    },

    contactItem: {
      marginRight: 12,
      color: "#4b5563",
    },

    link: {
      color: "#4b5563",
      textDecoration: "none",
      fontSize: 8.5,
    },

    /* SECTION */

    sectionWrapper: {
      marginBottom: 22,
    },

    sectionHeader: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      borderBottomWidth: 3,
      borderBottomColor: secondary,
      paddingBottom: 6,
      marginBottom: 14,
      color: primary,
      letterSpacing: 1,
    },

    paragraph: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151",
    },

    block: {
      marginBottom: 16,
    },

    blockTitleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    blockTitle: {
      fontSize: 10,
      fontWeight: 700,
    },

    dateText: {
      fontSize: 8.5,
      color: "#6b7280",
    },

    company: {
      fontSize: 9,
      color: secondary,
      fontWeight: 600,
      marginBottom: 4,
    },

    skillContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    skillBadge: {
      backgroundColor: "#eff6ff",
      borderWidth: 1,
      borderColor: "#bfdbfe",
      paddingVertical: 4,
      paddingHorizontal: 10,
      marginRight: 8,
      marginBottom: 8,
      borderRadius: 4,
      fontSize: 8.5,
      color: primary,
      fontWeight: 600,
    },

    listItem: {
      fontSize: 9,
      marginBottom: 6,
      color: "#374151",
    },
  });

  const renderSectionHeader = (title) => (
    <Text style={styles.sectionHeader}>{title}</Text>
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
                <Text key={i} style={styles.skillBadge}>
                  {renderSafe(skill)}
                </Text>
              ))}
            </View>
          </View>
        ) : null;

      case "experience":
        return safeArray(data.experience).length ? (
          <View key="experience" style={styles.sectionWrapper}>
            {renderSectionHeader("Work Experience")}
            {safeArray(data.experience).map((exp, i) => (
              <View key={i} style={styles.block}>
                <View style={styles.blockTitleRow}>
                  <Text style={styles.blockTitle}>
                    {renderSafe(exp.title)}
                  </Text>
                  <Text style={styles.dateText}>
                    {exp.date}
                  </Text>
                </View>
                <Text style={styles.company}>
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
                <View style={styles.blockTitleRow}>
                  <Text style={styles.blockTitle}>
                    {renderSafe(edu.degree)}
                  </Text>
                  <Text style={styles.dateText}>
                    {edu.duration}
                  </Text>
                </View>
                <Text style={styles.paragraph}>
                  {renderSafe(edu.institution)}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "projects":
        return safeArray(data.projects).length ? (
          <View key="projects" style={styles.sectionWrapper}>
            {renderSectionHeader("Projects")}
            {safeArray(data.projects).map((proj, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(proj.name)}
                </Text>
                <Text style={styles.paragraph}>
                  {renderSafe(proj.description)}
                </Text>
                {proj.link && (
                  <Link
                    src={normalizeUrl(proj.link)}
                    style={{ color: secondary, fontSize: 8 }}
                  >
                    View Project
                  </Link>
                )}
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
                • {renderSafe(cert.title)}
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
                • {renderSafe(ach)}
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
              {data.name || "YOUR NAME"}
            </Text>
            <Text style={styles.role}>
              {data.role}
            </Text>

            <View style={styles.contactRow}>
              {data.phone && (
                <Text style={styles.contactItem}>{data.phone}</Text>
              )}
              {data.email && (
                <Text style={styles.contactItem}>{data.email}</Text>
              )}
              {data.linkedin && (
                <Link src={normalizeUrl(data.linkedin)} style={styles.link}>
                  LinkedIn
                </Link>
              )}
              {data.github && (
                <Link src={normalizeUrl(data.github)} style={styles.link}>
                  GitHub
                </Link>
              )}
              {data.portfolio && (
                <Link src={normalizeUrl(data.portfolio)} style={styles.link}>
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

export default Template9PDF;