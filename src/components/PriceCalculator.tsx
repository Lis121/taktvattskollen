'use client';

import { useState, useMemo } from 'react';
import styles from './PriceCalculator.module.css';

export default function PriceCalculator() {
    // Calculator State
    const [area, setArea] = useState<number>(80);
    const [inputValue, setInputValue] = useState<string>('80');
    const [roofType, setRoofType] = useState('betong');
    const [mossLevel, setMossLevel] = useState('lite');

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Handles the slider
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setArea(val);
        setInputValue(val.toString());
        setIsSuccess(false); // Reset success state if they change parameters
    };

    // Handles the exact number input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val > 0) {
            setArea(val);
            setIsSuccess(false);
        }
    };

    const estimatedPrice = useMemo(() => {
        if (!area) return null;

        // Taktvätt baspris (Enligt svenskt snitt 2026)
        const baseFeeExMoms = 2500;
        const pricePerSqmExMoms = 30;

        // Taktyp multiplier
        let roofMultiplier = 1.0;
        switch (roofType) {
            case 'betong': roofMultiplier = 1.0; break;
            case 'tegel': roofMultiplier = 1.15; break;
            case 'plat': roofMultiplier = 0.85; break;
            case 'papp': roofMultiplier = 0.90; break;
        }

        // Mossa multiplier (Hur mycket mossa)
        let mossMultiplier = 1.0;
        switch (mossLevel) {
            case 'lite': mossMultiplier = 0.90; break;
            case 'medel': mossMultiplier = 1.0; break;
            case 'mycket': mossMultiplier = 1.25; break;
        }

        // Beräkna total ex moms
        const totalExMoms = (baseFeeExMoms + (area * pricePerSqmExMoms)) * roofMultiplier * mossMultiplier;

        // Inkl moms (25%)
        const totalIncMoms = totalExMoms * 1.25;

        // ROT Avdrag: 30% på arbetskostnaden. Antar 80% är arbetskostnad.
        const laborCostIncMoms = totalIncMoms * 0.8;
        const rotDeduction = laborCostIncMoms * 0.3;

        const finalPrice = totalIncMoms - rotDeduction;

        return Math.round(finalPrice);
    }, [area, roofType, mossLevel]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call to submit lead
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Setup simple state transition
        setIsSubmitting(false);
        setIsSuccess(true);

        // Log the payload that would be sent to a backend
        console.log("Lead submitted:", {
            name, email, phone, zipCode,
            roofDetails: { area, roofType, mossLevel, estimatedPrice }
        });
    };

    return (
        <div className={styles.calculatorWrapper}>
            <div className={styles.calculatorHeader}>
                <h3>Prisuträknare & Offert</h3>
                <p>Få ett direkt prisestimat inklusive ROT-avdrag. Kalkylen utgår från ett grundpris, och anpassas efter exakt yta. Fyll i uppgifterna nedan för att få exakta offerter från upp till 3 lokala företag.</p>
            </div>

            <div className={styles.formContainer}>
                {/* Steg 1: Kalkylatorn */}
                <div className={styles.calcSection}>
                    <div className={styles.sectionTitle}>1. Uppgifter om taket</div>

                    {/* Yta med Dragmätare + Text */}
                    <div className={styles.inputGroup}>
                        <div className={styles.labelRow}>
                            <label htmlFor="areaSlider" className={styles.mainLabel}>Takets yta (m²)</label>
                            <div className={styles.numberInputWrapper}>
                                <input
                                    type="number"
                                    id="areaInput"
                                    min="10"
                                    max="1000"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className={`${styles.input} ${styles.smallNumberInput}`}
                                />
                                <span className={styles.unitSuffix}>m²</span>
                            </div>
                        </div>

                        <input
                            type="range"
                            id="areaSlider"
                            min="10"
                            max="300"
                            step="5"
                            value={Math.min(area, 300)}
                            onChange={handleSliderChange}
                            className={styles.rangeSlider}
                        />
                        <div className={styles.sliderLabels}>
                            <span>10 m²</span>
                            <span className={styles.currentValue}>{area} m²</span>
                            <span>300+ m²</span>
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        {/* Mängd mossa */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="mossLevel">Hur mycket mossa?</label>
                            <select
                                id="mossLevel"
                                value={mossLevel}
                                onChange={(e) => {
                                    setMossLevel(e.target.value);
                                    setIsSuccess(false);
                                }}
                                className={styles.input}
                            >
                                <option value="lite">Lite / Endast ytlig smuts</option>
                                <option value="medel">Medel (Tydliga mossklumpar)</option>
                                <option value="mycket">Mycket (Taket lokalt täckt)</option>
                            </select>
                        </div>

                        {/* Typ av tak */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="roofType">Typ av tak</label>
                            <select
                                id="roofType"
                                value={roofType}
                                onChange={(e) => {
                                    setRoofType(e.target.value);
                                    setIsSuccess(false);
                                }}
                                className={styles.input}
                            >
                                <option value="betong">Betongpannor</option>
                                <option value="tegel">Tegelpannor</option>
                                <option value="plat">Plåttak</option>
                                <option value="papp">Papptak / Shingel</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Steg 2: Resultat & Formulär */}
                {estimatedPrice !== null && (
                    <div className={styles.leadSection}>
                        <div className={styles.resultDetails}>
                            <span className={styles.resultLabel}>Ditt uppskattade standardpris:</span>
                            <span className={styles.resultPrice}>{estimatedPrice.toLocaleString('sv-SE')} kr</span>
                            <span className={styles.rotText}>Inklusive ROT-avdrag och moms</span>
                        </div>

                        {!isSuccess ? (
                            <form onSubmit={handleSubmit} className={styles.leadForm}>
                                <div className={styles.sectionTitle}>2. Jämför riktiga offerter (Gratis)</div>
                                <p className={styles.leadSubtitle}>
                                    Fyll i formuläret för att bli kontaktad av upp till 3 noggrant utvalda taktvättsföretag i ditt närområde. De ger dig en exakt offert (ofta efter en kostnadsfri besiktning) att jämföra med prisestimatet ovan. Tjänsten är 100% kostnadsfri.
                                </p>

                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="name">För- och efternamn</label>
                                        <input type="text" id="name" required value={name} onChange={e => setName(e.target.value)} className={styles.input} placeholder="T.ex. Anna Svensson" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="zipCode">Postnummer</label>
                                        <input type="text" id="zipCode" required value={zipCode} onChange={e => setZipCode(e.target.value)} className={styles.input} placeholder="T.ex. 123 45" />
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="email">E-postadress</label>
                                        <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className={styles.input} placeholder="anna@exempel.se" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="phone">Telefonnummer</label>
                                        <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className={styles.input} placeholder="070 123 45 67" />
                                    </div>
                                </div>

                                <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${styles.calcBtn} ${styles.mobileLargeBtn}`}>
                                    {isSubmitting ? 'Skickar förfrågan...' : 'Få upp till 3 gratis offerter'}
                                </button>
                                <p className={styles.privacyNote}>Genom att klicka godkänner du våra användarvillkor. Dina uppgifter delas endast med kopplade professionella företag för att ge dig offerter.</p>
                            </form>
                        ) : (
                            <div className={styles.successMessage}>
                                <div className={styles.successIcon}>✓</div>
                                <h4>Förfrågan skickad!</h4>
                                <p>Tack {name.split(' ')[0] || 'för din förfrågan'}! Vi har tagit emot dina uppgifter och matchar just nu ditt tak ({area} m²) med upp till 3 certifierade företag i ditt område.</p>
                                <p>De kommer att kontakta dig inom kort för att ge en exakt offert, som du enkelt kan jämföra med vår snittberäkning (ca {estimatedPrice.toLocaleString('sv-SE')} kr).</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
