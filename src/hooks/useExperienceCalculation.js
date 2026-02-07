import { useState, useEffect } from 'react';

/**
 * Custom hook to calculate experience duration from a start date
 * @param {Date} startDate - The starting date for experience calculation
 * @returns {string} Formatted experience string (e.g., "1+ year and 4 months")
 */
export const useExperienceCalculation = (startDate) => {
    const [experienceText, setExperienceText] = useState('');

    useEffect(() => {
        const calculateExperience = () => {
            const now = new Date();
            const monthsDiff =
                (now.getFullYear() - startDate.getFullYear()) * 12 +
                (now.getMonth() - startDate.getMonth());

            const years = Math.floor(monthsDiff / 12);
            const months = monthsDiff % 12;

            let text = '';
            if (years > 0 && months > 0) {
                text = `${years}+ year${years > 1 ? 's' : ''} and ${months} month${months > 1 ? 's' : ''
                    }`;
            } else if (years > 0) {
                text = `${years}+ year${years > 1 ? 's' : ''}`;
            } else {
                text = `${months} month${months > 1 ? 's' : ''}`;
            }

            setExperienceText(text);
        };

        calculateExperience();
    }, [startDate]);

    return experienceText;
};
