// Titles and runtimes transcribed from the supplied course screenshots.
// Descriptions are brief topic summaries, not video transcripts.
export const courseModules = [
  { title: "Elite Gold Zone", description: "รู้จักการใช้โซนประจำวัน", clips: [
    ["วิธีใช้งาน Daily Zone", "ทำความเข้าใจวิธีใช้งาน Daily Zone ประกอบการดูกราฟ", "12:01"],
  ] },
  { title: "Basic Class", description: "พื้นฐานและการใช้งานแพลตฟอร์ม", clips: [
    ["วิธีใช้งาน MT5 สำหรับการ Trade ในตลาด Forex", "รู้จักแพลตฟอร์ม MT5 และการใช้งานสำหรับเทรด Forex", "33:27"],
    ["สอนใช้งาน TradingView", "ทำความคุ้นเคยกับเครื่องมือดูกราฟบน TradingView", "29:09"],
    ["Basic Forex EP.1", "ปูพื้นฐานคำศัพท์และแนวคิดเบื้องต้นของตลาด Forex", "28:29"],
    ["Basic Forex EP.2", "ต่อยอดพื้นฐาน พร้อมมุมมองด้าน Psychology และ Mindset", "28:21"],
  ] },
  { title: "Technical Analysis", description: "อ่านกราฟและสร้างแผนเทรด", clips: [
    ["วิธีอ่านแนวโน้มของตลาด (Trendline) พร้อมจุดเข้าเทรด", "อ่านทิศทางตลาดด้วย Trendline และพิจารณาจังหวะเข้าเทรด", "16:15"],
    ["วิธีอ่านโครงสร้างตลาด Market Structure", "ทำความเข้าใจโครงสร้างและการเปลี่ยนทิศทางของราคา", "7:40"],
    ["สอนตีแนวรับ–แนวต้าน พร้อมหาจุดเข้าเทรด", "ระบุแนวรับและแนวต้านเพื่อประกอบแผนเข้าเทรด", "11:22"],
    ["วิธีการตี Demand & Supply Zone พร้อมจุดเข้าเทรด", "รู้จักโซน Demand และ Supply สำหรับวิเคราะห์ราคา", "15:52"],
    ["วิธีการตี Fibonacci Retracement หาจุดเข้าเทรด", "ใช้ Fibonacci Retracement พิจารณาระดับการย่อตัว", "18:01"],
    ["การอ่านพฤติกรรมแท่งเทียน Price Action", "อ่านพฤติกรรมราคาผ่านรูปแบบแท่งเทียน", "13:44"],
    ["การอ่าน Chart Pattern พร้อมหาจังหวะเข้าเทรด", "ทำความเข้าใจรูปแบบกราฟและจังหวะที่เกี่ยวข้อง", "20:46"],
    ["Indicator STO & RSI", "รู้จักการอ่าน Indicator STO และ RSI", "15:08"],
    ["วิธีการสร้าง Trade Setup ด้วยตัวเอง", "นำแนวคิดการวิเคราะห์มาประกอบเป็น Trade Setup", "17:12"],
  ] },
  { title: "SMC Class", description: "เข้าใจแนวคิด Smart Money Concept", clips: [
    ["What is SMC", "รู้จักแนวคิด Smart Money Concept", "2:54"],
    ["Market Structure SMC", "อ่านโครงสร้างตลาดในมุมมอง SMC", "12:09"],
    ["Order Block", "ทำความเข้าใจ Order Block ในการวิเคราะห์กราฟ", "19:03"],
    ["Fair Value Gap", "รู้จัก Fair Value Gap และการสังเกตบนกราฟ", "12:11"],
    ["Liquidity", "ทำความเข้าใจสภาพคล่องในมุมมอง SMC", "16:14"],
    ["Trade Setup SMC", "ประกอบแนวคิด SMC เป็นแผนเข้าเทรด", "14:07"],
  ] },
  { title: "Algo Prime Tools", description: "รู้จัก GSS และ TTS ผ่านตัวอย่าง", clips: [
    ["เครื่องมือ GSS สายเทรดสั้น", "เรียนรู้แนวทางใช้ GSS สำหรับการเทรดระยะสั้น", "26:26"],
    ["เครื่องมือ TTS สายเทรด Trend Follow เน้น R:R", "เรียนรู้แนวทางตามเทรนด์ด้วย TTS และอัตราส่วนผลตอบแทนต่อความเสี่ยง", "16:10"],
    ["Recap Order GSS+TTS", "ทบทวนตัวอย่างออร์เดอร์จากการใช้ GSS และ TTS", "8:19"],
  ] },
  { title: "Daily Zone Volatility", description: "เรียนรู้การใช้งาน DZV", clips: [
    ["เทรดง่าย ๆ ด้วยเครื่องมือ DZV", "ทำความรู้จักเครื่องมือ Daily Zone Volatility และแนวทางใช้งาน", "55:48"],
  ] },
  { title: "Master Class ย้อนหลังรอบสด", description: "ทบทวนคลาสฉบับเต็ม", clips: [
    ["Master Class 15/02/26", "รับชมบันทึกคลาสสดวันที่ 15 กุมภาพันธ์ 2026", "4:51:44"],
  ] },
];

export function CourseCurriculum() {
  return <details className="course-master">
    <summary className="course-master-summary">
      <span className="course-master-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v15M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Z" /></svg></span>
      <span className="course-master-heading"><strong>เนื้อหาในคลาส</strong><span>25 คลิป · 7 หมวดบทเรียน</span></span>
      <span className="course-master-action"><span className="course-master-show">ดูเนื้อหา</span><span className="course-master-hide">ซ่อนเนื้อหา</span><span className="course-master-plus" aria-hidden="true">+</span></span>
    </summary>
    <div className="course-modules">
    {courseModules.map((module, index) => <details className="course-module" key={module.title}>
      <summary>
        <span className="course-module-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="course-module-heading"><strong>{module.title}</strong><span>{module.description}</span></span>
        <span className="course-module-count">{module.clips.length} คลิป</span>
        <span className="course-module-toggle" aria-hidden="true">+</span>
      </summary>
      <ol className="course-clips">
        {module.clips.map(([title, description, duration], clipIndex) => <li key={title}>
          <span className="course-clip-number">{String(clipIndex + 1).padStart(2, "0")}</span>
          <div><h3>{title}</h3><p>{description}</p></div>
          <span className="course-clip-duration" aria-label={`ความยาว ${duration}`}><span aria-hidden="true">◷ </span>{duration}</span>
        </li>)}
      </ol>
    </details>)}
    <p className="fine-print course-runtime-note">เวลาแสดงเป็น นาที:วินาที หรือ ชั่วโมง:นาที:วินาที</p>
    </div>
  </details>;
}
