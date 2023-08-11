import { getBars } from '@/utils/data_handling';

export async function GET(req) {
  const options = req.nextUrl.searchParams;
  const symbols = options.get('symbols').split(',');
  const startDate = options.get('startDate');
  const endDate = options.get('endDate');
  const timeframe = options.get('timeframe');

  if (!symbols | !startDate | !endDate | !timeframe) {
    return new Response('No data received!', { status: 403 });
  }

  try {
    const dataList = await getBars(symbols, startDate, endDate, timeframe);
    return Response.json(dataList);
  } catch (err) {
    console.error(err);
    return new Response(err, { status: 500 });
  }
}
