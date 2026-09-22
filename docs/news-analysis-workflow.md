# Weekly News Analysis

Scheduled in this Codex thread: Mondays at 06:00 Asia/Bangkok. This is a weekly calendar outlook, not live release monitoring. The computer and desktop app must be running. No API key is used.

## Scope and evidence

- Read https://www.investing.com/economic-calendar/ using browser tools if necessary. Select the current Monday–Friday range in Thailand; confirm the source timezone explicitly. Never infer the three-star rating from an event name.
- Include only verified three-star events relevant to gold within Monday–Friday 08:00 inclusive to 17:00 exclusive America/New_York. This includes pre-equity-open US macro releases. Respect US daylight saving time. Store timestamps with an explicit UTC offset or Z.
- Group on the page by Thai calendar date and display Monday–Friday only, per the user's September 20 request. Omit Saturday/Sunday sections and events dated on those days in Thailand, including Friday NY events that fall on Saturday Thai time. The heading date range also ends on Friday.
- Summarize in original Thai, 1–3 short sentences. Explain conditional gold upside/downside scenarios, not buy/sell instructions or guaranteed direction. Weekly collection cannot claim the actual result is known. Do not copy articles.
- Confirm the full daily calendar before marking a Thai date verified (including previous NY afternoon after Thai midnight). Missing/inaccessible data is unknown, not zero events. No bypassing access controls, paywalls, or CAPTCHAs. Report blockers.

## Update contract

Only edit `public/data/news-week.json`. Schema is `NewsWeek` in `app/news-analysis/calendar.ts`:

```
{
  "weekStart": "YYYY-MM-DD (Monday, Thai calendar)",
  "checkedAt": "ISO 8601 with timezone",
  "verifiedDays": ["YYYY-MM-DD"],
  "events": [{
    "id": "stable source event/date id",
    "title": "Short Thai event title",
    "startsAt": "ISO 8601 with timezone",
    "importance": 3,
    "summary": "Short original Thai summary",
    "up": "Conditional scenario supporting gold",
    "down": "Conditional scenario weighing on gold",
    "sourceUrl": "https://www.investing.com/economic-calendar/..."
  }]
}
```

Validate before atomically replacing the JSON. Unique event IDs, explicit timestamps, sorted ascending, only this week. Run `npm test` and verify the JSON passes `isNewsWeek`. Preserve source evidence in a dated note under docs/news-sources if any entries are published, noting the calendar timezone, star ratings, date range, URLs, and access time. No unrelated edits or commits.

The browser reads the public JSON without cache on load and every five minutes, so updating it on the running local server needs no weekly rebuild. The browser checks time every 15 seconds and upon returning to the tab, greying past scheduled events. It never describes grey events as confirmed releases. Old-week entries are hidden at rollover; unverified days show a waiting message. A fetch failure is displayed, not silently called fresh.

An initial verified snapshot for September 22–26 was collected on September 20 at the user's request. The UI can preview the immediately upcoming week with an explicit NEXT WEEK label; it still hides stale or more distant weeks. Never fill missing days with mock events. If a new week cannot be verified, preserve the last verified file with its original dates; the UI hides stale events. Public hosting requires a separately authorized deployment/publishing integration; a local file update does not publish a remote site.
