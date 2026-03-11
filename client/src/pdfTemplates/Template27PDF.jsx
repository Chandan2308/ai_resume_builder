import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// ====== THEME ======
const PRIMARY = "#1d7a68";
const TEXT = "#2d3748";
const MUTED = "#4a5568";
const BORDER = "#e2e8f0";

// ====== STYLES ======
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 10,
  },

  left: {
    width: "34%",
    backgroundColor: PRIMARY,
    color: "#ffffff",
    padding: 20,
  },

  right: {
    width: "66%",
    padding: 25,
    backgroundColor: "#ffffff",
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  role: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 10,
  },

  sidebarHeading: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.4)",
    paddingBottom: 3,
  },

  mainHeading: {
    fontSize: 12,
    fontWeight: "bold",
    color: PRIMARY,
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY,
    paddingBottom: 4,
    marginBottom: 10,
  },

  body: {
    fontSize: 10,
    color: TEXT,
    lineHeight: 1.4,
  },

  smallMuted: {
    fontSize: 9,
    color: MUTED,
  },

  sectionBlock: {
    marginBottom: 15,
  },

  bullet: {
    marginLeft: 8,
    marginBottom: 3,
  },

  certBlock: {
    borderLeftWidth: 3,
    borderLeftColor: PRIMARY,
    paddingLeft: 8,
    marginBottom: 6,
  },
});

// ====== SAFE HELPERS ======
const safeArray = (arr) => (Array.isArray(arr) ? arr : []);
const safeText = (v) =>
  typeof v === "string"
    ? v
    : v?.title || v?.name || v?.degree || "";

// ====== DOCUMENT ======
const Template27PDF = ({ data }) => {
  if (!data) return null;

  const {
    name,
    role,
    email,
    phone,
    location,
    linkedin,
    github,
    portfolio,
    education,
    languagesDetailed,
    skills,
    summary,
    experience,
    projects,
    certifications,
    achievements,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ================= LEFT COLUMN ================= */}
        <View style={styles.left}>
          <Text style={styles.name}>{name || "YOUR NAME"}</Text>
          <Text style={styles.role}>{role}</Text>

          {/* CONTACT */}
          <Text style={styles.sidebarHeading}>Contact</Text>
          {email && <Text>{email}</Text>}
          {phone && <Text>{phone}</Text>}
          {location && <Text>{location}</Text>}
          {linkedin && <Text>{linkedin}</Text>}
          {github && <Text>{github}</Text>}
          {portfolio && <Text>{portfolio}</Text>}

          {/* EDUCATION */}
{safeArray(education).length > 0 && (
  <>
    <Text style={styles.sidebarHeading}>Education</Text>

    {education.map((edu, i) => (
      <View key={i} style={{ marginBottom: 8 }}>
        <Text style={{ 
          fontWeight: "bold", 
          color: "#ffffff",
          fontSize: 11
        }}>
          {edu.degree}
        </Text>

        <Text style={{ 
          color: "#ffffff",
          fontSize: 10
        }}>
          {edu.institution}
        </Text>

        <Text style={{ 
          color: "#e6f5f2",   // softer white like UI
          fontSize: 9
        }}>
          {edu.duration} | GPA: {edu.grade}
        </Text>
      </View>
    ))}
  </>
)}

          {/* LANGUAGES */}
          {safeArray(languagesDetailed).length > 0 && (
            <>
              <Text style={styles.sidebarHeading}>Languages</Text>
              {languagesDetailed.map((lang, i) => (
                <Text key={i}>
                  {lang.language}: {lang.proficiency}
                </Text>
              ))}
            </>
          )}

          {/* SKILLS */}
          {safeArray(skills).length > 0 && (
            <>
              <Text style={styles.sidebarHeading}>Skills</Text>
              {skills.map((skill, i) => (
                <Text key={i}>• {skill}</Text>
              ))}
            </>
          )}
        </View>

        {/* ================= RIGHT COLUMN ================= */}
        <View style={styles.right}>

          {/* SUMMARY */}
          {summary && (
            <View style={styles.sectionBlock}>
              <Text style={styles.mainHeading}>
                Professional Summary
              </Text>
              <Text style={styles.body}>{summary}</Text>
            </View>
          )}

          {/* EXPERIENCE */}
          {safeArray(experience).length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.mainHeading}>
                Work Experience
              </Text>
              {experience.map((exp, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {exp.title}
                  </Text>
                  <Text style={{ color: PRIMARY }}>
                    {exp.companyName}
                  </Text>
                  <Text style={styles.smallMuted}>
                    {exp.date}
                  </Text>
                  {safeArray(exp.accomplishment).map((acc, idx) => (
                    <Text key={idx} style={styles.bullet}>
                      • {acc}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* PROJECTS */}
          {safeArray(projects).length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.mainHeading}>
                Projects
              </Text>
              {projects.map((proj, i) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {proj.title}
                  </Text>
                  <Text style={styles.smallMuted}>
                    {proj.duration}
                  </Text>

                  {safeArray(proj.technologies).length > 0 && (
                    <Text style={{ color: PRIMARY, marginVertical: 3 }}>
                      {proj.technologies.join(" • ")}
                    </Text>
                  )}

                  {proj.description && (
                    <Text style={styles.body}>
                      {proj.description}
                    </Text>
                  )}

                  {proj.link && (
                    <Text style={styles.smallMuted}>
                      Live: {proj.link}
                    </Text>
                  )}

                  {proj.githubLink && (
                    <Text style={styles.smallMuted}>
                      Source: {proj.githubLink}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* CERTIFICATIONS */}
          {safeArray(certifications).length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.mainHeading}>
                Certifications
              </Text>
              {certifications.map((cert, i) => (
                <View key={i} style={styles.certBlock}>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {cert.title}
                    </Text>{" "}
                    — {cert.issuer} ({cert.date})
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* ACHIEVEMENTS */}
          {safeArray(achievements).length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.mainHeading}>
                Achievements
              </Text>
              {achievements.map((ach, i) => (
                <Text key={i} style={styles.body}>
                  • <Text style={{ fontWeight: "bold" }}>
                    {ach.title}
                  </Text>
                  : {ach.description} ({ach.year})
                </Text>
              ))}
            </View>
          )}

        </View>
      </Page>
    </Document>
  );
};

export default Template27PDF;