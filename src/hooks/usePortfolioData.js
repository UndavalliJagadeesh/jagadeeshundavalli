import { useState, useEffect } from 'react';
import * as fallbackData from '../data/portfolioData';

const API_URL = 'https://jagadeeshundavalli-data.vercel.app/api/data';

/**
 * Custom hook to fetch portfolio data from API with fallback to local data
 * @returns {Object} { data, loading, error }
 */
export const usePortfolioData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const jsonData = await response.json();

                // Merge API data with fallback data to ensure all fields are present
                setData({
                    header: jsonData.header || fallbackData.header,
                    about: jsonData.about || fallbackData.about,
                    sections: jsonData.sections || fallbackData.sections,
                    hero: jsonData.hero || fallbackData.hero,
                    projects: jsonData.projects || fallbackData.projects,
                    experience: jsonData.experience || fallbackData.experience,
                    contactInfo: jsonData.contactInfo || fallbackData.contactInfo,
                    socialLinks: jsonData.socialLinks || fallbackData.socialLinks,
                });
            } catch (err) {
                console.error('Failed to fetch portfolio data from API:', err);
                console.log('Falling back to local data');

                // Fallback to local data
                setData({
                    header: fallbackData.header,
                    about: fallbackData.about,
                    sections: fallbackData.sections,
                    hero: fallbackData.hero,
                    projects: fallbackData.projects,
                    experience: fallbackData.experience,
                    contactInfo: fallbackData.contactInfo,
                    socialLinks: fallbackData.socialLinks,
                });

                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
