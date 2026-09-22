import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Noto_Sans_Thai } from "next/font/google";
import { LineContactProvider } from "./components/line-contact";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});
const thai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://tradethefutureclub.com"),
  title: {
    default: "Trade The Future | เรียนเทรดทอง CFD สำหรับผู้เริ่มต้น",
    template: "%s | Trade The Future",
  },
  description:
    "เริ่มเรียนรู้การเทรดทอง CFD ผ่านคลาสออนไลน์ 990 บาท ดูคลิป 30 วัน พร้อมห้อง Student และทดลอง Membership 7 วัน ต่อยอดด้วย GSS/TTS และ TMC",
  keywords: [
    "เรียนเทรดทอง",
    "เทรดทอง CFD",
    "สอนเทรดทอง",
    "คอร์สเทรดทอง",
    "Trade The Future",
  ],
  applicationName: "Trade The Future",
  creator: "Trade The Future",
  publisher: "Trade The Future",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "/",
    siteName: "Trade The Future",
    title: "Trade The Future | เรียนเทรดทอง CFD สำหรับผู้เริ่มต้น",
    description:
      "เริ่มเรียนรู้การเทรดทอง CFD ผ่านคลาสออนไลน์ 990 บาท พร้อมห้อง Student และทดลอง Membership",
    images: [
      {
        url: "/images/hero-video-poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Trade The Future คลาสเรียนเทรดทอง CFD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trade The Future | เรียนเทรดทอง CFD สำหรับผู้เริ่มต้น",
    description:
      "เริ่มเรียนรู้การเทรดทอง CFD ผ่านคลาสออนไลน์ 990 บาท พร้อมห้อง Student และทดลอง Membership",
    images: ["/images/hero-video-poster.jpg"],
  },
  icons: { icon: "/icon.svg" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tradethefutureclub.com/#organization",
      name: "Trade The Future",
      url: "https://tradethefutureclub.com",
      logo: "https://tradethefutureclub.com/icon.svg",
      sameAs: ["https://www.youtube.com/@tradethefuturebyfuture"],
    },
    {
      "@type": "WebSite",
      "@id": "https://tradethefutureclub.com/#website",
      url: "https://tradethefutureclub.com",
      name: "Trade The Future",
      inLanguage: "th-TH",
      publisher: { "@id": "https://tradethefutureclub.com/#organization" },
    },
    {
      "@type": "Course",
      name: "คลาสเรียนเทรดทอง CFD สำหรับผู้เริ่มต้น",
      description:
        "คลาสออนไลน์สำหรับเริ่มเรียนรู้การอ่านกราฟ วางแผน และบริหารความเสี่ยงในการเทรดทอง CFD",
      url: "https://tradethefutureclub.com/#course",
      inLanguage: "th-TH",
      provider: { "@id": "https://tradethefutureclub.com/#organization" },
      offers: {
        "@type": "Offer",
        price: "990",
        priceCurrency: "THB",
        availability: "https://schema.org/InStock",
        url: "https://tradethefutureclub.com/#course",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${geist.variable} ${thai.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <Script id="reset-position-on-reload" strategy="beforeInteractive">{`
          (() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (!navigation || navigation.type !== 'reload') return;
            if (location.pathname !== '/') {
              location.replace('/');
              return;
            }
            const previousRestoration = history.scrollRestoration;
            history.scrollRestoration = 'manual';
            history.replaceState(history.state, '', location.pathname + location.search);
            const reset = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            reset();
            window.addEventListener('pageshow', () => {
              requestAnimationFrame(() => {
                reset();
                history.scrollRestoration = previousRestoration;
              });
            }, { once: true });
          })();
        `}</Script>
        <LineContactProvider>{children}</LineContactProvider>
      </body>
    </html>
  );
}
