"use client";

import { useState } from "react";
import Link from "next/link";
import { SpotlightCard } from "./spotlight-card";
import { Arrow, Icon } from "./art";
import {
  calculateCapital,
  DEFAULT_RISK_PERCENT,
  MAX_PROFIT_TARGET,
  RISK_OPTIONS,
  STOP_POINTS,
  TARGET_POINTS,
} from "../capital-calculator";

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function CapitalCalculator() {
  const [target, setTarget] = useState("100");
  const [risk, setRisk] = useState<number>(DEFAULT_RISK_PERCENT);
  const numericTarget = Number(target);
  const result = target.trim() ? calculateCapital(numericTarget, risk) : null;
  const error = target.trim()
    ? result
      ? ""
      : "กรอกเป้ากำไรตั้งแต่ $0.01 ถึง $1,000,000"
    : "กรอกเป้ากำไรเพื่อดูผลคำนวณ";

  return (
    <div className="capital-calculator">
      <div className="calculator-main">
        <div className="calculator-inputs">
          <p className="eyebrow">SET YOUR SCENARIO</p>
          <label className="calc-label" htmlFor="profit-target">
            เป้ากำไรที่อยากได้ต่อวัน
          </label>
          <div className={`money-input ${error ? "input-invalid" : ""}`}>
            <span aria-hidden="true">$</span>
            <input
              id="profit-target"
              type="number"
              inputMode="decimal"
              min="0.01"
              max={MAX_PROFIT_TARGET}
              step="0.01"
              value={target}
              onChange={(event) => setTarget(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby="profit-help profit-error"
            />
            <span className="input-unit">USD</span>
          </div>
          <p id="profit-help" className="calc-helper">
            ใช้ USD ทั้งเป้ากำไรและผลคำนวณทุน
          </p>
          <p id="profit-error" className="calc-error" aria-live="polite">
            {error}
          </p>
          <div
            className="target-presets"
            role="group"
            aria-label="ตัวอย่างเป้ากำไร"
          >
            {[50, 100, 300, 500, 750, 1000].map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={numericTarget === value}
                onClick={() => setTarget(String(value))}
              >
                ${value.toLocaleString("en-US")}
              </button>
            ))}
          </div>
          <label className="calc-label" htmlFor="risk-percent">
            ความเสี่ยงต่อแผนที่ยอมรับได้
          </label>
          <select
            id="risk-percent"
            value={risk}
            onChange={(event) => setRisk(Number(event.target.value))}
            aria-describedby="risk-help"
          >
            {RISK_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}% ของทุน{value === 3 ? " · ค่าเริ่มต้น" : ""}
              </option>
            ))}
          </select>
          <p id="risk-help" className="calc-helper">
            กรณีแผนนี้ขาดทุนถึง Stop Loss หนึ่งครั้ง
          </p>
          <div className="locked-assumptions">
            <div>
              <span>ระยะทำกำไรที่กำหนด</span>
              <strong>
                {TARGET_POINTS.toLocaleString("en-US")} <small>จุด</small>
              </strong>
              <p>ราคาทองขยับ $10</p>
            </div>
            <div>
              <span>Stop Loss ที่กำหนด</span>
              <strong>
                {STOP_POINTS} <small>จุด</small>
              </strong>
              <p>ราคาทองขยับ $5</p>
            </div>
          </div>
        </div>
        <SpotlightCard
          className="calculator-result"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="calc-result-top">
            <Icon name="range" />
            <span className="eyebrow">YOUR CAPITAL SCENARIO</span>
          </div>
          <h3>ทุนตามสมมติฐานความเสี่ยง</h3>
          <p className="capital-value" data-testid="capital-value">
            {result ? dollars.format(result.displayedCapital) : "—"}
            <span>USD</span>
          </p>
          <p className="calc-result-description">
            {result ? (
              <>
                เมื่อเป้ากำไรคือ{" "}
                <strong>{dollars.format(result.profitTarget)}</strong>
                <br />
                และยอมขาดทุนตาม SL ได้ <strong>{risk}%</strong> ของทุนต่อแผน
              </>
            ) : (
              "กรอกเป้ากำไรที่ถูกต้องเพื่อเริ่มคำนวณ"
            )}
          </p>
          <div className="calc-breakdown">
            <div>
              <span>กำไรหากครบ 1,000 จุด</span>
              <strong>
                {result ? dollars.format(result.profitTarget) : "—"}
              </strong>
            </div>
            <div>
              <span>ขาดทุนหากถึง SL 500 จุด</span>
              <strong data-testid="stop-loss-value">
                {result ? dollars.format(result.lossAtStop) : "—"}
              </strong>
            </div>
            <div>
              <span>อัตราระยะกำไร : ขาดทุน</span>
              <strong>2 : 1</strong>
            </div>
          </div>
          <p className="calc-result-note">
            เป็นทุนจากสูตรความเสี่ยง
            ไม่ใช่ทุนที่รับประกันว่าจะทำกำไรได้ตามเป้าทุกวัน
          </p>
        </SpotlightCard>
      </div>
      <div className="calc-comparison">
        <div className="calc-table-heading">
          <h3>เป้าเดียวกัน ความเสี่ยงต่างกัน</h3>
          <span>เทียบเฉพาะสมมติฐาน · ไม่ใช่คำแนะนำให้เพิ่มความเสี่ยง</span>
        </div>
        <div className="calc-table-wrap">
          <table>
            <caption className="sr-only">
              เปรียบเทียบทุนสำหรับเป้ากำไรที่กรอก ภายใต้ความเสี่ยงต่อแผนต่างกัน
            </caption>
            <thead>
              <tr>
                <th scope="col">ความเสี่ยงต่อแผน</th>
                <th scope="col">ขาดทุนตาม SL</th>
                <th scope="col">ทุนตามสูตร</th>
              </tr>
            </thead>
            <tbody>
              {RISK_OPTIONS.map((value) => {
                const row = result
                  ? calculateCapital(numericTarget, value)
                  : null;
                return (
                  <tr
                    key={value}
                    className={risk === value ? "active-risk" : ""}
                    aria-current={risk === value ? "true" : undefined}
                  >
                    <th scope="row">
                      {value}%{" "}
                      {risk === value && (
                        <span className="selected-risk">ที่เลือก</span>
                      )}
                    </th>
                    <td>{row ? dollars.format(row.lossAtStop) : "—"}</td>
                    <td>{row ? dollars.format(row.displayedCapital) : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <details className="calc-formula">
        <summary>
          ตัวเลขนี้คำนวณอย่างไร?<span className="plus">+</span>
        </summary>
        <div>
          <p>ทุน = เป้ากำไร × (500 ÷ 1,000) ÷ (ความเสี่ยง % ÷ 100)</p>
          <p>
            {result
              ? `ตัวอย่างของคุณ: ${dollars.format(result.profitTarget)} × 0.5 ÷ ${risk / 100} ≈ ${dollars.format(result.displayedCapital)}`
              : "กรอกเป้ากำไรเพื่อดูการแทนค่าในสูตร"}
          </p>
          <p>
            จำลองแผนขนาดสถานะคงที่หนึ่งแผนที่ถึงเป้ากำไร หรือถึง Stop Loss
            ตัวเลขนี้ไม่ได้ประเมินโอกาสเก็บได้ 1,000 จุดจริง
            และไม่ใช่เพดานขาดทุนรวมจากหลายออร์เดอร์ต่อวัน
          </p>
          <p>
            ไม่รวม spread ค่าธรรมเนียม swap และ slippage ไม่ได้คำนวณ margin
            ที่โบรกเกอร์ต้องใช้ ขาดทุนจริงอาจต่างจากระยะ SL ที่ตั้งไว้
          </p>
          <a
            href="https://www.cmegroup.com/education/courses/trade-and-risk-management/proper-position-size"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            อ่านหลักการคำนวณความเสี่ยงจาก CME Group <Arrow />
          </a>
        </div>
      </details>
      <div className="calc-bottom">
        <p>
          ตัวเลขเป็นจุดเริ่มของการวางแผน
          <br />
          <strong>มาเรียนรู้ Money Management ให้เข้าใจมากขึ้น</strong>
        </p>
        <Link href="/#course" className="button button-outline">
          รู้จักคลาส 990 บาท <Arrow />
        </Link>
      </div>
      <p className="calc-footnote">
        ค่าเริ่มต้นเป็นตัวอย่างสำหรับทดลองคำนวณ
        ผลลัพธ์ก่อนค่าใช้จ่ายและไม่รวมข้อกำหนด margin ของโบรกเกอร์
      </p>
    </div>
  );
}
