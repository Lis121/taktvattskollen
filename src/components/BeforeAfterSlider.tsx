'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './BeforeAfterSlider.module.css';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeAlt?: string;
    afterAlt?: string;
    className?: string;
}

export default function BeforeAfterSlider({
    beforeImage,
    afterImage,
    beforeAlt = 'Före tvätt',
    afterAlt = 'Efter tvätt',
    className = '',
}: BeforeAfterSliderProps) {
    const [position, setPosition] = useState(50);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!sliderRef.current) return;
        const { left, width } = sliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - left, width));
        const percent = (x / width) * 100;
        setPosition(percent);
    }, []);

    const onMouseMove = useCallback(
        (e: MouseEvent | React.MouseEvent) => {
            handleMove(e.clientX);
        },
        [handleMove]
    );

    const onTouchMove = useCallback(
        (e: TouchEvent | React.TouchEvent) => {
            handleMove(e.touches[0].clientX);
        },
        [handleMove]
    );

    // Global event listeners for active drag to handle moving outside the container
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', () => setIsDragging(false));
            window.addEventListener('touchmove', onTouchMove, { passive: false });
            window.addEventListener('touchend', () => setIsDragging(false));
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', () => setIsDragging(false));
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', () => setIsDragging(false));
        };
    }, [isDragging, onMouseMove, onTouchMove]);

    return (
        <div
            className={`${styles.sliderContainer} ${className}`}
            ref={sliderRef}
            onMouseDown={(e) => {
                setIsDragging(true);
                onMouseMove(e);
            }}
            onTouchStart={(e) => {
                setIsDragging(true);
                onTouchMove(e);
            }}
        >
            {/* Before Image (Background) */}
            <img
                src={beforeImage}
                alt={beforeAlt}
                className={styles.imageBefore}
                draggable={false}
            />
            <div className={styles.labelBefore}>Före</div>

            {/* After Image (Foreground, Clipped) */}
            <div
                className={styles.imageAfterContainer}
                style={{ width: `${position}%` }}
            >
                <img
                    src={afterImage}
                    alt={afterAlt}
                    className={styles.imageAfter}
                    draggable={false}
                    style={{ width: sliderRef.current ? sliderRef.current.offsetWidth : '100%', maxWidth: 'none' }}
                />
            </div>
            <div
                className={styles.labelAfter}
                style={{ opacity: position > 15 ? 1 : 0, transition: 'opacity 0.2s' }}
            >
                Efter
            </div>

            {/* Draggable Handle */}
            <div
                className={styles.handle}
                style={{ left: `${position}%` }}
            >
                <div className={styles.handleButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                        <polyline points="9 18 15 12 9 6" opacity="0.5" style={{ transform: 'translateX(-4px)' }}></polyline>
                    </svg>
                </div>
            </div>
        </div>
    );
}
