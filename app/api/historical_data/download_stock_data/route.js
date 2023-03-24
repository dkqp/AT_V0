import { alpaca } from '@/config/alpaca_config';
import { getBars } from '@/utils/data_handling';

export async function GET(req) {
  const options = req.nextUrl.searchParams;
  const symbols = options.get('symbols').split(',');
  const startDate = options.get('startDate');
  const endDate = options.get('endDate');
  const timeframe = options.get('timeframe');

  if (!symbols | !startDate | !endDate | !timeframe) {
    return new Response('No data received!', { status: 404 });
  }

  const dataList = [];

  try {
    for (const symbol of symbols) {
      const data = await getBars(alpaca, symbol, startDate, endDate, timeframe, false);
      dataList.push({symbol, data});
      console.log(symbol + ' is downloaded');
    }
  } catch (err) {
    console.error(err);
    return new Response(err, { status: 500 });
  }

  return Response.json(dataList);
}
