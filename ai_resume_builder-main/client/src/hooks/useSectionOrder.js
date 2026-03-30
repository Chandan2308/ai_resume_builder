import { useMemo } from 'react';
import { useResume } from '../context/ResumeContext';

/**
 * Custom hook that returns the section order based on the current resume mode.
 * Templates use this to dynamically render sections in the role-appropriate order.
 * 
 * @returns {Object} { sectionOrder, resumeMode, renderSections }
 *   - sectionOrder: string[] — ordered list of section keys
 *   - resumeMode: string — current mode (e.g., 'fresher', 'experienced')
 *   - renderSections: (sectionMap) => JSX[] — renders sections in order from a key→JSX map
 */
const useSectionOrder = () => {
    const { resumeData, getSectionOrder, ROLE_SECTION_ORDER } = useResume();

    const resumeMode = resumeData?.resumeMode || 'custom';

    // Memoize the section order so templates only re-render when mode changes
    const sectionOrder = useMemo(() => {
        return getSectionOrder();
    }, [resumeMode, getSectionOrder]);

    /**
     * Given a map of section keys to JSX elements, renders them in the correct order.
     * Skips sections not present in the map (e.g., if a template doesn't support that section).
     * 
     * @param {Object} sectionMap - e.g. { summary: <SummaryJSX />, experience: <ExperienceJSX /> }
     * @returns {JSX.Element[]}
     */
    const renderSections = (sectionMap) => {
        return sectionOrder
            .filter((key) => sectionMap[key] !== undefined && sectionMap[key] !== null)
            .map((key) => (
                <div key={key} data-section={key}>
                    {sectionMap[key]}
                </div>
            ));
    };

    return {
        sectionOrder,
        resumeMode,
        renderSections,
        ROLE_SECTION_ORDER,
    };
};

export default useSectionOrder;