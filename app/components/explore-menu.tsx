"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Arrow } from "./art";

const topics = [
  ["quiz", "01", "ค้นหาสไตล์ของคุณ", "Quiz 5 ข้อ เพื่อหาจุดเริ่มที่เหมาะกับคุณ"],
  ["calculator", "02", "คำนวณเป้าหมาย", "ลองคำนวณทุนจากเป้าหมายและความเสี่ยง"],
  ["tools", "03", "เครื่องมือ & TMC", "รู้จัก GSS, TTS และโปรแกรมฝึกกับโค้ช"],
];

export function ExploreMenu({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  return <div className="explore-menu" ref={root}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        event.stopPropagation();
        setOpen(false);
        trigger.current?.focus();
      }
    }}>
    <button type="button" className="explore-menu-trigger" ref={trigger} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
      สำรวจเพิ่มเติม <span aria-hidden="true" className="explore-menu-chevron">⌄</span>
    </button>
    {open && <div className="explore-menu-panel" id={panelId}>
      <p className="explore-menu-caption">เลือกหัวข้อที่อยากสำรวจ</p>
      {topics.map(([hash, number, title, description]) => <Link href={`/explore#${hash}`} className="explore-menu-item" key={hash} onClick={() => { setOpen(false); onNavigate?.(); }}>
        <span className="explore-menu-number">{number}</span>
        <span className="explore-menu-copy"><strong>{title}</strong><small>{description}</small></span>
        <Arrow />
      </Link>)}
    </div>}
  </div>;
}
