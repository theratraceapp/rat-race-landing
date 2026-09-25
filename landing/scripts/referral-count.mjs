#!/usr/bin/env node
/**
 * scripts/referral-count.mjs
 * Join a Tally CSV export into referral counts (v1 referral layer, no backend).
 *
 * Usage: node scripts/referral-count.mjs responses.csv [--json]
 *
 * Expects columns: `my_code`, `referred_by`, and an email-ish column
 * (auto-detected via /email/i). Output: ranked table of
 * code -> email -> referrals, excluding self-referrals
 * (referred_by == own my_code) and blank codes.
 *
 * The genuine-email count for the 1,000 hard gate is simply the number of
 * data rows — referrals are attribution metadata only, never extra signups.
 */

import { readFileSync } from "node:fs";

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c === "\r") { /* skip */ }
    else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

function main() {
  const file = process.argv[2];
  const asJson = process.argv.includes("--json");
  if (!file) {
    console.error("Usage: node scripts/referral-count.mjs responses.csv [--json]");
    process.exit(1);
  }
  const rows = parseCsv(readFileSync(file, "utf8"));
  if (!rows.length) { console.error("Empty CSV."); process.exit(1); }

  const header = rows[0].map((h) => h.trim());
  const idx = (name) => header.findIndex((h) => h.toLowerCase() === name.toLowerCase());
  const iCode = idx("my_code"), iRef = idx("referred_by");
  const iEmail = header.findIndex((h) => /email/i.test(h));
  if (iCode < 0 || iRef < 0) {
    console.error(`Missing columns. Found: ${header.join(" | ")}`);
    console.error("Need `my_code` and `referred_by` hidden fields on the Tally form.");
    process.exit(1);
  }

  const data = rows.slice(1);
  const byCode = new Map(); // code -> { email, referrals }
  for (const r of data) {
    const code = (r[iCode] || "").trim();
    if (!code) continue;
    if (!byCode.has(code)) {
      byCode.set(code, { email: iEmail >= 0 ? (r[iEmail] || "").trim() : "", referrals: 0 });
    }
  }
  let selfRefs = 0, unattributed = 0;
  for (const r of data) {
    const refBy = (r[iRef] || "").trim();
    const own = (r[iCode] || "").trim();
    if (!refBy) { unattributed++; continue; }
    if (refBy === own) { selfRefs++; continue; } // self-referral: ignore
    const entry = byCode.get(refBy);
    if (entry) entry.referrals++;
    // refBy with no matching my_code: stale/forged code — not counted
  }

  const ranked = [...byCode.entries()]
    .map(([code, v]) => ({ code, ...v }))
    .sort((a, b) => b.referrals - a.referrals || a.code.localeCompare(b.code));

  if (asJson) {
    console.log(JSON.stringify({
      total_responses: data.length,
      codes_issued: byCode.size,
      unattributed,
      self_referrals_ignored: selfRefs,
      ranked,
    }, null, 2));
    return;
  }

  console.log(`Responses: ${data.length} | Codes issued: ${byCode.size} | No referrer: ${unattributed} | Self-refs ignored: ${selfRefs}\n`);
  console.log("referrals  code       email");
  console.log("---------  ---------  -----");
  for (const r of ranked) {
    console.log(`${String(r.referrals).padEnd(10)} ${r.code.padEnd(10)} ${r.email}`);
  }
}

main();
