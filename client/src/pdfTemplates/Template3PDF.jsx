import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link
} from "@react-pdf/renderer";

/* ================= COLORS ================= */

const ACCENT_COLOR = "#004d40";
const SECTION_HEADER_BG = "#eaf3f2";
const PRIMARY_TEXT_COLOR = "#343a40";

/* ================= AUTO SCALE LOGIC ================= */

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

  if (weight > 6000) return 0.80;
  if (weight > 5000) return 0.85;
  if (weight > 4000) return 0.90;
  if (weight > 3000) return 0.95;
  return 1;
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: PRIMARY_TEXT_COLOR,
  },

  container: {
    transformOrigin: "top left",
  },

  /* HEADER */

  header: {
    textAlign: "center",
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: ACCENT_COLOR,
  },

  name: {
    fontSize: 22,
    fontWeight: 900,
    textTransform: "uppercase",
  },

  role: {
    fontSize: 11,
    color: ACCENT_COLOR,
    marginTop: 4,
    marginBottom: 6,
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
  },

  link: {
    fontSize: 8,
    color: ACCENT_COLOR,
    marginRight: 12,
    textDecoration: "none",
  },

  /* SECTIONS */

  sectionWrapper: {
    marginBottom: 12,
  },

  sectionHeaderContainer: {
    backgroundColor: SECTION_HEADER_BG,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderLeftWidth: 5,
    borderLeftColor: ACCENT_COLOR,
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  paragraph: {
    fontSize: 9,
    lineHeight: 1.3,
    textAlign: "justify",
  },

  block: {
    borderLeftWidth: 2,
    borderLeftColor: SECTION_HEADER_BG,
    paddingLeft: 8,
    marginBottom: 8,
  },

  title: {
    fontSize: 10,
    fontWeight: 700,
    color: ACCENT_COLOR,
  },

  subtitle: {
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 2,
  },

  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skillBox: {
    backgroundColor: SECTION_HEADER_BG,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginRight: 5,
    marginBottom: 5,
  },

  skillText: {
    fontSize: 8,
  },

  listItem: {
    fontSize: 9,
    marginBottom: 4,
  }
});

/* ================= COMPONENT ================= */

const Template3PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const scale = calculateScale(data);

  const renderSectionTitle = (title) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* ================= HEADER ================= */}

          <View style={styles.header}>
            <Text style={styles.name}>{data.name || "Your Name"}</Text>
            {data.role && <Text style={styles.role}>{data.role}</Text>}

            <View style={styles.contactRow}>
              {data.phone && (
                <Text style={styles.contactText}>Contact no.: {data.phone}</Text>
              )}
              {data.email && (
                <Text style={styles.contactText}>Email : {data.email}</Text>
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

          {/* ================= DYNAMIC SECTIONS ================= */}

          {sectionOrder?.map((key) => {

            switch (key) {

              case "summary":
                return data.summary ? (
                  <View key="summary" style={styles.sectionWrapper}>
                    {renderSectionTitle("Summary")}
                    <Text style={styles.paragraph}>{data.summary}</Text>
                  </View>
                ) : null;

              case "experience":
                return safeArray(data.experience).length ? (
                  <View key="experience" style={styles.sectionWrapper}>
                    {renderSectionTitle("Experience")}
                    {safeArray(data.experience).map((exp, i) => (
                      <View key={i} style={styles.block}>
                        <Text style={styles.title}>{exp.title}</Text>
                        <Text style={styles.subtitle}>
                          {exp.companyName} {exp.date && `| ${exp.date}`}
                        </Text>
                        <Text style={styles.paragraph}>{exp.description}</Text>
                      </View>
                    ))}
                  </View>
                ) : null;

              case "education":
                return safeArray(data.education).length ? (
                  <View key="education" style={styles.sectionWrapper}>
                    {renderSectionTitle("Education")}
                    {safeArray(data.education).map((edu, i) => (
                      <View key={i} style={styles.block}>
                        <Text style={styles.title}>{edu.degree}</Text>
                        <Text style={styles.subtitle}>
                          {edu.institution} {edu.duration && `| ${edu.duration}`}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null;

              case "projects":
                return safeArray(data.projects).length ? (
                  <View key="projects" style={styles.sectionWrapper}>
                    {renderSectionTitle("Projects")}
                    {safeArray(data.projects).map((proj, i) => (
                      <View key={i} style={styles.block}>
                        <Text style={styles.title}>{proj.name}</Text>
                        <Text style={styles.paragraph}>{proj.description}</Text>
                      </View>
                    ))}
                  </View>
                ) : null;

              case "skills":
                return safeArray(data.skills).length ? (
                  <View key="skills" style={styles.sectionWrapper}>
                    {renderSectionTitle("Skills")}
                    <View style={styles.skillsContainer}>
                      {safeArray(data.skills).map((skill, i) => (
                        <View key={i} style={styles.skillBox}>
                          <Text style={styles.skillText}>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ) : null;

              case "certifications":
                return safeArray(data.certifications).length ? (
                  <View key="certifications" style={styles.sectionWrapper}>
                    {renderSectionTitle("Certifications")}
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
                    {renderSectionTitle("Achievements")}
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
                    {renderSectionTitle("Languages")}
                    <Text style={styles.paragraph}>
                      {safeArray(data.languages).join(" • ")}
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

export default Template3PDF;