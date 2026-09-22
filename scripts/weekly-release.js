#!/usr/bin/env node
/**
 * Weekly release notes: what changed in the free-model landscape this week.
 *
 * Why releases: the daily table updates are commits, and GitHub does not
 * notify watchers about commits. It does notify them about releases. One a
 * week is enough to be useful and not noise.
 *
 * Compares today's snapshot (data/models.json) with the newest history
 * snapshot that is at least 7 days older, and writes:
 *   release-notes.md   the body
 *   release-tag.txt    e.g. "week-2026-09-28"
 *   release-title.txt  e.g. "Free AI models — week of 28 Sep 2026: 2 new, 1 gone"
 *
 * Usage: node scripts/weekly-release.js [--today YYYY-MM-DD]
 * Never fails the workflow on odd data: missing fields degrade the notes.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HIST = join(ROOT, "data", "history");
const SITE = "https://www.zerolimitai.com";
const UTM = "utm_source=github&utm_medium=release";

const argToday = process.argv.indexOf("--today");
const today = argToday > -1 ? process.argv[argToday + 1] : new Date().toISOString().slice(0, 10);

const read = (p) => JSON.parse(readFileSync(p, "utf8"));
// `kind` exists since 2026-09-20; older snapshots listed everything as one table.
const isChat = (m) => m.kind !== "other";
const ranked = (snap) =>
  (snap.models ?? [])
    .filter(isChat)
    .filter((m) => typeof m.zo_score === "number")
    .sort((a, b) => b.zo_score - a.zo_score);

function baseline() {
  const cutoff = new Date(Date.parse(today) - 7 * 86_400_000).toISOString().slice(0, 10);
  const files = existsSync(HIST) ? readdirSync(HIST).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort() : [];
  const older = files.filter((f) => f.slice(0, 10) <= cutoff);
  const pick = older.length ? older[older.length - 1] : files[0];
  return pick ? { date: pick.slice(0, 10), snap: read(join(HIST, pick)) } : null;
}

const now = read(join(ROOT, "data", "models.json"));
const before = baseline();

const chatNow = (now.models ?? []).filter(isChat);
const chatBefore = before ? (before.snap.models ?? []).filter(isChat) : [];

// Compare against EVERY model in the other snapshot, not just its chat ones:
// a model that moved to the "not a chat model" list (Lyria, 2026-09-20) is
// still free, so it is neither new nor gone.
const allIdsNow = new Set((now.models ?? []).map((m) => m.id));
const allIdsBefore = new Set(before ? (before.snap.models ?? []).map((m) => m.id) : []);
const added = before ? chatNow.filter((m) => !allIdsBefore.has(m.id)) : [];
const gone = before ? chatBefore.filter((m) => !allIdsNow.has(m.id)) : [];

const topNow = ranked(now)[0] ?? null;
const topBefore = before ? ranked(before.snap)[0] ?? null : null;
const topChanged = topNow && topBefore && topNow.id !== topBefore.id;

const fmtDate = (d) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const link = (m) => (m.source ? `[${m.name}](${m.source})` : m.name);
const ctx = (n) => (!n ? "" : n >= 1_000_000 ? ` · ${Math.round(n / 100_000) / 10}M context` : ` · ${Math.round(n / 1000)}K context`);

const lines = [];
lines.push(`**${chatNow.length} free chat models** tracked on ${fmtDate(today)}${before ? `, against ${chatBefore.length} on ${fmtDate(before.date)}` : ""}.`);
lines.push("");

if (topNow) {
  if (topChanged) {
    lines.push(`### New #1: ${topNow.name}`);
    lines.push(`Replaces ${topBefore.name} at the top of the ranking.`);
  } else {
    lines.push(`### #1 this week: ${topNow.name}`);
  }
  lines.push("");
  const top5 = ranked(now).slice(0, 5);
  lines.push("| # | Model | Score |");
  lines.push("|---|---|---|");
  top5.forEach((m, i) => lines.push(`| ${i + 1} | ${link(m)} | ${m.zo_score} |`));
  lines.push("");
}

lines.push(`### New this week (${added.length})`);
lines.push(added.length ? added.map((m) => `- ${link(m)} — ${m.provider}${ctx(m.context_window)}`).join("\n") : "- None.");
lines.push("");

if (before) {
  lines.push(`### No longer free, or withdrawn (${gone.length})`);
  lines.push(gone.length ? gone.map((m) => `- ${m.name} — ${m.provider}`).join("\n") : "- None.");
  lines.push("");
}

lines.push("---");
lines.push(`Full table, updated daily: [README](../../#free-models-auto-updated-daily) · raw data: [\`data/models.json\`](../../blob/main/data/models.json)`);
lines.push("");
lines.push(
  `Scores are [ZeroOptimize](${SITE}/leaderboard?${UTM}) quality scores (0–100, relative to the best free model). ` +
    `Want the #1 model without tracking any of this? [One OpenAI-compatible endpoint](${SITE}/developers?${UTM}) routes every request to it, with failover.`,
);

const tag = `week-${today}`;
const parts = [];
if (added.length) parts.push(`${added.length} new`);
if (gone.length) parts.push(`${gone.length} gone`);
if (topChanged) parts.push("new #1");
const title = `Free AI models — week of ${fmtDate(today)}${parts.length ? `: ${parts.join(", ")}` : ""}`;

writeFileSync(join(ROOT, "release-notes.md"), lines.join("\n") + "\n");
writeFileSync(join(ROOT, "release-tag.txt"), tag);
writeFileSync(join(ROOT, "release-title.txt"), title);
console.log(title);
console.log(`tag: ${tag} · baseline: ${before?.date ?? "none"}`);
