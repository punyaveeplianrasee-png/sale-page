"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Arrow, Mark } from "./art";
import { LINE, LINE_ID } from "../content";

type ContactMode = "payment" | "inquiry";
const LineContext = createContext<((trigger: HTMLButtonElement, mode: ContactMode) => void) | null>(null);

function BankAccount() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  return <div className="line-bank-account">
    <div className="line-bank-details">
      <span>ธนาคารกสิกร</span>
      <strong>237-112-2934</strong>
      <span>ชื่อบัญชี: บจก.อีลีท โกลด์</span>
    </div>
    <button type="button" aria-label="คัดลอกเลขบัญชี 237-112-2934" onClick={async () => {
      try {
        await navigator.clipboard.writeText("2371122934");
        setStatus("copied");
      } catch {
        setStatus("error");
      }
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></svg>
      คัดลอก
    </button>
    <p role="status" className="line-bank-status">{status === "copied" ? "คัดลอกเลขบัญชีแล้ว" : status === "error" ? "คัดลอกไม่สำเร็จ แตะค้างที่เลขบัญชีเพื่อคัดลอกได้ครับ" : ""}</p>
  </div>;
}

export function LineContact({ children, className = "", mode = "payment" }: { children: ReactNode; className?: string; mode?: ContactMode }) {
  const open = useContext(LineContext);
  return <button type="button" className={`line-contact-trigger ${className}`} aria-haspopup="dialog" onClick={(event) => open?.(event.currentTarget, mode)}>{children}</button>;
}

export function LineContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ContactMode>("payment");
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return <LineContext.Provider value={(trigger, nextMode) => { lastTrigger.current = trigger; setMode(nextMode); setOpen(true); }}>
    {children}
    {open && createPortal(
      <dialog ref={dialog} className="line-contact-dialog" aria-labelledby={titleId} aria-describedby={descriptionId}
        onClose={() => { setOpen(false); lastTrigger.current?.focus({ preventScroll: true }); }}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="line-contact-panel">
          <button type="button" className="line-contact-close" aria-label="ปิดหน้าต่าง LINE" onClick={() => dialog.current?.close()}><span aria-hidden="true">✕</span></button>
          <div className="line-contact-brand"><Mark /><span>TRADE THE FUTURE</span></div>
          <h2 id={titleId} className="line-payment-title">{mode === "inquiry" ? "มาคุยกันครับ" : "ข้อมูลการชำระเงิน"}</h2>
          {mode === "payment" && <BankAccount />}
          <p id={descriptionId} className="line-transfer-help">{mode === "inquiry" ? "มีคำถาม ทักมาสอบถามผมได้เลย" : "ส่งหลักฐานการโอนมาที่"}</p>
          <span className="line-contact-badge"><i aria-hidden="true" />LINE OA</span>
          <div className="line-qr-frame">
            <span className="line-qr-corner line-qr-corner-tl" aria-hidden="true" />
            <span className="line-qr-corner line-qr-corner-tr" aria-hidden="true" />
            <span className="line-qr-corner line-qr-corner-bl" aria-hidden="true" />
            <span className="line-qr-corner line-qr-corner-br" aria-hidden="true" />
            <Image src="/images/line-tradethefuture-qr.png" alt="QR Code เพิ่มเพื่อน LINE @tradethefuture" width={740} height={740} unoptimized />
          </div>
          <p className="line-contact-identity">Future <span>· Trade the Future</span></p>
          <div className="line-contact-handle"><span>LINE @</span><strong>{LINE_ID}</strong></div>
          <p className="line-scan-help">เปิด LINE → เพิ่มเพื่อน → QR Code</p>
          <a className="line-open-app" href={LINE}>เปิด LINE บนเครื่องนี้ <Arrow /></a>
          <p className="line-mobile-help">ใช้มือถืออยู่? กดปุ่มด้านบนได้เลย</p>
        </div>
      </dialog>, document.body,
    )}
  </LineContext.Provider>;
}
