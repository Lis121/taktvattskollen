export const cities = [
    { name: 'Stockholm', slug: 'stockholm' },
    { name: 'Göteborg', slug: 'goteborg' },
    { name: 'Malmö', slug: 'malmo' },
    { name: 'Uppsala', slug: 'uppsala' },
    { name: 'Västerås', slug: 'vasteras' },
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

export function getCityBySlug(slug: string) {
    return cities.find(city => city.slug === slug);
}
