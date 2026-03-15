import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image
} from "@react-pdf/renderer";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 450;
  weight += (data.projects?.length || 0) * 350;
  weight += (data.education?.length || 0) * 220;
  weight += (data.skills?.length || 0) * 50;
  weight += (data.certifications?.length || 0) * 90;
  weight += (data.achievements?.length || 0) * 120;
  weight += (data.languages?.length || 0) * 40;
  weight += (data.interests?.length || 0) * 40;

  if (weight > 8000) return 0.70;
  if (weight > 7000) return 0.78;
  if (weight > 6000) return 0.85;
  if (weight > 5000) return 0.92;
  return 1;
};

const Template13PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const safe = (v) =>
    typeof v === "string"
      ? v
      : v?.title || v?.name || v?.degree || "";

  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const scale = calculateScale(data);

  /* ================= STYLES ================= */

  const styles = StyleSheet.create({
    page: {
      padding: 0,
      fontSize: 9,
      fontFamily: "Helvetica",
      color: "#1f2937"
    },

    container: {
      transformOrigin: "top left"
    },

    /* HEADER */

    header: {
      backgroundColor: "#1e40af",
      padding: 28,
      color: "white"
    },

    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },

    name: {
      fontSize: 26,
      fontWeight: 800
    },

    role: {
      fontSize: 12,
      marginTop: 6,
      color: "#bfdbfe"
    },

    photo: {
      width: 90,
      height: 90,
      borderRadius: 50
    },

    /* CONTACT BAR */

    contactBar: {
      backgroundColor: "#111827",
      color: "white",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 20
    },

    contactItem: {
      fontSize: 8,
      marginBottom: 4
    },

    /* BODY */

    body: {
      padding: 28
    },

    section: {
      marginBottom: 18
    },

    sectionHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8
    },

    accentBar: {
      width: 4,
      height: 18,
      backgroundColor: "#2563eb",
      marginRight: 8
    },

    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase"
    },

    paragraph: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151"
    },

    /* CARDS */

    card: {
      backgroundColor: "#f9fafb",
      padding: 10,
      borderLeftWidth: 4,
      borderLeftColor: "#2563eb",
      marginBottom: 10
    },

    cardTitle: {
      fontSize: 10,
      fontWeight: 700
    },

    cardSub: {
      fontSize: 8.5,
      color: "#2563eb",
      marginBottom: 3
    },

    cardDate: {
      fontSize: 8,
      color: "#6b7280",
      marginBottom: 3
    },

    bulletRow: {
      flexDirection: "row",
      marginBottom: 3
    },

    bulletText: {
      fontSize: 8.5,
      color: "#374151"
    },

    /* CHIP STYLE */

    chipContainer: {
      flexDirection: "row",
      flexWrap: "wrap"
    },

    chipBlue: {
      backgroundColor: "#dbeafe",
      color: "#1e40af",
      paddingVertical: 3,
      paddingHorizontal: 8,
      marginRight: 6,
      marginBottom: 6,
      borderRadius: 6,
      fontSize: 8,
      fontWeight: 600
    },

    chipGray: {
      backgroundColor: "#f3f4f6",
      paddingVertical: 3,
      paddingHorizontal: 8,
      marginRight: 6,
      marginBottom: 6,
      borderRadius: 6,
      fontSize: 8
    },

    link: {
      fontSize: 8,
      color: "#2563eb",
      textDecoration: "none"
    }
  });

  const renderSectionHeader = (title) => (
    <View style={styles.sectionHeaderRow}>
      <View style={styles.accentBar} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
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
              <View key={i} style={styles.card}>
                <Text style={styles.cardTitle}>{safe(exp.title)}</Text>
                <Text style={styles.cardSub}>{safe(exp.companyName)}</Text>
                <Text style={styles.cardDate}>{exp.date}</Text>
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

      case "projects":
        return safeArray(data.projects).length ? (
          <View key="projects" style={styles.section}>
            {renderSectionHeader("Projects")}
            {safeArray(data.projects).map((proj, i) => (
              <View key={i} style={styles.card}>
                <Text style={styles.cardTitle}>{safe(proj.name)}</Text>
                {proj.link && (
                  <Link src={normalizeUrl(proj.link)} style={styles.link}>
                    View Project
                  </Link>
                )}
                <Text style={styles.paragraph}>
                  {safe(proj.description)}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "education":
        return safeArray(data.education).length ? (
          <View key="education" style={styles.section}>
            {renderSectionHeader("Education")}
            {safeArray(data.education).map((edu, i) => (
              <View key={i} style={styles.card}>
                <Text style={styles.cardTitle}>{safe(edu.degree)}</Text>
                <Text style={styles.cardSub}>{safe(edu.institution)}</Text>
                <Text style={styles.cardDate}>{edu.duration}</Text>
              </View>
            ))}
          </View>
        ) : null;

      case "skills":
        return safeArray(data.skills).length ? (
          <View key="skills" style={styles.section}>
            {renderSectionHeader("Skills")}
            <View style={styles.chipContainer}>
              {safeArray(data.skills).map((skill, i) => (
                <Text key={i} style={styles.chipBlue}>
                  {skill}
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
                • {safe(cert.title)} {cert.issuer && `• ${cert.issuer}`} {cert.date && `• ${cert.date}`}
              </Text>
            ))}
          </View>
        ) : null;

      case "achievements":
        return safeArray(data.achievements).length ? (
          <View key="achievements" style={styles.section}>
            {renderSectionHeader("Achievements")}
            {safeArray(data.achievements).map((ach, i) => (
              <Text key={i} style={styles.paragraph}>
                • {typeof ach === "string" ? ach : ach.title}
              </Text>
            ))}
          </View>
        ) : null;

      case "languages":
        return safeArray(data.languages).length ? (
          <View key="languages" style={styles.section}>
            {renderSectionHeader("Languages")}
            <View style={styles.chipContainer}>
              {safeArray(data.languages).map((lang, i) => (
                <Text key={i} style={styles.chipGray}>
                  {lang}
                </Text>
              ))}
            </View>
          </View>
        ) : null;

      case "interests":
        return safeArray(data.interests).length ? (
          <View key="interests" style={styles.section}>
            {renderSectionHeader("Interests")}
            <View style={styles.chipContainer}>
              {safeArray(data.interests).map((int, i) => (
                <Text key={i} style={styles.chipGray}>
                  {int}
                </Text>
              ))}
            </View>
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
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.role}>{data.role}</Text>
              </View>
              {data.photo && (
                <Image src={data.photo} style={styles.photo} />
              )}
            </View>
          </View>

          {/* CONTACT BAR */}
          <View style={styles.contactBar}>
            {data.email && (
              <Text style={styles.contactItem}>Email: {data.email}</Text>
            )}
            {data.phone && (
              <Text style={styles.contactItem}>Phone: {data.phone}</Text>
            )}
            {data.location && (
              <Text style={styles.contactItem}>Location: {data.location}</Text>
            )}
            {data.linkedin && (
              <Link
                src={normalizeUrl(data.linkedin)}
                style={[styles.contactItem, { color: "white" }]}
              >
                LinkedIn
              </Link>
            )}
          </View>

          {/* BODY */}
          <View style={styles.body}>
            {(sectionOrder || []).map((key) => renderSection(key))}
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Template13PDF;