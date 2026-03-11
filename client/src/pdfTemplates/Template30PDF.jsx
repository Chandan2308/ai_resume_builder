import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link
} from "@react-pdf/renderer";

/* ================= THEME ================= */

const PRIMARY = "#0f172a";      // Charcoal
const ACCENT = "#059669";       // Emerald
const SECONDARY = "#f1f5f9";    // Light slate
const BORDER = "#cbd5e1";
const TEXT = "#334155";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 350;
  weight += (data.projects?.length || 0) * 300;
  weight += (data.skills?.length || 0) * 40;
  weight += (data.education?.length || 0) * 120;
  weight += (data.certifications?.length || 0) * 120;
  weight += (data.achievements?.length || 0) * 140;

  if (weight > 6500) return 0.78;
  if (weight > 5500) return 0.85;
  if (weight > 4500) return 0.90;
  if (weight > 3500) return 0.95;
  return 1;
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    borderWidth: 12,
    borderColor: PRIMARY
  },

  container: {
    transformOrigin: "top left"
  },

  headerBox: {
    backgroundColor: PRIMARY,
    color: "#fff",
    padding: 25,
    marginTop: -40,
    marginLeft: -40,
    marginRight: -40,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff"
  },

  role: {
    fontSize: 14,
    color: ACCENT,
    marginTop: 4
  },

  contactCol: {
    fontSize: 10,
    color: "#fff",
    textAlign: "right"
  },

  sectionHeading: {
    fontSize: 12,
    fontWeight: "bold",
    color: PRIMARY,
    borderLeftWidth: 5,
    borderLeftColor: ACCENT,
    paddingLeft: 10,
    marginBottom: 12,
    textTransform: "uppercase"
  },

  grid: {
    flexDirection: "row",
    gap: 30,
    marginTop: 20
  },

  leftCol: {
    flex: 1.8
  },

  rightCol: {
    flex: 1
  },

  bullet: {
    marginLeft: 15,
    fontSize: 10,
    marginBottom: 3,
    color: TEXT
  },

  projectCard: {
    backgroundColor: SECONDARY,
    padding: 12,
    borderRadius: 6,
    marginBottom: 12
  },

  skillTag: {
    backgroundColor: PRIMARY,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 9,
    marginRight: 6,
    marginBottom: 6
  },

  footerGrid: {
    flexDirection: "row",
    gap: 30,
    borderTopWidth: 2,
    borderTopColor: BORDER,
    borderStyle: "dashed",
    paddingTop: 15,
    marginTop: 25
  },

  smallText: {
    fontSize: 9,
    color: TEXT
  }
});

/* ================= COMPONENT ================= */

const Template30PDF = ({ data }) => {
  if (!data) return null;

  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);
  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const scale = calculateScale(data);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={[styles.container, { transform: `scale(${scale})` }]}>

          {/* HEADER */}
          <View style={styles.headerBox}>
            <View style={{ flex: 2 }}>
              <Text style={styles.name}>
                {data.name || "YOUR NAME"}
              </Text>
              {data.role && (
                <Text style={styles.role}>{data.role}</Text>
              )}
            </View>

            <View style={styles.contactCol}>
              <Text>{data.email}</Text>
              <Text>{data.phone}</Text>
              <Text>{data.location}</Text>

              <View style={{ marginTop: 6 }}>
                {data.linkedin && (
                  <Link src={normalizeUrl(data.linkedin)}>
                    {data.linkedin}
                  </Link>
                )}
                {data.github && (
                  <Link src={normalizeUrl(data.github)}>
                    {"  |  "}{data.github}
                  </Link>
                )}
                {data.portfolio && (
                  <Link src={normalizeUrl(data.portfolio)}>
                    {"  |  "}{data.portfolio}
                  </Link>
                )}
              </View>
            </View>
          </View>

          {/* SUMMARY */}
          {data.summary && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionHeading}>
                Snapshot Summary
              </Text>
              <Text style={{ color: TEXT, lineHeight: 1.6 }}>
                {data.summary}
              </Text>
            </View>
          )}

          {/* MAIN GRID */}
          <View style={styles.grid}>

            {/* LEFT COLUMN */}
            <View style={styles.leftCol}>

              {/* EXPERIENCE */}
              {safeArray(data.experience).length > 0 && (
                <View>
                  <Text style={styles.sectionHeading}>
                    Professional Journey
                  </Text>

                  {data.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 15 }}>
                      <Text style={{ fontWeight: "bold", color: PRIMARY }}>
                        {exp.title}
                      </Text>

                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: ACCENT, fontSize: 9 }}>
                          {exp.companyName}
                        </Text>
                        <Text style={{ color: ACCENT, fontSize: 9 }}>
                          {exp.date}
                        </Text>
                      </View>

                      {safeArray(exp.accomplishment).map((point, idx) => (
                        <Text key={idx} style={styles.bullet}>
                          • {point}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              )}

              {/* PROJECTS */}
              {safeArray(data.projects).length > 0 && (
                <View>
                  <Text style={styles.sectionHeading}>
                    Signature Projects
                  </Text>

                  {data.projects.map((proj, i) => (
                    <View key={i} style={styles.projectCard}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold", color: PRIMARY }}>
                          {proj.title}
                        </Text>
                        <Text style={styles.smallText}>
                          {proj.duration}
                        </Text>
                      </View>

                      {proj.technologies && (
                        <Text style={{ color: ACCENT, fontSize: 9, marginVertical: 4 }}>
                          Stack: {Array.isArray(proj.technologies)
                            ? proj.technologies.join(", ")
                            : proj.technologies}
                        </Text>
                      )}

                      <Text style={styles.smallText}>
                        {proj.description}
                      </Text>

                      <View style={{ marginTop: 5 }}>
                        {proj.link && (
                          <Link src={normalizeUrl(proj.link)}>
                            Live Demo
                          </Link>
                        )}
                        {proj.githubLink && (
                          <Link src={normalizeUrl(proj.githubLink)}>
                            {"  |  "}GitHub
                          </Link>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              )}

            </View>

            {/* RIGHT COLUMN */}
            <View style={styles.rightCol}>

              {/* SKILLS */}
              {safeArray(data.skills).length > 0 && (
                <View>
                  <Text style={styles.sectionHeading}>
                    Core Expertise
                  </Text>

                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {data.skills.map((skill, i) => (
                      <Text key={i} style={styles.skillTag}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              )}

              {/* EDUCATION */}
              {safeArray(data.education).length > 0 && (
                <View>
                  <Text style={styles.sectionHeading}>
                    Academic
                  </Text>

                  {data.education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                      <Text style={{ fontWeight: "bold", color: PRIMARY }}>
                        {edu.degree}
                      </Text>
                      <Text style={styles.smallText}>
                        {edu.institution}
                      </Text>
                      <Text style={{ color: ACCENT, fontSize: 9 }}>
                        {edu.duration} | GPA: {edu.grade}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* LANGUAGES */}
              {safeArray(data.languagesDetailed).length > 0 && (
                <View>
                  <Text style={styles.sectionHeading}>
                    Languages
                  </Text>

                  {data.languagesDetailed.map((lang, i) => (
                    <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {lang.language}
                      </Text>
                      <Text style={{ color: ACCENT, fontSize: 9 }}>
                        {lang.proficiency}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footerGrid}>

            {/* CERTIFICATIONS */}
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionHeading}>
                Certifications
              </Text>

              {safeArray(data.certifications).map((cert, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {cert.title}
                  </Text>
                  <Text style={styles.smallText}>
                    {cert.issuer} • {cert.date}
                  </Text>
                </View>
              ))}
            </View>

            {/* ACHIEVEMENTS */}
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionHeading}>
                Achievements
              </Text>

              {safeArray(data.achievements).map((ach, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {ach.title}
                  </Text>
                  <Text style={styles.smallText}>
                    {ach.description} ({ach.year})
                  </Text>
                </View>
              ))}
            </View>

          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Template30PDF;