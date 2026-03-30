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
  weight += (data.projects?.length || 0) * 300;
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

const Template7PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const scale = calculateScale(data);
  const dark = "#111827";

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
      color: "#1f2937",
    },

    container: {
      transformOrigin: "top left",
    },

    /* HEADER */

    headerWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 4,
      borderBottomColor: dark,
      paddingBottom: 12,
      marginBottom: 20,
    },

    leftHeader: {
      flex: 1,
    },

    name: {
      fontSize: 22,
      fontWeight: 800,
      textTransform: "uppercase",
    },

    role: {
      fontSize: 11,
      color: "#6b7280",
      marginTop: 4,
    },

    contactColumn: {
      alignItems: "flex-end",
      fontSize: 8,
      gap: 3,
    },

    link: {
      color: "#2563eb",
      fontSize: 8,
      textDecoration: "none",
    },

    /* SECTIONS */

    sectionWrapper: {
      marginBottom: 16,
    },

    sectionHeader: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      borderBottomWidth: 2,
      borderBottomColor: "#e5e7eb",
      paddingBottom: 4,
      marginBottom: 8,
      color: dark,
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
      color: "#6b7280",
      marginBottom: 3,
    },

    skillContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    skillBox: {
      backgroundColor: "#f3f4f6",
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
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderSection = (key) => {
    switch (key) {
      case "summary":
        return data.summary ? (
          <View key="summary" style={styles.sectionWrapper}>
            {renderSectionHeader("About Me")}
            <Text style={styles.paragraph}>
              {renderSafe(data.summary)}
            </Text>
          </View>
        ) : null;

      case "experience":
        return safeArray(data.experience).length ? (
          <View key="experience" style={styles.sectionWrapper}>
            {renderSectionHeader("Experience")}
            {safeArray(data.experience).map((exp, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(exp.title)}
                </Text>
                <Text style={styles.blockSub}>
                  {renderSafe(exp.companyName)} | {exp.date}
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
                <Text style={styles.blockSub}>
                  {renderSafe(edu.institution)} | {edu.duration}
                </Text>
              </View>
            ))}
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

      case "projects":
        return safeArray(data.projects).length ? (
          <View key="projects" style={styles.sectionWrapper}>
            {renderSectionHeader("Projects")}
            {safeArray(data.projects).map((p, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(p.name)}
                </Text>
                <Text style={styles.paragraph}>
                  {renderSafe(p.description)}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "certifications":
        return safeArray(data.certifications).length ? (
          <View key="certifications" style={styles.sectionWrapper}>
            {renderSectionHeader("Certifications")}
            {safeArray(data.certifications).map((c, i) => (
              <Text key={i} style={styles.listItem}>
                • {renderSafe(c.title)}
              </Text>
            ))}
          </View>
        ) : null;

      case "achievements":
        return safeArray(data.achievements).length ? (
          <View key="achievements" style={styles.sectionWrapper}>
            {renderSectionHeader("Achievements")}
            {safeArray(data.achievements).map((a, i) => (
              <Text key={i} style={styles.listItem}>
                • {renderSafe(a)}
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
            <View style={styles.leftHeader}>
              <Text style={styles.name}>
                {data.name?.toUpperCase() || "YOUR NAME"}
              </Text>
              <Text style={styles.role}>
                {renderSafe(data.role)}
              </Text>
            </View>

            <View style={styles.contactColumn}>
              {data.phone && <Text>{data.phone}</Text>}
              {data.email && <Text style={{ color: "#2563eb" }}>{data.email}</Text>}
              {data.location && <Text>{data.location}</Text>}
              {data.linkedin && (
                <Link src={normalizeUrl(data.linkedin)} style={styles.link}>
                  {data.linkedin}
                </Link>
              )}
              {data.github && (
                <Link src={normalizeUrl(data.github)} style={styles.link}>
                  {data.github}
                </Link>
              )}
              {data.portfolio && (
                <Link src={normalizeUrl(data.portfolio)} style={styles.link}>
                  {data.portfolio}
                </Link>
              )}
            </View>
          </View>

          {/* BODY */}
          <View>
            {(sectionOrder || []).map((key) => renderSection(key))}
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Template7PDF;