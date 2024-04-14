import axios from 'axios';

const backend_server_alarming = async (symbols) => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL,
    url: '/alarm',
    params: {
      symbols: JSON.stringify(symbols),
    }
  });

  console.log(response);
}

const data_server_alarming = async () => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.NEXT_PUBLIC_DATA_SERVER_URL,
    url: '/logging/alarm',
  });

  console.log(response);
}

export {
  backend_server_alarming,
  data_server_alarming,
}
