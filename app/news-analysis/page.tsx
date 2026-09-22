import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { WeeklyNews } from "../components/weekly-news";

export const metadata: Metadata = { title: "News Analysis | Trade The Future" };

const examples = [
  {
    category: "INFLATION", title: "CPI · เงินเฟ้อสหรัฐฯ",
    summary: "บอกว่าราคาสินค้าและบริการเพิ่มขึ้นแค่ไหน ตลาดจะเทียบตัวเลขจริงกับที่คาด เพื่อประเมินว่า Fed อาจคงหรือลดดอกเบี้ยเร็วขึ้นหรือไม่",
    up: "ต่ำกว่าคาด และตลาดคาดหวังลดดอกเบี้ยมากขึ้น อาจหนุนทอง",
    down: "สูงกว่าคาด และดอลลาร์หรือยีลด์ปรับขึ้น อาจกดดันทอง",
    watch: "ดู Core CPI ประกอบด้วย หากตัวเลขให้ภาพต่างกัน ทองอาจแกว่งสองทาง",
  },
  {
    category: "EMPLOYMENT", title: "Nonfarm Payrolls · การจ้างงานสหรัฐฯ",
    summary: "สะท้อนความแข็งแรงของตลาดแรงงาน หากการจ้างงานชะลอกว่าที่คาด ตลาดอาจเพิ่มความคาดหวังต่อการลดดอกเบี้ย แต่ต้องดูค่าจ้างและอัตราว่างงานร่วมด้วย",
    up: "จ้างงานอ่อนกว่าคาด พร้อมดอลลาร์และยีลด์ลดลง อาจหนุนทอง",
    down: "จ้างงานแข็งกว่าคาด พร้อมดอลลาร์และยีลด์เพิ่มขึ้น อาจกดดันทอง",
    watch: "ตัวเลขเดือนก่อนอาจถูกปรับใหม่ จึงไม่ควรอ่านเฉพาะตัวเลขพาดหัว",
  },
  {
    category: "FED POLICY", title: "FOMC · ทิศทางดอกเบี้ย Fed",
    summary: "ตลาดไม่ได้ดูแค่ขึ้นหรือลดดอกเบี้ย แต่ดูถ้อยแถลงและแนวทางต่อจากนี้เทียบกับสิ่งที่คาดไว้ ทองจึงอาจเปลี่ยนทิศอีกครั้งระหว่างการแถลงข่าว",
    up: "ส่งสัญญาณผ่อนคลายกว่าคาด และยีลด์ลดลง อาจหนุนทอง",
    down: "ส่งสัญญาณเข้มงวดกว่าคาด และยีลด์เพิ่มขึ้น อาจกดดันทอง",
    watch: "ติดตามถ้อยแถลงและการตอบคำถาม ไม่ใช่เฉพาะผลตัดสินดอกเบี้ย",
  },
];

export default function NewsAnalysisPage() {
  return <>
    <SiteHeader account />
    <main id="main" className="container news-page">
      <Link href="/#page-top" className="account-back">← กลับหน้าแรก</Link>
      <header className="news-intro">
        <p className="eyebrow">GOLD · NEW YORK SESSION</p>
        <h1>News <span className="gold">Analysis</span></h1>
        <p>จับประเด็นข่าวสำคัญ อ่านผลต่อทองให้เข้าใจง่าย</p>
        <div className="news-filters"><span>ช่วงตลาดนิวยอร์ก</span><span><b aria-label="3 ดาว">★★★</b> เฉพาะข่าวสำคัญ</span><span>สรุปภาษาไทย</span></div>
      </header>
      <WeeklyNews />
      <details className="news-reading-guide">
      <summary>ทำความเข้าใจผลของข่าวต่อทอง <span aria-hidden="true">＋</span></summary>
      <div className="news-section-heading"><div><p className="eyebrow">HOW TO READ THE NEWS</p><h2>ข่าวแบบไหน <span className="gold">มีผลกับทอง?</span></h2></div><span className="news-demo-label">ตัวอย่างรูปแบบสรุป</span></div>
      <div className="news-list">
        {examples.map((item, index) => <article className="news-card" key={item.category}>
          <div className="news-card-top"><span className="news-category">{String(index + 1).padStart(2, "0")} / {item.category}</span><span className="news-example">ตัวอย่าง · ยังไม่มีผลประกาศ</span></div>
          <h3>{item.title}</h3><p className="news-summary">{item.summary}</p>
          <div className="news-impacts">
            <div className="news-impact news-up"><span aria-hidden="true">↗</span><div><h4>มีโอกาสหนุนทองขึ้น</h4><p>{item.up}</p></div></div>
            <div className="news-impact news-down"><span aria-hidden="true">↘</span><div><h4>มีโอกาสกดดันทองลง</h4><p>{item.down}</p></div></div>
          </div>
          <p className="news-watch"><strong>จับตาเพิ่มเติม</strong> {item.watch}</p>
        </article>)}
      </div>
      </details>
      <aside className="news-method"><h2>อ่านแนวโน้ม พร้อมดูปฏิกิริยาราคา</h2><p>3 ดาวบอกโอกาสผันผวนสูง ไม่ได้บอกทิศทางทอง เงื่อนไขข้างต้นเป็นการตีความเบื้องต้น ราคาจริงอาจสวนทางเมื่อข่าวถูกรับรู้ไปแล้วหรือมีปัจจัยอื่นแทรก</p><div><a href="https://www.investing.com/academy/trading/how-to-read-an-economic-calendar/" target="_blank" rel="noopener noreferrer">วิธีอ่านปฏิทิน · Investing.com ↗</a><a href="https://www.gold.org/goldhub/research/the-impact-of-monetary-policy-on-gold" target="_blank" rel="noopener noreferrer">ดอกเบี้ยและทอง · World Gold Council ↗</a></div></aside>
    </main>
    <SiteFooter />
  </>;
}
