import { getPositions } from "@/services/infoapi";

export async function GET(req) {
  const options = req.nextUrl.searchParams;
  const symbol = options.get('symbol');

  const positions = await getPositions(symbol);

  return Response.json(positions);
}