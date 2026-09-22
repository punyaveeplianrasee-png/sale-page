"use client";

import { useState } from "react";

// Anonymous excerpts from the supplied Discord screenshots; repeat senders
// are grouped into one card. No names, account numbers or avatars are exposed.
const reviews = [
  { id: "01", topic: "ทบทวนจากข้อมูลจริง", date: "30 พฤษภาคม 2026", text: "ขอบคุณสำหรับการสอนและการให้กำลังใจ พร้อมยกตัวอย่าง Data ของเพื่อนนักเทรดมือใหม่ วิเคราะห์ความสำเร็จและความบกพร่อง เพื่อนำไปสู่การปรับปรุงให้ดียิ่งขึ้น ปรบมือให้กับทีมงาน TMC ทุกท่านด้วยครับ" },
  { id: "02", topic: "ได้มุมมองใหม่ในการฝึก", date: "17 และ 31 พฤษภาคม 2026", text: "TMC โค้ชชิ่งวันนี้ ทำให้ได้เปิดมุมมองใหม่ ๆ ความคิดใหม่ และบางอย่างที่เราคิดไม่ถึงหรือพลาดไป ปลุกพลังงานที่เกือบดับขึ้นมาใหม่อีกครั้ง ขอบคุณโค้ชฟิวและทีมโค้ชที่ชวนให้เข้ามาฟัง", more: "ได้ความรู้พื้นฐานที่แน่นขึ้น บวกกับทริคใหม่ ๆ อีกหลายอย่าง จะนำไปทบทวนและฝึกฝนเพิ่มครับ" },
  { id: "03", topic: "เสียงขอบคุณจากสมาชิก", date: "17 พฤษภาคม 2026", text: "ขอบคุณโค้ชทุกท่านมากเลยค่ะ 🙏🤍❤️" },
  { id: "04", topic: "เข้าใจและมั่นใจมากขึ้น", date: "17 พฤษภาคม 2026", text: "ขอบคุณมากครับ โค้ชทุกท่านให้ความรู้ดีมาก ทำให้มีความรู้มากขึ้น มีแรงผลักดันให้วิเคราะห์กราฟได้ดี และมั่นใจในการเทรดมากขึ้น" },
  { id: "05", topic: "พร้อมนำไปฝึกต่อ", date: "17 พฤษภาคม 2026", text: "ขอบคุณโค้ชทุกท่านสำหรับ Master class วันนี้ครับ สุดทุกคนไม่มีกั๊ก ได้เอาความรู้เอาไปลุยจริง ผมจะพยายามทำแบ็คเทสเยอะ ๆ เพื่อให้ความรู้ที่ได้ในวันนี้ไม่เสียเปล่า" },
  { id: "06", topic: "เข้าใจเหตุผลของแผน", date: "17 พฤษภาคม 2026", text: "ขอบคุณโค้ชทุกท่านนะคะ สำหรับคลาสเรียนวันนี้ ได้ความรู้ละเอียดเกี่ยวกับการวิ่งของกราฟว่ากราฟจะวิ่งไปจุดไหนและหยุดตรงไหน และรู้จุดเข้าและจุดออกพร้อมเหตุผลประกอบด้วยค่ะ" },
  { id: "07", topic: "สอนละเอียดและเป็นกันเอง", date: "17 พฤษภาคม 2026", text: "ขอบคุณโค้ชทุกท่านค่ะ สอนดี สอนละเอียดมาก ๆ ให้ความรู้แบบจัดแน่น", more: "ได้เข้ามาในสังคมคอมมูที่น่ารักแห่งนี้จ้า" },
];
const columns = [[reviews[0], reviews[3], reviews[6]], [reviews[1], reviews[4]], [reviews[2], reviews[5]]];

export function Testimonials({ compact = false }: { compact?: boolean }) {
  const [paused, setPaused] = useState(false);
  const displayedColumns = compact ? [[reviews[0], reviews[3]], [reviews[1], reviews[5]]] : columns;
  return (
    <div className={`testimonials ${compact ? "testimonials-compact" : ""} ${paused ? "testimonials-paused" : ""}`}>
      <div className="testimonials-intro">
        <span className="testimonials-kicker">COMMUNITY VOICES</span>
        <h3>Review<br /><span>จากพี่ๆใน Discord</span></h3>
      </div>
      <div className="testimonials-controls">
        <p>จากบทสนทนาของสมาชิกใน Discord · พฤษภาคม 2026</p>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? "เล่นรีวิวต่อ" : "หยุดเลื่อนเพื่ออ่าน"}
        </button>
      </div>
      <div className="testimonials-window">
        {displayedColumns.map((column, index) => (
          <div className="testimonials-column" key={index}>
            <div className={`testimonials-track testimonials-track-${index}`}>
              {[0, 1].map((copy) => (
                <div className={`testimonials-group ${copy ? "testimonials-copy" : ""}`} key={copy} aria-hidden={copy ? true : undefined}>
                  {column.map((review) => (
                    <article className="testimonial-card" key={review.id}>
                      <div className="testimonial-card-heading">
                        <span className="testimonial-quote-mark" aria-hidden="true">“</span>
                        <h4 className="testimonial-topic">{review.topic}</h4>
                      </div>
                      <blockquote><p>{review.text}</p>{review.more && <p>{review.more}</p>}</blockquote>
                      <div className="testimonial-author">
                        <span className="testimonial-avatar testimonial-avatar-private" aria-hidden="true"><span /></span>
                        <div>
                          <strong className="testimonial-name-private" aria-label={`สมาชิก Discord ${review.id} (ปิดชื่อเพื่อความเป็นส่วนตัว)`}><span aria-hidden="true">▰▰▰▰ ▰▰▰</span></strong>
                          <span>สมาชิก Discord · {review.date}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="testimonials-note">คัดย่อและจัดวรรคตอนจากรีวิวจริง โดยปิดชื่อและรูปโปรไฟล์เพื่อความเป็นส่วนตัว · เป็นความคิดเห็นเกี่ยวกับคลาสและ TMC ในชุมชน ไม่ใช่รีวิวเฉพาะคลาส 990 บาท</p>
    </div>
  );
}
