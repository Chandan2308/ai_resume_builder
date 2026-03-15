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

const ACCENT = "#4f46e5";
const SIDEBAR_BG = "#f3f4f6";
const BORDER = "#e5e7eb";
const TEXT_DARK = "#1f2937";
const TEXT_MUTED = "#6b7280";

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

  if (weight > 7500) return 0.75;
  if (weight > 6500) return 0.82;
  if (weight > 5500) return 0.88;
  if (weight > 4500) return 0.94;
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
    flexDirection: "row",
    transformOrigin: "top left"
  },

  leftCol: {
    width: "65%",
    paddingRight: 20
  },

  rightCol: {
    width: "35%",
    backgroundColor: SIDEBAR_BG,
    padding: 15,
    borderLeftWidth: 1,
    borderLeftColor: BORDER
  },

  name: {
    fontSize: 22,
    fontWeight: "bold"
  },

  role: {
    fontSize: 12,
    color: ACCENT,
    marginBottom: 12
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: ACCENT,
    paddingBottom: 3,
    marginTop: 15,
    marginBottom: 6
  },

  bullet: {
    marginLeft: 10,
    marginBottom: 3
  },

  muted: {
    color: TEXT_MUTED
  },

  projectBlock: {
    marginBottom: 12
  },

  projectCard: {
    backgroundColor: "#f8fafc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8
  }
});

/* ================= COMPONENT ================= */

const Template22PDF = ({ data }) => {
  if (!data) return null;

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const scale = calculateScale(data);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* LEFT COLUMN */}
          <View style={styles.leftCol}>

            {/* HEADER */}
            <Text style={styles.name}>
              {data.name || "YOUR NAME"}
            </Text>
            {data.role && (
              <Text style={styles.role}>{data.role}</Text>
            )}

            {/* SUMMARY */}
            {data.summary && (
              <>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text>{data.summary}</Text>
              </>
            )}

            {/* EXPERIENCE */}
            {safeArray(data.experience).length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Experience</Text>
                {data.experience.map((exp, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {exp.title}
                      </Text>
                      <Text style={{ color: ACCENT }}>
                        {exp.date}
                      </Text>
                    </View>
                    <Text style={styles.muted}>
                      {exp.companyName}
                    </Text>

                    {safeArray(exp.accomplishment).map((a, idx) => (
                      <Text key={idx} style={styles.bullet}>
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
                      <Text style={styles.muted}>
                        {proj.duration}
                      </Text>
                    </View>

                    {proj.technologies && (
                      <Text style={{ fontSize: 9, color: ACCENT }}>
                        Stack: {safeArray(proj.technologies).join(", ")}
                      </Text>
                    )}

                    <Text style={{ marginTop: 4 }}>
                      {proj.description}
                    </Text>

                    <View style={{ flexDirection: "row", marginTop: 4 }}>
                      {proj.githubLink && (
                        <Link
                          src={normalizeUrl(proj.githubLink)}
                          style={{ marginRight: 10 }}
                        >
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

          {/* RIGHT COLUMN (SIDEBAR) */}
          <View style={styles.rightCol}>

            {/* CONTACT */}
            <Text style={styles.sectionTitle}>Contact</Text>
            {data.location && <Text>{data.location}</Text>}
            {data.phone && <Text>{data.phone}</Text>}
            {data.email && (
              <Link src={`mailto:${data.email}`}>
                {data.email}
              </Link>
            )}
            {data.linkedin && (
              <Link src={normalizeUrl(data.linkedin)}>
                LinkedIn
              </Link>
            )}
            {data.github && (
              <Link src={normalizeUrl(data.github)}>
                GitHub
              </Link>
            )}
            {data.portfolio && (
              <Link src={normalizeUrl(data.portfolio)}>
                Portfolio
              </Link>
            )}

            {/* SKILLS */}
            {safeArray(data.skills).length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Skills</Text>
                {data.skills.map((skill, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {skill}
                  </Text>
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

            {/* EDUCATION */}
            {safeArray(data.education).length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {edu.degree}
                    </Text>
                    <Text style={styles.muted}>
                      {edu.institution}
                    </Text>
                    <Text style={{ color: ACCENT, fontSize: 9 }}>
                      {edu.duration}
                      {edu.grade && ` | ${edu.grade}`}
                    </Text>
                  </View>
                ))}
              </>
            )}

            {/* ACHIEVEMENTS */}
            {safeArray(data.achievements).length > 0 && (
              <>
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
                    </Text>
                    {" — "}
                    {cert.issuer} • {cert.date}
                  </Text>
                ))}
              </>
            )}

          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template22PDF;