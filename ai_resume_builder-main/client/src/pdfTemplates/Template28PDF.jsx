import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link
} from "@react-pdf/renderer";

/* ================= THEME ================= */

const PRIMARY = "#0f172a";
const ACCENT = "#334155";
const HIGHLIGHT = "#64748b";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 350;
  weight += (data.projects?.length || 0) * 300;
  weight += (data.skills?.length || 0) * 40;
  weight += (data.achievements?.length || 0) * 150;
  weight += (data.certifications?.length || 0) * 120;
  weight += (data.languagesDetailed?.length || 0) * 60;

  if (weight > 6000) return 0.80;
  if (weight > 5000) return 0.85;
  if (weight > 4000) return 0.90;
  if (weight > 3000) return 0.95;
  return 1;
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    color: PRIMARY,
    fontSize: 11
  },

  container: {
    transformOrigin: "top left"
  },

  header: {
    textAlign: "center",
    marginBottom: 25,
    borderBottomWidth: 3,
    borderBottomColor: PRIMARY,
    paddingBottom: 15
  },

  name: {
    fontSize: 26,
    fontWeight: "bold"
  },

  role: {
    fontSize: 12,
    color: HIGHLIGHT,
    textTransform: "uppercase",
    marginTop: 4
  },

  contactRow: {
    marginTop: 8,
    fontSize: 10
  },

  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 8
  },

  section: {
    marginTop: 25
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY,
    paddingBottom: 4,
    marginBottom: 12,
    textAlign: "center"
  },

  summaryText: {
    textAlign: "center",
    lineHeight: 1.6
  },

  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8
  },

  skillBox: {
    borderWidth: 1.5,
    borderColor: PRIMARY,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 9,
    fontWeight: "bold"
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  company: {
    fontWeight: "bold",
    color: HIGHLIGHT,
    marginBottom: 6
  },

  bullet: {
    marginLeft: 15,
    marginBottom: 3
  },

  techTag: {
    backgroundColor: PRIMARY,
    color: "#fff",
    fontSize: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4
  },

  bottomGrid: {
    flexDirection: "row",
    marginTop: 30,
    borderTopWidth: 2,
    borderTopColor: PRIMARY,
    paddingTop: 20,
    gap: 40
  },

  bottomColumn: {
    flex: 1
  },

  smallText: {
    fontSize: 10
  }
});

/* ================= COMPONENT ================= */

const Template28PDF = ({ data }) => {
  if (!data) return null;

  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);
  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const scale = calculateScale(data);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.name}>{data.name || "YOUR NAME"}</Text>
            {data.role && <Text style={styles.role}>{data.role}</Text>}

            <Text style={styles.contactRow}>
              {data.email} | {data.phone} | {data.location}
            </Text>

            <View style={styles.linkRow}>
              {data.github && (
                <Link src={normalizeUrl(data.github)}>
                  {data.github}
                </Link>
              )}
              {data.linkedin && (
                <Link src={normalizeUrl(data.linkedin)}>
                  {data.linkedin}
                </Link>
              )}
              {data.portfolio && (
                <Link src={normalizeUrl(data.portfolio)}>
                  {data.portfolio}
                </Link>
              )}
            </View>
          </View>

          {/* SUMMARY */}
          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Executive Summary</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          )}

          {/* TECH STACK */}
          {safeArray(data.skills).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Technical Stack</Text>
              <View style={styles.skillContainer}>
                {data.skills.map((skill, i) => (
                  <Text key={i} style={styles.skillBox}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* EXPERIENCE */}
          {safeArray(data.experience).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Professional Experience
              </Text>

              {data.experience.map((exp, i) => (
                <View key={i} style={{ marginBottom: 15 }}>
                  <View style={styles.rowBetween}>
                    <Text style={{ fontWeight: "bold" }}>
                      {exp.title}
                    </Text>
                    <Text>{exp.date}</Text>
                  </View>

                  <Text style={styles.company}>
                    {exp.companyName}
                  </Text>

                  {safeArray(exp.accomplishment).map((a, idx) => (
                    <Text key={idx} style={styles.bullet}>
                      • {a}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* PROJECTS */}
          {safeArray(data.projects).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Technical Projects
              </Text>

              {data.projects.map((proj, i) => (
                <View key={i} style={{ marginBottom: 15 }}>
                  <View style={styles.rowBetween}>
                    <Text style={{ fontWeight: "bold" }}>
                      {proj.title}
                    </Text>
                    <Text>{proj.duration}</Text>
                  </View>

                  {/* Technologies */}
                  <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 4 }}>
                    {safeArray(proj.technologies).map((tech, idx) => (
                      <Text key={idx} style={styles.techTag}>
                        {tech}
                      </Text>
                    ))}
                  </View>

                  {proj.description && (
                    <Text style={styles.smallText}>
                      {proj.description}
                    </Text>
                  )}

                  <View style={{ flexDirection: "row", gap: 15 }}>
                    {proj.githubLink && (
                      <Link src={normalizeUrl(proj.githubLink)}>
                        {proj.githubLink}
                      </Link>
                    )}
                    {proj.link && (
                      <Link src={normalizeUrl(proj.link)}>
                        {proj.link}
                      </Link>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ACHIEVEMENTS */}
          {safeArray(data.achievements).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Honors & Achievements
              </Text>

              {data.achievements.map((ach, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {ach.title} ({ach.year})
                  </Text>
                  {ach.description && (
                    <Text style={{ color: ACCENT }}>
                      {ach.description}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* BOTTOM GRID */}
          {(safeArray(data.certifications).length > 0 ||
            safeArray(data.languagesDetailed).length > 0) && (
            <View style={styles.bottomGrid}>

              {/* CERTIFICATIONS */}
              <View style={styles.bottomColumn}>
                <Text style={styles.sectionTitle}>
                  Certifications
                </Text>

                {safeArray(data.certifications).map((cert, i) => (
                  <Text key={i} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {cert.title}
                    </Text>{" "}
                    — {cert.issuer} ({cert.date})
                  </Text>
                ))}
              </View>

              {/* LANGUAGES */}
              <View style={styles.bottomColumn}>
                <Text style={styles.sectionTitle}>
                  Languages
                </Text>

                {safeArray(data.languagesDetailed).map((lang, i) => (
                  <Text key={i} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {lang.language}
                    </Text>{" "}
                    — {lang.proficiency}
                  </Text>
                ))}
              </View>

            </View>
          )}

        </View>
      </Page>
    </Document>
  );
};

export default Template28PDF;