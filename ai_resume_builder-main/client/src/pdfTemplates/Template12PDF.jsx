import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// ===== STYLES =====
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 10,
    fontFamily: "Helvetica",
  },

  // LEFT SIDEBAR
  left: {
    width: "35%",
    backgroundColor: "#c1d5d5",
    padding: 20,
  },

  right: {
    width: "65%",
    padding: 25,
    backgroundColor: "#ffffff",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "#48656b",
    textAlign: "center",
  },

  role: {
    fontSize: 12,
    letterSpacing: 3,
    color: "#6c858b",
    textAlign: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 6,
    marginTop: 10,
    color: "#4a6265",
  },

  text: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.4,
  },

  timelineBlock: {
    marginBottom: 15,
  },

  timelineTitle: {
    fontSize: 9,
    fontWeight: "bold",
    backgroundColor: "#bccfd0",
    padding: 4,
    marginBottom: 6,
    letterSpacing: 1,
  },

  bullet: {
    marginLeft: 8,
    marginBottom: 3,
  },

  skillItem: {
    marginBottom: 3,
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 6,
  },

  langRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  dotFilled: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#4e6f73",
    marginRight: 2,
  },

  dotEmpty: {
    width: 5,
    height: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#4e6f73",
    marginRight: 2,
  },
});

// ===== SAFE HELPERS =====
const safeArray = (arr) => (Array.isArray(arr) ? arr : []);
const safeText = (val) =>
  typeof val === "string"
    ? val
    : val?.name || val?.title || val?.degree || "";

// ===== LANGUAGE DOTS =====
const LanguageDots = ({ level = 4 }) => (
  <View style={{ flexDirection: "row", marginLeft: 6 }}>
    {Array.from({ length: 6 }).map((_, i) => (
      <View key={i} style={i < level ? styles.dotFilled : styles.dotEmpty} />
    ))}
  </View>
);

// ===== DOCUMENT =====
const Template12PDF = ({ data }) => {
  if (!data) return null;

  const {
    name,
    role,
    phone,
    email,
    location,
    linkedin,
    github,
    portfolio,
    summary,
    education,
    experience,
    projects,
    certifications,
    skills,
    interests,
    languages,
    photoUrl,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* LEFT COLUMN */}
        <View style={styles.left}>

          {photoUrl && (
            <Image
              src={photoUrl}
              style={{ width: 90, height: 90, borderRadius: 45, alignSelf: "center", marginBottom: 10 }}
            />
          )}

          <Text style={styles.sectionTitle}>CONTACT</Text>
          {phone && <Text style={styles.text}>{phone}</Text>}
          {email && <Text style={styles.text}>{email}</Text>}
          {location && <Text style={styles.text}>{location}</Text>}
          {linkedin && <Text style={styles.text}>{linkedin}</Text>}
          {github && <Text style={styles.text}>{github}</Text>}
          {portfolio && <Text style={styles.text}>{portfolio}</Text>}

          {safeArray(skills).length > 0 && (
            <>
              <Text style={styles.sectionTitle}>EXPERTISE SKILLS</Text>
              {safeArray(skills)
                .filter(Boolean)
                .map((skill, i) => (
                  <Text key={i} style={styles.skillItem}>
                    • {skill}
                  </Text>
                ))}
            </>
          )}

          {safeArray(languages).length > 0 && (
            <>
              <Text style={styles.sectionTitle}>LANGUAGE</Text>
              {safeArray(languages).map((lang, i) => (
                <View key={i} style={styles.langRow}>
                  <Text>{lang.language || lang}</Text>
                  <LanguageDots level={lang.proficiency || 4} />
                </View>
              ))}
            </>
          )}

          {safeArray(interests).length > 0 && (
            <>
              <Text style={styles.sectionTitle}>INTEREST</Text>
              {safeArray(interests)
                .filter(Boolean)
                .map((int, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {int}
                  </Text>
                ))}
            </>
          )}
        </View>

        {/* RIGHT COLUMN */}
        <View style={styles.right}>

          <Text style={styles.name}>{name || "YOUR NAME"}</Text>
          <Text style={styles.role}>{role || "YOUR ROLE"}</Text>

          {summary && (
            <View style={styles.timelineBlock}>
              <Text style={styles.timelineTitle}>PROFESSIONAL PROFILE</Text>
              <Text style={styles.text}>{summary}</Text>
            </View>
          )}

          {safeArray(education).length > 0 && (
            <View style={styles.timelineBlock}>
              <Text style={styles.timelineTitle}>EDUCATION</Text>
              {education.map((edu, i) => (
                <View key={i}>
                  <Text style={styles.text}>
                    {edu.degree}
                  </Text>
                  <Text style={styles.text}>
                    {edu.institution} {edu.year && `(${edu.year})`}
                  </Text>
                  {i < education.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          )}

          {safeArray(projects).length > 0 && (
            <View style={styles.timelineBlock}>
              <Text style={styles.timelineTitle}>PROJECTS</Text>
              {projects.map((proj, i) => (
                <View key={i}>
                  <Text style={styles.text}>{proj.name}</Text>
                  <Text style={styles.text}>{proj.description}</Text>
                  {i < projects.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          )}

          {safeArray(experience).length > 0 && (
            <View style={styles.timelineBlock}>
              <Text style={styles.timelineTitle}>EXPERIENCE</Text>
              {experience.map((exp, i) => (
                <View key={i}>
                  <Text style={styles.text}>
                    {exp.title} {exp.company && `— ${exp.company}`}
                  </Text>
                  {exp.duration && (
                    <Text style={styles.text}>{exp.duration}</Text>
                  )}
                  {exp.description && (
                    <Text style={styles.text}>{exp.description}</Text>
                  )}
                  {i < experience.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          )}

          {safeArray(certifications).length > 0 && (
            <View style={styles.timelineBlock}>
              <Text style={styles.timelineTitle}>CERTIFICATIONS</Text>
              {certifications
                .map((c) => c?.name || c?.title)
                .filter(Boolean)
                .map((cert, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {cert}
                  </Text>
                ))}
            </View>
          )}

        </View>
      </Page>
    </Document>
  );
};

export default Template12PDF;