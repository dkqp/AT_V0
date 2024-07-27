import Plot from 'react-plotly.js';

const VerticalGraph = (transactions, handleClick) => {
  const data = [
    {
      type: 'scatter',
      mode: 'lines+markers',
      x: transactions.map(t => t.equity),
      y: transactions.map(t => t.dateTime),
      text: transactions.map(
        t =>
          `Deposit or withdrawal of $${t.netAmount.toFixed(
            2,
          )}: Total equity of $${t.equity.toFixed(2)}`,
      ),
      marker: { size: 8 },
      line: { shape: 'vh' }, // 'hv' for horizontal line with vertical segments
    },
  ];

  const layout = {
    title: 'Transaction History and Total Assets',
    xaxis: { title: 'Total Assets' },
    yaxis: { title: 'Date', autorange: 'normal' },
    hovermode: 'closest',
    width: 400,
    height: 700,
  };

  return <Plot
    data={data}
    layout={layout}
    config={{ displayModeBar: false }}
    onClick={handleClick}
  />
}

const BarGraph = ({
  xData = ['A', 'B', 'C', 'D', 'E'],
  yData = [12, 9, 15, 10, 7],
  text = '',
  colorScale = 'Plotly',
  title = 'Bar Graph Example',
  xLabel = 'Categories',
  yLabel = 'Values',
  annotations = '',
}) => {

  // 바 그래프에 사용할 데이터 설정
  const data = [
    {
      x: xData,
      y: yData,
      text: text,
      hoverinfo: 'all',
      textposition: 'none',
      type: 'bar',
      marker: {
        color: yData,
        colorscale: colorScale
      },
    },
  ];

  // 레이아웃 설정
  const layout = {
    title: title,
    xaxis: { title: xLabel },
    yaxis: { title: yLabel },
    plot_bgcolor: 'white',
    font: { family: 'Arial, sans-serif', size: 12, color: 'black' },
    annotations: [{
          x: 1,
          y: 1,
          xref: "paper",
          yref: "paper",
          text: annotations,
          showarrow: false,
          font: { family: 'Arial, sans-serif', size: 12, color: 'black' },
          align: "right",
    }],
    width: 600,
    height: 400,
  };

  return <Plot data={data} layout={layout} />;
};

const LineGraph = ({
  xData = ['2016-01-04', '2016-01-05', '2016-01-06', '2016-01-07', '2016-01-08'],
  yData = [12, 9, 15, 10, 7],
  text = '',
  colorScale = 'Picnic',
  title = 'Line Graph Example',
  xLabel = 'Dates',
  yLabel = 'Values',
  annotations = '',
}) => {

  // 라인 그래프에 사용할 데이터 설정
  const data = [
    {
      x: xData,
      y: yData,
      text: text,
      hoverinfo: 'all',
      textposition: 'none',
      type: 'scattergl',
      mode: 'lines+markers',
      marker: {
        color: yData,
        colorscale: colorScale
      },
    },
  ];

  // 레이아웃 설정
  const layout = {
    title: title,
    xaxis: { title: xLabel },
    yaxis: { title: yLabel },
    plot_bgcolor: 'white',
    font: { family: 'Arial, sans-serif', size: 12, color: 'black' },
    annotations: [{
          x: 1,
          y: 1,
          xref: "paper",
          yref: "paper",
          text: annotations,
          showarrow: false,
          font: { family: 'Arial, sans-serif', size: 12, color: 'black' },
          align: "right",
    }],
    width: 1000,
    height: 500,
  };

  return <Plot data={data} layout={layout} />;
};

export { VerticalGraph, BarGraph, LineGraph };
