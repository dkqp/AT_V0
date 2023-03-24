import { alpaca } from "@/config/alpaca_config";

export async function GET(req, res) {
  const accountInfo = await alpaca.getAccount();
  return new Response(accountInfo.id);
  // const query = req.nextUrl.searchParams;
  // let symbol;
  // const options = {};
  // for (const [key, value] of req.nextUrl.searchParams.entries()) {
  //   if (key == 'symbol') {
  //     symbol = value;
  //     continue;
  //   }
  //   options[key] = value;
  // }
  // console.log(symbol);
  // console.log(options);

  // const data = await API({
  //   method: 'get',
  //   url: `/stocks/${symbol}/trades`,
  //   params: {
  //     ...options
  //   }
  // });

  // console.log(Object.keys(data));

  // return new Response(data);
}
