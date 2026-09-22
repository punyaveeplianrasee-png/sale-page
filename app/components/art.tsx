export function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}
export function Mark() {
  return (
    <svg viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <path d="M4 7h34v7H25v23h-8V14H4z" fill="currentColor" />
      <path d="M28 20h10v6H28z" fill="currentColor" opacity=".55" />
    </svg>
  );
}
export function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    book: "M3 4h6a4 4 0 0 1 4 4v13a4 4 0 0 0-4-3H3V4Zm10 4a4 4 0 0 1 4-4h4v14h-4a4 4 0 0 0-4 3",
    clock: "M12 7v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
    chat: "M21 11a8 8 0 0 1-8 8H7l-5 3 2-7a8 8 0 0 1-1-4 9 9 0 0 1 18 0ZM7 10h10M7 14h6",
    eye: "M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Zm15 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    trend: "M3 19 9 12l4 3 8-12M14 3h7v7",
    range: "M3 4h18M3 20h18M3 15l5-6 5 6 7-6",
    people:
      "M9 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 22v-3a7 7 0 0 1 14 0v3M16 5a4 4 0 0 1 0 8M19 16a5 5 0 0 1 3 5",
    info: "M12 11v6m0-11v2m10 4a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  };
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.book} />
    </svg>
  );
}
export function MarketArt({ mode = "trend" }: { mode?: "trend" | "range" }) {
  const values =
    mode === "trend"
      ? [158, 147, 162, 135, 115, 127, 108, 90, 101, 78, 66, 80, 54, 36]
      : [97, 67, 51, 84, 113, 134, 94, 60, 47, 81, 115, 126, 92, 68];
  return (
    <svg
      className="market-art"
      viewBox="0 0 340 210"
      fill="none"
      aria-hidden="true"
    >
      {[35, 75, 115, 155, 195].map((y) => (
        <path key={y} d={`M10 ${y}H330`} stroke="currentColor" opacity=".1" />
      ))}
      {values.map((y, i) => (
        <g key={i} opacity={i % 3 === 0 ? 0.45 : 1} stroke="currentColor">
          <path d={`M${15 + i * 24} ${y - 17}v60`} />
          <rect
            x={8 + i * 24}
            y={y}
            width="14"
            height={i % 3 === 0 ? 19 : 29}
            fill={i % 3 === 0 ? "#1b1d22" : "currentColor"}
          />
        </g>
      ))}
      {mode === "range" && (
        <>
          <path
            d="M5 43H335M5 162H335"
            stroke="currentColor"
            strokeDasharray="4 5"
            opacity=".55"
          />
          <rect
            x="5"
            y="43"
            width="330"
            height="119"
            fill="currentColor"
            opacity=".03"
          />
        </>
      )}
    </svg>
  );
}
export function Mascot({
  animal,
  large = false,
}: {
  animal: "dog" | "rabbit" | "cat" | "beaver";
  large?: boolean;
}) {
  const base =
    animal === "rabbit"
      ? "#eee4d2"
      : animal === "cat"
        ? "#c8bfae"
        : animal === "beaver"
          ? "#a47d4c"
          : "#d5b77d";
  return (
    <svg
      className={`mascot ${large ? "mascot-large" : ""}`}
      viewBox="0 0 180 180"
      aria-hidden="true"
    >
      <ellipse cx="90" cy="158" rx="48" ry="8" fill="#000" opacity=".25" />
      {animal === "rabbit" ? (
        <>
          <ellipse
            cx="64"
            cy="50"
            rx="15"
            ry="37"
            fill={base}
            transform="rotate(-14 64 50)"
          />
          <ellipse
            cx="116"
            cy="50"
            rx="15"
            ry="37"
            fill={base}
            transform="rotate(14 116 50)"
          />
          <ellipse
            cx="64"
            cy="47"
            rx="6"
            ry="25"
            fill="#cbaaa0"
            transform="rotate(-14 64 47)"
          />
          <ellipse
            cx="116"
            cy="47"
            rx="6"
            ry="25"
            fill="#cbaaa0"
            transform="rotate(14 116 47)"
          />
        </>
      ) : animal === "cat" ? (
        <>
          <path d="m45 80-2-48 42 30m50 18 2-48-42 30" fill={base} />
          <path d="m50 66-2-24 20 17m62 7 2-24-20 17" fill="#ae887d" />
        </>
      ) : (
        <>
          <ellipse
            cx="45"
            cy="83"
            rx={animal === "dog" ? 20 : 17}
            ry={animal === "dog" ? 35 : 20}
            fill="#886744"
            transform="rotate(15 45 83)"
          />
          <ellipse
            cx="135"
            cy="83"
            rx={animal === "dog" ? 20 : 17}
            ry={animal === "dog" ? 35 : 20}
            fill="#886744"
            transform="rotate(-15 135 83)"
          />
        </>
      )}
      <ellipse cx="90" cy="106" rx="51" ry="48" fill={base} />
      <ellipse cx="90" cy="128" rx="30" ry="22" fill="#f2dfbb" />
      <ellipse cx="70" cy="103" rx="4" ry="6" fill="#2e2721" />
      <ellipse cx="110" cy="103" rx="4" ry="6" fill="#2e2721" />
      <circle cx="71" cy="101" r="1.3" fill="white" />
      <circle cx="111" cy="101" r="1.3" fill="white" />
      <path d="M84 117q6-5 12 0-1 7-6 7t-6-7" fill="#674c3c" />
      <path
        d="M90 124v5m-11 0q5 9 11 0 6 9 11 0"
        stroke="#674c3c"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="58" cy="119" rx="7" ry="4" fill="#c18779" opacity=".5" />
      <ellipse cx="122" cy="119" rx="7" ry="4" fill="#c18779" opacity=".5" />
      {animal === "beaver" && (
        <>
          <rect x="82" y="133" width="16" height="12" rx="3" fill="#fff7e8" />
          <path d="M90 133v12" stroke="#bca886" />
        </>
      )}
      {animal === "cat" && (
        <g stroke="#786d5c" strokeWidth="1.5">
          <path d="m58 123-20-5m20 12-21 2m85-9 20-5m-20 12 21 2" />
        </g>
      )}
      <path d="M66 149q24 12 48 0l-6 13H72Z" fill="#c8a653" />
      <circle cx="90" cy="157" r="4" fill="#756034" />
    </svg>
  );
}
