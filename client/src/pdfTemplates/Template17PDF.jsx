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

const hasText = (val) =>
  typeof val === "string" && val.trim() !== "";

const clean = (val) => (hasText(val) ? val.trim() : "");

const normalizeUrl = (url) =>
  url && url.startsWith("http") ? url : `https://${url}`;

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += data.summary?.length || 0;
  weight += safeArray(data.experience).length * 450;
  weight += safeArray(data.projects).length * 350;
  weight += safeArray(data.education).length * 250;
  weight += safeArray(data.certifications).length * 150;
  weight += safeArray(data.skills).length * 60;
  weight += safeArray(data.languages).length * 60;
  weight += safeArray(data.interests).length * 60;
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
    color: "#111827"
  },

  container: {
    transformOrigin: "top left"
  },

  header: {
    marginBottom: 25
  },

  name: {
    fontSize: 28,
    fontWeight: 700,
    color: "#4B5563"
  },

  role: {
    fontSize: 13,
    color: "#3b82f6",
    marginTop: 4
  },

  contactGrid: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  contactCol: {
    width: "32%"
  },

  contactItem: {
    fontSize: 9,
    marginBottom: 4
  },

  section: {
    marginBottom: 18
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#4f46e5",
    marginBottom: 4,
    textTransform: "uppercase"
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 8
  },

  paragraph: {
    fontSize: 10,
    lineHeight: 1.6
  },

  bulletList: {
    marginTop: 4,
    paddingLeft: 10
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 3
  },

  bulletDot: {
    marginRight: 5
  },

  bold: {
    fontWeight: 600
  },

  small: {
    fontSize: 9
  },

  link: {
    color: "#2563eb",
    textDecoration: "none"
  }
});

/* ================= COMPONENT ================= */

const Template17PDF = ({ data, sectionOrder }) => {
  if (!data) return null;

  const scale = calculateScale(data);

  const defaultOrder = [
    "summary",
    "experience",
    "education",
    "projects",
    "certifications",
    "achievements",
    "skills",
    "languages",
    "interests"
  ];

  const order = sectionOrder?.length ? sectionOrder : defaultOrder;

  const renderSection = (key) => {
    switch (key) {
      case "summary":
        return hasText(data.summary) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.divider} />
            <Text style={styles.paragraph}>{clean(data.summary)}</Text>
          </View>
        );

      case "experience":
        return safeArray(data.experience).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            <View style={styles.divider} />

            {safeArray(data.experience).map((exp, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text>
                  {hasText(exp.title) && (
                    <Text style={styles.bold}>{exp.title}</Text>
                  )}
                  {hasText(exp.companyName) && (
                    <> — {exp.companyName}</>
                  )}
                  {hasText(exp.date) && <> ({exp.date})</>}
                </Text>

                {hasText(exp.companyLocation) && (
                  <Text style={styles.small}>
                    {exp.companyLocation}
                  </Text>
                )}

                {safeArray(exp.accomplishment).map(
                  (a, idx) =>
                    hasText(a) && (
                      <View key={idx} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.paragraph}>{a}</Text>
                      </View>
                    )
                )}
              </View>
            ))}
          </View>
        );

      case "education":
        return safeArray(data.education).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.divider} />

            {safeArray(data.education).map((edu, i) => (
              <Text key={i} style={{ marginBottom: 4 }}>
                {hasText(edu.degree) && (
                  <Text style={styles.bold}>{edu.degree}</Text>
                )}
                {hasText(edu.institution) && <> — {edu.institution}</>}
                {hasText(edu.duration) && <> ({edu.duration})</>}
                {hasText(edu.location) && <> — {edu.location}</>}
              </Text>
            ))}
          </View>
        );

      case "projects":
        return safeArray(data.projects).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.divider} />

            {safeArray(data.projects).map((p, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                {hasText(p.name) && (
                  <Text style={styles.bold}>{p.name}</Text>
                )}
                {hasText(p.description) && (
                  <Text style={styles.paragraph}>
                    {p.description}
                  </Text>
                )}
                {safeArray(p.technologies).length > 0 && (
                  <Text style={styles.small}>
                    <Text style={styles.bold}>Tech:</Text>{" "}
                    {safeArray(p.technologies).join(", ")}
                  </Text>
                )}
                {(hasText(p.link) || hasText(p.github)) && (
                  <Text style={styles.small}>
                    {hasText(p.link) && (
                      <Link
                        style={styles.link}
                        src={normalizeUrl(p.link)}
                      >
                        Live
                      </Link>
                    )}
                    {hasText(p.link) && hasText(p.github) && " · "}
                    {hasText(p.github) && (
                      <Link
                        style={styles.link}
                        src={normalizeUrl(p.github)}
                      >
                        GitHub
                      </Link>
                    )}
                  </Text>
                )}
              </View>
            ))}
          </View>
        );

      case "certifications":
        return safeArray(data.certifications).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <View style={styles.divider} />
            {safeArray(data.certifications).map((c, i) => (
              <Text key={i}>
                {c.title}
                {c.issuer && <> — {c.issuer}</>}
                {c.date && <> ({c.date})</>}
              </Text>
            ))}
          </View>
        );

      case "achievements":
        return safeArray(data.achievements).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.divider} />
            {safeArray(data.achievements).map(
              (a, i) =>
                hasText(a) && (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text>{a}</Text>
                  </View>
                )
            )}
          </View>
        );

      case "skills":
        return safeArray(data.skills).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.divider} />
            {safeArray(data.skills).map(
              (s, i) =>
                hasText(s) && (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text>{s}</Text>
                  </View>
                )
            )}
          </View>
        );

      case "languages":
        return safeArray(data.languages).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.divider} />
            {safeArray(data.languages).map(
              (l, i) =>
                hasText(l) && (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text>{l}</Text>
                  </View>
                )
            )}
          </View>
        );

      case "interests":
        return safeArray(data.interests).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.divider} />
            {safeArray(data.interests).map(
              (iVal, i) =>
                hasText(iVal) && (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text>{iVal}</Text>
                  </View>
                )
            )}
          </View>
        );

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
            <Text style={styles.name}>{data.name}</Text>
            {hasText(data.role) && (
              <Text style={styles.role}>{data.role}</Text>
            )}

            {/* 3 Column Contact */}
            <View style={styles.contactGrid}>
              <View style={styles.contactCol}>
                {hasText(data.location) && (
                  <Text style={styles.contactItem}>
                    {data.location}
                  </Text>
                )}
                {hasText(data.email) && (
                  <Link
                    style={styles.link}
                    src={`mailto:${data.email}`}
                  >
                    {data.email}
                  </Link>
                )}
              </View>

              <View style={styles.contactCol}>
                {hasText(data.phone) && (
                  <Link
                    style={styles.link}
                    src={`tel:${data.phone}`}
                  >
                    {data.phone}
                  </Link>
                )}
                {hasText(data.linkedin) && (
                  <Link
                    style={styles.link}
                    src={normalizeUrl(data.linkedin)}
                  >
                    LinkedIn
                  </Link>
                )}
              </View>

              <View style={styles.contactCol}>
                {hasText(data.github) && (
                  <Link
                    style={styles.link}
                    src={normalizeUrl(data.github)}
                  >
                    GitHub
                  </Link>
                )}
                {hasText(data.portfolio) && (
                  <Link
                    style={styles.link}
                    src={normalizeUrl(data.portfolio)}
                  >
                    Portfolio
                  </Link>
                )}
              </View>
            </View>
          </View>

          {/* Dynamic Sections */}
          {order.map((key) => (
            <React.Fragment key={key}>
              {renderSection(key)}
            </React.Fragment>
          ))}

        </View>
      </Page>
    </Document>
  );
};

export default Template17PDF;