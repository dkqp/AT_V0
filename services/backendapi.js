import axios from "axios";
import { barToCSVDownload } from "@/utils/data_handling";

const download_all_list = async (
  event,
  selectedSymbols,
  startDate,
  endDate,
  timeframe,
) => {
  event.preventDefault();
  window.alert('Download begins!');

  const response = await axios({
    method: 'get',
    baseURL: '/api',
    url: '/historical_data',
    params: {
      symbols: selectedSymbols.join(','),
      startDate: new Date(startDate).toJSON(),
      endDate: new Date(endDate).toJSON(),
      timeframe: timeframe,
    },
  });

  barToCSVDownload(response.data, timeframe);
};

const getCompanyList = async () => {
  const response = await axios({
    method: 'get',
    baseURL: '/api',
    url: '/company_list',
  });

  return response;
};

const getJudgeList = async (symbols) => {
  const response = await axios({
    method: 'get',
    baseURL: '/api',
    url: '/judge',
    params: { symbols: symbols.join(',') },
  });

  return response;
};

const newOrder = async (queue) => {
  await axios({
    method: 'post',
    baseURL: '/api',
    url: '/order',
    data: queue,
  });
};

const orderTest = async (event, side) => {
  event.preventDefault();
  window.alert(`${side} order begins!`);

  await axios({
    method: 'post',
    baseURL: '/api',
    url: '/order',
    data: [
      {
        side,
        symbol: 'AAPL',
        qty: 15,
      },
    ],
  });
};

const recordLogs = async (type, detail) => {
  await axios({
    method: 'post',
    baseURL: '/api',
    url: '/log',
    data: { type, detail },
  });
}

const getLogs = async (logs) => {
  const loaded = await axios({
    method: 'get',
    baseURL: '/api',
    url: '/log',
    params: { length: logs.length },
  });

  return loaded.data;
}

const testAlgorithm = async () => {
  const symbols = 'TSLA,MSFT';

  const response = await axios({
    method: 'get',
    baseURL: '/api',
    url: '/judge/test',
    params: { symbols },
  });

  console.log('response: ', response);
}

export { download_all_list, getCompanyList, getJudgeList, newOrder, orderTest, recordLogs, getLogs, testAlgorithm };