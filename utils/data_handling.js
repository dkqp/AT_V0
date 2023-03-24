import { getBarsAPI } from "@/services/dataapi"
import JSZip from "jszip";

const getBars = async (alpaca, symbol, startDate, endDate, timeframe, to_csv) => {
  const options = {
    start: startDate,
    end: endDate,
    timeframe
  };

  const dataList = await getBarsAPI(alpaca, symbol, options);

  if (to_csv) {
    barToCSVDownload([{
      symbol,
      data: dataList,
    }], false);
  }

  return dataList;
}

const barToCSVDownload = (barList, toZip) => {
  const colNames = [
    'Timestamp',
    'OpenPrice',
    'HighPrice',
    'LowPrice',
    'ClosePrice',
    'Volume',
  ];

  if (toZip) {
    const zip = new JSZip();
    for (const { symbol, data } of barList) {
      const csvString = [
        colNames,
        ...data.map(d => [
          d.Timestamp,
          d.OpenPrice,
          d.HighPrice,
          d.LowPrice,
          d.ClosePrice,
          d.Volume,
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
      pom.setAttribute('download', '30min_bars.zip');
      pom.click();
    })

    window.alert('CSV zip file downloaded!');

    return;
  }

  const { symbol, data } = barList[0];

  const csvString = [
    colNames,
    ...data.map(d => [
      d.Timestamp,
      d.OpenPrice,
      d.HighPrice,
      d.LowPrice,
      d.ClosePrice,
      d.Volume,
    ]),
  ]
    .map(e => e.join(','))
    .join('\n');

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', symbol + '_30min_bar.csv');
  pom.click();

  window.alert('CSV file downloaded!');
}

export { getBars, barToCSVDownload };
