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

const PRIMARY_TEXT = "#111827";
const SUB_TEXT = "#4b5563";
const BORDER_COLOR = "#e5e7eb";
const LINK_COLOR = "#2563eb";
const SKILL_BG = "#f3f4f6";

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
    padding: 28,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: PRIMARY_TEXT,
  },

  container: {
    transformOrigin: "top left",
  },

  /* HEADER */

  header: {
    textAlign: "center",
    marginBottom: 18,
  },

  name: {
    fontSize: 22,
    fontWeight: 800,
    textTransform: "uppercase",
  },

  role: {
    fontSize: 11,
    color: SUB_TEXT,
    marginTop: 4,
    marginBottom: 8,
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
    color: LINK_COLOR,
  },

  link: {
    fontSize: 8,
    marginRight: 12,
    color: LINK_COLOR,
    textDecoration: "none",
  },

  /* SECTION */

  sectionWrapper: {
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 3,
  },

  divider: {
    height: 1,
    backgroundColor: BORDER_COLOR,
    marginBottom: 6,
  },

  paragraph: {
    fontSize: 9,
    color: SUB_TEXT,
    lineHeight: 1.3,
    textAlign: "justify",
  },

  block: {
    marginBottom: 8,
  },

  blockTitle: {
    fontSize: 10,
    fontWeight: 600,
  },

  blockSub: {
    fontSize: 8.5,
    color: SUB_TEXT,
    marginBottom: 2,
  },

  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skillBox: {
    backgroundColor: SKILL_BG,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginRight: 6,
    marginBottom: 6,
  },

  listItem: {
    fontSize: 9,
    marginBottom: 4,
  }
});

/* ================= COMPONENT ================= */

const Template2PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const scale = calculateScale(data);

  const renderSectionHeader = (title) => (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.divider} />
    </>
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

          {/* DYNAMIC SECTIONS */}

          {sectionOrder?.map((key) => {
            switch (key) {

              case "summary":
                return data.summary ? (
                  <View key="summary" style={styles.sectionWrapper}>
                    {renderSectionHeader("About Me")}
                    <Text style={styles.paragraph}>{data.summary}</Text>
                  </View>
                ) : null;

              case "education":
                return safeArray(data.education).length ? (
                  <View key="education" style={styles.sectionWrapper}>
                    {renderSectionHeader("Education")}
                    {safeArray(data.education).map((edu, i) => (
                      <View key={i} style={styles.block}>
                        <Text style={styles.blockSub}>
                          {edu.institution} {edu.duration && `| ${edu.duration}`}
                        </Text>
                        <Text style={styles.blockTitle}>
                          {edu.degree}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null;

              case "experience":
                return safeArray(data.experience).length ? (
                  <View key="experience" style={styles.sectionWrapper}>
                    {renderSectionHeader("Work Experience")}
                    {safeArray(data.experience).map((exp, i) => (
                      <View key={i} style={styles.block}>
                        <Text style={styles.blockSub}>
                          {exp.companyName} {exp.date && `| ${exp.date}`}
                        </Text>
                        <Text style={styles.blockTitle}>
                          {exp.title}
                        </Text>
                        <Text style={styles.paragraph}>
                          {exp.description}
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
                          {proj.name}
                        </Text>
                        <Text style={styles.paragraph}>
                          {proj.description}
                        </Text>
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
                        <View key={i} style={styles.skillBox}>
                          <Text>{skill}</Text>
                        </View>
                      ))}
                    </View>
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

              // case "achievements":
              //   return safeArray(data.achievements).length ? (
              //     <View key="achievements" style={styles.sectionWrapper}>
              //       {renderSectionHeader("Achievements")}
              //       {safeArray(data.achievements).map((ach, i) => (
              //         <Text key={i} style={styles.listItem}>
              //           • {ach}
              //         </Text>
              //       ))}
              //     </View>
              //   ) : null;

              case "languages":
                return safeArray(data.languages).length ? (
                  <View key="languages" style={styles.sectionWrapper}>
                    {renderSectionHeader("Languages")}
                    <Text style={styles.paragraph}>
                      {safeArray(data.languages).join(", ")}
                    </Text>
                  </View>
                ) : null;

              case "interests":
                return safeArray(data.interests).length ? (
                  <View key="interests" style={styles.sectionWrapper}>
                    {renderSectionHeader("Interests")}
                    <Text style={styles.paragraph}>
                      {safeArray(data.interests).join(", ")}
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

export default Template2PDF;