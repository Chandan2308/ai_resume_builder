import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 350;
  weight += (data.projects?.length || 0) * 300;
  weight += (data.education?.length || 0) * 200;
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

const Template6PDF = ({ data, sectionOrder, headingColor = "#2563eb" }) => {
  if (!data) return null;

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const scale = calculateScale(data);

  const styles = StyleSheet.create({
    page: {
      padding: 32,
      fontSize: 9,
      fontFamily: "Helvetica",
      color: "#111827",
    },

    container: {
      transformOrigin: "top left",
    },

    /* HEADER */

    headerWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },

    headerLeft: {
      flex: 1,
      paddingRight: 20,
    },

    name: {
      fontSize: 22,
      fontWeight: 800,
    },

    role: {
      fontSize: 12,
      color: headingColor,
      marginTop: 4,
      marginBottom: 10,
    },

    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 6,
    },

    contactItem: {
      fontSize: 8,
      marginRight: 12,
      marginBottom: 4,
      color: "#374151",
    },

    link: {
      fontSize: 8,
      marginRight: 12,
      marginBottom: 4,
      color: "#2563eb",
      textDecoration: "none",
    },

    photo: {
      width: 90,
      height: 90,
      borderRadius: 45,
      borderWidth: 3,
      borderColor: headingColor,
    },

    /* SECTION */

    sectionWrapper: {
      marginBottom: 16,
    },

    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: headingColor,
      borderBottomWidth: 1.5,
      borderBottomColor: headingColor,
      paddingBottom: 4,
      marginBottom: 6,
      textTransform: "uppercase",
    },

    paragraph: {
      fontSize: 9,
      lineHeight: 1.5,
      color: "#374151",
      textAlign: "justify",
    },

    block: {
      marginBottom: 10,
    },

    blockRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    blockTitle: {
      fontSize: 10,
      fontWeight: 600,
    },

    blockSub: {
      fontSize: 8.5,
      fontStyle: "italic",
      color: "#6b7280",
    },

    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    skillBox: {
      backgroundColor: "#e5e7eb",
      paddingVertical: 3,
      paddingHorizontal: 8,
      marginRight: 6,
      marginBottom: 6,
      borderRadius: 3,
      fontSize: 8,
    },

    listItem: {
      fontSize: 9,
      marginBottom: 4,
    },
  });

  const renderSectionHeader = (title) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* HEADER */}

          <View style={styles.headerWrapper}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.role}>{data.role}</Text>

              <View style={styles.contactRow}>
                {data.phone && (
                  <Text style={styles.contactItem}>
                    Phone: {data.phone}
                  </Text>
                )}
                {data.email && (
                  <Text style={styles.contactItem}>
                    Email: {data.email}
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

            {data.photo && (
              <Image src={data.photo} style={styles.photo} />
            )}
          </View>

          {/* DYNAMIC SECTIONS */}

          {sectionOrder?.map((key) => {
            switch (key) {
              case "summary":
                return data.summary ? (
                  <View key="summary" style={styles.sectionWrapper}>
                    {renderSectionHeader("Professional Summary")}
                    <Text style={styles.paragraph}>
                      {data.summary}
                    </Text>
                  </View>
                ) : null;

              case "skills":
                return safeArray(data.skills).length ? (
                  <View key="skills" style={styles.sectionWrapper}>
                    {renderSectionHeader("Skills")}
                    <View style={styles.skillsContainer}>
                      {safeArray(data.skills).map((skill, i) => (
                        <Text key={i} style={styles.skillBox}>
                          {skill}
                        </Text>
                      ))}
                    </View>
                  </View>
                ) : null;

              case "experience":
                return safeArray(data.experience).length ? (
                  <View key="experience" style={styles.sectionWrapper}>
                    {renderSectionHeader("Experience")}
                    {safeArray(data.experience).map((exp, i) => (
                      <View key={i} style={styles.block}>
                        <View style={styles.blockRow}>
                          <Text style={styles.blockTitle}>
                            {exp.companyName}
                          </Text>
                          <Text style={styles.blockSub}>
                            {exp.date}
                          </Text>
                        </View>
                        <Text style={styles.blockSub}>
                          {exp.title}
                        </Text>
                        <Text style={styles.paragraph}>
                          {exp.description}
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
                      <View key={i} style={styles.blockRow}>
                        <Text style={styles.blockTitle}>
                          {edu.institution} — {edu.degree}
                        </Text>
                        <Text style={styles.blockSub}>
                          {edu.duration}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null;

              case "projects":
                return safeArray(data.projects).length ? (
                  <View key="projects" style={styles.sectionWrapper}>
                    {renderSectionHeader("Projects")}
                    {safeArray(data.projects).map((prj, i) => (
                      <View key={i} style={styles.block}>
                        <Text style={styles.blockTitle}>
                          {prj.name}
                        </Text>
                        <Text style={styles.paragraph}>
                          {prj.description}
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
                        • {cert.title || cert}
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
                        • {typeof ach === "string"
                            ? ach
                            : ach?.title || ach?.name || ""}
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
          })}
        </View>
      </Page>
    </Document>
  );
};

export default Template6PDF;