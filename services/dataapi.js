const test1 = async (alpaca) => {
  alpaca.getAccount().then((account) => {
    console.log("Current Account:", account);
  });
};

const test2 = async (alpaca, symbol, options) => {
  const dataList = [];
  const dataPromises = alpaca.getTradesV2(symbol, options);
  for await (let dataPromise of dataPromises) {
    dataList.push(dataPromise);
  }

  return dataList;
};

const test3 = async (alpaca, feed) => {
  const eqPromises = await alpaca.getAssets({
    status: 'active',
  });

  return eqPromises.filter(asset => asset.exchange == 'NASDAQ');
};

const getBarsAPI = async (alpaca, symbol, options) => {
  const dataList = [];
  const dataPromises = alpaca.getBarsV2(symbol, options);
  for await (let dataPromise of dataPromises) {
    dataList.push(dataPromise)
  }

  return dataList
}

export {test1, test2, test3, getBarsAPI};
