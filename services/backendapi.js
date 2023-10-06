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
  if (!startDate || !endDate) {
    window.alert('Set start/end date properly!');
    return;
  }
  window.alert('Download begins!');

  const response = await axios({
    method: 'get',
    baseURL: '/api',
    url: '/historical_data',
    params: {
      symbols: selectedSymbols.join(','),
      startDate: startDate.toJSON(),
      endDate: endDate.toJSON(),
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

export { download_all_list, getCompanyList };