'use client';

import { useState, useMemo } from 'react';
import styles from './PriceCalculator.module.css';

export default function PriceCalculator() {
    // Current Wizard Step
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    // Calculator State
    const [area, setArea] = useState<number>(80);
    const [inputValue, setInputValue] = useState<string>('80');
    const [roofType, setRoofType] = useState('betong');
    const [mossLevel, setMossLevel] = useState('lite');

    // Form State
    const [formPhase, setFormPhase] = useState<1 | 2>(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [stories, setStories] = useState('1 plan');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [leadId, setLeadId] = useState<string | null>(null);

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

        let pricePerSqm = 84; // default medel
        switch (mossLevel) {
            case 'lite': pricePerSqm = 71; break;
            case 'medel': pricePerSqm = 84; break;
            case 'mycket': pricePerSqm = 92; break;
        }

        const totalExMoms = area * pricePerSqm;
        const laborCostExMoms = totalExMoms * 0.8;
        const rotDeduction = laborCostExMoms * 0.3;
        const finalPrice = totalExMoms - rotDeduction;

        return {
            originalPrice: Math.round(totalExMoms),
            finalPrice: Math.round(finalPrice),
            rotDiscount: Math.round(rotDeduction),
            rangeMin: Math.round(totalExMoms * 0.85),
            rangeMax: Math.round(totalExMoms * 1.15)
        };
    }, [area, mossLevel]);

    const handlePhase1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormPhase(2);
    };

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://alstras.pages.dev/api/public/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    project_id: "ddaa17ca-0d74-4394-9a22-a6ff4a8e249f", // Taktvättskollens Projekt-ID
                    customer_data: {
                        name,
                        email,
                        phone,
                        street_address: streetAddress,
                        zip_code: zipCode,
                        service: "Taktvätt",
                        message: `Takarea: ${area} m²\nTaktyp: ${roofType}\nMossa: ${mossLevel}\nVåningar: ${stories}\nUppskattat pris: ${pricing?.finalPrice} kr`,
                        area: `${area} m²`,
                        roof_type: roofType,
                        moss_level: mossLevel,
                        stories: stories,
                        estimated_price: pricing?.finalPrice
                    },
                    page_id: "price-calculator"
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                console.log("Success:", result.message);
                if (result.id) {
                    setLeadId(result.id);
                }
                setIsSuccess(true);
                setCurrentStep(6); // Move to Success State (Past final step)
            } else {
                console.error("API Error:", result.message);
                alert("Ett fel uppstod när offertförfrågan skickades. Vänligen försök igen.");
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Nätverksfel. Kontrollera din uppkoppling och försök igen.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).slice(0, 2); // Max 2 images
            setSelectedFiles(prev => [...prev, ...filesArray].slice(0, 2));
        }
    };

    const uploadImages = async () => {
        if (selectedFiles.length === 0) return;
        if (!leadId) {
            alert("Kunde inte hitta ditt lead. Vänligen kontakta oss via mail om du har bilder du vill dela.");
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            selectedFiles.forEach(file => {
                formData.append('files', file);
            });

            const response = await fetch(`https://alstras.pages.dev/api/public/leads/${leadId}/images`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok && result?.success) {
                alert("Bilder uppladdade! Tack.");
                setSelectedFiles([]);
            } else {
                console.error("API Error:", result?.message);
                alert("Ett fel uppstod vid uppladdning av bilderna. Försök igen.");
            }
        } catch (error) {
            console.error("Upload Error:", error);
            alert("Det gick inte att ladda upp bilderna. Försök igen.");
        } finally {
            setIsUploading(false);
        }
    };

    // Calculate progress percentage
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div className={styles.calculatorWrapper}>
            <div className={styles.calculatorHeader}>
                <h3>Prisuträknare & Offert</h3>
                {currentStep < 6 && (
                    <p>Fyll i uppgifterna i vår kalkylator för att se ditt uppskattade pris direkt och få in exakta offerter från upp till 3 lokala företag var som helst i Sverige.</p>
                )}
            </div>

            {/* Wizard Progress Bar */}
            {currentStep < 6 && (
                <div className={styles.progressContainer}>
                    <div className={styles.progressBarBackground}></div>
                    <div className={styles.progressBarFill} style={{ width: `${progressPercentage}%` }}></div>
                    {[1, 2, 3, 4, 5].map((step) => (
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
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    {/* Betongpanna: Dubbla böjda linjer som symboliserar profilen */}
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 14c2.5-3 5.5-3 8 0s5.5 3 8 0M4 10c2.5-3 5.5-3 8 0s5.5 3 8 0" />
                                </svg>
                                <div>
                                    <div className={styles.cardLabel}>Betongpannor</div>
                                </div>
                            </div>
                            <div className={`${styles.radioCard} ${roofType === 'tegel' ? styles.active : ''}`} onClick={() => setRoofType('tegel')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    {/* Tegelpanna: Klassiskt V-format mönster / skålform */}
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15c3-4 6-4 9 0s6 4 9 0M7 8c2.5-3 4.5-3 7 0" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V8" />
                                </svg>
                                <div>
                                    <div className={styles.cardLabel}>Tegelpannor</div>
                                </div>
                            </div>
                            <div className={`${styles.radioCard} ${roofType === 'plat' ? styles.active : ''}`} onClick={() => setRoofType('plat')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    {/* Plåttak: Raka falsar / linjer uppåt */}
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 18l4-12m4 12l4-12m4 12L16 6" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 18h20" />
                                </svg>
                                <div>
                                    <div className={styles.cardLabel}>Plåttak</div>
                                </div>
                            </div>
                            <div className={`${styles.radioCard} ${roofType === 'papp' ? styles.active : ''}`} onClick={() => setRoofType('papp')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    {/* Papptak / Shingel: Överlappande rektanglar / struktur */}
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M7 10v4M17 10v4M12 6v4M12 14v4" />
                                </svg>
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
                            <button onClick={nextStep} className={`btn btn-primary ${styles.nextBtn}`}>Nästa</button>
                        </div>
                    </div>
                )}

                {/* Step 4: House Height */}
                {currentStep === 4 && (
                    <div className={styles.wizardStep}>
                        <h4 className={styles.stepTitle}>Hur många våningar har huset?</h4>
                        <div className={`${styles.radioCardGrid} ${styles.threeCols}`}>
                            <div className={`${styles.radioCard} ${stories === '1 plan' ? styles.active : ''}`} onClick={() => setStories('1 plan')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
                                </svg>
                                <div>
                                    <div className={styles.cardLabel}>1 plan</div>
                                </div>
                            </div>
                            <div className={`${styles.radioCard} ${stories === '1,5 plan' ? styles.active : ''}`} onClick={() => setStories('1,5 plan')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 9h4" />
                                </svg>
                                <div>
                                    <div className={styles.cardLabel}>1,5 plan</div>
                                </div>
                            </div>
                            <div className={`${styles.radioCard} ${stories === '2+ plan' ? styles.active : ''}`} onClick={() => setStories('2+ plan')}>
                                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 21v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6M9 11h6" />
                                </svg>
                                <div>
                                    <div className={styles.cardLabel}>2+ plan</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.wizardActions}>
                            <button onClick={prevStep} className={styles.backBtn}>Bakåt</button>
                            <button onClick={nextStep} className={`btn btn-primary ${styles.nextBtn}`}>Se mitt pris</button>
                        </div>
                    </div>
                )}

                {/* Step 5: Lead Form & Zillow Effect */}
                {currentStep === 5 && (
                    <div className={`${styles.wizardStep} ${styles.leadSection}`} style={{ borderTop: "none", paddingTop: 0 }}>
                        <h4 className={styles.stepTitle}>Fyll i för att se ditt pris & offerter</h4>
                        <p className={styles.leadSubtitle} style={{ textAlign: "center", marginBottom: "var(--space-6)" }}>
                            {pricing ? (
                                <>Ett tak på {area} m² kostar vanligtvis mellan <strong>{pricing.rangeMin.toLocaleString('sv-SE')} och {pricing.rangeMax.toLocaleString('sv-SE')} kr</strong> (före ROT).</>
                            ) : (
                                "Din kalkyl är redo!"
                            )}
                            <br /><br />
                            Fyll i var du bor för att se ditt <strong>exakta pris</strong> inklusive ROT-avdrag och matchas med upp till 3 prisvärda lokala experter.
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

                        {formPhase === 1 ? (
                            <form onSubmit={handlePhase1Submit} className={styles.leadForm}>
                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="streetAddress">Gatuadress</label>
                                        <input type="text" id="streetAddress" required value={streetAddress} onChange={e => setStreetAddress(e.target.value)} className={styles.input} placeholder="T.ex. Storgatan 1" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="zipCode">Postnummer</label>
                                        <input type="text" id="zipCode" inputMode="numeric" pattern="[0-9]{3}\s?[0-9]{2}" required value={zipCode} onChange={e => setZipCode(e.target.value)} className={styles.input} placeholder="T.ex. 123 45" />
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="email">E-postadress</label>
                                        <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} className={styles.input} placeholder="anna@exempel.se" />
                                    </div>
                                </div>

                                <div className={styles.wizardActions}>
                                    <button type="button" onClick={prevStep} className={styles.backBtn}>Bakåt</button>
                                    <button type="submit" className={`btn btn-primary ${styles.nextBtn}`}>Fortsätt</button>
                                </div>
                                <p className={styles.privacyNote}>Vi delar endast dina uppgifter med upp till 3 bäst matchade företag i ditt postnummer. Ingen spam.</p>
                            </form>
                        ) : (
                            <form onSubmit={handleFinalSubmit} className={styles.leadForm}>
                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="name">För- och efternamn</label>
                                        <input type="text" id="name" required value={name} onChange={e => setName(e.target.value)} className={styles.input} placeholder="T.ex. Anna Svensson" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="phone">Telefonnummer <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)' }}>(Valfritt)</span></label>
                                        <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className={styles.input} placeholder="070 123 45 67" />
                                    </div>
                                </div>

                                <div className={styles.wizardActions}>
                                    <button type="button" onClick={() => setFormPhase(1)} className={styles.backBtn}>Bakåt</button>
                                    <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${styles.nextBtn}`}>
                                        {isSubmitting ? 'Beräknar...' : 'Se mitt exakta pris'}
                                    </button>
                                </div>
                                <p className={styles.privacyNote}>Ett telefonnummer gör det lättare för företagen att snabbt återkoppla med en skriftlig offert. Genom att klicka godkänner du våra användarvillkor.</p>
                            </form>
                        )}
                    </div>
                )}

                {/* Step 6: Success & Price Reveal */}
                {currentStep === 6 && pricing && isSuccess && (
                    <div className={styles.wizardStep}>
                        <div className={styles.resultDetails}>
                            <p className={styles.resultLabel}>Ditt estimerade standardpris för {area} m² tak</p>
                            <div className={styles.priceBreakdown}>
                                <div className={styles.discountBadge}>ROT-avdrag draget (-{pricing.rotDiscount.toLocaleString('sv-SE')} kr)</div>
                                <div className={styles.originalPrice}>{pricing.originalPrice.toLocaleString('sv-SE')} kr</div>
                                <div className={styles.resultPrice}>{pricing.finalPrice.toLocaleString('sv-SE')} kr</div>
                            </div>
                            <p className={styles.rotText} style={{ marginTop: "var(--space-2)" }}>Exklusive moms</p>
                        </div>

                        <div className={styles.successMessage}>
                            <div className={styles.successIcon}>✓</div>
                            <h4>Uppgifter mottagna!</h4>
                            <p>Tack {name.split(' ')[0] || ''}! Din kalkyl är klar och vi har skickat över ditt underlag till utvalda, seriösa taktvättare i ditt postnummer ({zipCode}).</p>
                            <p>Du kommer inom kort att bli kontaktad för att få exakta offerter. Det är helt normalt att de erbjuder en <span style={{ fontWeight: 600 }}>kostnadsfri visuell besiktning</span> av taket innan de ger sitt slutgiltiga prisförslag. Jämför sedan deras priser i lugn och ro med estimatet ovan!</p>
                        </div>

                        {/* Image Upload UI */}
                        <div className={styles.uploadSection}>
                            <h5 className={styles.uploadTitle}>Vill du ha en snabbare offert?</h5>
                            <p className={styles.uploadDesc}>Ladda upp 1–2 bilder på taket (valfritt).</p>

                            <div className={styles.uploadBox}>
                                <input
                                    type="file"
                                    id="roofImages"
                                    className={styles.fileInput}
                                    accept="image/*"
                                    capture="environment"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="roofImages" className={styles.uploadLabel}>
                                    <svg className={styles.uploadIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <span style={{ fontWeight: 600 }}>Välj bilder eller Ta ett foto</span>
                                    <span className={styles.uploadHint}>(Dra & släpp fungerar på dator)</span>
                                </label>
                            </div>

                            {selectedFiles.length > 0 && (
                                <div className={styles.selectedFilesList}>
                                    {selectedFiles.map((file, i) => (
                                        <div key={i} className={styles.fileItem}>
                                            <span className={styles.fileName}>{file.name}</span>
                                            <button
                                                className={styles.removeFileBtn}
                                                onClick={() => setSelectedFiles(prev => prev.filter((_, index) => index !== i))}
                                            >✕</button>
                                        </div>
                                    ))}
                                    <button
                                        className={`btn btn-primary ${styles.uploadBtn}`}
                                        onClick={uploadImages}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? 'Laddar upp...' : 'Skicka in bilder'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
