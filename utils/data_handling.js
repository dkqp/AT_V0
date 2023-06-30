import { getStockBarsAPI } from "@/services/dataapi"
import JSZip from "jszip";

const getBars = async (symbols, startDate, endDate, timeframe) => {
  const options = {
    start: startDate,
    end: endDate,
    timeframe
  };

  const dataList = await getStockBarsAPI(symbols, options);

  return dataList;
}

const barToCSVDownload = (barList, timeframe) => {
  const colNames = [
    'Timestamp',
    'OpenPrice',
    'HighPrice',
    'LowPrice',
    'ClosePrice',
    'Volume',
  ];

  const zip = new JSZip();
  for (const symbol in barList) {
    const data = barList[symbol];
    const csvString = [
      colNames,
      ...data.map(d => [
        d.t,
        d.o,
        d.h,
        d.l,
        d.c,
        d.v,
      ]),
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    zip.file(symbol + '.csv', blob);
  }

  zip.generateAsync({ type: 'blob' }).then(content => {
    const url = URL.createObjectURL(content);
    const pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', `${timeframe}_bars.zip`);
    pom.click();
  })

  window.alert('CSV zip file downloaded!');

  return;
}

export { getBars, barToCSVDownload };
