import axios from "axios";

const getStockBarsAPI = async (symbols, options) => {
  const { start, end, timeframe } = options;
  const AxiosOptions = {
    method: 'GET',
    url: `https://data.alpaca.markets/v2/stocks/bars?symbols=${symbols.join(',')}&timeframe=${timeframe}&start=${start}&end=${end}&limit=1000&adjustment=raw`,
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': process.env.ALPACA_PAPER_KEY,
      'APCA-API-SECRET-KEY': process.env.ALPACA_PAPER_KEY_SECRET,
    },
  };

  const dataList = await axios(AxiosOptions);

  return dataList.data.bars;
}

export { getStockBarsAPI };
