import Image from "next/image";
import { CourseCurriculum } from "./components/course-curriculum";
import Link from "next/link";
import { BackgroundPaths } from "./components/background-paths";
import { SpotlightEffects } from "./components/spotlight-card";
import { Arrow, Icon, Mark } from "./components/art";
import { Testimonials } from "./components/testimonials";
import { SiteHeader, SiteFooter } from "./components/site-shell";
import { LegacyAnchors } from "./components/legacy-anchors";
import { YOUTUBE, faqs } from "./content";
import { LineContact } from "./components/line-contact";
import { AnimatedFaq } from "./components/animated-faq";

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return <p className="eyebrow"><span>{n}</span>{children}</p>;
}
function ApplyButton() {
  return <LineContact className="button button-gold">Begin Your Journey <Arrow /></LineContact>;
}

export default function Home() {
  return <>
    <SpotlightEffects />
    <LegacyAnchors />
    <SiteHeader />
    <main id="main" className="focused-sales">
      <section className="hero container" aria-labelledby="hero-title">
        <BackgroundPaths />
        <div className="hero-copy spotlight-card spotlight-open">
          <p className="eyebrow"><span className="status-dot" />YOUR NEXT CHAPTER STARTS HERE</p>
          <h1 id="hero-title" aria-label="Trade The Future"><span className="hero-title-top">TRADE THE</span><span className="hero-title-main">FUTURE.</span></h1>
          <h2>ค่อย ๆ เข้าใจโลกของการเทรด<br className="mobile-break" /> ในจังหวะของคุณ</h2>
          <p className="hero-description">ไม่ว่าคุณจะเพิ่งเริ่ม หรืออยากต่อยอดการเทรด<br />เรียนรู้การอ่านกราฟ วางแผน และบริหารความเสี่ยง</p>
          <figure className="hero-film">
            <figcaption className="hero-film-heading">
              <span><span className="hero-film-dot" aria-hidden="true" />รู้จักกันก่อน แล้วค่อยเริ่มไปด้วยกัน</span>
              <span className="hero-film-duration">1:27 นาที</span>
            </figcaption>
            <div className="hero-film-player">
              <video controls playsInline preload="none" width="1920" height="1080" poster="/images/hero-video-poster.jpg" aria-label="วิดีโอแนะนำ Trade the Future">
                <source src="/videos/hero-introduction.mp4" type="video/mp4" />
                <a href="/videos/hero-introduction.mp4">เปิดวิดีโอแนะนำ Trade the Future</a>
              </video>
            </div>
          </figure>
          <div className="hero-actions">
            <a href="#course" className="button button-gold">มาเริ่มไปด้วยกัน <Arrow /></a>
            <a href="#curriculum" className="text-link">ดูสิ่งที่ได้เรียน <span>↓</span></a>
          </div>
        </div>
      </section>

      <section id="stories" className="section container focus-trust" aria-labelledby="trust-title">
        <Label n="02">THE PEOPLE BEHIND THE CLASS</Label>
        <div className="section-heading"><h2 id="trust-title">รู้จักผม</h2></div>
        <div id="founder" className="focus-founder spotlight-card">
          <div className="focus-founder-signature"><Mark /><strong>Future</strong><span>ผู้ก่อตั้ง Trade the Future</span></div>
          <div><blockquote>“ผมก็เคยเริ่มด้วยความมั่นใจ<br />ที่มากกว่าความเข้าใจ”</blockquote><p>จากงานประจำและธุรกิจครอบครัว สู่การเทรดด้วยตัวเอง บทเรียนจากการขาดทุนทำให้ผมอยากแบ่งปันสิ่งที่เรียนรู้ ในบรรยากาศเป็นกันเองที่ทุกคนถามได้</p></div>
        </div>
      </section>

      <section id="curriculum" className="section container focus-learning" aria-labelledby="learning-title">
        <Label n="03">YOUR FIRST STEP</Label>
        <div className="section-heading">
          <h2 id="learning-title">เริ่มให้เข้าใจ<br /><span className="gold">แล้วค่อยต่อยอด</span></h2>
        </div>
        <CourseCurriculum />
        <div id="includes" className="focus-access">
          <article><Icon name="book" /><h3>บทเรียนออนไลน์</h3><strong>30 <span>วัน</span></strong><p>ดูคลิปผ่าน Whop ตามเวลาที่สะดวก</p></article>
          <article><Icon name="chat" /><h3>ห้อง Student</h3><strong>ถาม<span>ระหว่างเรียน</span></strong><p>พิมพ์ถามเรื่องบทเรียนใน Discord ได้ตลอดสิทธิ์ 30 วัน</p></article>
          <article><Icon name="eye" /><h3>ทดลอง Membership</h3><strong>7 <span>วัน</span></strong><p>ดู Zone, Live, Signal และ Special Class พร้อมย้อนหลัง</p></article>
        </div>
        <p className="fine-print focus-access-note">เริ่มนับสิทธิ์เมื่อเพิ่ม role หลังเข้าดิสคอร์ด · 990 บาทไม่รวมสิทธิ์ใช้งาน GSS/TTS และโปรแกรม TMC</p>
        <Testimonials compact />
      </section>

      <section id="course" className="section focus-offer" aria-labelledby="offer-title">
        <div className="container">
          <Label n="04">START WITH UNDERSTANDING</Label>
          <div className="focus-price-card spotlight-card">
            <div>
              <span className="tag gold-tag">คลาสออนไลน์</span>
              <h2 id="offer-title">เรียนรู้<span className="gold">ไปด้วยกัน</span></h2>
            </div>
            <div className="price">990<span>฿</span></div>
            <div className="focus-purchase">
              <ApplyButton />
              <LineContact className="text-link">ยังมีคำถาม? ปรึกษากับผม <Arrow /></LineContact>
            </div>
          </div>
          <div id="faq" className="focus-faq">
            <h3>ก่อนสมัคร อาจมีเรื่องที่อยากถาม</h3>
            <AnimatedFaq items={[
              ...[0, 1, 2, 3, 8, 12].map(i => ({ question: faqs[i][0], answers: [faqs[i][1]] })),
              { question: "ดูรายละเอียด Membership และตารางกิจกรรม", answers: [faqs[4][1], faqs[5][1], faqs[7][1]] },
            ]} />
          </div>
          <aside className="focus-explore" aria-label="สำรวจเพิ่มเติม">
            <div className="explore-invitation"><span className="explore-invitation-mark" aria-hidden="true">↗</span><h3>สำรวจ<span className="gold">เพิ่มเติม</span></h3><p>เลือกหัวข้อที่สนใจ แล้วกดเข้าไปดูได้เลย</p></div>
            <div className="focus-explore-links">
              {[
                ["/explore#quiz", "people", "ค้นหาสไตล์ของคุณ", "ทำ Quiz รู้จักแนวทางของตัวเอง"],
                ["/explore#calculator", "trend", "คำนวณเป้าหมาย", "ลองคำนวณทุนตามความเสี่ยงที่เลือก"],
                ["/explore#tools", "range", "เครื่องมือ & TMC", "ดู GSS, TTS และโปรแกรมโค้ชชิ่ง"],
              ].map(([href, icon, title, description]) => <Link href={href} key={href}>
                <span className="explore-link-icon"><Icon name={icon} /></span>
                <span className="explore-link-copy"><strong>{title}</strong><span>{description}</span></span>
                <span className="explore-link-arrow"><Arrow /></span>
              </Link>)}
            </div>
          </aside>
        </div>
      </section>
      <section id="sample" className="section focus-sample follow-section" aria-labelledby="sample-title">
        <div className="container focus-sample-layout">
          <div className="follow-heading">
            <Label n="05">STAY CONNECTED</Label>
            <h2 id="sample-title">ช่องทางการ<span className="gold">ติดตาม</span></h2>
          </div>
          <a id="social" className="youtube-card spotlight-card" href={YOUTUBE} target="_blank" rel="noopener noreferrer" aria-label="ดูคลิปจากช่อง Trade the Future บน YouTube">
            <div className="youtube-card-top"><span className="youtube-platform"><svg viewBox="0 0 28 20" aria-hidden="true" focusable="false"><path fill="#FF0000" d="M27.4 3.1A3.5 3.5 0 0 0 24.9.6C22.7 0 14 0 14 0S5.3 0 3.1.6A3.5 3.5 0 0 0 .6 3.1C0 5.3 0 10 0 10s0 4.7.6 6.9a3.5 3.5 0 0 0 2.5 2.5C5.3 20 14 20 14 20s8.7 0 10.9-.6a3.5 3.5 0 0 0 2.5-2.5C28 14.7 28 10 28 10s0-4.7-.6-6.9Z"/><path fill="#FFFFFF" d="m11.2 14.3 7.3-4.3-7.3-4.3Z"/></svg>YouTube</span><span className="youtube-external">↗</span></div>
            <div className="youtube-identity"><span className="social-monogram social-avatar"><Image src="/images/youtube-avatar.jpg" alt="รูปโปรไฟล์ช่อง Trade the Future" width={900} height={900} sizes="96px" /></span><div><h3>Trade the Future</h3><p>@tradethefuturebyfuture</p></div></div>
            <div className="youtube-card-bottom"><span>รู้จักกันผ่านคลิปในช่อง</span><span className="youtube-action">ดูคลิป <Arrow /></span></div>
          </a>
        </div>
      </section>

    </main>
    <SiteFooter />
  </>;
}
