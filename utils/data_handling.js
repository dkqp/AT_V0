import { getStockBarsAPI } from "@/services/dataapi"
import JSZip from "jszip";

const KEYS_FOR_SORT = ['status', 'symbol'];

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

const make_log_table = (logs, sort_function) => {
  const logKeys = Object.keys(Object(logs[0]));

  const contents = logs.map(log => {
    const logValues = Object.values(log);
    return (
      <tr key={logValues[0]}>
        {logKeys.map(key => (
          <td key={key}>{log[key]}</td>
        ))}
      </tr>
    );
  });

  return (
    <tbody>
      <tr>
        {logKeys.map(key => {
          if (KEYS_FOR_SORT.includes(key)) {
            return <th className="keys_for_sort" onClick={() => {sort_function(key)}} key={key}>{key}</th>
          }
          return <th key={key}>{key}</th>
        })}
      </tr>
      {contents}
    </tbody>
  );
}

const filter_log_by_date = (logs, startDate = undefined, endDate = undefined) => {
  if (startDate) {
    logs = logs.filter(log => log.date_server >= startDate);
  }

  if (endDate) {
    logs = logs.filter(log => log.date_server <= endDate)
  }

  return logs;
}

export { getBars, barToCSVDownload, make_log_table, filter_log_by_date };
