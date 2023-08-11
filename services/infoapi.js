import axios from "axios";

const getOrders = async (symbols) => {
  const AxiosOptions = {
    method: 'GET',
    url: 'https://paper-api.alpaca.markets/v2/stocks/bars',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': process.env.ALPACA_PAPER_KEY,
      'APCA-API-SECRET-KEY': process.env.ALPACA_PAPER_KEY_SECRET,
    },
  };

  if (symbols) {
    AxiosOptions['params'] = symbols.join(',');
  }

  const response = await axios(AxiosOptions);

  return response.data;
}

const getPositions = async (symbol) => {
  const AxiosOptions = {
    method: 'GET',
    url: `https://paper-api.alpaca.markets/v2/stocks/assets/${symbol}`,
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': process.env.ALPACA_PAPER_KEY,
      'APCA-API-SECRET-KEY': process.env.ALPACA_PAPER_KEY_SECRET,
    },
  };

  const response = await axios(AxiosOptions);

  return response.data;
}

export { getOrders, getPositions };
