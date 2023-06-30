import axios from "axios";

const orderAPI = async (side, symbol, qty, notional) => {
  const options = {
    method: 'POST',
    url: 'https://paper-api.alpaca.markets/v2/orders',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'APCA-API-KEY-ID': process.env.ALPACA_PAPER_KEY,
      'APCA-API-SECRET-KEY': process.env.ALPACA_PAPER_KEY_SECRET,
    },
    data: {
      symbol,
      qty,
      notional,
      side,
      type: 'market',
      time_in_force: 'ioc',
    }
  };

  try {
    const response = await axios(options);
    return response;
  } catch (err) {
    console.error(`Error in orderapi.js for ${side}ing ${symbol}!!`, err.response.data);
    return new Response({ status: 403 });
  }
}

export {orderAPI};
