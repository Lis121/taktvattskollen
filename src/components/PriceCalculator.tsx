'use client';

import { useState, useMemo } from 'react';
import styles from './PriceCalculator.module.css';

export default function PriceCalculator() {
    // Current Wizard Step
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

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

    // Handlers
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setArea(val);
        setInputValue(val.toString());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val > 0) {
            setArea(val);
        }
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    // Pricing Logic
    const pricing = useMemo(() => {
        if (!area) return null;

        const baseFeeExMoms = 2500;
        const pricePerSqmExMoms = 30;

        let roofMultiplier = 1.0;
        switch (roofType) {
            case 'betong': roofMultiplier = 1.0; break;
            case 'tegel': roofMultiplier = 1.15; break;
            case 'plat': roofMultiplier = 0.85; break;
            case 'papp': roofMultiplier = 0.90; break;
        }

        let mossMultiplier = 1.0;
        switch (mossLevel) {
            case 'lite': mossMultiplier = 0.90; break;
            case 'medel': mossMultiplier = 1.0; break;
            case 'mycket': mossMultiplier = 1.25; break;
        }

        const totalExMoms = (baseFeeExMoms + (area * pricePerSqmExMoms)) * roofMultiplier * mossMultiplier;
        const totalIncMoms = totalExMoms * 1.25;
        const laborCostIncMoms = totalIncMoms * 0.8;
        const rotDeduction = laborCostIncMoms * 0.3;
        const finalPrice = totalIncMoms - rotDeduction;

        return {
            originalPrice: Math.round(totalIncMoms),
            finalPrice: Math.round(finalPrice),
            rotDiscount: Math.round(rotDeduction)
        };
    }, [area, roofType, mossLevel]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        setCurrentStep(5); // Move to Success State (Past final step)

        console.log("Lead submitted:", {
            name, email, phone, zipCode,
            roofDetails: { area, roofType, mossLevel, estimatedPrice: pricing?.finalPrice }
        });
    };

    // Calculate progress percentage
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div className={styles.calculatorWrapper}>
            <div className={styles.calculatorHeader}>
                <h3>Prisuträknare & Offert</h3>
                {currentStep < 5 && (
                    <p>Fyll i uppgifterna i vår kalkylator för att se ditt uppskattade pris direkt, och få in exakta offerter från upp till 3 lokala företag var som helst i Sverige.</p>
                )}
            </div>

            {/* Wizard Progress Bar */}
            {currentStep < 5 && (
                <div className={styles.progressContainer}>
                    <div className={styles.progressBarBackground}></div>
                    <div className={styles.progressBarFill} style={{ width: `${progressPercentage}%` }}></div>
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`${styles.progressStep} ${currentStep === step ? styles.active : ''} ${currentStep > step ? styles.completed : ''}`}
                        >
                            {currentStep > step ? '✓' : step}
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.formContainer}>

                {/* Step 1: Area */}
                {currentStep === 1 && (
                    <div className={styles.wizardStep}>
                        <h4 className={styles.stepTitle}>Hur stort är taket?</h4>
                        <div className={styles.inputGroup}>
                            <div className={styles.labelRow}>
                                <label htmlFor="areaSlider" className={styles.mainLabel}>Takets markyta (m²)</label>
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

                        <div className={styles.wizardActions}>
                            <div></div> {/* Spacer */}
                            <button onClick={nextStep} className={`btn btn-primary ${styles.nextBtn}`}>
                                Fortsätt
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Roof Type */}
                {currentStep === 2 && (
                    <div className={styles.wizardStep}>
                        <h4 className={styles.stepTitle}>Vilken typ av tak har du?</h4>
                        <div className={styles.radioCardGrid}>
                            <div className={`${styles.radioCard} ${roofType === 'betong' ? styles.active : ''}`} onClick={() => setRoofType('betong')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                <div>
                                    <div className={styles.cardLabel}>Betongpannor</div>
                                </div>
                            </div>
                            <div className={`${styles.radioCard} ${roofType === 'tegel' ? styles.active : ''}`} onClick={() => setRoofType('tegel')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                <div>
                                    <div className={styles.cardLabel}>Tegelpannor</div>
                                </div>
                            </div>
                            <div className={`${styles.radioCard} ${roofType === 'plat' ? styles.active : ''}`} onClick={() => setRoofType('plat')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                                <div>
                                    <div className={styles.cardLabel}>Plåttak</div>
                                </div>
                            </div>
                            <div className={`${styles.radioCard} ${roofType === 'papp' ? styles.active : ''}`} onClick={() => setRoofType('papp')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                <div>
                                    <div className={styles.cardLabel}>Papptak / Shingel</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.wizardActions}>
                            <button onClick={prevStep} className={styles.backBtn}>Bakåt</button>
                            <button onClick={nextStep} className={`btn btn-primary ${styles.nextBtn}`}>Nästa</button>
                        </div>
                    </div>
                )}

                {/* Step 3: Moss Level */}
                {currentStep === 3 && (
                    <div className={styles.wizardStep}>
                        <h4 className={styles.stepTitle}>Hur mycket mossa har taket?</h4>
                        <div className={`${styles.radioCardGrid} ${styles.threeCols}`}>
                            <div className={`${styles.radioCard} ${mossLevel === 'lite' ? styles.active : ''}`} onClick={() => setMossLevel('lite')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                <div>
                                    <div className={styles.cardLabel}>Lite / Ytsmuts</div>
                                    <div className={styles.cardDesc}>Taket har endast tunn påväxt eller synlig ytlig smuts.</div>
                                </div>
                            </div>
                            <div className={`${styles.radioCard} ${mossLevel === 'medel' ? styles.active : ''}`} onClick={() => setMossLevel('medel')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <div>
                                    <div className={styles.cardLabel}>Medel</div>
                                    <div className={styles.cardDesc}>Tydliga mossklumpar finns lite här och var.</div>
                                </div>
                            </div>
                            <div className={`${styles.radioCard} ${mossLevel === 'mycket' ? styles.active : ''}`} onClick={() => setMossLevel('mycket')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <div>
                                    <div className={styles.cardLabel}>Mycket</div>
                                    <div className={styles.cardDesc}>Taket är under ett tjockt, heltäckande lager mossa.</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.wizardActions}>
                            <button onClick={prevStep} className={styles.backBtn}>Bakåt</button>
                            <button onClick={nextStep} className={`btn btn-primary ${styles.nextBtn}`}>Se mitt pris</button>
                        </div>
                    </div>
                )}

                {/* Step 4: Lead Form & Zillow Effect */}
                {currentStep === 4 && (
                    <div className={`${styles.wizardStep} ${styles.leadSection}`} style={{ borderTop: "none", paddingTop: 0 }}>
                        <h4 className={styles.stepTitle}>Fyll i för att se ditt pris & offerter</h4>
                        <p className={styles.leadSubtitle} style={{ textAlign: "center", marginBottom: "var(--space-6)" }}>
                            Din kalkyl är redo! För att se priset och automatiskt matcha det mot upp till 3 prisvärda, lokala taktvättsföretag behöver vi veta var du bor.
                        </p>

                        <div className={styles.trustBadges}>
                            <div className={styles.trustBadge}>
                                <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                100% Kostnadsfritt & utan köpkrav
                            </div>
                            <div className={styles.trustBadge}>
                                <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                Få exakta offerter från certifierade partners
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.leadForm}>
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

                            <div className={styles.wizardActions}>
                                <button type="button" onClick={prevStep} className={styles.backBtn}>Bakåt</button>
                                <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${styles.nextBtn}`}>
                                    {isSubmitting ? 'Beräknar...' : 'Visa mitt pris'}
                                </button>
                            </div>
                            <p className={styles.privacyNote}>Genom att klicka godkänner du våra användarvillkor. Dina uppgifter delas endast med 1 till 3 professionella företag lokalt för att ge dig offerter.</p>
                        </form>
                    </div>
                )}

                {/* Step 5: Success & Price Reveal */}
                {currentStep === 5 && pricing && isSuccess && (
                    <div className={styles.wizardStep}>
                        <div className={styles.resultDetails}>
                            <p className={styles.resultLabel}>Ditt estimerade standardpris för {area} m² tak</p>
                            <div className={styles.priceBreakdown}>
                                <div className={styles.discountBadge}>ROT-avdrag draget (-{pricing.rotDiscount.toLocaleString('sv-SE')} kr)</div>
                                <div className={styles.originalPrice}>{pricing.originalPrice.toLocaleString('sv-SE')} kr</div>
                                <div className={styles.resultPrice}>{pricing.finalPrice.toLocaleString('sv-SE')} kr</div>
                            </div>
                            <p className={styles.rotText} style={{ marginTop: "var(--space-2)" }}>Inklusive lagstadgad moms</p>
                        </div>

                        <div className={styles.successMessage}>
                            <div className={styles.successIcon}>✓</div>
                            <h4>Uppgifter mottagna!</h4>
                            <p>Tack {name.split(' ')[0] || ''}! Din kalkyl är klar och vi har skickat över ditt underlag till utvalda, seriösa taktvättare i ditt postnummer ({zipCode}).</p>
                            <p>Du kommer inom kort att bli kontaktad för att få exakta offerter. Det är helt normalt att de erbjuder en <span style={{ fontWeight: 600 }}>kostnadsfri visuell besiktning</span> av taket innan de ger sitt slutgiltiga prisförslag. Jämför sedan deras priser i lugn och ro med estimatet ovan!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
