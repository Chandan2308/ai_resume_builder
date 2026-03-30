// import React from "react";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Link,
// } from "@react-pdf/renderer";

// /* ================= AUTO SCALE ================= */

// const calculateScale = (data) => {
//   let weight = 0;

//   weight += (data.summary?.length || 0);
//   weight += (data.experience?.length || 0) * 350;
//   weight += (data.projects?.length || 0) * 300;
//   weight += (data.education?.length || 0) * 200;
//   weight += (data.skills?.length || 0) * 60;
//   weight += (data.certifications?.length || 0) * 80;
//   weight += (data.achievements?.length || 0) * 120;
//   weight += (data.languages?.length || 0) * 40;
//   weight += (data.interests?.length || 0) * 40;

//   if (weight > 6500) return 0.75;
//   if (weight > 5500) return 0.82;
//   if (weight > 4500) return 0.88;
//   if (weight > 3500) return 0.94;
//   return 1;
// };

// /* ================= COMPONENT ================= */

// const Template1PDF = ({ data, sectionOrder }) => {
//   if (!data) return null;

//   const accent = data.textColor || "#0a91b2";
//   const scale = calculateScale(data);

//   const safeArray = (v) => (Array.isArray(v) ? v : []);
//   const normalizeUrl = (url) =>
//     url && url.startsWith("http") ? url : `https://${url}`;

//   const renderSafe = (val) => {
//     if (!val) return "";
//     if (typeof val === "string") return val;
//     return val.name || val.title || val.degree || val.language || "";
//   };

//   const styles = StyleSheet.create({
//     page: {
//       padding: 36,
//       fontSize: 9,
//       fontFamily: "Times-Roman",
//       color: "#1f2937",
//     },

//     container: {
//       transformOrigin: "top left",
//     },

//     /* HEADER */

//     headerWrapper: {
//       borderBottomWidth: 4,
//       borderBottomColor: accent,
//       paddingBottom: 12,
//       marginBottom: 20,
//     },

//     headerRow: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//     },

//     name: {
//       fontSize: 24,
//       fontWeight: 800,
//       color: accent,
//     },

//     role: {
//       fontSize: 12,
//       color: "#4b5563",
//       marginTop: 4,
//       fontWeight: 600,
//     },

//     contactColumn: {
//       alignItems: "flex-end",
//       fontSize: 8,
//     },

//     link: {
//       color: "#2563eb",
//       textDecoration: "none",
//       fontSize: 8,
//     },

//     /* TWO COLUMN BODY */

//     bodyRow: {
//       flexDirection: "row",
//       gap: 20,
//     },

//     leftCol: {
//       flex: 1,
//       paddingRight: 10,
//     },

//     rightCol: {
//       flex: 1.5,
//       paddingLeft: 10,
//     },

//     /* SECTIONS */

//     sectionWrapper: {
//       marginBottom: 14,
//     },

//     sectionTitle: {
//       fontSize: 11,
//       fontWeight: 700,
//       color: accent,
//       textTransform: "uppercase",
//       borderBottomWidth: 2,
//       borderBottomColor: accent,
//       paddingBottom: 4,
//       marginBottom: 6,
//     },

//     paragraph: {
//       fontSize: 9,
//       lineHeight: 1.5,
//       textAlign: "justify",
//     },

//     block: {
//       marginBottom: 8,
//     },

//     blockTitle: {
//       fontSize: 10,
//       fontWeight: 700,
//     },

//     blockSub: {
//       fontSize: 8.5,
//       color: "#4b5563",
//       marginBottom: 2,
//     },

//     skillBox: {
//       backgroundColor: "#f3f4f6",
//       borderWidth: 1,
//       borderColor: "#e5e7eb",
//       paddingVertical: 3,
//       paddingHorizontal: 6,
//       marginRight: 6,
//       marginBottom: 6,
//       fontSize: 8,
//     },

//     skillsContainer: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//     },

//     listItem: {
//       fontSize: 9,
//       marginBottom: 4,
//     },
//   });

//   const renderSectionHeader = (title) => (
//     <Text style={styles.sectionTitle}>{title}</Text>
//   );

//   const half = Math.ceil((sectionOrder || []).length / 2);
//   const leftSections = (sectionOrder || []).slice(0, half);
//   const rightSections = (sectionOrder || []).slice(half);

//   const renderSection = (key) => {
//     switch (key) {
//       case "summary":
//         return data.summary ? (
//           <View key="summary" style={styles.sectionWrapper}>
//             {renderSectionHeader("Summary")}
//             <Text style={styles.paragraph}>
//               {renderSafe(data.summary)}
//             </Text>
//           </View>
//         ) : null;

//       case "education":
//         return safeArray(data.education).length ? (
//           <View key="education" style={styles.sectionWrapper}>
//             {renderSectionHeader("Education")}
//             {safeArray(data.education).map((edu, i) => (
//               <View key={i} style={styles.block}>
//                 <Text style={styles.blockTitle}>
//                   {renderSafe(edu.degree)}
//                 </Text>
//                 <Text style={styles.blockSub}>
//                   {renderSafe(edu.institution)}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         ) : null;

//       case "skills":
//         return safeArray(data.skills).length ? (
//           <View key="skills" style={styles.sectionWrapper}>
//             {renderSectionHeader("Skills")}
//             <View style={styles.skillsContainer}>
//               {safeArray(data.skills).map((skill, i) => (
//                 <Text key={i} style={styles.skillBox}>
//                   {renderSafe(skill)}
//                 </Text>
//               ))}
//             </View>
//           </View>
//         ) : null;

//       case "experience":
//         return safeArray(data.experience).length ? (
//           <View key="experience" style={styles.sectionWrapper}>
//             {renderSectionHeader("Experience")}
//             {safeArray(data.experience).map((exp, i) => (
//               <View key={i} style={styles.block}>
//                 <Text style={styles.blockTitle}>
//                   {renderSafe(exp.title)}
//                 </Text>
//                 <Text style={styles.paragraph}>
//                   {renderSafe(exp.description)}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         ) : null;

//       case "projects":
//         return safeArray(data.projects).length ? (
//           <View key="projects" style={styles.sectionWrapper}>
//             {renderSectionHeader("Projects")}
//             {safeArray(data.projects).map((p, i) => (
//               <View key={i} style={styles.block}>
//                 <Text style={styles.blockTitle}>
//                   {renderSafe(p.name)}
//                 </Text>
//                 <Text style={styles.paragraph}>
//                   {renderSafe(p.description)}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         ) : null;

//       case "certifications":
//         return safeArray(data.certifications).length ? (
//           <View key="certifications" style={styles.sectionWrapper}>
//             {renderSectionHeader("Certifications")}
//             {safeArray(data.certifications).map((c, i) => (
//               <Text key={i} style={styles.listItem}>
//                 • {renderSafe(c)}
//               </Text>
//             ))}
//           </View>
//         ) : null;

//       case "achievements":
//         return safeArray(data.achievements).length ? (
//           <View key="achievements" style={styles.sectionWrapper}>
//             {renderSectionHeader("Achievements")}
//             {safeArray(data.achievements).map((a, i) => (
//               <Text key={i} style={styles.listItem}>
//                 • {renderSafe(a)}
//               </Text>
//             ))}
//           </View>
//         ) : null;

//       case "languages":
//         return safeArray(data.languages).length ? (
//           <View key="languages" style={styles.sectionWrapper}>
//             {renderSectionHeader("Languages")}
//             <Text style={styles.paragraph}>
//               {safeArray(data.languages).map(renderSafe).join(", ")}
//             </Text>
//           </View>
//         ) : null;

//       case "interests":
//         return safeArray(data.interests).length ? (
//           <View key="interests" style={styles.sectionWrapper}>
//             {renderSectionHeader("Interests")}
//             <Text style={styles.paragraph}>
//               {safeArray(data.interests).map(renderSafe).join(", ")}
//             </Text>
//           </View>
//         ) : null;

//       default:
//         return null;
//     }
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page} wrap={false}>
//         <View style={[styles.container, { transform: `scale(${scale})` }]}>

//           {/* HEADER */}
//           <View style={styles.headerWrapper}>
//             <View style={styles.headerRow}>
//               <View>
//                 <Text style={styles.name}>
//                   {renderSafe(data.name) || "Your Name"}
//                 </Text>
//                 <Text style={styles.role}>
//                   {renderSafe(data.role)}
//                 </Text>
//               </View>

//               <View style={styles.contactColumn}>
//                 {data.phone && (
//                   <Text>{renderSafe(data.phone)}</Text>
//                 )}
//                 {data.email && (
//                   <Text style={{ color: "#2563eb" }}>
//                     {renderSafe(data.email)}
//                   </Text>
//                 )}
//                 {data.location && (
//                   <Text>{renderSafe(data.location)}</Text>
//                 )}
//                 {data.linkedin && (
//                   <Link
//                     src={normalizeUrl(data.linkedin)}
//                     style={styles.link}
//                   >
//                     LinkedIn
//                   </Link>
//                 )}
//                 {data.github && (
//                   <Link
//                     src={normalizeUrl(data.github)}
//                     style={styles.link}
//                   >
//                     GitHub
//                   </Link>
//                 )}
//                 {data.portfolio && (
//                   <Link
//                     src={normalizeUrl(data.portfolio)}
//                     style={styles.link}
//                   >
//                     Portfolio
//                   </Link>
//                 )}
//               </View>
//             </View>
//           </View>

//           {/* TWO COLUMN BODY */}
//           <View style={styles.bodyRow}>
//             <View style={styles.leftCol}>
//               {leftSections.map((key) => renderSection(key))}
//             </View>
//             <View style={styles.rightCol}>
//               {rightSections.map((key) => renderSection(key))}
//             </View>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default Template1PDF;
/* eslint-disable react/prop-types */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

/* ================= AUTO SCALE ================= */

const calculateScale = (data) => {
  let weight = 0;

  weight += (data.summary?.length || 0);
  weight += (data.experience?.length || 0) * 350;
  weight += (data.projects?.length || 0) * 300;
  weight += (data.education?.length || 0) * 200;
  weight += (data.skills?.length || 0) * 60;
  weight += (data.certifications?.length || 0) * 80;
  weight += (data.achievements?.length || 0) * 120;
  weight += (data.languages?.length || 0) * 40;
  weight += (data.interests?.length || 0) * 40;

  if (weight > 6500) return 0.75;
  if (weight > 5500) return 0.82;
  if (weight > 4500) return 0.88;
  if (weight > 3500) return 0.94;
  return 1;
};

/* ================= COMPONENT ================= */

const Template1PDF = ({ resumeData, sectionOrder }) => {
  if (!resumeData) return null;

  const data = resumeData; // alias for compatibility
  const accent = data.textColor || "#0a91b2";
  const scale = calculateScale(data);

  /* ---------- SAFETY HELPERS ---------- */

  const safeArray = (v) => (Array.isArray(v) ? v : []);
  const normalizeUrl = (url) =>
    url && url.startsWith("http") ? url : `https://${url}`;

  const renderSafe = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val.name || val.title || val.degree || val.language || "";
  };

  /* ---------- DYNAMIC ROLE-BASED ORDER ---------- */

  const safeSectionOrder =
    Array.isArray(sectionOrder) && sectionOrder.length
      ? sectionOrder
      : [
          "summary",
          "experience",
          "projects",
          "skills",
          "education",
          "certifications",
          "languages",
          "interests",
          "achievements",
        ];

  const half = Math.ceil(safeSectionOrder.length / 2);
  const leftSections = safeSectionOrder.slice(0, half);
  const rightSections = safeSectionOrder.slice(half);

  /* ---------- STYLES ---------- */

  const styles = StyleSheet.create({
    page: {
      padding: 36,
      fontSize: 9,
      fontFamily: "Times-Roman",
      color: "#1f2937",
    },

    container: {
      transformOrigin: "top left",
    },

    headerWrapper: {
      borderBottomWidth: 4,
      borderBottomColor: accent,
      paddingBottom: 12,
      marginBottom: 20,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    name: {
      fontSize: 24,
      fontWeight: 800,
      color: accent,
    },

    role: {
      fontSize: 12,
      color: "#4b5563",
      marginTop: 4,
      fontWeight: 600,
    },

    contactColumn: {
      alignItems: "flex-end",
      fontSize: 8,
    },

    link: {
      color: "#2563eb",
      textDecoration: "none",
      fontSize: 8,
    },

    bodyRow: {
      flexDirection: "row",
      gap: 20,
    },

    leftCol: {
      flex: 1,
      paddingRight: 10,
    },

    rightCol: {
      flex: 1.5,
      paddingLeft: 10,
    },

    sectionWrapper: {
      marginBottom: 14,
    },

    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: accent,
      textTransform: "uppercase",
      borderBottomWidth: 2,
      borderBottomColor: accent,
      paddingBottom: 4,
      marginBottom: 6,
    },

    paragraph: {
      fontSize: 9,
      lineHeight: 1.5,
      textAlign: "justify",
    },

    block: {
      marginBottom: 8,
    },

    blockTitle: {
      fontSize: 10,
      fontWeight: 700,
    },

    blockSub: {
      fontSize: 8.5,
      color: "#4b5563",
      marginBottom: 2,
    },

    skillBox: {
      backgroundColor: "#f3f4f6",
      borderWidth: 1,
      borderColor: "#e5e7eb",
      paddingVertical: 3,
      paddingHorizontal: 6,
      marginRight: 6,
      marginBottom: 6,
      fontSize: 8,
    },

    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    listItem: {
      fontSize: 9,
      marginBottom: 4,
    },
  });

  const renderSectionHeader = (title) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const renderSection = (key) => {
    switch (key) {
      case "summary":
        return data.summary ? (
          <View key="summary" style={styles.sectionWrapper}>
            {renderSectionHeader("Summary")}
            <Text style={styles.paragraph}>
              {renderSafe(data.summary)}
            </Text>
          </View>
        ) : null;

      case "education":
        return safeArray(data.education).length ? (
          <View key="education" style={styles.sectionWrapper}>
            {renderSectionHeader("Education")}
            {safeArray(data.education).map((edu, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(edu.degree)}
                </Text>
                <Text style={styles.blockSub}>
                  {renderSafe(edu.institution)}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "skills":
        return safeArray(data.skills).length ? (
          <View key="skills" style={styles.sectionWrapper}>
            {renderSectionHeader("Skills")}
            <View style={styles.skillsContainer}>
              {safeArray(data.skills).map((skill, i) => (
                <Text key={i} style={styles.skillBox}>
                  {renderSafe(skill)}
                </Text>
              ))}
            </View>
          </View>
        ) : null;

      case "experience":
        return safeArray(data.experience).length ? (
          <View key="experience" style={styles.sectionWrapper}>
            {renderSectionHeader("Experience")}
            {safeArray(data.experience).map((exp, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(exp.title)}
                </Text>
                <Text style={styles.paragraph}>
                  {renderSafe(exp.description)}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "projects":
        return safeArray(data.projects).length ? (
          <View key="projects" style={styles.sectionWrapper}>
            {renderSectionHeader("Projects")}
            {safeArray(data.projects).map((p, i) => (
              <View key={i} style={styles.block}>
                <Text style={styles.blockTitle}>
                  {renderSafe(p.name)}
                </Text>
                <Text style={styles.paragraph}>
                  {renderSafe(p.description)}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case "certifications":
        return safeArray(data.certifications).length ? (
          <View key="certifications" style={styles.sectionWrapper}>
            {renderSectionHeader("Certifications")}
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
            {renderSectionHeader("Achievements")}
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
            {renderSectionHeader("Languages")}
            <Text style={styles.paragraph}>
              {safeArray(data.languages).map(renderSafe).join(", ")}
            </Text>
          </View>
        ) : null;

      case "interests":
        return safeArray(data.interests).length ? (
          <View key="interests" style={styles.sectionWrapper}>
            {renderSectionHeader("Interests")}
            <Text style={styles.paragraph}>
              {safeArray(data.interests).map(renderSafe).join(", ")}
            </Text>
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
          <View style={styles.headerWrapper}>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.name}>
                  {renderSafe(data.name) || "Your Name"}
                </Text>
                <Text style={styles.role}>
                  {renderSafe(data.role)}
                </Text>
              </View>

              <View style={styles.contactColumn}>
                {data.phone && <Text>{renderSafe(data.phone)}</Text>}
                {data.email && (
                  <Text style={{ color: "#2563eb" }}>
                    {renderSafe(data.email)}
                  </Text>
                )}
                {data.location && <Text>{renderSafe(data.location)}</Text>}
                {data.linkedin && (
                  <Link
                    src={normalizeUrl(data.linkedin)}
                    style={styles.link}
                  >
                    LinkedIn
                  </Link>
                )}
                {data.github && (
                  <Link
                    src={normalizeUrl(data.github)}
                    style={styles.link}
                  >
                    GitHub
                  </Link>
                )}
                {data.portfolio && (
                  <Link
                    src={normalizeUrl(data.portfolio)}
                    style={styles.link}
                  >
                    Portfolio
                  </Link>
                )}
              </View>
            </View>
          </View>

          {/* TWO COLUMN BODY */}
          <View style={styles.bodyRow}>
            <View style={styles.leftCol}>
              {leftSections.map((key) => renderSection(key))}
            </View>
            <View style={styles.rightCol}>
              {rightSections.map((key) => renderSection(key))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template1PDF;