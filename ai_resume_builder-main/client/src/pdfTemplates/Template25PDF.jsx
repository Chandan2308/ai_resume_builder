import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link
} from "@react-pdf/renderer";

/* ================= SAFE HELPERS ================= */

const safeArray = (v) => (Array.isArray(v) ? v : []);

const renderSafe = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object")
    return val.title || val.name || val.degree || val.description || "";
  return String(val);
};

const normalizeUrl = (url) =>
  url && url.startsWith("http") ? url : `https://${url}`;

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 450;
  weight += (data.projects?.length || 0) * 350;
  weight += (data.education?.length || 0) * 250;
  weight += (data.skills?.length || 0) * 60;
  weight += (data.languages?.length || 0) * 60;
  weight += (data.interests?.length || 0) * 60;
  weight += (data.certifications?.length || 0) * 100;
  weight += (data.achievements?.length || 0) * 120;

  if (weight > 8000) return 0.75;
  if (weight > 7000) return 0.82;
  if (weight > 6000) return 0.88;
  if (weight > 5000) return 0.94;
  return 1;
};

/* ================= STYLES ================= */

const PRIMARY = "#1f2937";
const ACCENT = "#2563eb";
const BORDER = "#1f2937";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: PRIMARY
  },

  container: {
    transformOrigin: "top left"
  },

  header: {
    textAlign: "center",
    marginBottom: 25
  },

  name: {
    fontSize: 26,
    fontWeight: 900,
    textTransform: "uppercase"
  },

  role: {
    fontSize: 13,
    color: ACCENT,
    marginTop: 6,
    fontWeight: 600
  },

  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
    fontSize: 9
  },

  link: {
    color: ACCENT,
    textDecoration: "none",
    marginRight: 10
  },

  columns: {
    flexDirection: "row",
    gap: 40
  },

  column: {
    width: "50%"
  },

  section: {
    marginBottom: 20
  },

  sectionHeader: {
    borderBottomWidth: 2,
    borderBottomColor: BORDER,
    paddingBottom: 4,
    marginBottom: 10
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: 800,
    textTransform: "uppercase"
  },

  paragraph: {
    fontSize: 10,
    lineHeight: 1.6
  },

  block: {
    marginBottom: 12
  },

  bold: {
    fontWeight: 700
  },

  smallGray: {
    fontSize: 9,
    color: "#4b5563"
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 4
  },

  bulletDot: {
    marginRight: 6
  },

  skillBox: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6
  }
});

/* ================= COMPONENT ================= */

const Template25PDF = ({ data }) => {
  if (!data) return null;

  const scale = calculateScale(data);

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
                <Link style={styles.link} src={`tel:${data.phone}`}>
                  {data.phone}
                </Link>
              )}
              {data.email && (
                <Link style={styles.link} src={`mailto:${data.email}`}>
                  {data.email}
                </Link>
              )}
              {data.linkedin && (
                <Link style={styles.link} src={normalizeUrl(data.linkedin)}>
                  LinkedIn
                </Link>
              )}
              {data.github && (
                <Link style={styles.link} src={normalizeUrl(data.github)}>
                  GitHub
                </Link>
              )}
              {data.portfolio && (
                <Link style={styles.link} src={normalizeUrl(data.portfolio)}>
                  Portfolio
                </Link>
              )}
              {data.location && (
                <Text style={styles.smallGray}>{data.location}</Text>
              )}
            </View>
          </View>

          <View style={styles.columns}>

            {/* LEFT COLUMN */}
            <View style={styles.column}>

              {/* PROFILE */}
              {data.summary && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Profile</Text>
                  </View>
                  <Text style={styles.paragraph}>{data.summary}</Text>
                </View>
              )}

              {/* EXPERIENCE */}
              {safeArray(data.experience).length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                  </View>

                  {safeArray(data.experience).map((exp, i) => (
                    <View key={i} style={styles.block}>
                      <Text style={styles.bold}>{exp.title}</Text>
                      <Text style={styles.smallGray}>
                        {exp.company} {exp.duration && `| ${exp.duration}`}
                      </Text>
                      <Text style={styles.paragraph}>
                        {exp.description}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* PROJECTS */}
              {safeArray(data.projects).length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                  </View>

                  {safeArray(data.projects).map((proj, i) => (
                    <View key={i} style={styles.block}>
                      <Text style={styles.bold}>{proj.name}</Text>
                      <Text style={styles.paragraph}>
                        {proj.description}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* INTERESTS */}
              {safeArray(data.interests).length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Interests</Text>
                  </View>
                  <Text style={styles.paragraph}>
                    {safeArray(data.interests).join(", ")}
                  </Text>
                </View>
              )}

            </View>

            {/* RIGHT COLUMN */}
            <View style={styles.column}>

              {/* SKILLS */}
              {safeArray(data.skills).length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                  </View>

                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {safeArray(data.skills).map((skill, i) => (
                      <View key={i} style={styles.skillBox}>
                        <Text>{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* EDUCATION */}
              {safeArray(data.education).length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Education</Text>
                  </View>

                  {safeArray(data.education).map((edu, i) => (
                    <View key={i} style={styles.block}>
                      <Text style={styles.bold}>{edu.degree}</Text>
                      <Text style={styles.smallGray}>
                        {edu.institution}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* CERTIFICATIONS */}
              {safeArray(data.certifications).length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Certifications</Text>
                  </View>

                  {safeArray(data.certifications).map((c, i) => (
                    <Text key={i} style={styles.paragraph}>
                      • {renderSafe(c)}
                    </Text>
                  ))}
                </View>
              )}

              {/* AWARDS */}
              {safeArray(data.achievements).length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Awards</Text>
                  </View>

                  {safeArray(data.achievements).map((a, i) => (
                    <View key={i} style={{ marginBottom: 6 }}>
                      <Text style={styles.bold}>
                        {a?.title}
                        {a?.year && ` (${a.year})`}
                      </Text>
                      {a?.description && (
                        <Text style={styles.paragraph}>
                          {a.description}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* LANGUAGES */}
              {safeArray(data.languages).length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Languages</Text>
                  </View>
                  <Text style={styles.paragraph}>
                    {safeArray(data.languages).join(", ")}
                  </Text>
                </View>
              )}

            </View>

          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Template25PDF;