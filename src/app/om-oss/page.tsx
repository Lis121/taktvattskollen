import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './om-oss.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Om Oss | Taktvättskollen',
    description: 'Läs mer om Taktvättskollen – din pålitliga partner för professionell takrengöring och algbehandling i hela Sverige.',
    alternates: {
        canonical: 'https://taktvattskollen.se/om-oss',
    },
};

export default function OmOssPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroBackground}></div>
                    <div className={`container ${styles.heroContent}`}>
                        <h1>Om <span className={styles.accent}>Taktvättskollen</span></h1>
                        <p className={styles.heroSubtitle}>
                            Vi gör det enkelt att hitta rätt takvårdsexpert – oavsett var i Sverige du bor.
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section className={`section ${styles.contentSection}`}>
                    <div className={`container ${styles.contentGrid}`}>
                        <div className={styles.contentText}>
                            <h2>Vår Mission</h2>
                            <p>
                                Taktvättskollen grundades med en enkel idé: att göra det smidigt och tryggt för husägare att ta hand om sina tak.
                                Vi vet att det kan vara svårt att hitta pålitliga och certifierade takvårdsexperter, särskilt när man inte vet var man ska börja.
                            </p>
                            <p>
                                Därför skapade vi en plattform som gör hela processen enklare – från prisuppskattning till att hitta rätt företag i just din ort.
                                Vårt mål är att varje husägare ska kunna förlänga livslängden på sitt tak utan krångel.
                            </p>
                        </div>
                        <div className={styles.statsCard}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>21+</span>
                                <span className={styles.statLabel}>Orter i Sverige</span>
                            </div>
                            <div className={styles.statDivider}></div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>100%</span>
                                <span className={styles.statLabel}>Kostnadsfria offerter</span>
                            </div>
                            <div className={styles.statDivider}></div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>15 år</span>
                                <span className={styles.statLabel}>Förlängd livslängd</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className={`section ${styles.valuesSection}`}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>Vad vi står för</h2>
                        <div className={styles.valuesGrid}>
                            <div className={styles.valueCard}>
                                <div className={styles.valueIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                </div>
                                <h3>Trygghet</h3>
                                <p>Vi förmedlar enbart kontrollerade och erfarna taktvättsföretag, så att du kan känna dig säker genom hela processen.</p>
                            </div>

                            <div className={styles.valueCard}>
                                <div className={styles.valueIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                                </div>
                                <h3>Enkelhet</h3>
                                <p>Vår priskalkylatorn ger dig en snabb uppskattning direkt på webben – helt utan förpliktelser eller dolda kostnader.</p>
                            </div>

                            <div className={styles.valueCard}>
                                <div className={styles.valueIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                </div>
                                <h3>Kunskap</h3>
                                <p>Vi delar med oss av tips och information om takvård, så att du som husägare kan fatta välgrundade beslut.</p>
                            </div>

                            <div className={styles.valueCard}>
                                <div className={styles.valueIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>
                                </div>
                                <h3>Miljömedvetenhet</h3>
                                <p>Vi förespråkar skonsamma och miljövänliga metoder som skyddar både ditt tak och naturen runt omkring.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className={`section ${styles.processSection}`}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>Så fungerar det</h2>
                        <div className={styles.processGrid}>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>1</div>
                                <h3>Beräkna pris</h3>
                                <p>Använd vår smarta priskalkylator för att se ett uppskattat pris baserat på din takyta och taktyp.</p>
                            </div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>2</div>
                                <h3>Få offert</h3>
                                <p>Skicka din förfrågan och bli matchad med kvalificerade takvårdsexperter nära dig.</p>
                            </div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>3</div>
                                <h3>Njut av resultatet</h3>
                                <p>Välj det erbjudande som passar dig bäst och få ett tak som ser ut som nytt – med garanti.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <div className="container">
                        <div className={styles.ctaContent}>
                            <h2>Redo att ge ditt tak nytt liv?</h2>
                            <p>Beräkna pris direkt med vår kostnadsfria kalkylator.</p>
                            <a href="/#kalkylator" className="btn btn-primary">Räkna ut pris</a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
