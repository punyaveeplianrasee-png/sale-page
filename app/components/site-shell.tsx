import { Arrow } from "./art";
import { HomeBrand } from "./home-brand";
import Link from "next/link";
import { MobileMenu } from "./interactive";
import { ExploreMenu } from "./explore-menu";
import { YOUTUBE } from "../content";
import { LineContact } from "./line-contact";

export function SiteHeader({ explore = false, account = false }: { explore?: boolean; account?: boolean }) {
  const links: [string, string][] = explore
    ? [["/#course", "คลาส 990 บาท"], ["#quiz", "ทำ Quiz"], ["#calculator", "คำนวณเป้าหมาย"], ["#tools", "เครื่องมือ & TMC"]]
    : [[`${account ? "/" : ""}#stories`, "รู้จักผม"], [`${account ? "/" : ""}#curriculum`, "สิ่งที่ได้เรียนและรีวิว"], [`${account ? "/" : ""}#course`, "สมัครเรียน"], ["/open-account", "เปิดบัญชีเทรด"], [`${account ? "/" : ""}#sample`, "ช่องทางติดตาม"], ["/explore", "สำรวจเพิ่มเติม"]];
  links.splice(links.length - 1, 0, ["/news-analysis", "News Analysis"]);
  return <>
    <div id="page-top" aria-hidden="true" />
    <a className="skip-link" href="#main">ข้ามไปเนื้อหา</a>
    <header className="header">
      <HomeBrand />
      <nav className="desktop-nav" aria-label="เมนูหลัก">{links.map(([href, label]) => href === "/explore" ? <ExploreMenu key={href} /> : <Link key={href} href={href}>{label}</Link>)}</nav>
      <LineContact className="nav-cta" mode="inquiry">ติดต่อผม <Arrow /></LineContact>
      <MobileMenu links={links} />
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="container footer">
    <div className="footer-top">
      <HomeBrand />
      <a className="text-link" href={YOUTUBE} target="_blank" rel="noopener noreferrer">ติดตามผมบน YouTube <Arrow /></a>
      <LineContact className="text-link">ปรึกษากับผมผ่าน LINE <Arrow /></LineContact>
    </div>
    <div className="footer-bottom"><p>การเทรดมีความเสี่ยงและอาจขาดทุน ไม่มีการรับประกันกำไร<br />ผลการเรียนรู้และการเทรดของแต่ละคนแตกต่างกัน</p><span>© 2026 TRADE THE FUTURE</span></div>
  </footer>;
}
