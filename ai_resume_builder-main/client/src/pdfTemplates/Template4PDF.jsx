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

const PRIMARY = "#1e293b";
const ACCENT = "#14b8a6";
const SUB = "#475569";
const BORDER = "#e2e8f0";
const PILL_BG = "#14b8a6";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 350;
  weight += (data.projects?.length || 0) * 300;
  weight += (data.education?.length || 0) * 200;
  weight += (data.skills?.length || 0) * 50;
  weight += (data.certifications?.length || 0) * 80;
  weight += (data.achievements?.length || 0) * 120;
  weight += (data.languages?.length || 0) * 40;
  weight += (data.interests?.length || 0) * 40;

  if (weight > 6000) return 0.80;
  if (weight > 5000) return 0.85;
  if (weight > 4000) return 0.90;
  if (weight > 3000) return 0.95;
  return 1;
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: PRIMARY,
  },

  container: {
    transformOrigin: "top left",
  },

  /* HEADER */

  headerWrapper: {
    marginBottom: 20,
    padding: 18,
    borderRadius: 8,
    backgroundColor: "#e0f7fa",
    borderBottomWidth: 2,
    borderBottomColor: ACCENT,
  },

  name: {
    fontSize: 22,
    fontWeight: 800,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 4,
  },

  role: {
    fontSize: 12,
    textAlign: "center",
    color: ACCENT,
    marginBottom: 10,
    textTransform: "uppercase",
  },

  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 6,
  },

  contactText: {
    fontSize: 8,
    marginRight: 12,
    color: SUB,
  },

  link: {
    fontSize: 8,
    marginRight: 12,
    color: SUB,
    textDecoration: "none",
  },

  /* SECTION */

  sectionWrapper: {
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: ACCENT,
    textTransform: "uppercase",
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },

  paragraph: {
    fontSize: 9,
    color: SUB,
    lineHeight: 1.5,
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
    fontSize: 9,
    fontStyle: "italic",
    color: SUB,
    marginBottom: 2,
  },

  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skillPill: {
    backgroundColor: PILL_BG,
    color: "#ffffff",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 8,
  },

  listItem: {
    fontSize: 9,
    marginBottom: 4,
  },
});

/* ================= COMPONENT ================= */

const Template4PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const scale = calculateScale(data);

  const renderSectionHeader = (title) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* HEADER */}

          <View style={styles.headerWrapper}>
            <Text style={styles.name}>{data.name || "Your Name"}</Text>
            {data.role && <Text style={styles.role}>{data.role}</Text>}

            <View style={styles.contactRow}>
              {data.phone && (
                <Text style={styles.contactText}>{data.phone}</Text>
              )}
              {data.email && (
                <Text style={styles.contactText}>{data.email}</Text>
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
                    {renderSectionHeader("Professional Summary")}
                    <Text style={styles.paragraph}>{data.summary}</Text>
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
                            {exp.title}
                          </Text>
                          <Text style={styles.blockSub}>
                            {exp.date}
                          </Text>
                        </View>
                        <Text style={styles.blockSub}>
                          {exp.companyName}
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
                      <View key={i} style={styles.block}>
                        <View style={styles.blockRow}>
                          <Text style={styles.blockTitle}>
                            {edu.degree}, {edu.institution}
                          </Text>
                          <Text style={styles.blockSub}>
                            {edu.duration}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null;

              case "skills":
                return safeArray(data.skills).length ? (
                  <View key="skills" style={styles.sectionWrapper}>
                    {renderSectionHeader("Skills")}
                    <View style={styles.skillsContainer}>
                      {safeArray(data.skills).map((skill, i) => (
                        <Text key={i} style={styles.skillPill}>
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
                        • {ach}
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

export default Template4PDF;