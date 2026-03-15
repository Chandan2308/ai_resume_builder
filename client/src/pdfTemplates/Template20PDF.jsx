import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link
} from "@react-pdf/renderer";

/* ================= HELPERS ================= */

const safeArray = (v) => (Array.isArray(v) ? v : []);
const hasText = (v) => typeof v === "string" && v.trim() !== "";
const normalizeUrl = (url) =>
  url && url.startsWith("http") ? url : `https://${url}`;

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += data.summary?.length || 0;
  weight += safeArray(data.skills).length * 60;
  weight += safeArray(data.education).length * 250;
  weight += safeArray(data.experience).length * 400;
  weight += safeArray(data.languages).length * 80;
  weight += safeArray(data.certificates).length * 150;
  weight += safeArray(data.achievements).length * 80;

  if (weight > 8500) return 0.75;
  if (weight > 7500) return 0.82;
  if (weight > 6500) return 0.88;
  if (weight > 5500) return 0.94;
  return 1;
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1f2937"
  },

  container: {
    borderWidth: 3,
    borderColor: "#22c55e",
    borderRadius: 12,
    padding: 25,
    transformOrigin: "top left"
  },

  header: {
    textAlign: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#22c55e",
    paddingBottom: 12,
    marginBottom: 18
  },

  name: {
    fontSize: 22,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#2563eb"
  },

  role: {
    fontSize: 12,
    color: "#059669",
    marginTop: 4
  },

  contactRow: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    fontSize: 9
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#2563eb",
    borderBottomWidth: 2,
    borderBottomColor: "#22c55e",
    paddingBottom: 3,
    marginTop: 15
  },

  card: {
    backgroundColor: "#f9fafb",
    padding: 10,
    borderRadius: 6,
    marginTop: 8
  },

  boldBlue: {
    fontWeight: 600,
    color: "#2563eb"
  },

  smallGreen: {
    fontSize: 9,
    color: "#059669"
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 3
  },

  bulletDot: {
    marginRight: 6
  },

  skillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5
  },

  skillPill: {
    backgroundColor: "#dbeafe",
    color: "#1e3a8a",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
    fontSize: 9,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#93c5fd"
  },

  link: {
    textDecoration: "none",
    color: "#2563eb"
  }
});

/* ================= COMPONENT ================= */

const Template20PDF = ({ data }) => {
  if (!data) return null;

  const scale = calculateScale(data);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* HEADER */}
          <View style={styles.header}>
            {hasText(data.name) && (
              <Text style={styles.name}>{data.name}</Text>
            )}
            {hasText(data.role) && (
              <Text style={styles.role}>{data.role}</Text>
            )}

            <View style={styles.contactRow}>
              {hasText(data.phone) && (
                <Link style={styles.link} src={`tel:${data.phone}`}>
                  {data.phone}
                </Link>
              )}
              {hasText(data.email) && (
                <Link style={styles.link} src={`mailto:${data.email}`}>
                  {data.email}
                </Link>
              )}
              {hasText(data.linkedin) && (
                <Link style={styles.link} src={normalizeUrl(data.linkedin)}>
                  LinkedIn
                </Link>
              )}
              {hasText(data.github) && (
                <Link style={styles.link} src={normalizeUrl(data.github)}>
                  GitHub
                </Link>
              )}
              {hasText(data.location) && (
                <Text>{data.location}</Text>
              )}
            </View>
          </View>

          {/* SUMMARY */}
          {hasText(data.summary) && (
            <>
              <Text style={styles.sectionTitle}>Summary</Text>
              <View style={styles.card}>
                <Text>{data.summary}</Text>
              </View>
            </>
          )}

          {/* SKILLS */}
          {safeArray(data.skills).length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.card}>
                <View style={styles.skillWrap}>
                  {safeArray(data.skills).map((skill, i) => (
                    <Text key={i} style={styles.skillPill}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* EDUCATION */}
          {safeArray(data.education).length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Education</Text>
              <View style={styles.card}>
                {safeArray(data.education).map((edu, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={styles.boldBlue}>{edu.degree}</Text>
                      <Text style={styles.smallGreen}>{edu.duration}</Text>
                    </View>
                    <Text style={styles.smallGreen}>{edu.institution}</Text>
                    <Text style={{ fontSize: 9 }}>{edu.location}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* EXPERIENCE */}
          {safeArray(data.experience).length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Experience</Text>
              <View style={styles.card}>
                {safeArray(data.experience).map((exp, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={styles.boldBlue}>
                        {exp.title}{" "}
                        {exp.companyName && (
                          <Text style={{ color: "#374151" }}>
                            at {exp.companyName}
                          </Text>
                        )}
                      </Text>
                      <Text style={styles.smallGreen}>{exp.date}</Text>
                    </View>
                    <Text style={{ fontSize: 8 }}>{exp.companyLocation}</Text>

                    {safeArray(exp.accomplishment).map((item, idx) => (
                      <View key={idx} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text>{item}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </>
          )}

          {/* LANGUAGES */}
          {safeArray(data.languages).length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={styles.card}>
                {safeArray(data.languages).map((lang, i) => (
                  <Text key={i}>
                    <Text style={{ fontWeight: 600 }}>
                      {lang.language}
                    </Text>{" "}
                    {lang.proficiency && `– ${lang.proficiency}`}
                  </Text>
                ))}
              </View>
            </>
          )}

          {/* CERTIFICATES */}
          {safeArray(data.certificates).length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Certificates</Text>
              <View style={styles.card}>
                {safeArray(data.certificates).map((cert, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={styles.boldBlue}>{cert.title}</Text>
                      <Text style={styles.smallGreen}>{cert.date}</Text>
                    </View>
                    <Text style={{ fontSize: 9 }}>{cert.issuer}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* ACHIEVEMENTS */}
          {safeArray(data.achievements).length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Achievements</Text>
              <View style={styles.card}>
                {safeArray(data.achievements).map((ach, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text>{ach}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

        </View>
      </Page>
    </Document>
  );
};

export default Template20PDF;