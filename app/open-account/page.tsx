import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "../components/site-shell";
import { Arrow } from "../components/art";

export const metadata: Metadata = { title: "เปิดบัญชีเทรด | Trade The Future" };

export default function OpenAccountPage() {
  return <>
    <SiteHeader account />
    <main id="main" className="account-page container">
      <Link href="/#page-top" scroll={true} className="account-back">← กลับหน้าแรก</Link>
      <div className="account-intro">
        <p className="eyebrow">YOUR NEXT STEP</p>
        <h1>เปิดบัญชี<span className="gold">เทรด</span></h1>
        <p>ไปยังหน้าสมัครของ Connext ผ่านลิงก์ด้านล่าง</p>
      </div>
      <section className="account-card" aria-labelledby="connext-title">
        <div className="account-card-heading"><span className="account-symbol" aria-hidden="true">↗</span><div><p>TRADING ACCOUNT</p><h2 id="connext-title">Connext</h2></div></div>
        <a href="https://clients.svg.connextfx.com/links/go/707" className="button button-gold">เปิดบัญชีเทรดกับ Connext <Arrow /></a>
        <p className="account-destination">ดำเนินการสมัครบนเว็บไซต์ Connext</p>
      </section>
    </main>
    <SiteFooter />
  </>;
}
