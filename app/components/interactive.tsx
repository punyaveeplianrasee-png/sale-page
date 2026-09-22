"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExploreMenu } from "./explore-menu";
import { Arrow, Mascot } from "./art";
import { characters, goals, questions, scoreQuiz } from "../content";

export function MobileMenu({ links }: { links: [string, string][] }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="mobile-menu"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <button
        ref={button}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <nav id="mobile-navigation" aria-label="เมนูมือถือ">
          {links.map(([href, text]) => href === "/explore" ? <ExploreMenu key={href} onNavigate={() => setOpen(false)} /> : (
            <Link href={href} key={href} onClick={() => setOpen(false)}>
              {text}
              <Arrow />
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

export function Quiz() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1, -1, -1]);
  const heading = useRef<HTMLHeadingElement>(null);
  const section = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const result = step === 5 ? scoreQuiz(answers) : null;
  useEffect(() => {
    if (initialized.current) {
      heading.current?.focus({ preventScroll: true });
      section.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    } else {
      initialized.current = true;
    }
  }, [step]);
  function reset() {
    setAnswers([-1, -1, -1, -1, -1]);
    setStep(-1);
  }
  return (
    <div className="quiz-shell spotlight-card" ref={section}>
      {step === -1 ? (
        <div className="quiz-welcome">
          <div className="mascot-lineup">
            {characters.map((c, i) => (
              <div key={c.animal}>
                <span className="mascot-index">0{i + 1}</span>
                <Mascot animal={c.animal} />
                <p>{c.name}</p>
                <small>{c.stage}</small>
              </div>
            ))}
          </div>
          <div className="quiz-welcome-bottom">
            <div>
              <h3 ref={heading} tabIndex={-1}>
                ค้นพบจุดเริ่มของคุณ
              </h3>
              <p>ไม่มีคำตอบถูกผิด เลือกข้อที่ใกล้กับตัวเองที่สุด</p>
            </div>
            <button className="button button-gold" onClick={() => setStep(0)}>
              เริ่มทำ Quiz <Arrow />
            </button>
          </div>
        </div>
      ) : result ? (
        <div className="quiz-result">
          <div className="result-intro">
            <Mascot animal={characters[result.winner].animal} large />
            <p className="eyebrow">
              YOUR NEXT STEP · STAGE {result.winner + 1}
            </p>
            <h3 ref={heading} tabIndex={-1}>
              {characters[result.winner].name}
            </h3>
            <span className="tag gold-tag">
              {characters[result.winner].stage}
            </span>
            <p>{characters[result.winner].intro}</p>
            <button onClick={reset} className="text-link">
              ทำ Quiz ใหม่ ↻
            </button>
          </div>
          <div className="result-details">
            <p className="eyebrow">A LITTLE MORE ABOUT YOU</p>
            <h4>จุดที่ควรเริ่มฝึก</h4>
            <p>{characters[result.winner].pain}</p>
            {result.tied && (
              <p className="result-note">
                คำตอบสะท้อนหลายความต้องการ เราจึงเสนอให้เริ่มจากพื้นฐานก่อน
              </p>
            )}
            {result.secondary !== undefined && (
              <p className="fine-print">
                สิ่งที่คำตอบสะท้อนเพิ่มเติม: {characters[result.secondary].pain}
              </p>
            )}
            <h4>ก้าวถัดไปของคุณ</h4>
            <p>{characters[result.winner].next}</p>
            <div className="goal-note">
              <h4>เชื่อมกับเป้าหมายที่คุณเลือก</h4>
              <p>{goals[result.goal]}</p>
            </div>
            <p>{characters[result.winner].course}</p>
            <Link href="/#course" className="button button-gold">
              ดูคลาสเริ่มต้น 990 บาท <Arrow />
            </Link>
            <details className="result-future">
              <summary>
                เส้นทางต่อยอดเครื่องมือและ TMC <span>+</span>
              </summary>
              <p>{characters[result.winner].future}</p>
              <a href="#tools" className="text-link">
                ดูเครื่องมือและ TMC <Arrow />
              </a>
            </details>
            <button className="text-link" onClick={() => setStep(4)}>
              ← กลับไปแก้คำตอบ
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-question">
          <div className="quiz-progress">
            <span className="eyebrow">YOUR STARTING POINT</span>
            <span>คำถามที่ {step + 1} / 5</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="ความคืบหน้าคำถาม"
            aria-valuenow={step + 1}
            aria-valuemin={0}
            aria-valuemax={5}
          >
            <span style={{ width: `${(step + 1) * 20}%` }} />
          </div>
          <h3 ref={heading} tabIndex={-1} id="quiz-question-title">
            {questions[step].title}
          </h3>
          <fieldset
            aria-labelledby="quiz-question-title"
            className="quiz-options"
          >
            <legend className="sr-only">เลือกคำตอบที่ตรงกับคุณ</legend>
            {questions[step].options.map((option, i) => (
              <label
                key={`${step}-${i}`}
                className={answers[step] === i ? "selected" : ""}
              >
                <input
                  type="radio"
                  name={`question-${step}`}
                  value={i}
                  checked={answers[step] === i}
                  onChange={() =>
                    setAnswers((old) =>
                      old.map((a, index) => (index === step ? i : a)),
                    )
                  }
                />
                <span className="option-letter">{"ABCD"[i]}</span>
                <span>{option}</span>
                <span className="radio-dot" />
              </label>
            ))}
          </fieldset>
          <div className="quiz-controls">
            <button className="text-link" onClick={() => setStep(step - 1)}>
              ← {step === 0 ? "กลับหน้าเริ่มต้น" : "ข้อก่อนหน้า"}
            </button>
            <button
              className="button button-gold"
              disabled={answers[step] < 0}
              onClick={() => setStep(step + 1)}
            >
              {step === 4 ? "ดูผลลัพธ์ของฉัน" : "ข้อต่อไป"}
              <Arrow />
            </button>
          </div>
        </div>
      )}
      <p className="quiz-disclaimer">
        ผลนี้ช่วยเลือกจุดเริ่มเรียนจากคำตอบ ไม่ใช่การรับรองทักษะหรือผลการเทรด ·
        ไม่ต้องกรอกข้อมูลติดต่อ
      </p>
    </div>
  );
}

export function ToolPlans() {
  const [plan, setPlan] = useState<0 | 1>(0);
  const packages = [
    { label: "4 เดือน", price: 685, months: 4 },
    { label: "1 ปี", price: 1649, months: 12 },
  ];
  const tradingDaysPerMonth = 20;
  const dailySaving = (1 - (1649 / 240) / (685 / 80)) * 100;
  return (
    <div className="plans spotlight-card">
      <div
        className="plan-toggle"
        role="group"
        aria-label="เลือกระยะเวลาแพ็กเกจเครื่องมือ"
      >
        <button aria-pressed={plan === 0} onClick={() => setPlan(0)}>
          4 เดือน
        </button>
        <button aria-pressed={plan === 1} onClick={() => setPlan(1)}>
          1 ปี
        </button>
      </div>
      <div className="plan-summary" aria-live="polite">
        <div>
          <span className="eyebrow">GSS + TTS + TMC</span>
          <h3>สิทธิ์เหมือนกัน เลือกระยะเวลาที่เหมาะกับคุณ</h3>
        </div>
        <p className="tool-price">
          {plan === 0 ? "$685" : "$1,649"}
          <span>/ {plan === 0 ? "4 เดือน" : "1 ปี"}</span>
        </p>
      </div>
      <div className="daily-cost-comparison" aria-label="เปรียบเทียบค่าใช้จ่ายเฉลี่ยต่อวัน">
        {packages.map((item, index) => {
          const days = item.months * tradingDaysPerMonth;
          return (
            <div className={`daily-cost-card ${plan === index ? "daily-cost-selected" : ""}`} key={item.label}>
              <div className="daily-cost-heading"><span>{item.label}</span>{index === 1 && <span className="daily-value-badge">เฉลี่ยต่อวันต่ำกว่า</span>}</div>
              <p className="daily-cost-value">${(item.price / days).toFixed(2)}<span>/ วัน</span></p>
            </div>
          );
        })}
      </div>
      <p className="daily-cost-saving">แพ็กเกจ 1 ปี มีค่าใช้จ่ายเฉลี่ยต่อวันต่ำกว่าประมาณ {dailySaving.toFixed(1)}%</p>
      <p className="daily-cost-note">เฉลี่ยตามฐาน 20 วันต่อเดือน · ชำระเป็นแพ็กเกจ ไม่ใช่รายวัน<br />ชำระเต็มแพ็กเกจ: 4 เดือน $685 หรือ 1 ปี $1,649 · สิทธิ์เหมือนกัน ต่างเฉพาะระยะเวลา</p>
    </div>
  );
}
