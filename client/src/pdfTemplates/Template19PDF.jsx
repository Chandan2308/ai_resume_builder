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
  return val.title || val.name || val.degree || val.language || "";
};

const normalizeUrl = (url) =>
  url && url.startsWith("http") ? url : `https://${url}`;

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 400;
  weight += (data.projects?.length || 0) * 350;
  weight += (data.education?.length || 0) * 250;
  weight += (data.skills?.length || 0) * 60;
  weight += (data.certifications?.length || 0) * 120;
  weight += (data.achievements?.length || 0) * 150;
  weight += (data.languagesDetailed?.length || 0) * 80;

  if (weight > 7000) return 0.75;
  if (weight > 6000) return 0.82;
  if (weight > 5000) return 0.88;
  if (weight > 4000) return 0.94;
  return 1;
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#111827"
  },

  container: {
    transformOrigin: "top left"
  },

  header: {
    marginBottom: 20
  },

  name: {
    fontSize: 24,
    fontWeight: 800
  },

  role: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 10
  },

  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6
  },

  contactItem: {
    fontSize: 9,
    marginRight: 12,
    color: "#4b5563"
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 15
  },

  section: {
    marginBottom: 18
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 8
  },

  paragraph: {
    fontSize: 10,
    lineHeight: 1.5
  },

  block: {
    marginBottom: 10
  },

  blockTitle: {
    fontSize: 11,
    fontWeight: 700
  },

  blockSub: {
    fontSize: 9,
    color: "#6b7280"
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

const Template19PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const scale = calculateScale(data);

  const sections =
    sectionOrder && sectionOrder.length > 0
      ? sectionOrder
      : [
          "summary",
          "skills",
          "projects",
          "education",
          "experience",
          "languages",
          "certifications",
          "achievements"
        ];

  const renderSection = (key) => {
    switch (key) {

      case "summary":
        return data.summary ? (
          <View key="summary" style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.paragraph}>{data.summary}</Text>
          </View>
        ) : null;

      case "skills":
        return safeArray(data.skills).length ? (
          <View key="skills" style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {safeArray(data.skills).map((s, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text>{renderSafe(s)}</Text>
              </View>
            ))}
          </View>
        ) : null;

      case "projects":
        return safeArray(data.projects).length ? (
          <View key="projects" style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {safeArray(data.projects).map((p, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(p.title || p.name)}
                </Text>
                {p.description && (
                  <Text style={styles.paragraph}>{p.description}</Text>
                )}
                {p.technologies && (
                  <Text style={styles.blockSub}>
                    Tech: {Array.isArray(p.technologies)
                      ? p.technologies.join(", ")
                      : p.technologies}
                  </Text>
                )}
                {p.link && (
                  <Link src={normalizeUrl(p.link)} style={styles.blockSub}>
                    Live Demo
                  </Link>
                )}
                {p.githubLink && (
                  <Link src={normalizeUrl(p.githubLink)} style={styles.blockSub}>
                    GitHub
                  </Link>
                )}
              </View>
            ))}
          </View>
        ) : null;

      case "education":
        return safeArray(data.education).length ? (
          <View key="education" style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {safeArray(data.education).map((edu, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(edu.degree)}
                </Text>
                <Text style={styles.blockSub}>
                  {renderSafe(edu.institution)}{" "}
                  {edu.duration && `(${edu.duration})`}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "experience":
        return safeArray(data.experience).length ? (
          <View key="experience" style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {safeArray(data.experience).map((exp, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(exp.title)}{" "}
                  {exp.companyName && `at ${exp.companyName}`}
                </Text>
                {exp.date && (
                  <Text style={styles.blockSub}>{exp.date}</Text>
                )}
                {safeArray(exp.accomplishment).map((a, j) => (
                  <View key={j} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text>{a}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null;

      case "languages":
        return safeArray(data.languagesDetailed).length ? (
          <View key="languages" style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {safeArray(data.languagesDetailed).map((l, i) => (
              <Text key={i} style={styles.paragraph}>
                {l.language} – {l.proficiency}
              </Text>
            ))}
          </View>
        ) : null;

      case "certifications":
  return safeArray(data.certifications).length ? (
    <View key="certifications" style={styles.section}>
      <Text style={styles.sectionTitle}>Certifications</Text>
      {safeArray(data.certifications).map((cert, i) => (
        <View key={i} style={styles.block}>
          <Text style={styles.blockTitle}>
            {typeof cert === "object" ? cert.title : cert}
          </Text>
          {typeof cert === "object" && (
            <>
              {cert.issuer && (
                <Text style={styles.blockSub}>
                  {cert.issuer}
                </Text>
              )}
              {cert.date && (
                <Text style={styles.blockSub}>
                  ({cert.date})
                </Text>
              )}
            </>
          )}
        </View>
      ))}
    </View>
  ) : null;

      case "achievements":
  return safeArray(data.achievements).length ? (
    <View key="achievements" style={styles.section}>
      <Text style={styles.sectionTitle}>Achievements</Text>
      {safeArray(data.achievements).map((ach, i) => (
        <View key={i} style={styles.block}>
          <Text style={styles.blockTitle}>
            {typeof ach === "object" ? ach.title : ach}
          </Text>

          {typeof ach === "object" && (
            <>
              {ach.description && (
                <Text style={styles.paragraph}>
                  {ach.description}
                </Text>
              )}
              {ach.year && (
                <Text style={styles.blockSub}>
                  {ach.year}
                </Text>
              )}
            </>
          )}
        </View>
      ))}
    </View>
  ) : null;

      default:
        return null;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.name}>
              {data.name || "Your Name"}
            </Text>
            {data.role && (
              <Text style={styles.role}>{data.role}</Text>
            )}

            <View style={styles.contactRow}>
              {data.location && (
                <Text style={styles.contactItem}>{data.location}</Text>
              )}
              {data.phone && (
                <Text style={styles.contactItem}>{data.phone}</Text>
              )}
              {data.email && (
                <Text style={styles.contactItem}>{data.email}</Text>
              )}
              {data.linkedin && (
                <Link
                  src={normalizeUrl(data.linkedin)}
                  style={styles.contactItem}
                >
                  LinkedIn
                </Link>
              )}
              {data.github && (
                <Link
                  src={normalizeUrl(data.github)}
                  style={styles.contactItem}
                >
                  GitHub
                </Link>
              )}
              {data.portfolio && (
                <Link
                  src={normalizeUrl(data.portfolio)}
                  style={styles.contactItem}
                >
                  Portfolio
                </Link>
              )}
            </View>
          </View>

          <View style={styles.divider} />

          {/* DYNAMIC SECTIONS */}
          {sections.map((key) => renderSection(key))}

        </View>
      </Page>
    </Document>
  );
};

export default Template19PDF;