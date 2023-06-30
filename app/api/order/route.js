import { orderAPI } from '@/services/orderapi';

export async function POST(req) {
  const options = await req.json();

  for (const option of options) {
    const { side, symbol, qty, notional } = option;

    if (!symbol) {
      return new Response('Invalid symbol data received!', { status: 403 });
    }

    if (!qty & !notional) {
      return new Response('Invalid qty/notional data received!', { status: 403 });
    }
  }

  const accepted = [];
  const denied = [];

  options.forEach(async option => {
    const { side, symbol, qty, notional } = option;

    const res = await orderAPI(side, symbol, qty, notional);
    if (res.status == 200) {
      accepted.push({ side, symbol, qty, notional });
    } else {
      denied.push({ side, symbol, qty, notional });
    }
  });

  return Response.json({ accepted, denied });
}
