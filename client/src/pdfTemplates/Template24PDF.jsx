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
  weight += (data.achievements?.length || 0) * 100;
  weight += (data.certifications?.length || 0) * 120;

  if (weight > 8000) return 0.72;
  if (weight > 7000) return 0.80;
  if (weight > 6000) return 0.88;
  if (weight > 5000) return 0.94;
  return 1;
};

/* ================= STYLES ================= */

const ACCENT = "#707070";
const PRIMARY = "#343a40";
const SECTION_BG = "#f5f5f5";

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
    borderBottomWidth: 1,
    borderBottomColor: ACCENT,
    paddingBottom: 15,
    marginBottom: 20
  },

  name: {
    fontSize: 24,
    fontWeight: 900,
    letterSpacing: 2
  },

  role: {
    fontSize: 12,
    marginTop: 6,
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: 1
  },

  columns: {
    flexDirection: "row",
    gap: 30
  },

  leftColumn: {
    width: "35%"
  },

  rightColumn: {
    width: "65%"
  },

  leftSectionTitle: {
    backgroundColor: SECTION_BG,
    padding: 6,
    marginTop: 15,
    marginBottom: 6,
    textTransform: "uppercase",
    fontWeight: 700,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: ACCENT
  },

  rightSectionTitle: {
    backgroundColor: SECTION_BG,
    padding: 6,
    marginTop: 20,
    marginBottom: 10,
    textTransform: "uppercase",
    fontWeight: 700,
    borderBottomWidth: 1,
    borderColor: ACCENT
  },

  smallText: {
    fontSize: 9,
    marginBottom: 4
  },

  bold: {
    fontWeight: 700
  },

  italic: {
    fontStyle: "italic",
    fontSize: 9
  },

  paragraph: {
    fontSize: 10,
    lineHeight: 1.6
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 3
  },

  bulletDot: {
    marginRight: 6
  }
});

/* ================= COMPONENT ================= */

const Template24PDF = ({ data }) => {
  if (!data) return null;

  const scale = calculateScale(data);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.name}>{data.name || "FULL NAME"}</Text>
            {data.role && <Text style={styles.role}>{data.role}</Text>}
          </View>

          <View style={styles.columns}>

            {/* ================= LEFT COLUMN ================= */}
            <View style={styles.leftColumn}>

              {/* CONTACT */}
              <Text style={styles.leftSectionTitle}>Contact</Text>
              {data.phone && <Text style={styles.smallText}>{data.phone}</Text>}
              {data.email && <Text style={styles.smallText}>{data.email}</Text>}
              {data.linkedin && (
                <Link style={styles.smallText} src={normalizeUrl(data.linkedin)}>
                  LinkedIn
                </Link>
              )}
              {data.github && (
                <Link style={styles.smallText} src={normalizeUrl(data.github)}>
                  GitHub
                </Link>
              )}
              {data.portfolio && (
                <Link style={styles.smallText} src={normalizeUrl(data.portfolio)}>
                  Portfolio
                </Link>
              )}
              {data.location && (
                <Text style={styles.smallText}>{data.location}</Text>
              )}

              {/* EDUCATION */}
              {safeArray(data.education).length > 0 && (
                <>
                  <Text style={styles.leftSectionTitle}>Education</Text>
                  {safeArray(data.education).map((edu, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                      <Text style={styles.bold}>{renderSafe(edu.degree)}</Text>
                      <Text style={{ color: ACCENT }}>
                        {renderSafe(edu.institution)}
                      </Text>
                      <Text style={styles.italic}>
                        {renderSafe(edu.duration)}
                      </Text>
                    </View>
                  ))}
                </>
              )}

              {/* SKILLS */}
              {safeArray(data.skills).length > 0 && (
                <>
                  <Text style={styles.leftSectionTitle}>Skills</Text>
                  {safeArray(data.skills).map((s, i) => (
                    <Text key={i} style={styles.smallText}>
                      • {renderSafe(s)}
                    </Text>
                  ))}
                </>
              )}

              {/* LANGUAGES */}
              {safeArray(data.languages).length > 0 && (
                <>
                  <Text style={styles.leftSectionTitle}>Languages</Text>
                  {safeArray(data.languages).map((l, i) => (
                    <Text key={i} style={styles.smallText}>
                      • {renderSafe(l)}
                    </Text>
                  ))}
                </>
              )}

              {/* INTERESTS */}
              {safeArray(data.interests).length > 0 && (
                <>
                  <Text style={styles.leftSectionTitle}>Interests</Text>
                  {safeArray(data.interests).map((int, i) => (
                    <Text key={i} style={styles.smallText}>
                      • {renderSafe(int)}
                    </Text>
                  ))}
                </>
              )}

            </View>

            {/* ================= RIGHT COLUMN ================= */}
            <View style={styles.rightColumn}>

              {/* SUMMARY */}
              {data.summary && (
                <>
                  <Text style={styles.rightSectionTitle}>Summary</Text>
                  <Text style={styles.paragraph}>{data.summary}</Text>
                </>
              )}

              {/* EXPERIENCE */}
              {safeArray(data.experience).length > 0 && (
                <>
                  <Text style={styles.rightSectionTitle}>Experience</Text>
                  {safeArray(data.experience).map((exp, i) => (
                    <View key={i} style={{ marginBottom: 12 }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.bold}>
                          {renderSafe(exp.companyName || exp.company)}
                        </Text>
                        <Text style={{ color: ACCENT, fontSize: 9 }}>
                          {renderSafe(exp.date)}
                        </Text>
                      </View>
                      <Text style={{ fontStyle: "italic", color: ACCENT }}>
                        {renderSafe(exp.title)}
                      </Text>

                      {safeArray(exp.accomplishment).map((a, j) => (
                        <View key={j} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.paragraph}>{a}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </>
              )}

              {/* PROJECTS */}
              {safeArray(data.projects).length > 0 && (
                <>
                  <Text style={styles.rightSectionTitle}>Projects</Text>
                  {safeArray(data.projects).map((proj, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                      <Text style={styles.bold}>
                        {renderSafe(proj.name)}
                      </Text>
                      <Text style={styles.paragraph}>
                        {renderSafe(proj.description)}
                      </Text>
                    </View>
                  ))}
                </>
              )}

              {/* ACHIEVEMENTS */}
              {safeArray(data.achievements).length > 0 && (
                <>
                  <Text style={styles.rightSectionTitle}>Achievements</Text>
                  {safeArray(data.achievements).map((a, i) => (
                    <Text key={i} style={styles.paragraph}>
                      • {renderSafe(a)}
                    </Text>
                  ))}
                </>
              )}

              {/* CERTIFICATIONS */}
              {safeArray(data.certifications).length > 0 && (
                <>
                  <Text style={styles.rightSectionTitle}>Certifications</Text>
                  {safeArray(data.certifications).map((c, i) => (
                    <Text key={i} style={styles.paragraph}>
                      • {renderSafe(c)}
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

export default Template24PDF;