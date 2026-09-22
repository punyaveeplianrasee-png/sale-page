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
  title: "Trade The Future | เริ่มเรียนเทรดทอง CFD 990 บาท",
  description:
    "เริ่มเรียนรู้การเทรดทอง CFD ผ่านคลาสออนไลน์ 990 บาท ดูคลิป 30 วัน พร้อมห้อง Student และทดลอง Membership 7 วัน ต่อยอดด้วย GSS/TTS และ TMC",
  icons: { icon: "/icon.svg" },
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${geist.variable} ${thai.variable}`}>
      <body>
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
