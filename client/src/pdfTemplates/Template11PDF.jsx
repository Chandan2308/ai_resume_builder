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
  weight += (data.experience?.length || 0) * 450;
  weight += (data.projects?.length || 0) * 300;
  weight += (data.education?.length || 0) * 220;
  weight += (data.skills?.length || 0) * 60;
  weight += (data.certifications?.length || 0) * 90;
  weight += (data.achievements?.length || 0) * 120;
  weight += (data.languages?.length || 0) * 40;
  weight += (data.interests?.length || 0) * 40;

  if (weight > 7500) return 0.72;
  if (weight > 6500) return 0.8;
  if (weight > 5500) return 0.88;
  if (weight > 4500) return 0.94;
  return 1;
};

const Template11PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const scale = calculateScale(data);

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const renderSafe = (v) =>
    typeof v === "string"
      ? v
      : v?.title || v?.name || v?.degree || "";

  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const styles = StyleSheet.create({
    page: {
      padding: 56,
      fontSize: 9,
      fontFamily: "Helvetica",
      color: "#1f2937",
    },

    container: {
      transformOrigin: "top left",
    },

    /* HEADER */

    header: {
      textAlign: "center",
      marginBottom: 28,
      paddingBottom: 20,
      borderBottomWidth: 6,
      borderBottomColor: "#111827",
    },

    name: {
      fontSize: 32,
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: 1,
    },

    role: {
      fontSize: 12,
      marginTop: 6,
      color: "#1d4ed8",
      textTransform: "uppercase",
      letterSpacing: 2,
    },

    contactRow: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: 16,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: "#f3f4f6",
      alignItems: "center",
    },

    link: {
      fontSize: 8,
      textTransform: "uppercase",
      letterSpacing: 1,
      textDecoration: "none",
      color: "#6b7280",
    },

    separator: {
      marginHorizontal: 6,
      fontSize: 8,
      color: "#9ca3af",
    },

    /* SECTIONS */

    sectionWrapper: {
      marginBottom: 20,
    },

    sectionTitle: {
      fontSize: 10,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 2,
      borderBottomWidth: 1,
      borderBottomColor: "#111827",
      paddingBottom: 4,
      marginBottom: 10,
    },

    paragraph: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#4b5563",
      textAlign: "justify",
    },

    block: {
      marginBottom: 12,
    },

    expRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
    },

    expTitle: {
      fontSize: 10,
      fontWeight: 700,
    },

    expDate: {
      fontSize: 8,
      textTransform: "uppercase",
      color: "#9ca3af",
    },

    company: {
      fontSize: 9,
      color: "#1d4ed8",
      marginBottom: 4,
      fontWeight: 600,
    },

    bulletRow: {
      flexDirection: "row",
      marginBottom: 4,
    },

    bulletText: {
      fontSize: 8.5,
      color: "#4b5563",
    },

    skillContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    skillBadge: {
      fontSize: 8,
      borderWidth: 1,
      borderColor: "#d1d5db",
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 12,
      marginRight: 6,
      marginBottom: 6,
      backgroundColor: "#f9fafb",
    },

    gridRow: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    gridItem: {
      width: "50%",
      fontSize: 8.5,
      marginBottom: 6,
      color: "#4b5563",
    },

    simpleText: {
      fontSize: 8.5,
      color: "#4b5563",
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
            {renderSectionHeader("Summary")}
            <Text style={styles.paragraph}>{renderSafe(data.summary)}</Text>
          </View>
        ) : null;

      case "experience":
        return safeArray(data.experience).length ? (
          <View key="experience" style={styles.sectionWrapper}>
            {renderSectionHeader("Experience")}
            {safeArray(data.experience).map((exp, i) => (
              <View key={i} style={styles.block}>
                <View style={styles.expRow}>
                  <Text style={styles.expTitle}>{renderSafe(exp.title)}</Text>
                  <Text style={styles.expDate}>{exp.date}</Text>
                </View>

                <Text style={styles.company}>
                  {renderSafe(exp.companyName)}
                </Text>

                {safeArray(exp.accomplishment).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={styles.bulletText}>• </Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
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
                <View style={styles.expRow}>
                  <Text style={styles.expTitle}>{renderSafe(edu.degree)}</Text>
                  <Text style={styles.expDate}>{edu.duration}</Text>
                </View>
                <Text style={styles.simpleText}>
                  {renderSafe(edu.institution)}
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
                <Text key={i} style={styles.skillBadge}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        ) : null;

      case "projects":
        return safeArray(data.projects).length ? (
          <View key="projects" style={styles.sectionWrapper}>
            {renderSectionHeader("Projects")}
            {safeArray(data.projects).map((proj, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.expTitle}>
                  {renderSafe(proj.name)}
                </Text>
                <Text style={styles.paragraph}>
                  {renderSafe(proj.description)}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "certifications":
        return safeArray(data.certifications).length ? (
          <View key="certifications" style={styles.sectionWrapper}>
            {renderSectionHeader("Certifications")}
            <View style={styles.gridRow}>
              {safeArray(data.certifications).map((cert, i) => (
                <Text key={i} style={styles.gridItem}>
                  • {renderSafe(cert.title)}
                </Text>
              ))}
            </View>
          </View>
        ) : null;

      case "achievements":
        return safeArray(data.achievements).length ? (
          <View key="achievements" style={styles.sectionWrapper}>
            {renderSectionHeader("Achievements")}
            {safeArray(data.achievements).map((ach, i) => (
              <Text key={i} style={styles.simpleText}>
                • {typeof ach === "string" ? ach : ach.title}
              </Text>
            ))}
          </View>
        ) : null;

      case "languages":
        return safeArray(data.languages).length ? (
          <View key="languages" style={styles.sectionWrapper}>
            {renderSectionHeader("Languages")}
            <Text style={styles.simpleText}>
              {safeArray(data.languages).join(" • ")}
            </Text>
          </View>
        ) : null;

      case "interests":
        return safeArray(data.interests).length ? (
          <View key="interests" style={styles.sectionWrapper}>
            {renderSectionHeader("Interests")}
            <View style={styles.skillContainer}>
              {safeArray(data.interests).map((item, i) => (
                <Text key={i} style={styles.skillBadge}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        ) : null;

      default:
        return null;
    }
  };

  /* ===== HEADER CONTACT LINKS WITH PROPER SPACING ===== */

  const contactLinks = [];

  if (data.email)
    contactLinks.push(
      <Link key="email" src={`mailto:${data.email}`} style={styles.link}>
        Email
      </Link>
    );

  if (data.phone)
    contactLinks.push(
      <Link key="phone" src={`tel:${data.phone}`} style={styles.link}>
        Phone
      </Link>
    );

  if (data.linkedin)
    contactLinks.push(
      <Link key="linkedin" src={normalizeUrl(data.linkedin)} style={styles.link}>
        LinkedIn
      </Link>
    );

  if (data.github)
    contactLinks.push(
      <Link key="github" src={normalizeUrl(data.github)} style={styles.link}>
        GitHub
      </Link>
    );

  if (data.portfolio)
    contactLinks.push(
      <Link key="portfolio" src={normalizeUrl(data.portfolio)} style={styles.link}>
        Portfolio
      </Link>
    );

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.name}>
              {data.name || "Your Name"}
            </Text>
            <Text style={styles.role}>
              {data.role || "Job Title"}
            </Text>

            <View style={styles.contactRow}>
              {contactLinks.map((item, index) => (
                <React.Fragment key={index}>
                  {index !== 0 && (
                    <Text style={styles.separator}>•</Text>
                  )}
                  {item}
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* BODY */}
          {(sectionOrder && sectionOrder.length > 0
            ? sectionOrder
            : [
                "summary",
                "experience",
                "education",
                "skills",
                "projects",
                "certifications",
                "achievements",
                "languages",
                "interests",
              ]
          ).map((key) => renderSection(key))}

        </View>
      </Page>
    </Document>
  );
};

export default Template11PDF;