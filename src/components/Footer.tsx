import Link from 'next/link';
import { cities } from '@/lib/cities';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContent}`}>
                <div className={styles.column}>
                    <h3 className={styles.brand}>Taktvätts<span className={styles.accent}>kollen</span></h3>
                    <p className={styles.description}>
                        Vi är specialister på takrengöring och algbehandling i hela Sverige.
                        Förläng livslängden på ditt tak och få ett renare, snyggare hem.
                    </p>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Tjänster</h4>
                    <ul className={styles.links}>
                        <li><Link href="#tjanster">Takvätt</Link></li>
                        <li><Link href="#tjanster">Algbehandling</Link></li>
                        <li><Link href="#tjanster">Fasadrengöring</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Företaget</h4>
                    <ul className={styles.links}>
                        <li><Link href="#om-oss">Om Oss</Link></li>
                        <li><Link href="#garanti">Vår Garanti</Link></li>
                        <li><Link href="#faq">Vanliga Frågor</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Utvalda Orter</h4>
                    <ul className={styles.links}>
                        {cities.slice(0, 4).map(city => (
                            <li key={city.slug}>
                                <Link href={`/ort/${city.slug}`}>Takrengöring {city.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Kontakt</h4>
                    <ul className={styles.links}>
                        <li><a href="mailto:info@taktvattskollen.se">info@taktvattskollen.se</a></li>
                        <li><a href="tel:+46000000000">000 - 000 00 00</a></li>
                        <li>Sverige</li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div className="container">
                    <p>&copy; {currentYear} Taktvättskollen. Alla rättigheter förbehållna.</p>
                </div>
            </div>
        </footer>
    );
}
