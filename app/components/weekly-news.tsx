"use client";

import { useEffect, useState } from "react";
import { emptyWeek, eventsForDay, hasPassed, isNewsWeek, thaiDate, visibleWeekDays, type NewsWeek } from "../news-analysis/calendar";

const displayDate = (date: string) => new Intl.DateTimeFormat("th-TH", { timeZone: "Asia/Bangkok", day: "numeric", month: "short" }).format(new Date(`${date}T12:00:00+07:00`));
const dayName = (date: string) => new Intl.DateTimeFormat("th-TH", { timeZone: "Asia/Bangkok", weekday: "long" }).format(new Date(`${date}T12:00:00+07:00`));
const displayTime = (date: string) => new Intl.DateTimeFormat("th-TH", { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(date));

export function WeeklyNews() {
  const [now, setNow] = useState<number | null>(null);
  const [data, setData] = useState<NewsWeek>(emptyWeek);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const tick = () => setNow(Date.now());
    const refresh = async () => {
      try {
        const response = await fetch("/data/news-week.json", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("News unavailable");
        const next: unknown = await response.json();
        if (!isNewsWeek(next)) throw new Error("Invalid news data");
        if (active) { setData(next); setFailed(false); }
      } catch { if (active) setFailed(true); }
    };
    tick(); void refresh();
    const clock = window.setInterval(tick, 15000);
    const feed = window.setInterval(refresh, 300000);
    const resume = () => { tick(); if (!document.hidden) void refresh(); };
    document.addEventListener("visibilitychange", resume);
    return () => { active = false; controller.abort(); clearInterval(clock); clearInterval(feed); document.removeEventListener("visibilitychange", resume); };
  }, []);
  if (now === null) return <p className="news-loading" role="status">กำลังเตรียมปฏิทินประจำสัปดาห์…</p>;
  const days = visibleWeekDays(data, now).slice(0, 5);
  const current = data.weekStart === days[0];
  const today = thaiDate(now);
  return <section aria-label="ข่าวทองประจำสัปดาห์" className="weekly-news">
    <div className="news-week-heading"><div><p className="eyebrow">{days[0] > today ? "NEXT WEEK · ดูข่าวล่วงหน้า" : "THIS WEEK"}</p><h2>{displayDate(days[0])} — {displayDate(days[4])}</h2><p>เวลาไทย (UTC+7) · รอบสรุปทุกวันจันทร์ 06:00 น.</p></div><a href="https://www.investing.com/economic-calendar/" target="_blank" rel="noopener noreferrer">Investing.com ↗</a></div>
    <div className="news-week-status" role="status">{failed ? "ตรวจข้อมูลล่าสุดไม่ได้ ข้อมูลที่มีอาจยังไม่เป็นปัจจุบัน" : !current ? "รอตรวจสอบปฏิทินประจำสัปดาห์นี้" : "สรุปแผนข่าวประจำสัปดาห์ · ไม่ใช่ผลประกาศสด"}{data.checkedAt && <span>ตรวจสอบล่าสุด {new Intl.DateTimeFormat("th-TH", { timeZone: "Asia/Bangkok", dateStyle: "medium", timeStyle: "short" }).format(new Date(data.checkedAt))} น.</span>}</div>
    <div className="news-day-list">{days.map(day => {
      const events = current ? eventsForDay(data, day) : [];
      const verified = current && data.verifiedDays.includes(day);
      return <section key={day} className={`news-day${day < today ? " news-day-past" : ""}${day === today ? " news-day-today" : ""}`} aria-label={`${dayName(day)} ${displayDate(day)}`}>
        <div className="news-day-label"><span>{displayDate(day)}</span><h3>{dayName(day)}</h3>{day === today && <b>วันนี้</b>}</div>
        <div className="news-day-content">{events.length ? events.map(event => {
          const passed = hasPassed(event.startsAt, now);
          return <article key={event.id} className={`news-card weekly-event${passed ? " news-event-past" : ""}`}>
            <div className="news-card-top"><time dateTime={event.startsAt}>{displayTime(event.startsAt)} น.</time><span className="news-category" aria-label="ความสำคัญ 3 ดาว">★★★</span><span className="news-event-state">{passed ? "ผ่านเวลาที่กำหนดแล้ว" : "รอประกาศ"}</span></div>
            <h4>{event.title}</h4><p className="news-summary">{event.summary}</p>
            <div className="news-impacts"><div className="news-impact news-up"><span aria-hidden="true">↗</span><div><h5>อาจหนุนทองขึ้น</h5><p>{event.up}</p></div></div><div className="news-impact news-down"><span aria-hidden="true">↘</span><div><h5>อาจกดดันทองลง</h5><p>{event.down}</p></div></div></div>
            <a className="news-event-source" href={event.sourceUrl} target="_blank" rel="noopener noreferrer">อ้างอิง Investing.com ↗</a>
          </article>;
        }) : <p className="news-day-empty">{verified ? "ไม่พบข่าว 3 ดาวที่เข้าเกณฑ์ในวันนี้ จากการตรวจสอบล่าสุด" : "รอตรวจสอบรายการข่าว"}</p>}{events.length > 0 && !verified && <p className="news-day-empty">ยังตรวจสอบรายการของวันนี้ไม่ครบ</p>}</div>
      </section>;
    })}</div>
    <p className="news-week-footnote">คัดข่าวที่เกี่ยวกับทองในช่วง 08:00–17:00 น. นิวยอร์ก · แบ่งวันตามเวลาไทย · สีเทาหมายถึงผ่านเวลาที่กำหนด ไม่ได้ยืนยันว่าตัวเลขออกแล้ว<br />เวลาและตัวเลขคาดการณ์อาจเปลี่ยนแปลงหลังการตรวจสอบ บทวิเคราะห์เป็นการตีความของ Trade the Future ไม่ใช่คำแนะนำจาก Investing.com</p>
  </section>;
}
