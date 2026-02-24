import type { MetadataRoute } from 'next';
import { cities } from '@/lib/cities';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const BASE_URL = 'https://taktvattskollen.se';
const SAAS_API_URL = "https://www.alstras.com";
const PROJECT_ID = "ddaa17ca-0d74-4394-9a22-a6ff4a8e249f";

type SitemapEntry = {
    url: string;
    lastModified?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // 1. Fetch pSEO pages from SaaS (With Pagination Support)
    let pseoPages: MetadataRoute.Sitemap = [];
    let page = 1;

    try {
        while (true) {
            const res = await fetch(`${SAAS_API_URL}/api/public/sitemap?projectId=${PROJECT_ID}&format=json&limit=5000&page=${page}`);

            if (!res.ok) break;

            const data: SitemapEntry[] = await res.json();
            if (!data || data.length === 0) break;

            const chunks = data.map(item => ({
                url: item.url,
                lastModified: item.lastModified ? new Date(item.lastModified) : now,
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }));

            pseoPages = [...pseoPages, ...chunks];

            if (data.length < 5000) break;
            page++;
        }
    } catch (error) {
        console.error('Failed to fetch pSEO sitemap:', error);
    }

    // 2. Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
    ];

    // 3. Dynamic city pages
    const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
        url: `${BASE_URL}/ort/${city.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // 4. MERGE both lists (Do NOT replace your own pages!)
    return [...staticPages, ...cityPages, ...pseoPages];
}
