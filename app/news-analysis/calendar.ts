export type NewsEvent = {
  id: string; title: string; startsAt: string; importance: 3;
  summary: string; up: string; down: string; sourceUrl: string;
};
export type NewsWeek = {
  weekStart: string | null; checkedAt: string | null;
  verifiedDays: string[]; events: NewsEvent[];
};
export const emptyWeek: NewsWeek = { weekStart: null, checkedAt: null, verifiedDays: [], events: [] };
export function thaiDate(now: number) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}
export function weekDays(now: number) {
  const date = new Date(`${thaiDate(now)}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
  return Array.from({ length: 7 }, (_, i) => new Date(date.getTime() + i * 86400000).toISOString().slice(0, 10));
}
export function inNewYorkSession(startsAt: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "short", hour: "2-digit", hourCycle: "h23" }).formatToParts(new Date(startsAt));
  const day = parts.find(p => p.type === "weekday")?.value;
  const hour = Number(parts.find(p => p.type === "hour")?.value);
  return day !== "Sat" && day !== "Sun" && hour >= 8 && hour < 17;
}
export function eventsForDay(data: NewsWeek, day: string) {
  return data.events.filter(event => event.importance === 3 && Number.isFinite(Date.parse(event.startsAt)) && inNewYorkSession(event.startsAt) && thaiDate(Date.parse(event.startsAt)) === day).sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
}
export function hasPassed(startsAt: string, now: number) { return Date.parse(startsAt) <= now; }
export function visibleWeekDays(data: NewsWeek, now: number) {
  const current = weekDays(now);
  const next = weekDays(Date.parse(`${current[0]}T12:00:00+07:00`) + 7 * 86400000);
  return data.weekStart === next[0] ? next : current;
}
export function isNewsWeek(value: unknown): value is NewsWeek {
  if (!value || typeof value !== "object") return false;
  const data = value as NewsWeek;
  const day = (v: unknown) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && Number.isFinite(Date.parse(v));
  return (data.weekStart === null || day(data.weekStart)) && (data.checkedAt === null || (typeof data.checkedAt === "string" && Number.isFinite(Date.parse(data.checkedAt)))) && Array.isArray(data.verifiedDays) && data.verifiedDays.every(day) && Array.isArray(data.events) && data.events.every(event => {
    if (!event || event.importance !== 3 || !/^\d{4}-.*(?:Z|[+-]\d{2}:\d{2})$/.test(event.startsAt) || !Number.isFinite(Date.parse(event.startsAt))) return false;
    if (![event.id, event.title, event.summary, event.up, event.down, event.sourceUrl].every(v => typeof v === "string" && v.trim())) return false;
    try { const url = new URL(event.sourceUrl); return url.protocol === "https:" && (url.hostname === "investing.com" || url.hostname.endsWith(".investing.com")); } catch { return false; }
  });
}
