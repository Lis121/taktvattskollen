import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

export const runtime = 'edge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taktvättskollen | Professionell Takvård',
  description: 'Vi erbjuder professionell takrengöring och algbehandling för hela Sverige. Få en fri offert idag!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Taktvättskollen",
    "url": "https://taktvattskollen.se",
    "description": "Vi erbjuder professionell takrengöring och algbehandling för hela Sverige. Få en fri offert idag!",
    "areaServed": "SE",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tjänster",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Taktvätt och takrengöring"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
             "@type": "Service",
             "name": "Algbehandling av tak"
          }
        }
      ]
    }
  };

  return (
    <html lang="sv">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
