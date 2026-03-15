import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link
} from "@react-pdf/renderer";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 350;
  weight += (data.projects?.length || 0) * 250;
  weight += (data.education?.length || 0) * 180;
  weight += (data.certifications?.length || 0) * 120;
  weight += (data.achievements?.length || 0) * 150;
  weight += (data.skills?.length || 0) * 40;

  if (weight > 6000) return 0.80;
  if (weight > 5000) return 0.85;
  if (weight > 4000) return 0.90;
  if (weight > 3000) return 0.95;
  return 1;
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 50,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#000"
  },

  container: {
    transformOrigin: "top left"
  },

  header: {
    textAlign: "center",
    marginBottom: 10
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase"
  },

  contact: {
    fontSize: 10,
    marginTop: 4
  },

  section: {
    marginTop: 12
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 3,
    marginBottom: 6
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  bold: {
    fontWeight: "bold"
  },

  italic: {
    fontStyle: "italic"
  },

  smallText: {
    fontSize: 10
  },

  bullet: {
    marginLeft: 12,
    fontSize: 10
  }
});

/* ================= COMPONENT ================= */

const Template26PDF = ({ data }) => {
  if (!data) return null;

  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);
  const scale = calculateScale(data);

  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.name}>{data.name || "YOUR NAME"}</Text>
            <Text style={styles.contact}>
              {data.email} | {data.phone} | {data.location}
            </Text>
            <Text style={styles.contact}>
              {data.linkedin}{" "}
              {data.github && `| ${data.github}`}{" "}
              {data.portfolio && `| ${data.portfolio}`}
            </Text>
          </View>

          {/* SUMMARY */}
          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text>{data.summary}</Text>
            </View>
          )}

          {/* EXPERIENCE */}
          {safeArray(data.experience).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>

              {safeArray(data.experience).map((exp, i) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.bold}>{exp.companyName}</Text>
                    <Text>{exp.date}</Text>
                  </View>

                  <View style={styles.rowBetween}>
                    <Text style={styles.italic}>{exp.title}</Text>
                    <Text style={styles.italic}>{exp.companyLocation}</Text>
                  </View>

                  {safeArray(exp.accomplishment).map((bullet, j) => (
                    <Text key={j} style={styles.bullet}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* PROJECTS */}
          {safeArray(data.projects).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>

              {safeArray(data.projects).map((proj, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.bold}>
                      {proj.title}{" "}
                      {proj.technologies &&
                        `| ${
                          Array.isArray(proj.technologies)
                            ? proj.technologies.join(", ")
                            : proj.technologies
                        }`}
                    </Text>
                    <Text>{proj.duration}</Text>
                  </View>

                  {proj.description && (
                    <Text style={styles.smallText}>{proj.description}</Text>
                  )}

                  <View style={{ flexDirection: "row", gap: 10 }}>
                    {proj.link && (
                      <Link
                        src={normalizeUrl(proj.link)}
                        style={{ fontSize: 9 }}
                      >
                        {proj.link}
                      </Link>
                    )}
                    {proj.githubLink && (
                      <Link
                        src={normalizeUrl(proj.githubLink)}
                        style={{ fontSize: 9 }}
                      >
                        {proj.githubLink}
                      </Link>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* SKILLS & LANGUAGES */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Languages</Text>

            {safeArray(data.skills).length > 0 && (
              <Text>
                <Text style={styles.bold}>Technical Skills: </Text>
                {data.skills.join(", ")}
              </Text>
            )}

            {safeArray(data.languagesDetailed).length > 0 && (
              <Text style={{ marginTop: 4 }}>
                <Text style={styles.bold}>Languages: </Text>
                {data.languagesDetailed
                  .map((l) => `${l.language} (${l.proficiency})`)
                  .join(", ")}
              </Text>
            )}
          </View>

          {/* EDUCATION */}
          {safeArray(data.education).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>

              {safeArray(data.education).map((edu, i) => (
                <View key={i} style={{ marginBottom: 4 }}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.bold}>{edu.institution}</Text>
                    <Text>{edu.duration}</Text>
                  </View>
                  <View style={styles.rowBetween}>
                    <Text>{edu.degree}</Text>
                    {edu.grade && <Text>GPA: {edu.grade}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* CERTIFICATIONS */}
          {safeArray(data.certifications).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>

              {safeArray(data.certifications).map((cert, i) => (
                <View key={i} style={styles.rowBetween}>
                  <Text>
                    <Text style={styles.bold}>{cert.title}</Text>,{" "}
                    {cert.issuer}
                  </Text>
                  <Text>{cert.date}</Text>
                </View>
              ))}
            </View>
          )}

          {/* ACHIEVEMENTS */}
          {safeArray(data.achievements).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Achievements</Text>

              {safeArray(data.achievements).map((ach, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.bold}>{ach.title}</Text>
                    <Text>{ach.year}</Text>
                  </View>
                  {ach.description && (
                    <Text style={styles.smallText}>{ach.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

        </View>
      </Page>
    </Document>
  );
};

export default Template26PDF;