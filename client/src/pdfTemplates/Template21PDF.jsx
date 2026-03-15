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

const HEADER_BG = "#E6F3FF";
const BORDER = "#87CEEB";
const TEXT_DARK = "#000000";
const TEXT_MUTED = "#4b5563";
const CARD_BG = "#f8f9fa";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 350;
  weight += (data.projects?.length || 0) * 300;
  weight += (data.education?.length || 0) * 200;
  weight += (data.skills?.length || 0) * 50;
  weight += (data.achievements?.length || 0) * 120;
  weight += (data.certifications?.length || 0) * 80;

  if (weight > 7000) return 0.78;
  if (weight > 6000) return 0.85;
  if (weight > 5000) return 0.90;
  if (weight > 4000) return 0.95;
  return 1;
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: TEXT_DARK
  },

  container: {
    transformOrigin: "top left"
  },

  header: {
    backgroundColor: HEADER_BG,
    padding: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BORDER,
    textAlign: "center"
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase"
  },

  role: {
    fontSize: 12,
    marginTop: 4,
    color: TEXT_MUTED
  },

  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10
  },

  contactItem: {
    marginRight: 10,
    fontSize: 9
  },

  columns: {
    flexDirection: "row",
    marginTop: 15,
    gap: 20
  },

  leftCol: {
    width: "35%"
  },

  rightCol: {
    width: "65%"
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: BORDER,
    paddingBottom: 3,
    marginTop: 15,
    marginBottom: 6,
    textTransform: "uppercase"
  },

  bullet: {
    marginLeft: 10,
    marginBottom: 3
  },

  projectCard: {
    backgroundColor: CARD_BG,
    padding: 8,
    borderRadius: 5,
    marginBottom: 10
  },

  muted: {
    color: TEXT_MUTED
  }
});

/* ================= COMPONENT ================= */

const Template21PDF = ({ data }) => {
  if (!data) return null;

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const scale = calculateScale(data);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.name}>
              {data.name || "FULL NAME"}
            </Text>

            {data.role && (
              <Text style={styles.role}>{data.role}</Text>
            )}

            <View style={styles.contactRow}>
              {data.email && (
                <Text style={styles.contactItem}>{data.email}</Text>
              )}
              {data.phone && (
                <Text style={styles.contactItem}>{data.phone}</Text>
              )}
              {data.location && (
                <Text style={styles.contactItem}>{data.location}</Text>
              )}
              {data.linkedin && (
                <Link src={normalizeUrl(data.linkedin)} style={styles.contactItem}>
                  LinkedIn
                </Link>
              )}
              {data.github && (
                <Link src={normalizeUrl(data.github)} style={styles.contactItem}>
                  GitHub
                </Link>
              )}
              {data.portfolio && (
                <Link src={normalizeUrl(data.portfolio)} style={styles.contactItem}>
                  Portfolio
                </Link>
              )}
            </View>
          </View>

          <View style={styles.columns}>

            {/* LEFT COLUMN */}
            <View style={styles.leftCol}>

              {/* SKILLS */}
              {safeArray(data.skills).length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Skills</Text>
                  {data.skills.map((s, i) => (
                    <Text key={i} style={styles.bullet}>• {s}</Text>
                  ))}
                </>
              )}

              {/* LANGUAGES */}
              {safeArray(data.languagesDetailed).length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Languages</Text>
                  {data.languagesDetailed.map((lang, i) => (
                    <Text key={i}>
                      <Text style={{ fontWeight: "bold" }}>
                        {lang.language}
                      </Text>: {lang.proficiency}
                    </Text>
                  ))}
                </>
              )}

              {/* ACHIEVEMENTS */}
              {safeArray(data.achievements).length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Achievements</Text>
                  {data.achievements.map((a, i) => (
                    <View key={i} style={{ marginBottom: 6 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {a.title} {a.year && `(${a.year})`}
                      </Text>
                      <Text style={styles.muted}>
                        {a.description}
                      </Text>
                    </View>
                  ))}
                </>
              )}
            </View>

            {/* RIGHT COLUMN */}
            <View style={styles.rightCol}>

              {/* SUMMARY */}
              {data.summary && (
                <>
                  <Text style={styles.sectionTitle}>Profile Summary</Text>
                  <Text>{data.summary}</Text>
                </>
              )}

              {/* EXPERIENCE */}
              {safeArray(data.experience).length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Work Experience</Text>
                  {data.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold" }}>
                          {exp.title}
                        </Text>
                        <Text style={{ color: BORDER }}>
                          {exp.date}
                        </Text>
                      </View>
                      <Text style={{ fontStyle: "italic" }}>
                        {exp.companyName}
                      </Text>

                      {safeArray(exp.accomplishment).map((item, idx) => (
                        <Text key={idx} style={styles.bullet}>
                          • {item}
                        </Text>
                      ))}
                    </View>
                  ))}
                </>
              )}

              {/* PROJECTS */}
              {safeArray(data.projects).length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Technical Projects</Text>
                  {data.projects.map((proj, i) => (
                    <View key={i} style={styles.projectCard}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold" }}>
                          {proj.title}
                        </Text>
                        <Text style={styles.muted}>
                          {proj.duration}
                        </Text>
                      </View>

                      <Text style={{ fontSize: 9 }}>
                        Stack: {safeArray(proj.technologies).join(", ")}
                      </Text>

                      <Text style={{ marginTop: 3 }}>
                        {proj.description}
                      </Text>

                      <View style={{ flexDirection: "row", marginTop: 4 }}>
                        {proj.githubLink && (
                          <Link src={normalizeUrl(proj.githubLink)} style={{ marginRight: 10 }}>
                            Code
                          </Link>
                        )}
                        {proj.link && (
                          <Link src={normalizeUrl(proj.link)}>
                            Demo
                          </Link>
                        )}
                      </View>
                    </View>
                  ))}
                </>
              )}

              {/* EDUCATION */}
              {safeArray(data.education).length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Education</Text>
                  {data.education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 6 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold" }}>
                          {edu.degree}
                        </Text>
                        <Text style={{ color: BORDER }}>
                          {edu.duration}
                        </Text>
                      </View>
                      <Text>
                        {edu.institution}
                        {edu.grade && ` | GPA: ${edu.grade}`}
                      </Text>
                    </View>
                  ))}
                </>
              )}

              {/* CERTIFICATIONS */}
              {safeArray(data.certifications).length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Certifications</Text>
                  {data.certifications.map((cert, i) => (
                    <Text key={i} style={{ marginBottom: 4 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {cert.title}
                      </Text>{" "}
                      — {cert.issuer} ({cert.date})
                    </Text>
                  ))}
                </>
              )}
            </View>
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Template21PDF;