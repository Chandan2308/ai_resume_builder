import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

/* ================= COLORS ================= */

const PRIMARY = "#111827";
const SUB = "#6b7280";
const BORDER = "#d1d5db";
const LINK = "#2563eb";

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

  if (weight > 6500) return 0.78;
  if (weight > 5500) return 0.85;
  if (weight > 4500) return 0.90;
  if (weight > 3500) return 0.95;
  return 1;
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: PRIMARY,
  },

  container: {
    transformOrigin: "top left",
  },

  /* HEADER */

  header: {
    textAlign: "center",
    marginBottom: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: 800,
    textTransform: "uppercase",
  },

  role: {
    fontSize: 12,
    color: SUB,
    marginTop: 4,
  },

  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },

  contactItem: {
    fontSize: 8,
    marginRight: 12,
    color: SUB,
  },

  link: {
    fontSize: 8,
    marginRight: 12,
    color: LINK,
    textDecoration: "none",
  },

  /* SECTION */

  sectionWrapper: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 3,
    marginBottom: 6,
  },

  paragraph: {
    fontSize: 9,
    color: PRIMARY,
    lineHeight: 1.4,
    textAlign: "justify",
  },

  block: {
    marginBottom: 10,
  },

  blockTitle: {
    fontSize: 10,
    fontWeight: 600,
  },

  blockSub: {
    fontSize: 8.5,
    color: SUB,
    marginBottom: 2,
  },

  skillBox: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
  },

  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  listItem: {
    fontSize: 9,
    marginBottom: 4,
  },
});

/* ================= COMPONENT ================= */

const Template5PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const scale = calculateScale(data);

  const renderHeader = (title) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* HEADER */}

          <View style={styles.header}>
            <Text style={styles.name}>{data.name || "Your Name"}</Text>
            {data.role && <Text style={styles.role}>{data.role}</Text>}

            <View style={styles.contactRow}>
              {data.phone && (
                <Text style={styles.contactItem}> {data.phone}</Text>
              )}
              {data.email && (
                <Text style={styles.contactItem}> {data.email}</Text>
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

          {/* DYNAMIC SECTIONS */}

          {sectionOrder?.map((key) => {
            switch (key) {

              case "summary":
                return data.summary ? (
                  <View key="summary" style={styles.sectionWrapper}>
                    {renderHeader("Summary")}
                    <Text style={styles.paragraph}>{data.summary}</Text>
                  </View>
                ) : null;

              case "experience":
                return safeArray(data.experience).length ? (
                  <View key="experience" style={styles.sectionWrapper}>
                    {renderHeader("Experience")}
                    {safeArray(data.experience).map((exp, i) => (
                      <View key={i} style={styles.block}>
                        <Text style={styles.blockTitle}>
                          {exp.companyName}
                        </Text>
                        <Text style={styles.blockSub}>
                          {exp.title} | {exp.date}
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
                    {renderHeader("Education")}
                    {safeArray(data.education).map((edu, i) => (
                      <View key={i} style={styles.block}>
                        <Text style={styles.blockTitle}>
                          {edu.institution}
                        </Text>
                        <Text style={styles.blockSub}>
                          {edu.degree} | {edu.duration}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null;

              case "skills":
                return safeArray(data.skills).length ? (
                  <View key="skills" style={styles.sectionWrapper}>
                    {renderHeader("Skills")}
                    <View style={styles.skillsContainer}>
                      {safeArray(data.skills).map((skill, i) => (
                        <View key={i} style={styles.skillBox}>
                          <Text>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ) : null;

              case "projects":
                return safeArray(data.projects).length ? (
                  <View key="projects" style={styles.sectionWrapper}>
                    {renderHeader("Projects")}
                    {safeArray(data.projects).map((proj, i) => (
                      <View key={i} style={styles.block}>
                        <Text style={styles.blockTitle}>
                          {proj.name}
                        </Text>
                        <Text style={styles.paragraph}>
                          {proj.description}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null;

              case "certifications":
                return safeArray(data.certifications).length ? (
                  <View key="certifications" style={styles.sectionWrapper}>
                    {renderHeader("Certifications")}
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
                    {renderHeader("Achievements")}
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
                    {renderHeader("Languages")}
                    <Text style={styles.paragraph}>
                      {safeArray(data.languages).join(" • ")}
                    </Text>
                  </View>
                ) : null;

              case "interests":
                return safeArray(data.interests).length ? (
                  <View key="interests" style={styles.sectionWrapper}>
                    {renderHeader("Interests")}
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

export default Template5PDF;