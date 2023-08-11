import fs from 'fs';
import { judge_configs } from '@/config/judge_config';
import { getStockBarsAPI } from "@/services/dataapi";

const judge = async (symbols, lastDate, dataCount = 100) => {

  const orders = fs.readFileSync('data/orders.csv', 'utf8')
      .replaceAll('\r', '')
      .split('\n')
      .slice(1)
      .filter(d => d.length > 0)
      .map(d => d.split(','));

  const results = [];

  // symbol by symbol

  for (const symbol of symbols) {

    // prepare data needed

    const data = await prepareData(symbol, lastDate, dataCount);

    // analyze data to get result

    const { thr_buy, thr_sell, duration, thr_grad, thr_rebound, limit } = judge_configs[symbol];

    if (duration > data.length - 1) {
      break;
    }

    const price_diff = data[data.length - 1 - duration][1] - data[data.length - 1][1];
    const startTime = new Date(data[data.length - 1][0]);
    const startPrice = data[data.length - 1][1];
    const duration_hour = (startTime - new Date(data[data.length - 1 - duration][0])) / (3600 * 1000);
    const grad = Math.abs(price_diff / duration_hour);

    if (price_diff > thr_buy * startPrice && grad > thr_grad * startPrice) {
      buy_orders = orders.filter(o => o[1] === symbol && o[0] === 'buy');
      const lastTime = new Date(orders[orders.length - 1][2]);
      const rebound = data[data.length - 1][1] - data[data.length - 2][1];
      const rebound_hour = (new Date(data[data.length - 1][0]) - new Date(data[data.length - 2][0])) / (3600 * 1000);

      if (lastTime < startTime && rebound / rebound_hour > thr_rebound * startPrice) {
        results.push({
          'side': 'buy',
          'symbol': symbol,
          'qty': 15,
        });
      }
    } else if (price_diff < -thr_sell * startPrice && grad > thr_grad * startPrice) {
      sell_orders = orders.filter(o => o[1] === symbol && o[0] === 'sell');
      const lastTime = new Date(orders[orders.length - 1][2]);
      const rebound = data[data.length - 1][1] - data[data.length - 2][1];
      const rebound_hour = (new Date(data[data.length - 1][0]) - new Date(data[data.length - 2][0])) / (3600 * 1000);

      if (lastTime < startTime && rebound / rebound_hour < -thr_rebound * startPrice) {
        results.push({
          'side': 'sell',
          'symbol': symbol,
          'qty': 15,
        });
      }
    }
  }

  return results;
}

const prepareData = async (symbol, lastDate, dataCount = 100) => {

  const startDate = new Date(lastDate);
  startDate.setDate((new Date().getDate() - 7));

  const endDate = new Date(lastDate);
  endDate.setMinutes((new Date().getMinutes() - 15));

  const options = {
    start: startDate.toJSON(),
    end: endDate.toJSON(),
    timeframe: '15Min'
  };

  const keyPath = 'data/time_series_data/' + symbol + '.csv';
  let newList = [];

  // make newList which includes data between startDate and endDate
  // update local data file

  if (fs.existsSync(keyPath)) {

    const currList = fs.readFileSync(keyPath, 'utf8')
      .replaceAll('\r', '')
      .split('\n')
      .slice(1)
      .filter(d => d.length > 0)
      .map(d => d.split(','));

    if (startDate < new Date(currList[0][0]) || endDate > new Date(currList[currList.length - 1][0])) {

      const dataList = (await getStockBarsAPI([symbol], options))[symbol]
       .map(d => [d.t, d.o]);

      let curr_i = 0;
      let data_i = 0;
      while (curr_i < currList.length && data_i < dataList.length) {
        if (currList[curr_i][0] < dataList[data_i][0]) {
          newList.push(currList[curr_i]);
          curr_i += 1;
        } else if (currList[curr_i][0] === dataList[data_i][0]) {
          newList.push(currList[curr_i]);
          curr_i += 1;
          data_i += 1;
        } else {
          newList.push(dataList[data_i]);
          data_i += 1;
        }
      }

      while (curr_i < currList.length) {
        newList.push(currList[curr_i]);
        curr_i += 1;
      }

      while (data_i < dataList.length) {
        newList.push(dataList[data_i]);
        data_i += 1;
      }

      fs.writeFileSync(keyPath, newList.map(d => d.join(',')).join('\n'));

      console.log('a1');

    } else {
      newList = currList;
      console.log('a2');
    }
  } else {
    newList = (await getStockBarsAPI([symbol], options))[symbol]
      .map(d => [d.t, d.o]);
    fs.writeFileSync(keyPath, newList.map(d => d.join(',')).join('\n'));
    console.log('a3');
  }

  // find necessary parts of data to return

  let firstIndex = 0;
  let lastIndex = newList.length - 1;

  while (firstIndex <= lastIndex) {
    const midIndex = Math.floor((firstIndex + lastIndex) / 2);
    if (newList[midIndex][0] === endDate) {
      lastIndex = midIndex;
      break;
    } else if (newList[midIndex][0] > endDate) {
      lastIndex = midIndex - 1;
    } else {
      firstIndex = midIndex + 1;
    }
  }

  return newList.slice(lastIndex - dataCount + 1, lastIndex + 1);
}

export { judge };