'use client';

import { useEffect, useState, useRef } from 'react';

export function useIntersectionObserver(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            // Once it becomes visible, we keep it visible to avoid animation restarting
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                observer.unobserve(element);
            }
        }, {
            rootMargin: '0px',
            threshold: 0.1,
            ...options
        });

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options]);

    return [elementRef, isIntersecting] as const;
}
