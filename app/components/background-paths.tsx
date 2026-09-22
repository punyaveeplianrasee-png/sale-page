// Adapted from Kokonut UI Background Paths by Dorian Baffier (MIT).
// See docs/licenses/kokonutui.txt. Deterministic SVG with CSS motion.
interface Point {
  x: number;
  y: number;
}

// Path generation function
function generateAestheticPath(
  index: number,
  position: number,
  type: "primary" | "secondary" | "accent"
): string {
  const baseAmplitude =
    type === "primary" ? 150 : type === "secondary" ? 100 : 60;
  const phase = index * 0.2;
  const points: Point[] = [];
  const segments = type === "primary" ? 10 : type === "secondary" ? 8 : 6;

  const startX = 2400;
  const startY = 800;
  const endX = -2400;
  const endY = -800 + index * 25;

  for (let i = 0; i <= segments; i++) {
    const progress = i / segments;
    const eased = 1 - (1 - progress) ** 2;

    const baseX = startX + (endX - startX) * eased;
    const baseY = startY + (endY - startY) * eased;

    const amplitudeFactor = 1 - eased * 0.3;
    const wave1 =
      Math.sin(progress * Math.PI * 3 + phase) *
      (baseAmplitude * 0.7 * amplitudeFactor);
    const wave2 =
      Math.cos(progress * Math.PI * 4 + phase) *
      (baseAmplitude * 0.3 * amplitudeFactor);
    const wave3 =
      Math.sin(progress * Math.PI * 2 + phase) *
      (baseAmplitude * 0.2 * amplitudeFactor);

    points.push({
      x: baseX * position,
      y: baseY + wave1 + wave2 + wave3,
    });
  }

  const pathCommands = points.map((point: Point, i: number) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prevPoint = points[i - 1];
    const tension = 0.4;
    const cp1x = prevPoint.x + (point.x - prevPoint.x) * tension;
    const cp1y = prevPoint.y;
    const cp2x = prevPoint.x + (point.x - prevPoint.x) * (1 - tension);
    const cp2y = point.y;
    return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  });

  return pathCommands.join(" ");
}


export function BackgroundPaths() {
  return (
    <div className="gold-paths" aria-hidden="true">
      <svg viewBox="-2400 -800 4800 1600" fill="none" preserveAspectRatio="xMidYMid slice">
        <g>
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={generateAestheticPath(i, 1, "primary")}
              stroke="currentColor" strokeWidth={2 + i * 0.2}
              opacity={0.13 + i * 0.018} />
          ))}
        </g>
        <g className="gold-paths-secondary">
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={generateAestheticPath(i + 3, -1, "secondary")}
              stroke="currentColor" strokeWidth="2" opacity="0.14" />
          ))}
        </g>
      </svg>
    </div>
  );
}
