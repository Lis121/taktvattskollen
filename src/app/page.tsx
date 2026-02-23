'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import PriceCalculator from '@/components/PriceCalculator';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './page.module.css';
import reviewStyles from './reviews.module.css';

function FadeUpSection({ children, className = '', style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div
      ref={ref as any}
      className={`fade-up-element ${isIntersecting ? 'visible' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);

  // Parallax effect for the hero background
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          {/* Parallax Background */}
          <div
            className={styles.heroBackground}
            style={{ transform: `translateY(${offsetY * 0.4}px)` }}
          ></div>

          <div className={`container ${styles.heroContent}`}>
            <div className={`${styles.heroText} animate-fade-in`}>
              <h1>Gör ditt tak som nytt igen</h1>
              <p>
                Specialister på professionell takrengöring och algbehandling i hela Sverige.
                Öka livslängden på ditt tak upp till 15 år och förbättra husets helhetsintryck direkt.
              </p>
              <div className={styles.heroButtonGroup}>
                <a href="#kalkylator" className="btn btn-primary">Räkna ut pris</a>
                <a href="#tjanster" className="btn btn-secondary">Våra Tjänster</a>
              </div>
            </div>

            <div className={`${styles.heroImageWrapper} animate-fade-in delay-2`}>
              <img
                src="/images/hero.png"
                alt="Rent och fint tak på svensk villa"
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="tjanster" className={`${styles.servicesSection} section`}>
          <div className="container">
            <FadeUpSection className={styles.sectionHeader}>
              <h2>Våra Tjänster</h2>
              <p>Vi erbjuder en komplett lösning för ditt tak som motverkar påväxt och fuktskador.</p>
            </FadeUpSection>

            <div className={styles.servicesGrid}>
              <FadeUpSection className="delay-1">
                <div className={styles.serviceCard}>
                  <div className={styles.iconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                  </div>
                  <h3>Mekanisk Takvätt</h3>
                  <p>Skonsam tvätt som effektivt avlägsnar tjock mossa, lavar och ytsmuts från dina takpannor utan att skada ytskiktet.</p>
                  <a href="#kalkylator" className={styles.serviceLink}>
                    Få prisförslag <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </FadeUpSection>

              <FadeUpSection className="delay-2">
                <div className={styles.serviceCard}>
                  <div className={styles.iconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                  </div>
                  <h3>Anti-Algbehandling</h3>
                  <p>Långtidsverkande kemisk behandling som dödar rötterna på påväxten så att taket håller sig rent och snyggt i flera år.</p>
                  <a href="#kalkylator" className={styles.serviceLink}>
                    Få prisförslag <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </FadeUpSection>

              <FadeUpSection className="delay-3">
                <div className={styles.serviceCard}>
                  <div className={styles.iconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                  </div>
                  <h3>Fasad- & Tralltvätt</h3>
                  <p>Passa på att ge hela huset ett lyft när vi ändå är på plats. Vi rengör både fasad och altan för ett perfekt helhetsintryck.</p>
                  <a href="#kalkylator" className={styles.serviceLink}>
                    Få prisförslag <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </FadeUpSection>
            </div>
          </div>
        </section>

        {/* Features/Why Us - with Slider */}
        <section id="om-oss" className={`${styles.featuresSection} section`}>
          <div className={`container ${styles.featuresContainer}`}>
            <FadeUpSection>
              <h2>Se skillnaden med egna ögon</h2>
              <p>Ett rent tak handlar inte bara om utseende, det handlar om att skydda en av husets viktigaste delar från fukt och röta.</p>

              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Ekonomiskt smart</h4>
                    <p>Att tvätta och behandla taket med vår metod är upp till 80% billigare än att byta hela taket.</p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Långtidsverkande skydd</h4>
                    <p>Vår algbehandling hindrar ny påväxt från att etablera sig under flera års tid.</p>
                  </div>
                </div>
              </div>
            </FadeUpSection>

            <FadeUpSection className="delay-2">
              <BeforeAfterSlider
                beforeImage="/images/before.png"
                afterImage="/images/after.png"
              />
            </FadeUpSection>
          </div>
        </section>

        {/* Reviews Section */}
        <section className={reviewStyles.reviewsSection}>
          <div className="container">
            <FadeUpSection className={reviewStyles.sectionHeader}>
              <h2>Vad våra kunder säger</h2>
              <p>Vi är stolta över att ha hundratals nöjda kunder runt om i Sverige.</p>
            </FadeUpSection>

            <div className={reviewStyles.reviewsGrid}>
              <FadeUpSection className="delay-1">
                <div className={reviewStyles.reviewCard}>
                  <div className={reviewStyles.stars}>
                    {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                  </div>
                  <div className={reviewStyles.quote}>
                    <p className={reviewStyles.quoteText}>Helt otroligt resultat! Taket ser bokstavligen ut som nytt igen. Killarna var snabba, trevliga och städade exemplariskt efter sig.</p>
                  </div>
                  <div className={reviewStyles.author}>
                    <div className={reviewStyles.avatar}>M</div>
                    <div className={reviewStyles.authorInfo}>
                      <h4>Mikael S.</h4>
                      <span>Villaägare, Stockholm</span>
                    </div>
                  </div>
                </div>
              </FadeUpSection>

              <FadeUpSection className="delay-2">
                <div className={reviewStyles.reviewCard}>
                  <div className={reviewStyles.stars}>
                    {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                  </div>
                  <div className={reviewStyles.quote}>
                    <p className={reviewStyles.quoteText}>Fick en offert snabbt och de kunde boka in arbetet redan nästa vecka. Blev varnad av grannar om att högtryckstvätt förstör pannorna, men Taktvättskollen har en skonsam metod som fungerade perfekt.</p>
                  </div>
                  <div className={reviewStyles.author}>
                    <div className={reviewStyles.avatar}>A</div>
                    <div className={reviewStyles.authorInfo}>
                      <h4>Anna L.</h4>
                      <span>Radhus, Göteborg</span>
                    </div>
                  </div>
                </div>
              </FadeUpSection>

              <FadeUpSection className="delay-3">
                <div className={reviewStyles.reviewCard}>
                  <div className={reviewStyles.stars}>
                    {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                  </div>
                  <div className={reviewStyles.quote}>
                    <p className={reviewStyles.quoteText}>Bästa investeringen vi gjort för huset på länge. ROT-avdraget skötte de automatiskt på fakturan vilket gjorde det hela otroligt smidigt.</p>
                  </div>
                  <div className={reviewStyles.author}>
                    <div className={reviewStyles.avatar}>J</div>
                    <div className={reviewStyles.authorInfo}>
                      <h4>Johan P.</h4>
                      <span>Villaägare, Malmö</span>
                    </div>
                  </div>
                </div>
              </FadeUpSection>
            </div>
          </div>
        </section>

        {/* Calculator / CTA Section */}
        <section id="kalkylator" className={styles.ctaSection}>
          <div className="container">
            <FadeUpSection className={styles.ctaContent}>
              <h2>Redo att ge taket nytt liv?</h2>
              <p>Räkna ut ett uppskattat pris direkt här nedan, eller skicka in en förfrågan för en gratis besiktning.</p>

              <div style={{ marginTop: '2rem' }}>
                <PriceCalculator />
              </div>
            </FadeUpSection>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
