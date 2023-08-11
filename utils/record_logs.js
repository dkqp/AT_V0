import fs from 'fs';

const types = {
  'get_A': 'Receive data from Alpaca',
  'post_A': 'Send data to Alpaca',
  'get_B': 'Receive data internally',
  'post_B': 'Send data internally',
  'test': 'Test purpose action',
  'periodic': 'Periodical action',
};

const recordLogs = (type, detail) => {
  const path = 'log/logs.csv';
  const contents = [
    new Date().toJSON(),
    types[type],
    detail,
  ];

  fs.appendFileSync(path, '\n' + contents.join(','), 'utf8');
  return ;
}

export { recordLogs };
