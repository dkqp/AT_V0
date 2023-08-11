import axios from "axios";

const getStockBarsAPI = async (symbols, options) => {
  const dataList = {};
  let page_token;

  while (true) {
    const { start, end, timeframe } = options;
    const AxiosOptions = {
      method: 'GET',
      url: 'https://data.alpaca.markets/v2/stocks/bars',
      headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': process.env.ALPACA_PAPER_KEY,
        'APCA-API-SECRET-KEY': process.env.ALPACA_PAPER_KEY_SECRET,
      },
      params: {
        symbols: symbols.join(','),
        timeframe,
        start,
        end,
        limit: 1000,
        adjustment: 'raw',
      }
    };

    if (page_token) {
      AxiosOptions.params['page_token'] = page_token;
    }

    const response = await axios(AxiosOptions);

    for (const key in response.data.bars) {
      if (key in dataList) {
        dataList[key] = [...dataList[key], ...response.data.bars[key]];
      } else {
        dataList[key] = response.data.bars[key];
      }
    }

    if (response.data.next_page_token != null) {
      page_token = response.data.next_page_token;
    } else {
      break
    }
  }

  return dataList;
}

export { getStockBarsAPI };
