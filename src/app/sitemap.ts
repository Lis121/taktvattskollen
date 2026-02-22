import type { MetadataRoute } from 'next';
import { cities } from '@/lib/cities';

const BASE_URL = 'https://taktvattskollen.se';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
    ];

    // Dynamic city pages
    const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
        url: `${BASE_URL}/ort/${city.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...cityPages];
}
