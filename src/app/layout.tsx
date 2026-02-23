import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

export const runtime = 'edge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taktvättskollen | Professionell Takvård',
  description: 'Vi erbjuder professionell takrengöring och algbehandling för hela Sverige. Få en fri offert idag!',
  icons: {
    icon: '/icon.png',
  },
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q2469Q253J" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q2469Q253J');
            `
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "vlsuiryrl6");
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
