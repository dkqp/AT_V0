import { judge } from "@/utils/judge_order";

export async function GET(req) {
  const symbols = req.nextUrl.searchParams.get('symbols').split(',');
  console.log(symbols);

  const results = []

  for (let i = 100; i >= 0; i --) {
    const startDate = new Date('20230707T23:00:00Z');
    startDate.setMinutes((new Date().getMinutes() - 15 * i));

    const result = await judge(symbols, startDate);
    if (result.length > 0) {
      results.push((startDate, result));
    }
  }

  return Response.json(results);
}