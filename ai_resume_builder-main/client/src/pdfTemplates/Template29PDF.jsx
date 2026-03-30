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

const PRIMARY = "#1e293b";
const ACCENT = "#6366f1";
const TEXT = "#475569";
const BORDER = "#e2e8f0";
const LIGHT_BG = "#f8fafc";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 350;
  weight += (data.projects?.length || 0) * 280;
  weight += (data.skills?.length || 0) * 40;
  weight += (data.education?.length || 0) * 120;
  weight += (data.certifications?.length || 0) * 120;
  weight += (data.achievements?.length || 0) * 140;

  if (weight > 6500) return 0.78;
  if (weight > 5500) return 0.85;
  if (weight > 4500) return 0.90;
  if (weight > 3500) return 0.95;
  return 1;
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: PRIMARY
  },

  container: {
    transformOrigin: "top left"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 4,
    borderBottomColor: PRIMARY,
    paddingBottom: 15,
    marginBottom: 20
  },

  name: {
    fontSize: 28,
    fontWeight: "bold"
  },

  role: {
    fontSize: 13,
    color: ACCENT,
    marginTop: 4
  },

  contactCol: {
    fontSize: 10,
    textAlign: "right",
    color: TEXT
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: ACCENT,
    paddingBottom: 4,
    marginBottom: 10
  },

  summaryText: {
    color: TEXT,
    lineHeight: 1.6
  },

  grid: {
    flexDirection: "row",
    gap: 30
  },

  leftCol: {
    flex: 1.7
  },

  rightCol: {
    flex: 1
  },

  experienceTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold"
  },

  italicText: {
    fontStyle: "italic",
    fontSize: 10,
    color: TEXT
  },

  bullet: {
    marginLeft: 15,
    fontSize: 10,
    marginBottom: 3,
    color: TEXT
  },

  projectCard: {
    backgroundColor: LIGHT_BG,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: PRIMARY,
    marginBottom: 12
  },

  projectTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold"
  },

  skillTag: {
    backgroundColor: PRIMARY,
    color: "#fff",
    fontSize: 9,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    marginBottom: 6
  },

  smallText: {
    fontSize: 9,
    color: TEXT
  },

  footerGrid: {
    flexDirection: "row",
    gap: 30,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 15,
    marginTop: 20
  }
});

/* ================= COMPONENT ================= */

const Template29PDF = ({ data }) => {
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
            <View style={{ flex: 2 }}>
              <Text style={styles.name}>
                {data.name || "YOUR NAME"}
              </Text>
              {data.role && (
                <Text style={styles.role}>{data.role}</Text>
              )}
            </View>

            <View style={styles.contactCol}>
              <Text>{data.email} | {data.phone}</Text>
              <Text>{data.location}</Text>
              <View style={{ marginTop: 5 }}>
                {data.linkedin && (
                  <Link src={normalizeUrl(data.linkedin)}>
                    {data.linkedin}
                  </Link>
                )}
                {data.github && (
                  <Link src={normalizeUrl(data.github)}>
                    {"  |  "}{data.github}
                  </Link>
                )}
                {data.portfolio && (
                  <Link src={normalizeUrl(data.portfolio)}>
                    {"  |  "}{data.portfolio}
                  </Link>
                )}
              </View>
            </View>
          </View>

          {/* SUMMARY */}
          {data.summary && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.summaryText}>
                {data.summary}
              </Text>
            </View>
          )}

          {/* MAIN GRID */}
          <View style={styles.grid}>

            {/* LEFT COLUMN */}
            <View style={styles.leftCol}>

              {/* EXPERIENCE */}
              {safeArray(data.experience).length > 0 && (
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.sectionTitle}>Experience</Text>

                  {data.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 12 }}>
                      <View style={styles.experienceTitleRow}>
                        <Text>{exp.title}</Text>
                        <Text style={{ color: ACCENT, fontSize: 9 }}>
                          {exp.date}
                        </Text>
                      </View>

                      <Text style={styles.italicText}>
                        {exp.companyName} | {exp.companyLocation}
                      </Text>

                      {safeArray(exp.accomplishment).map((point, idx) => (
                        <Text key={idx} style={styles.bullet}>
                          • {point}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {/* PROJECTS */}
              {safeArray(data.projects).length > 0 && (
                <View>
                  <Text style={styles.sectionTitle}>Projects</Text>

                  {data.projects.map((proj, i) => (
                    <View key={i} style={styles.projectCard}>
                      <View style={styles.projectTitleRow}>
                        <Text>{proj.title}</Text>
                        <Text style={styles.smallText}>
                          {proj.duration}
                        </Text>
                      </View>

                      {proj.technologies && (
                        <Text style={{ color: ACCENT, fontSize: 9, marginVertical: 3 }}>
                          Stack: {Array.isArray(proj.technologies)
                            ? proj.technologies.join(", ")
                            : proj.technologies}
                        </Text>
                      )}

                      <Text style={styles.smallText}>
                        {proj.description}
                      </Text>

                      <View style={{ marginTop: 4 }}>
                        {proj.link && (
                          <Link src={normalizeUrl(proj.link)}>
                            Demo
                          </Link>
                        )}
                        {proj.githubLink && (
                          <Link src={normalizeUrl(proj.githubLink)}>
                            {"  |  "}Code
                          </Link>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              )}

            </View>

            {/* RIGHT COLUMN */}
            <View style={styles.rightCol}>

              {/* SKILLS */}
              {safeArray(data.skills).length > 0 && (
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.sectionTitle}>Skills</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {data.skills.map((skill, i) => (
                      <Text key={i} style={styles.skillTag}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              )}

              {/* EDUCATION */}
              {safeArray(data.education).length > 0 && (
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.sectionTitle}>Education</Text>

                  {data.education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {edu.institution}
                      </Text>
                      <Text style={styles.smallText}>
                        {edu.degree}
                      </Text>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: ACCENT, fontSize: 9 }}>
                          {edu.duration}
                        </Text>
                        <Text style={{ color: ACCENT, fontSize: 9 }}>
                          {edu.grade && `GPA: ${edu.grade}`}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* LANGUAGES */}
              {safeArray(data.languagesDetailed).length > 0 && (
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.sectionTitle}>Languages</Text>
                  {data.languagesDetailed.map((lang, i) => (
                    <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {lang.language}
                      </Text>
                      <Text style={{ color: ACCENT, fontSize: 9 }}>
                        {lang.proficiency}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

            </View>
          </View>

          {/* FOOTER GRID */}
          <View style={styles.footerGrid}>

            {/* CERTIFICATIONS */}
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Certifications</Text>

              {safeArray(data.certifications).map((cert, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {cert.title}
                  </Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.smallText}>
                      {cert.issuer}
                    </Text>
                    <Text style={{ color: ACCENT, fontSize: 9 }}>
                      {cert.date}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* ACHIEVEMENTS */}
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Achievements</Text>

              {safeArray(data.achievements).map((ach, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {ach.title}
                  </Text>
                  <Text style={styles.smallText}>
                    {ach.description}
                  </Text>
                  <Text style={{ textAlign: "right", color: ACCENT, fontSize: 9 }}>
                    {ach.year}
                  </Text>
                </View>
              ))}
            </View>

          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Template29PDF;