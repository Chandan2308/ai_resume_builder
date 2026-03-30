/* eslint-disable react/prop-types */
import React from 'react';
import useSectionOrder from '../../hooks/useSectionOrder';

/**
 * SectionRenderer - Dynamically renders resume sections in role-based order.
 * 
 * Usage:
 *   <SectionRenderer 
 *     sectionComponents={{
 *       summary: summaryJSX,
 *       experience: experienceJSX,
 *       education: educationJSX,
 *       ...
 *     }}
 *   />
 * 
 * Each value in sectionComponents can be JSX or null/false.
 * Null/false sections are skipped (useful for conditional rendering).
 * The component wraps each section in a div with data-section attribute for debugging.
 */
const SectionRenderer = ({ sectionComponents, className, style }) => {
    const { renderSections } = useSectionOrder();

    if (!sectionComponents || typeof sectionComponents !== 'object') {
        return null;
    }

    return (
        <div className={className} style={style}>
            {renderSections(sectionComponents)}
        </div>
    );
};

export default SectionRenderer;