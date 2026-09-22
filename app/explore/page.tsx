import { ChartPreview } from "../components/chart-preview";
import Link from "next/link";
import { SpotlightEffects } from "../components/spotlight-card";
import { Arrow, Icon } from "../components/art";
import { Quiz, ToolPlans } from "../components/interactive";
import { CapitalCalculator } from "../components/capital-calculator";
import { SiteHeader, SiteFooter } from "../components/site-shell";
import { ALGO, faqs } from "../content";
import { LineContact } from "../components/line-contact";
import { AnimatedFaq } from "../components/animated-faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ค้นหาสไตล์และวางแผนทุนเทรด",
  description: "ทำ Quiz ค้นหาสไตล์การเรียนรู้ ลองคำนวณทุนตามความเสี่ยง และรู้จักเครื่องมือ GSS, TTS และ TMC",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "ค้นหาสไตล์และวางแผนทุนเทรด | Trade The Future",
    description: "ทำ Quiz ค้นหาสไตล์การเรียนรู้และลองคำนวณทุนตามความเสี่ยงที่เหมาะกับคุณ",
    url: "/explore",
  },
};
function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span>{n}</span>
      {children}
    </p>
  );
}
function Contact({
  children = "สอบถามคลาส 990 ผ่าน LINE",
  outline = false,
}: {
  children?: React.ReactNode;
  outline?: boolean;
}) {
  return (
    <LineContact
      className={`button ${outline ? "button-outline" : "button-gold"}`}
    >
      {children}
      <Arrow />
    </LineContact>
  );
}

export default function Explore() {
  return (<>
    <SpotlightEffects />
    <SiteHeader explore />
    <main id="main" className="explore-page">
      <div className="container explore-intro">
        <Link className="text-link" href="/#course">← กลับไปคลาสเริ่มต้น 990 บาท</Link>
        <h1>สำรวจเส้นทาง<span className="gold">ของคุณต่อ</span></h1>
        <p>ค้นหาจุดเริ่มต้น ลองคำนวณทุน หรือรู้จักเครื่องมือและ TMC</p>
        <nav className="explore-links" aria-label="หัวข้อเพิ่มเติม"><a href="#quiz">ทำ Quiz <Arrow /></a><a href="#calculator">คำนวณเป้าหมาย <Arrow /></a><a href="#tools">เครื่องมือ & TMC <Arrow /></a></nav>
      </div>
        <section id="quiz" className="section quiz-section">
          <div className="container">
            <Label n="01">MEET YOUR TRADING SELF</Label>
            <div className="section-heading">
              <h2>
                คุณคือนักเริ่มต้น
                <br />
                <span className="gold">แบบไหน?</span>
              </h2>
              <p>
                5 คำถามง่าย ๆ เพื่อหาจุดเริ่มที่เหมาะกับคุณ
                <br />
                ไม่ต้องมีประสบการณ์เทรดก็ตอบได้
              </p>
            </div>
            <Quiz />
          </div>
        </section>
        <section
          id="calculator"
          className="section container calculator-section"
        >
          <p className="eyebrow">
            <span>✦</span>TURN YOUR GOAL INTO A PLAN
          </p>
          <div className="section-heading">
            <h2>
              เป้าหมายของคุณ
              <br />
              <span className="gold">ต้องวางแผนทุนเท่าไหร่?</span>
            </h2>
            <p>
              ลองใส่เป้ากำไรที่อยากได้ต่อวัน
              <br />
              ดูทุนตามความเสี่ยงที่เลือก
            </p>
          </div>
          <CapitalCalculator />
        </section>

      <section className="section container">
            <div id="tools" className="tools-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">WHEN YOU’RE READY FOR MORE</p>
                  <h2>
                    พร้อมฝึกต่อ
                    <br />
                    <span className="muted">ไปกับเครื่องมือและ TMC</span>
                  </h2>
                </div>
                <p>
                  อีกขั้นที่เลือกได้ภายหลัง
                  <br />
                  แยกจากสิทธิ์คลาส 990 บาท
                </p>
              </div>
              <div className="tool-grid">
                <article className="spotlight-card">
                  <div className="tool-title">
                    <h3>
                      TTS<span>TREND</span>
                    </h3>
                    <Icon name="trend" />
                  </div>
                    <ChartPreview
                      name="TTS"
                      src="/images/tts-trend-chart.png"
                      alt="ตัวอย่างเครื่องมือ TTS บนกราฟทอง XAUUSD ในสภาวะแนวโน้มขาลง"
                    />
                  <p>
                    เครื่องมือบอกจุดเข้า
                    <br />
                    ในสภาวะกราฟที่เป็นแนวโน้ม
                  </p>
                </article>
                <article className="spotlight-card">
                  <div className="tool-title">
                    <h3>
                      GSS<span>SIDEWAYS</span>
                    </h3>
                    <Icon name="range" />
                  </div>
                    <ChartPreview
                      name="GSS"
                      src="/images/gss-chart.png"
                      alt="ตัวอย่างเครื่องมือ GSS บนกราฟทอง XAUUSD พร้อมสัญญาณ Buy และ Sell"
                    />
                  <p>
                    เครื่องมือที่เหมาะกับ
                    <br />
                    กราฟที่แกว่งตัวอยู่ในกรอบ
                  </p>
                </article>
                <article className="tmc-card">
                  <span className="eyebrow">LEARN. PRACTICE. REVIEW.</span>
                  <h3>TMC</h3>
                  <p>
                    ฝึกใช้เครื่องมือ เก็บสถิติ
                    <br />
                    และทบทวนการทำตามกฎกับโค้ช
                  </p>
                  <div className="tmc-slot">
                    <Icon name="people" />
                    <span>
                      <strong>Zoom กลุ่มทุกวันเสาร์</strong>
                      <br />
                      ทุกคนเข้าฟังได้ · รับลิงก์ในห้อง TMC
                    </span>
                  </div>
                  <small>
                    ขึ้น coaching สัปดาห์ละ 2 คน
                    <br />
                    ลงชื่อก่อน รับสิทธิ์ก่อน
                  </small>
                </article>
              </div>
              <p className="fine-print tool-note">
                GSS/TTS ใช้บน TradingView · ผู้ใช้กดส่งคำสั่งซื้อขายเอง ·
                ภาพกราฟเป็นภาพประกอบ ไม่ใช่ผลการเทรด
              </p>
              <ToolPlans />
              <div className="tools-actions">
                <a
                  href={ALGO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-gold"
                >
                  สมัครและซื้อผ่าน AlgoPrime <Arrow />
                </a>
                <Contact outline>สอบถามเครื่องมือและ TMC</Contact>
              </div>
            </div>

        <div className="explore-faq">
          <h3>คำถามเกี่ยวกับเครื่องมือและ TMC</h3>
          <AnimatedFaq items={faqs.slice(9, 12).map(([question, answer]) => ({ question, answers: [answer] }))} />
        </div>
      </section>
    </main>
    <SiteFooter />
  </>);
}
