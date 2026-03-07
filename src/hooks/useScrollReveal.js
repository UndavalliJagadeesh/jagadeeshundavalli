import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-based reveal animations
 * Observes elements and adds reveal animations when they come into viewport
 */
export const useScrollReveal = () => {
    const elementsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px',
            }
        );

        // Observe all elements with reveal classes
        const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
        revealElements.forEach((el) => {
            elementsRef.current.push(el);
            observer.observe(el);
        });

        // Immediately reveal hero section
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
        if (heroVisual) {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateY(0)';
        }

        return () => {
            elementsRef.current.forEach((el) => observer.unobserve(el));
            elementsRef.current = [];
        };
    }, []);
};
