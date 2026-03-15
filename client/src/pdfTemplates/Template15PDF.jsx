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
  weight += (data.experience?.length || 0) * 500;
  weight += (data.projects?.length || 0) * 350;
  weight += (data.education?.length || 0) * 250;
  weight += (data.skills?.length || 0) * 60;
  weight += (data.certifications?.length || 0) * 120;
  weight += (data.achievements?.length || 0) * 150;
  weight += (data.languages?.length || 0) * 50;
  weight += (data.interests?.length || 0) * 50;

  if (weight > 8500) return 0.70;
  if (weight > 7500) return 0.78;
  if (weight > 6500) return 0.86;
  if (weight > 5500) return 0.92;
  return 1;
};

const Template15PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const scale = calculateScale(data);

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const safe = (v) =>
    typeof v === "string"
      ? v
      : v?.title || v?.name || v?.degree || v?.language || "";

  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const accent = "#4b42f5";
  const gray = "#555555";

  /* ================= STYLES ================= */

  const styles = StyleSheet.create({
    page: {
      padding: 0,
      fontSize: 10,
      fontFamily: "Times-Roman",
      color: "#000000"
    },

    container: {
      transformOrigin: "top left"
    },

    header: {
      paddingTop: 40,
      paddingBottom: 20,
      paddingHorizontal: 60,
      textAlign: "center"
    },

    name: {
      fontSize: 26,
      fontWeight: 700,
      marginBottom: 6
    },

    role: {
      fontSize: 14,
      color: accent,
      fontWeight: 700,
      marginBottom: 12
    },

    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center"
    },

    contactItem: {
      fontSize: 9,
      marginHorizontal: 8,
      color: gray
    },

    divider: {
      marginHorizontal: 60,
      marginBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: "#000000"
    },

    body: {
      paddingHorizontal: 60,
      paddingBottom: 40
    },

    section: {
      marginBottom: 20
    },

    sectionTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: accent,
      marginBottom: 8
    },

    paragraph: {
      fontSize: 10,
      lineHeight: 1.6
    },

    block: {
      marginBottom: 14
    },

    blockTitleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline"
    },

    blockTitle: {
      fontSize: 11,
      fontWeight: 700
    },

    blockSub: {
      fontSize: 9,
      color: gray
    },

    bulletRow: {
      flexDirection: "row",
      marginBottom: 3
    },

    bulletDot: {
      marginRight: 6,
      color: accent
    },

    techText: {
      fontSize: 9,
      color: "#444444",
      marginBottom: 3
    }
  });

  /* ================= RENDER SECTIONS ================= */

  const renderSection = (key) => {
    switch (key) {
      case "summary":
        return data.summary ? (
          <View key="summary" style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.paragraph}>{safe(data.summary)}</Text>
          </View>
        ) : null;

      case "experience":
        return safeArray(data.experience).length ? (
          <View key="experience" style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {safeArray(data.experience).map((exp, i) => (
              <View key={i} style={styles.block}>
                <View style={styles.blockTitleRow}>
                  <Text style={styles.blockTitle}>
                    {safe(exp.title)}
                    {exp.companyName && ` at ${exp.companyName}`}
                  </Text>
                  <Text style={styles.blockSub}>{exp.date}</Text>
                </View>
                {exp.companyLocation && (
                  <Text style={styles.blockSub}>
                    {exp.companyLocation}
                  </Text>
                )}
                {safeArray(exp.accomplishment).map((pt, j) => (
                  <View key={j} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.paragraph}>{safe(pt)}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null;

      case "education":
        return safeArray(data.education).length ? (
          <View key="education" style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {safeArray(data.education).map((edu, i) => (
              <View key={i} style={styles.block}>
                <View style={styles.blockTitleRow}>
                  <Text style={styles.blockTitle}>
                    {safe(edu.degree)}
                  </Text>
                  <Text style={styles.blockSub}>{edu.duration}</Text>
                </View>
                <Text style={{ color: accent }}>
                  {safe(edu.institution)}
                </Text>
                {edu.location && (
                  <Text style={styles.blockSub}>
                    {edu.location}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ) : null;

      case "projects":
        return safeArray(data.projects).length ? (
          <View key="projects" style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {safeArray(data.projects).map((proj, i) => (
              <View key={i} style={styles.block}>
                <View style={styles.blockTitleRow}>
                  <Text style={styles.blockTitle}>
                    {safe(proj.name)}
                  </Text>
                  {proj.link && (
                    <Link
                      src={normalizeUrl(proj.link)}
                      style={{ fontSize: 9, color: accent }}
                    >
                      View 
                    </Link>
                  )}
                </View>
                {proj.technologies && (
                  <Text style={styles.techText}>
                    Tech Stack:{" "}
                    {Array.isArray(proj.technologies)
                      ? proj.technologies.join(", ")
                      : proj.technologies}
                  </Text>
                )}
                <Text style={styles.paragraph}>
                  {safe(proj.description)}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "certifications":
        return safeArray(data.certifications).length ? (
          <View key="certifications" style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {safeArray(data.certifications).map((cert, i) => (
              <View key={i} style={styles.blockTitleRow}>
                <View>
                  <Text style={styles.blockTitle}>
                    {safe(cert.title)}
                  </Text>
                  <Text style={styles.blockSub}>
                    {safe(cert.issuer)}
                  </Text>
                </View>
                <Text style={styles.blockSub}>{cert.date}</Text>
              </View>
            ))}
          </View>
        ) : null;

      case "achievements":
        return safeArray(data.achievements).length ? (
          <View key="achievements" style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {safeArray(data.achievements).map((ach, i) => (
              <View key={i} style={styles.block}>
                {typeof ach === "object" ? (
                  <>
                    <View style={styles.blockTitleRow}>
                      <Text style={styles.blockTitle}>
                        {safe(ach.title)}
                      </Text>
                      <Text style={styles.blockSub}>
                        {ach.date}
                      </Text>
                    </View>
                    {ach.description && (
                      <Text style={styles.blockSub}>
                        {ach.description}
                      </Text>
                    )}
                  </>
                ) : (
                  <View style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text>{safe(ach)}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : null;

      case "skills":
        return safeArray(data.skills).length ? (
          <View key="skills" style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {safeArray(data.skills).map((skill, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text>{safe(skill)}</Text>
              </View>
            ))}
          </View>
        ) : null;

      case "languages":
        return safeArray(data.languages).length ? (
          <View key="languages" style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {safeArray(data.languages).map((lang, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text>{safe(lang)}</Text>
              </View>
            ))}
          </View>
        ) : null;

      case "interests":
        return safeArray(data.interests).length ? (
          <View key="interests" style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            {safeArray(data.interests).map((int, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text>{safe(int)}</Text>
              </View>
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
              {data.name || "Your Name"}
            </Text>
            {data.role && (
              <Text style={styles.role}>{data.role}</Text>
            )}

            <View style={styles.contactRow}>
              {data.location && (
                <Text style={styles.contactItem}>
                 Location :{data.location}
                </Text>
              )}
              {data.phone && (
                <Text style={styles.contactItem}>
                  Phone No.:{data.phone}
                </Text>
              )}
              {data.email && (
                <Link
                  src={`mailto:${data.email}`}
                  style={styles.contactItem}
                >
                  Email : {data.email}
                </Link>
              )}
              {data.linkedin && (
                <Link
                  src={normalizeUrl(data.linkedin)}
                  style={styles.contactItem}
                >
                  LinkedIn
                </Link>
              )}
              {data.github && (
                <Link
                  src={normalizeUrl(data.github)}
                  style={styles.contactItem}
                >
                  GitHub
                </Link>
              )}
              {data.portfolio && (
                <Link
                  src={normalizeUrl(data.portfolio)}
                  style={styles.contactItem}
                >
                  Portfolio
                </Link>
              )}
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* BODY */}
          <View style={styles.body}>
            {(sectionOrder || [
              "summary",
              "experience",
              "education",
              "skills",
              "projects",
              "certifications",
              "achievements",
              "languages",
              "interests"
            ]).map((key) => renderSection(key))}
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Template15PDF;