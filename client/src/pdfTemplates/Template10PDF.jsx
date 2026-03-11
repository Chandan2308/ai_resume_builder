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
  weight += (data.experience?.length || 0) * 420;
  weight += (data.projects?.length || 0) * 320;
  weight += (data.education?.length || 0) * 240;
  weight += (data.skills?.length || 0) * 60;
  weight += (data.certifications?.length || 0) * 80;
  weight += (data.achievements?.length || 0) * 120;
  weight += (data.languages?.length || 0) * 40;
  weight += (data.interests?.length || 0) * 40;

  if (weight > 7200) return 0.72;
  if (weight > 6200) return 0.8;
  if (weight > 5200) return 0.88;
  if (weight > 4200) return 0.94;
  return 1;
};

const Template10PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const scale = calculateScale(data);
  const primary = "#3b82f6";

  const safeArray = (v) => (Array.isArray(v) ? v : []);

  const renderSafe = (v) =>
    typeof v === "string"
      ? v
      : v?.title || v?.name || v?.degree || "";

  const normalizeUrl = (url) =>
    url && (url.startsWith("http://") || url.startsWith("https://"))
      ? url
      : `https://${url}`;

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

    header: {
      paddingBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: primary,
      marginBottom: 30,
    },

    name: {
      fontSize: 28,
      fontWeight: 700,
    },

    role: {
      fontSize: 12,
      color: "#6b7280",
      marginTop: 6,
    },

    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 16,
      fontSize: 8.5,
      color: "#6b7280",
    },

    contactItem: {
      marginRight: 18,
    },

    link: {
      textDecoration: "none",
      color: "#6b7280",
      fontSize: 8.5,
    },

    /* SECTIONS */

    sectionWrapper: {
      marginBottom: 24,
      paddingHorizontal: 24,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 8,
    },

    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#d1d5db",
      marginBottom: 12,
    },

    paragraph: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151",
    },

    block: {
      marginBottom: 14,
    },

    blockTitle: {
      fontSize: 11,
      fontWeight: 600,
    },

    subText: {
      fontSize: 8.5,
      color: "#6b7280",
      marginBottom: 4,
    },

    skillContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    skillBadge: {
      backgroundColor: "#f3f4f6",
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 20,
      marginRight: 8,
      marginBottom: 8,
      fontSize: 8.5,
    },

    listItem: {
      fontSize: 9,
      marginBottom: 6,
    },
  });

  const renderSectionHeader = (title) => (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.divider} />
    </>
  );

  const renderSection = (key) => {
    switch (key) {
      case "summary":
        return data.summary ? (
          <View key="summary" style={styles.sectionWrapper}>
            {renderSectionHeader("Summary")}
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
                <Text style={styles.subText}>
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
                  {renderSafe(edu.institution)}
                </Text>
                <Text style={styles.subText}>
                  {renderSafe(edu.degree)} | {edu.duration}
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
              {safeArray(data.skills).map((s, i) => (
                <Text key={i} style={styles.skillBadge}>
                  {renderSafe(s)}
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
          <View style={styles.header}>
            <Text style={styles.name}>
              {data.name || ""}
            </Text>
            <Text style={styles.role}>
              {data.role || ""}
            </Text>

            <View style={styles.contactRow}>
              {["phone", "email", "linkedin", "github", "portfolio", "location"].map(
                (k) =>
                  data[k] && (
                    <View key={k} style={styles.contactItem}>
                      {k === "phone" ? (
                        <Link src={`tel:${data[k]}`} style={styles.link}>
                          {data[k]}
                        </Link>
                      ) : k === "email" ? (
                        <Link src={`mailto:${data[k]}`} style={styles.link}>
                          {data[k]}
                        </Link>
                      ) : k === "location" ? (
                        <Text style={styles.link}>
                          {data[k]}
                        </Text>
                      ) : (
                        <Link
                          src={normalizeUrl(data[k])}
                          style={styles.link}
                        >
                          {data[k]}
                        </Link>
                      )}
                    </View>
                  )
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

export default Template10PDF;