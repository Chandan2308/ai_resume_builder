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
  return val.title || val.name || val.degree || "";
};

const normalizeUrl = (url) =>
  url && url.startsWith("http") ? url : `https://${url}`;

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 350;
  weight += (data.projects?.length || 0) * 300;
  weight += (data.education?.length || 0) * 200;
  weight += (data.skills?.length || 0) * 50;
  weight += (data.certifications?.length || 0) * 80;
  weight += (data.achievements?.length || 0) * 120;
  weight += (data.languages?.length || 0) * 40;

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
    paddingHorizontal: 40,
    paddingBottom: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1f2937"
  },

  container: {
    transformOrigin: "top left"
  },

  /* HEADER */

  header: {
    borderBottomWidth: 4,
    borderBottomColor: "#1f2937",
    paddingBottom: 20,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  nameBlock: {
    flex: 1
  },

  name: {
    fontSize: 26,
    fontWeight: 900
  },

  role: {
    fontSize: 13,
    color: "#3b82f6",
    marginTop: 6,
    textTransform: "uppercase"
  },

  contactBlock: {
    textAlign: "right",
    fontSize: 9
  },

  contactText: {
    marginBottom: 4
  },

  headerLink: {
    fontSize: 8,
    color: "#3b82f6",
    marginTop: 6
  },

  /* SECTION */

  sectionWrapper: {
    marginBottom: 18
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: 800,
    marginBottom: 8,
    textTransform: "uppercase",
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
    paddingLeft: 8
  },

  bodyText: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: "justify"
  },

  subHeader: {
    fontSize: 11,
    fontWeight: 800
  },

  accentText: {
    fontSize: 9,
    color: "#3b82f6",
    fontWeight: 700,
    marginBottom: 4
  },

  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  skillBadge: {
    backgroundColor: "#1f2937",
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 8
  },

  listItem: {
    fontSize: 10,
    marginBottom: 4
  }
});

/* ================= COMPONENT ================= */

const Template16PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const scale = calculateScale(data);

  const sections = sectionOrder && sectionOrder.length > 0
    ? sectionOrder
    : ["summary", "experience", "education", "skills", "projects"];

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* ================= HEADER ================= */}

          <View style={styles.header}>
            <View style={styles.nameBlock}>
              <Text style={styles.name}>{data.name || "Full Name"}</Text>
              {data.role && (
                <Text style={styles.role}>{data.role}</Text>
              )}
            </View>

            <View style={styles.contactBlock}>
              {data.email && (
                <Text style={styles.contactText}>{data.email}</Text>
              )}
              {data.phone && (
                <Text style={styles.contactText}>{data.phone}</Text>
              )}
              {data.linkedin && (
                <Link
                  src={normalizeUrl(data.linkedin)}
                  style={styles.headerLink}
                >
                  LINKEDIN
                </Link>
              )}
              {data.github && (
                <Link
                  src={normalizeUrl(data.github)}
                  style={styles.headerLink}
                >
                  GITHUB
                </Link>
              )}
            </View>
          </View>

          {/* ================= DYNAMIC SECTIONS ================= */}

          {sections.map((key) => {

            switch (key) {

              case "summary":
                return data.summary ? (
                  <View key="summary" style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>
                      Professional Profile
                    </Text>
                    <Text style={styles.bodyText}>
                      {data.summary}
                    </Text>
                  </View>
                ) : null;

              case "experience":
                return safeArray(data.experience).length ? (
                  <View key="experience" style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>
                      Work Experience
                    </Text>
                    {safeArray(data.experience).map((exp, i) => (
                      <View key={i} style={{ marginBottom: 10 }}>
                        <Text style={styles.subHeader}>
                          {renderSafe(exp.title)}
                        </Text>
                        <Text style={styles.accentText}>
                          {renderSafe(exp.company)}{" "}
                          {exp.duration && `| ${exp.duration}`}
                        </Text>
                        <Text style={styles.bodyText}>
                          {renderSafe(exp.description)}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null;

              case "education":
                return safeArray(data.education).length ? (
                  <View key="education" style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>
                      Academic Background
                    </Text>
                    {safeArray(data.education).map((edu, i) => (
                      <View key={i} style={{ marginBottom: 8 }}>
                        <Text style={styles.subHeader}>
                          {renderSafe(edu.degree)}
                        </Text>
                        <Text style={styles.bodyText}>
                          {renderSafe(edu.institution)}{" "}
                          {edu.year && `| ${edu.year}`}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null;

              case "skills":
                return safeArray(data.skills).length ? (
                  <View key="skills" style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>
                      Technical Expertise
                    </Text>
                    <View style={styles.skillRow}>
                      {safeArray(data.skills).map((s, i) => (
                        <Text key={i} style={styles.skillBadge}>
                          {renderSafe(s)}
                        </Text>
                      ))}
                    </View>
                  </View>
                ) : null;

              case "projects":
                return safeArray(data.projects).length ? (
                  <View key="projects" style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>
                      Key Projects
                    </Text>
                    {safeArray(data.projects).map((p, i) => (
                      <View key={i} style={{ marginBottom: 10 }}>
                        <Text style={styles.subHeader}>
                          {renderSafe(p.name)}
                        </Text>
                        <Text style={styles.bodyText}>
                          {renderSafe(p.description)}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null;

              case "certifications":
                return safeArray(data.certifications).length ? (
                  <View key="certifications" style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>
                      Certifications
                    </Text>
                    {safeArray(data.certifications).map((c, i) => (
                      <Text key={i} style={styles.listItem}>
                        • {renderSafe(c)}
                      </Text>
                    ))}
                  </View>
                ) : null;

              case "achievements":
                return safeArray(data.achievements).length ? (
                  <View key="achievements" style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>
                      Accomplishments
                    </Text>
                    {safeArray(data.achievements).map((a, i) => (
                      <Text key={i} style={styles.listItem}>
                        • {renderSafe(a)}
                      </Text>
                    ))}
                  </View>
                ) : null;

              case "languages":
                return safeArray(data.languages).length ? (
                  <View key="languages" style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>
                      Languages
                    </Text>
                    <Text style={styles.bodyText}>
                      {safeArray(data.languages).map(renderSafe).join(" • ")}
                    </Text>
                  </View>
                ) : null;

              case "interests":
                return safeArray(data.interests).length ? (
                  <View key="interests" style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>
                      Interests & Hobbies
                    </Text>
                    <Text style={styles.bodyText}>
                      {safeArray(data.interests).join(", ")}
                    </Text>
                  </View>
                ) : null;

              default:
                return null;
            }

          })}

        </View>
      </Page>
    </Document>
  );
};

export default Template16PDF;