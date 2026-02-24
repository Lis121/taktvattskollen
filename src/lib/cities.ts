export type CityData = {
    name: string;
    slug: string;
    metaDescription?: string;
    heroText?: string;
    whyTitle?: string;
    whyText?: string;
    ctaTitle?: string;
};

export const cities: CityData[] = [
    {
        name: 'Stockholm',
        slug: 'stockholm',
        metaDescription: 'Professionell takrengöring i Stockholm och hela Storstockholm. Skydda ditt tak mot saltluft, fukt och algpåväxt. ROT-avdrag gäller – få en fri offert idag!',
        heroText: 'Stockholms unika skärgårdsklimat med salt havsluft och fuktiga höstar sätter hårda krav på tak och fasader. Vi hjälper villaägare i hela Storstockholm – från Nacka till Sollentuna – att skydda sina fastigheter med professionell takrengöring och algbehandling.',
        whyTitle: 'Varför behöver tak i Stockholm extra omvårdnad?',
        whyText: 'Stockholms läge vid Mälaren och Östersjön skapar ett fuktigt mikroklimat som gynnar tillväxt av mossa och alger på tak och fasader. Saltluften från skärgården påskyndar dessutom nedbrytningen av takpannor och betongytor. Under de kalla vintrarna fryser den fukt som mossa och lav binder mot takytan, vilket kan leda till frostsprängningar och kostsamma skador. En professionell taktvätt i kombination med en långtidsverkande algbehandling förlänger ditt taks livslängd avsevärt och bevarar fastighetens marknadsvärde i ett av Sveriges dyraste bostadsområden.',
        ctaTitle: 'Räkna ut pris för takrengöring i Stockholm',
    },
    {
        name: 'Göteborg',
        slug: 'goteborg',
        metaDescription: 'Takrengöring i Göteborg – skydda ditt tak mot västkustens regn och blåst. Professionell mossbehandling med ROT-avdrag. Boka en fri offert!',
        heroText: 'Göteborg är en av Sveriges regnigaste städer och västkustens hårda väder sliter hårt på tak och fasader. Vi erbjuder professionell takrengöring i hela Göteborgsområdet – från Hisingen till Mölndal – med metoder anpassade för det maritima klimatet.',
        whyTitle: 'Västkustens väder kräver regelbunden takvård',
        whyText: 'Göteborgs läge vid kusten innebär riklig nederbörd, kraftiga vindar och salt havsluft som konstant utsätter takpannor och fasadmaterial för påfrestningar. Den höga luftfuktigheten under stora delar av året skapar perfekta förhållanden för mossa, alger och lav att etablera sig på takytor. Om dessa får växa fritt binder de fukt som under frostperioder kan orsaka sprickor och strukturella skador. Genom regelbunden professionell takrengöring och en skyddande algbehandling kan du förlänga ditt taks livslängd med många år och undvika de betydande kostnaderna för ett tidigt takbyte.',
        ctaTitle: 'Vad kostar takrengöring i Göteborg?',
    },
    {
        name: 'Malmö',
        slug: 'malmo',
        metaDescription: 'Takrengöring i Malmö och hela Skåne. Skydda taket mot Öresunds fukt och vind. Miljövänlig behandling med ROT-avdrag. Fri offert!',
        heroText: 'Malmös närhet till Öresund och det skånska slättlandskapet gör att tak och fasader utsätts för konstant vind och fukt. Vi hjälper fastighetsägare i hela Malmöområdet – från Limhamn till Burlöv – med skonsam men effektiv takrengöring anpassad efter Skånes klimat.',
        whyTitle: 'Skånes milda vintrar förvärrar algproblemen',
        whyText: 'Till skillnad från norra Sverige har Malmö och Skåne milda, fuktiga vintrar med få riktigt kalla perioder. Det innebär att mossa och alger kan fortsätta växa nästan året runt istället för att bromsas av djup frost. Kombinerat med de starka vindarna från Öresund, som bär med sig salt och fukt, bryts takmaterial ner snabbare än i inlandsklimat. Regelbunden professionell takrengöring är därför särskilt viktig i Malmöregionen för att förhindra permanent skada på takpannor och betongtakstennar. Med vår miljövänliga algbehandling skapar vi ett långtidsskydd som håller ditt tak rent och friskt.',
        ctaTitle: 'Beräkna priset för takrengöring i Malmö',
    },
    {
        name: 'Uppsala',
        slug: 'uppsala',
        metaDescription: 'Professionell takrengöring i Uppsala. Skydda ditt tak mot Upplands kalla vintrar och fuktiga höstar. ROT-avdrag. Få prisförslag direkt!',
        heroText: 'Uppsala med sitt inlandsklimat och kalla vintrar ställer höga krav på takvård. Frysningar och töcykler sliter hårt på tak där mossa och fukt fått fäste. Vi erbjuder professionell takrengöring i hela Uppsala kommun – från Sävja till Storvreta.',
        whyTitle: 'Upplands inlandsklimat och frostrisken för ditt tak',
        whyText: 'Uppsalas inlandsklimat innebär kraftiga temperaturskillnader mellan sommar och vinter, med långa frostperioder som kan vara förödande för tak där mossa och fukt fått fäste. Fyrisåns närhet bidrar till lokalt förhöjd luftfuktighet, särskilt under hösten, vilket skapar gynnsamma förhållanden för algpåväxt. De täta temperaturväxlingarna kring nollpunkten under vår och höst – så kallade frostcykler – är särskilt skadliga och kan spräcka takpannor inifrån. Genom att avlägsna mossa och behandla ditt tak med ett långtidsverkande skydd minskar du risken för dessa frostskador drastiskt och förlänger takets livslängd.',
        ctaTitle: 'Vad kostar det att tvätta taket i Uppsala?',
    },
    {
        name: 'Västerås',
        slug: 'vasteras',
        metaDescription: 'Takrengöring i Västerås – skydda ditt tak mot Mälardalens fuktiga klimat. Professionell moss- och algborttagning med ROT-avdrag. Fri offert!',
        heroText: 'Västerås vid Mälaren har ett fuktigt inlandsklimat som gör tak extra utsatta för mossa och alger. Vi erbjuder professionell takrengöring i hela Västerås – från Skultuna till Barkarö – med metoder som skyddar ditt tak på lång sikt.',
        whyTitle: 'Mälardalens fuktiga klimat och ditt tak',
        whyText: 'Västerås läge vid Mälaren och i Mälardalen skapar ett fuktigt mikroklimat som är en idealisk grogrund för mossa, lav och alger på takytor. De långa, mörka höstarna och vintrarna med begränsad avdunstning gör att fukt stannar kvar längre på taket. Samtidigt innebär Mälardalens temperaturvariationer att frostcykler regelbundet utsätter takmaterialet för stress. Västerås har även perioder med kraftig nederbörd som ytterligare belastar skadade takpannor. En professionell takrengöring följd av en skyddande behandling är den mest kostnadseffektiva åtgärden för att undvika framtida reparationer och bevara husets värde.',
        ctaTitle: 'Räkna ut priset för takrengöring i Västerås',
    },
    { name: 'Örebro', slug: 'orebro' },
    { name: 'Linköping', slug: 'linkoping' },
    { name: 'Helsingborg', slug: 'helsingborg' },
    { name: 'Jönköping', slug: 'jonkoping' },
    { name: 'Norrköping', slug: 'norrkoping' },
    { name: 'Lund', slug: 'lund' },
    { name: 'Umeå', slug: 'umea' },
    { name: 'Gävle', slug: 'gavle' },
    { name: 'Borås', slug: 'boras' },
    { name: 'Eskilstuna', slug: 'eskilstuna' },
    { name: 'Södertälje', slug: 'sodertalje' },
    { name: 'Karlstad', slug: 'karlstad' },
    { name: 'Täby', slug: 'taby' },
    { name: 'Växjö', slug: 'vaxjo' },
    { name: 'Halmstad', slug: 'halmstad' },
];

export function getCityBySlug(slug: string): CityData | undefined {
    return cities.find(city => city.slug === slug);
}

