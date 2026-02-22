import { notFound } from 'next/navigation';
import { cities, getCityBySlug } from '@/lib/cities';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PriceCalculator from '@/components/PriceCalculator';
import styles from '../../page.module.css';

// This is required for static export to work with dynamic routes
export async function generateStaticParams() {
    return cities.map((c) => ({
        city: c.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
    const resolvedParams = await params;
    const cityObj = getCityBySlug(resolvedParams.city);

    if (!cityObj) {
        return {
            title: 'Taktvättskollen | Professionell Takvård',
        };
    }

    const title = `Takrengöring ${cityObj.name} | Bäst Pris & Nöjd-Kund-Garanti`;
    const description = `Professionell takrengöring, fasadtvätt och algbehandling i ${cityObj.name}. Vi gör ditt tak som nytt igen. Snabbt, miljövänligt och med ROT-avdrag. Få en fri offert!`;
    const url = `https://takrengoring.nu/ort/${cityObj.slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Taktvättskollen',
            locale: 'sv_SE',
            type: 'website',
        }
    };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const resolvedParams = await params;
    const cityObj = getCityBySlug(resolvedParams.city);

    if (!cityObj) {
        notFound();
    }

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "RoofingContractor",
        "name": `Taktvättskollen ${cityObj.name}`,
        "description": `Experter på tak- och fasadtvätt i ${cityObj.name}. Vi tar bort mossa, alger och lav.`,
        "url": `https://takrengoring.nu/ort/${cityObj.slug}`,
        "areaServed": {
            "@type": "City",
            "name": cityObj.name
        },
        "priceRange": "$$"
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Hem",
                "item": "https://takrengoring.nu/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": `Takrengöring i ${cityObj.name}`,
                "item": `https://takrengoring.nu/ort/${cityObj.slug}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Navbar />
            <main>
                {/* 1. Localized Hero Section */}
                <section className={styles.hero} style={{ minHeight: '60vh' }}>
                    <div className={styles.heroBackground}></div>
                    <div className={`container ${styles.heroContent}`}>
                        <div className={`${styles.heroText} animate-fade-in`}>
                            <h1>Takrengöring i <span style={{ color: 'var(--brand-primary)' }}>{cityObj.name}</span></h1>
                            <p>
                                Vi är dina lokala experter på takrengöring och algbehandling i {cityObj.name}.
                                Spara upp till 80% jämfört med ett takbyte och få ett resultat som håller i flera år.
                            </p>
                            <div className={styles.heroButtonGroup}>
                                <a href="#kalkylator" className="btn btn-primary">Få Prisförslag Direkt</a>
                            </div>
                        </div>

                        <div className={`${styles.heroImageWrapper} animate-fade-in delay-2`} style={{ height: '350px' }}>
                            <img
                                src="/images/hero.png"
                                alt={`Rent och fint tak på villa i ${cityObj.name}`}
                                className={styles.heroImage}
                            />
                        </div>
                    </div>
                </section>

                {/* 2. Standardized Local Value Proposition with Semantic LSI Keywords */}
                <section className={`${styles.servicesSection} section`}>
                    <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                        <h2 style={{ marginBottom: '1rem' }}>Varför tvätta taket och fasaden i {cityObj.name}?</h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Klimatet i och omkring {cityObj.name} utsätter hustak och fasader för stora påfrestningar året runt.
                            Mossa, alger och lav binder fukt mot takpannorna vilket i värsta fall kan leda till svåra frostsprängningar
                            under vinterhalvåret. Genom en professionell taktvätt, skonsam fasadtvätt och långtidsverkande alg- och mossborttagning
                            skyddar du din fastighets värde på sikt. Boka en lokal expert idag!
                        </p>
                    </div>
                </section>

                {/* 3. The API Placeholder Section (To be populated programmatically later) */}
                <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-8) 0' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-2)' }}>Våra senaste uppdrag i {cityObj.name}</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Här visar vi snart riktiga exempel och lokala omdömen från grannskapet via vårt API.</p>
                        </div>

                        {/* Fake API Data Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: 'var(--space-6)',
                            opacity: 0.7,
                            filter: 'grayscale(50%)'
                        }}>
                            {[1, 2, 3].map((item) => (
                                <div key={item} style={{
                                    background: 'var(--bg-primary)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: 'var(--space-6)',
                                    border: '1px dashed var(--border-color)',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--brand-primary)', margin: '0 auto var(--space-4)', opacity: 0.2 }}></div>
                                    <div style={{ height: '16px', width: '60%', background: 'var(--border-color)', margin: '0 auto var(--space-2)', borderRadius: '4px' }}></div>
                                    <div style={{ height: '12px', width: '80%', background: 'var(--border-color)', margin: '0 auto', borderRadius: '4px' }}></div>
                                    <p style={{ fontSize: '0.75rem', marginTop: 'var(--space-4)', color: 'var(--brand-primary)', fontWeight: 'bold' }}>[API DATA PLACEHOLDER]</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. The Interactive Price Calculator CTA */}
                <section id="kalkylator" className={styles.ctaSection}>
                    <div className="container">
                        <div className={styles.ctaContent}>
                            <h2>Räkna ut pris för {cityObj.name}</h2>
                            <p>Använd vår priskalkylator för att se vad det kostar att få taket rent just nu.</p>

                            <div style={{ marginTop: '2rem' }}>
                                <PriceCalculator />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
