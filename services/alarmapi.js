import axios from 'axios';

const alarming = async (symbols) => {
  const response = await axios({
    method: 'get',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL,
    url: '/check',
    params: {
      symbols: JSON.stringify(symbols),
    }
  });

  console.log(response);
}

export {
  alarming,
}
