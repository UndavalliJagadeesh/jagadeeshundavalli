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
                setData(jsonData);
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
