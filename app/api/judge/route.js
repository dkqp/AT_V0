import fs from 'fs';
import { judge } from '@/utils/judge_order';

export async function GET(req) {
  const symbols = req.nextUrl.searchParams.get('symbols').split(',');

  const judgeResult = judge(symbols, new Date().toJSON());

  return Response.json(judgeResult);
}
