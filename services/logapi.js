import axios from "axios";

const get_logs = async () => {
  const loaded = await axios({
    method: 'get',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL,
    url: '/logs',
  });

  return loaded.data;
}

const update_logs = async () => {
  const loaded = await axios({
    method: 'put',
    baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL,
    url: '/logs',
  });

  return loaded.data;
}

export {
  get_logs,
  update_logs,
}
