"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function ChartPreview({ src, alt, name }: { src: string; alt: string; name: string }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="tool-chart-image chart-preview-trigger"
        aria-label={`ดูภาพ ${name} ขนาดใหญ่`}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Image src={src} alt={alt} width={2770} height={1682} sizes="(max-width: 800px) 90vw, 40vw" />
        <span className="chart-watermark" aria-hidden="true">Trade the Future</span>
        <span className="chart-preview-hint">⤢ ดูภาพใหญ่</span>
      </button>
      {open && createPortal(
        <dialog
          ref={dialog}
          className="chart-preview-dialog"
          aria-label={`ภาพตัวอย่าง ${name} ขนาดใหญ่`}
          onClose={() => { setOpen(false); trigger.current?.focus(); }}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          <div className="chart-preview-panel">
            <div className="chart-preview-toolbar">
              <strong>{name} · XAUUSD</strong>
              <button type="button" aria-label="ปิดภาพใหญ่" onClick={() => dialog.current?.close()}>ปิด <span aria-hidden="true">✕</span></button>
            </div>
            <div className="chart-preview-watermarked">
              <Image src={src} alt={alt} width={2770} height={1682} sizes="100vw" />
              <span className="chart-watermark" aria-hidden="true">Trade the Future</span>
            </div>
            <a href={src} target="_blank" rel="noopener noreferrer">เปิดภาพต้นฉบับ ↗</a>
          </div>
        </dialog>, document.body,
      )}
    </>
  );
}
