import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PriceCalculator from "@/components/PriceCalculator";
import CtaButton from "@/components/CtaButton";
import Link from "next/link";
import styles from "../../page.module.css";

export const runtime = 'edge';

// Config - This interacts with the SaaS Platform
const SAAS_API_URL = "https://www.alstras.com";
const PROJECT_ID = "ddaa17ca-0d74-4394-9a22-a6ff4a8e249f";

type Props = {
    params: Promise<{ slug: string[] }>;
};

async function fetchPseoPage(slug: string) {
    try {
        // Fetch with no-store as revalidate is not properly supported in edge runtime
        // or we can remove the global edge runtime config if not strictly needed
        const res = await fetch(`${SAAS_API_URL}/api/public/content?projectId=${PROJECT_ID}&slug=${slug}&include=related`, {
            cache: 'no-store', // Fix for Cloudflare Pages edge runtime without ISR support
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("pSEO Fetch Error:", error);
        return null;
    }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const slug = params.slug.join("/");
    const data = await fetchPseoPage(slug);

    if (!data) return {};

    return {
        title: data.title,
        description: data.excerpt || data.title,
    };
}

export default async function PseoPage(props: Props) {
    const params = await props.params;
    const slug = params.slug.join("/");
    const data = await fetchPseoPage(slug);

    if (!data) return notFound();

    return (
        <>
            <Navbar />
            <main>
                {/* 1. Header & Text Content from API */}
                <section className="section py-12 md:py-20 bg-white">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900">{data.title}</h1>

                        <div
                            className="prose prose-lg dark:prose-invert max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: data.contentHtml }}
                        />
                    </div>
                </section>

                {/* 2. Lead Form Component (Price Calculator) */}
                <section id="kalkylator" className={styles.ctaSection}>
                    <div className="container">
                        <div className={styles.ctaContent}>
                            <h2>Få en fri offert för {data.title}</h2>
                            <p>Använd vår priskalkylator för att se vad det kostar att få taket rent just nu.</p>

                            <div style={{ marginTop: '2rem' }}>
                                <PriceCalculator />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Föreslår Även (Smart Internal Linking) */}
                {data.relatedPages?.length > 0 && (
                    <section className="section py-16 bg-gray-50 border-t border-gray-100">
                        <div className="container mx-auto px-4 max-w-5xl">
                            <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">Föreslår även</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.relatedPages.map((page: any) => (
                                    <Link
                                        key={page.url}
                                        href={page.url}
                                        className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-200"
                                    >
                                        <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 mb-2">{page.title}</h4>
                                        <p className="text-gray-500 text-sm">{page.excerpt || "Läs mer"}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 4. Headless CTA - Rendered if configured in dashboard */}
                {data.cta && (
                    <section className="section py-16">
                        <div className="container mx-auto px-4 max-w-4xl">
                            <div className="p-8 md:p-12 bg-gray-50 dark:bg-gray-900 rounded-3xl text-center shadow-lg border border-gray-100 dark:border-gray-800">
                                {data.cta.description && (
                                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-medium" style={{ color: data.cta.msg_text_color }}>
                                        {data.cta.description}
                                    </p>
                                )}
                                <CtaButton cta={data.cta} apiUrl={SAAS_API_URL} />
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
