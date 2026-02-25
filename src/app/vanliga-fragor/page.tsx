'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './faq.module.css';

interface FaqItem {
    question: string;
    answer: string;
}

const faqItems: FaqItem[] = [
    {
        question: 'Varför behöver jag tvätta mitt tak?',
        answer: 'Med tiden samlas mossa, alger och lav på taket. Dessa binder fukt mot takpannorna, vilket kan leda till frostsprängningar och förkorta takets livslängd avsevärt. En professionell taktvätt tar bort påväxten och skyddar ditt tak för många år framöver.',
    },
    {
        question: 'Hur ofta bör man tvätta taket?',
        answer: 'Det beror på klimat, omgivning och takmaterial, men generellt rekommenderas taktvätt vart 5–10 år. Bor du nära skog eller i ett fuktigt klimat kan det vara bra att ha kortare intervall.',
    },
    {
        question: 'Skadar högtryckstvätt takpannorna?',
        answer: 'Fel utförd högtryckstvätt kan skada takpannor. Professionella takvårdsföretag använder skonsamma metoder med rätt tryck och avstånd, ofta i kombination med kemisk algbehandling, för att rengöra utan att skada ytan.',
    },
    {
        question: 'Vad kostar det att tvätta taket?',
        answer: 'Priset varierar beroende på takets storlek, material och graden av påväxt. Generellt ligger priset mellan 80–150 kr per kvadratmeter. Använd gärna vår priskalkylator för att få en snabb uppskattning.',
    },
    {
        question: 'Kan jag använda ROT-avdrag?',
        answer: 'Ja, taktvätt räknas som en hushållsnära tjänst och berättigar till ROT-avdrag. Det innebär att du kan dra av 30% av arbetskostnaden (max 50 000 kr per person och år), vilket gör tjänsten betydligt billigare.',
    },
    {
        question: 'Hur lång tid tar en taktvätt?',
        answer: 'En vanlig villatvätt tar normalt mellan 1–2 dagar beroende på takets storlek och hur mycket påväxt som ska tas bort. Algbehandling efter tvätten är en snabb process som sker i direkt anslutning.',
    },
    {
        question: 'Vad är skillnaden mellan taktvätt och algbehandling?',
        answer: 'Taktvätt innebär att mossa och smuts fysiskt avlägsnas från takpannorna. Algbehandling är en kemisk behandling som appliceras efteråt för att döda kvarvarande rötter och förhindra ny påväxt under flera år.',
    },
    {
        question: 'Behöver jag vara hemma under arbetet?',
        answer: 'Nej, du behöver normalt inte vara hemma. Så länge takvårdsföretaget har tillgång till taket och vatten kan arbetet utföras utan att du behöver vara på plats. En kort genomgång innan start är dock vanligt.',
    },
    {
        question: 'Hur väljer jag rätt takvårdsföretag?',
        answer: 'Se till att företaget har relevant erfarenhet, försäkring och goda omdömen. Genom Taktvättskollen matchas du med kvalitetssäkrade företag nära dig, så du slipper göra all research själv.',
    },
    {
        question: 'Vilka takmaterial kan tvättas?',
        answer: 'De vanligaste materialen som betongtakpannor, tegelpannor, plåttak och fibercementplattor går alla att tvätta professionellt. Metoden anpassas efter materialet för att ge bästa resultat utan skador.',
    },
];

function FaqAccordion({ item, isOpen, onClick }: { item: FaqItem; isOpen: boolean; onClick: () => void }) {
    return (
        <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
            <button
                className={styles.faqQuestion}
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span>{item.question}</span>
                <svg
                    className={styles.chevron}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            <div className={styles.faqAnswer}>
                <p>{item.answer}</p>
            </div>
        </div>
    );
}

export default function VanligaFragorPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Navbar />
            <main>
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroBackground}></div>
                    <div className={`container ${styles.heroContent}`}>
                        <h1>Vanliga <span className={styles.accent}>Frågor</span></h1>
                        <p className={styles.heroSubtitle}>
                            Här hittar du svar på de vanligaste frågorna om takrengöring, algbehandling och takvård.
                        </p>
                    </div>
                </section>

                {/* FAQ */}
                <section className={`section ${styles.faqSection}`}>
                    <div className="container">
                        <div className={styles.faqContainer}>
                            {faqItems.map((item, index) => (
                                <FaqAccordion
                                    key={index}
                                    item={item}
                                    isOpen={openIndex === index}
                                    onClick={() => handleToggle(index)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <div className="container">
                        <div className={styles.ctaContent}>
                            <h2>Har du fler frågor?</h2>
                            <p>Tveka inte att kontakta oss, eller beräkna ditt pris direkt.</p>
                            <a href="/#kalkylator" className="btn btn-primary">Räkna ut pris</a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
