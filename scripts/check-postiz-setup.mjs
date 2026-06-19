#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const requiredFrontendVars = [
  'VITE_POSTIZ_BASE_URL',
  'VITE_POSTIZ_API_KEY',
  'VITE_POSTIZ_IG_ID',
  'VITE_POSTIZ_FB_ID',
  'VITE_POSTIZ_X_ID',
  'VITE_POSTIZ_THREADS_ID',
  'VITE_POSTIZ_BSKY_ID',
];

const optionalFrontendVars = ['VITE_POSTIZ_LI_ID'];

const envFiles = ['.env.local', '.env'];
const loaded = {};
const sources = [];

for (const file of envFiles) {
  const path = resolve(process.cwd(), file);
  if (!existsSync(path)) continue;
  sources.push(file);
  const lines = readFileSync(path, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    loaded[key] = stripQuotes(rawValue.trim());
  }
}

const env = { ...loaded, ...process.env };
const missing = requiredFrontendVars.filter((key) => !env[key]);
const present = requiredFrontendVars.filter((key) => Boolean(env[key]));
const optionalPresent = optionalFrontendVars.filter((key) => Boolean(env[key]));
const optionalMissing = optionalFrontendVars.filter((key) => !env[key]);

console.log('Postiz setup check');
console.log('==================');
console.log(`Loaded env files: ${sources.length ? sources.join(', ') : 'none'}`);
console.log('');

if (present.length) {
  console.log('Configured required values:');
  for (const key of present) console.log(`- ${key}=${mask(env[key])}`);
  console.log('');
}

if (optionalPresent.length) {
  console.log('Configured optional values:');
  for (const key of optionalPresent) console.log(`- ${key}=${mask(env[key])}`);
  console.log('');
}

if (optionalMissing.length) {
  console.log(`Optional values not configured: ${optionalMissing.join(', ')}`);
  console.log('');
}

if (missing.length) {
  console.error('Missing required Postiz values:');
  for (const key of missing) console.error(`- ${key}`);
  console.error('');
  console.error('Next step: copy .env.example to .env.local, fill in real Postiz values, then rerun `npm run postiz:check`.');
  process.exit(1);
}

console.log('All required Postiz values are present. Restart/redeploy the app so Vite reloads import.meta.env.');

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function mask(value) {
  if (!value) return '';
  if (value.length <= 8) return '********';
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}
