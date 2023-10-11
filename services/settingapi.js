import axios from "axios";

const get_default_settings = async () => {
  const loaded = await axios({
    method: 'get',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL,
    url: '/settings',
  });

  return loaded.data;
}

const get_settings = async (symbol) => {
  const loaded = await axios({
    method: 'get',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL,
    url: `/settings/${symbol}`,
  });

  return loaded.data;
}

const set_settings = async (symbol, args) => {
  const loaded = await axios({
    method: 'put',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL,
    url: `/settings/${symbol}`,
    data: {
      args: args,
    },
  });

  return loaded.data;
}

export {
  get_default_settings,
  get_settings,
  set_settings,
}
