import fs from 'fs';
import { recordLogs } from '@/utils/record_logs';

export async function GET(req) {
  const logLength = req.nextUrl.searchParams.get('length');
  const path = 'log/logs.csv';
  const logs = fs.readFileSync(path, 'utf8')
    .replaceAll('\r', '')
    .split('\n')
    .slice(1)
    .filter(e => e.length > 0);

  return Response.json(logs.slice(logLength));
}

export async function POST(req) {
  const {type, detail} = await req.json();

  recordLogs(type, detail);

  return new Response(201);
}