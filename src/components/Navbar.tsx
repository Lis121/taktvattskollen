'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    Taktvättskollen
                </Link>

                <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
                    <ul className={styles.navLinks}>
                        <li><Link href="#tjanster" onClick={() => setIsMobileMenuOpen(false)}>Våra Tjänster</Link></li>
                        <li><Link href="#om-oss" onClick={() => setIsMobileMenuOpen(false)}>Om Oss</Link></li>
                        <li><Link href="#faq" onClick={() => setIsMobileMenuOpen(false)}>Vanliga Frågor</Link></li>
                    </ul>
                    <Link href="#kontakt" className={`btn btn-primary ${styles.ctaBtn}`} onClick={() => setIsMobileMenuOpen(false)}>
                        Få Fri Offert
                    </Link>
                </nav>

                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}></span>
                </button>
            </div>
        </header>
    );
}
