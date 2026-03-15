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

const PRIMARY = "#4f46e5";
const DARK = "#1e293b";
const LIGHT = "#f8fafc";
const BORDER = "#e2e8f0";
const MUTED = "#64748b";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 350;
  weight += (data.projects?.length || 0) * 300;
  weight += (data.education?.length || 0) * 150;
  weight += (data.skills?.length || 0) * 40;
  weight += (data.achievements?.length || 0) * 100;
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
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: DARK
  },

  container: {
    transformOrigin: "top left"
  },

  headerCard: {
    backgroundColor: DARK,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff"
  },

  role: {
    fontSize: 12,
    color: "#a5b4fc",
    marginTop: 4
  },

  headerRight: {
    alignItems: "flex-end"
  },

  headerText: {
    color: "#ffffff",
    fontSize: 9,
    marginBottom: 3
  },

  columns: {
    flexDirection: "row",
    gap: 20
  },

  sidebar: {
    width: "32%",
    backgroundColor: LIGHT,
    padding: 15,
    borderRadius: 8
  },

  main: {
    width: "68%"
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: PRIMARY,
    marginBottom: 8,
    textTransform: "uppercase"
  },

  skillTag: {
    backgroundColor: "#e0e7ff",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4
  },

  timelineItem: {
    marginBottom: 15,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: BORDER
  },

  projectCard: {
    backgroundColor: LIGHT,
    padding: 10,
    borderRadius: 6,
    marginBottom: 12
  },

  footerGrid: {
    flexDirection: "row",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 15
  },

  footerCol: {
    width: "50%",
    paddingRight: 10
  },

  muted: {
    color: MUTED
  }
});

/* ================= COMPONENT ================= */

const Template18PDF = ({ data }) => {
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
          <View style={styles.headerCard}>
            <View>
              <Text style={styles.name}>
                {data.name || "NAME"}
              </Text>
              {data.role && (
                <Text style={styles.role}>{data.role}</Text>
              )}
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                {data.linkedin && (
                  <Link src={normalizeUrl(data.linkedin)} style={{ color: "#fff", marginRight: 10 }}>
                    LinkedIn
                  </Link>
                )}
                {data.github && (
                  <Link src={normalizeUrl(data.github)} style={{ color: "#fff", marginRight: 10 }}>
                    GitHub
                  </Link>
                )}
                {data.portfolio && (
                  <Link src={normalizeUrl(data.portfolio)} style={{ color: "#fff" }}>
                    Portfolio
                  </Link>
                )}
              </View>
            </View>

            <View style={styles.headerRight}>
              {data.email && <Text style={styles.headerText}>{data.email}</Text>}
              {data.phone && <Text style={styles.headerText}>{data.phone}</Text>}
              {data.location && <Text style={styles.headerText}>{data.location}</Text>}
            </View>
          </View>

          <View style={styles.columns}>

            {/* SIDEBAR */}
            <View style={styles.sidebar}>

              {/* SKILLS */}
              {safeArray(data.skills).length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Expertise</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {data.skills.map((skill, i) => (
                      <View key={i} style={styles.skillTag}>
                        <Text style={{ fontSize: 9, color: PRIMARY, fontWeight: "bold" }}>
                          {skill}
                        </Text>
                      </View>
                    ))}
                  </View>
                </>
              )}

              {/* EDUCATION */}
              {safeArray(data.education).length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Education</Text>
                  {data.education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {edu.degree}
                      </Text>
                      <Text style={styles.muted}>
                        {edu.institution}
                      </Text>
                      <Text style={{ color: PRIMARY, fontSize: 9 }}>
                        {edu.duration}
                      </Text>
                    </View>
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
            </View>

            {/* MAIN CONTENT */}
            <View style={styles.main}>

              {/* SUMMARY */}
              {data.summary && (
                <>
                  <Text style={styles.sectionTitle}>Professional Summary</Text>
                  <Text style={{ marginBottom: 15 }}>
                    {data.summary}
                  </Text>
                </>
              )}

              {/* EXPERIENCE */}
              {safeArray(data.experience).length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Work History</Text>
                  {data.experience.map((exp, i) => (
                    <View key={i} style={styles.timelineItem}>
                      <Text style={{ fontWeight: "bold" }}>
                        {exp.title}
                      </Text>
                      <Text style={{ color: PRIMARY, fontSize: 9 }}>
                        {exp.date}
                      </Text>
                      <Text style={styles.muted}>
                        {exp.companyName}
                      </Text>

                      {safeArray(exp.accomplishment).map((a, idx) => (
                        <Text key={idx} style={{ marginLeft: 8 }}>
                          • {a}
                        </Text>
                      ))}
                    </View>
                  ))}
                </>
              )}

              {/* PROJECTS */}
              {safeArray(data.projects).length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Projects</Text>
                  {data.projects.map((proj, i) => (
                    <View key={i} style={styles.projectCard}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold" }}>
                          {proj.title}
                        </Text>
                        <Text style={{ color: PRIMARY, fontSize: 9 }}>
                          {proj.duration}
                        </Text>
                      </View>

                      <Text style={{ fontSize: 9, marginVertical: 4 }}>
                        {safeArray(proj.technologies).join(", ")}
                      </Text>

                      <Text style={styles.muted}>
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
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footerGrid}>

            {/* ACHIEVEMENTS */}
            {safeArray(data.achievements).length > 0 && (
              <View style={styles.footerCol}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                {data.achievements.map((ach, i) => (
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {ach.title} ({ach.year})
                    </Text>
                    <Text style={styles.muted}>
                      {ach.description}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* CERTIFICATIONS */}
            {safeArray(data.certifications).length > 0 && (
              <View style={styles.footerCol}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {data.certifications.map((cert, i) => (
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {cert.title}
                    </Text>
                    <Text style={styles.muted}>
                      {cert.issuer} • {cert.date}
                    </Text>
                  </View>
                ))}
              </View>
            )}

          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Template18PDF;