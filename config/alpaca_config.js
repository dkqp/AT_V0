import Alpaca from "@alpacahq/alpaca-trade-api";

const options = {
  keyId: process.env.ALPACA_PAPER_KEY,
  secretKey: process.env.ALPACA_PAPER_KEY_SECRET,
  paper: true,
};

const alpaca = new Alpaca(options);

export { alpaca };