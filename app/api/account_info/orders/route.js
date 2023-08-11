import { getOrders } from "@/services/infoapi";

export async function GET(req) {
  const options = req.nextUrl.searchParams;
  const symbols = options.get('symbols')?.split(',');

  const orders = await getOrders(symbols);

  return Response.json(orders);
}