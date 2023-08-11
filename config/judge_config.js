import fs from 'fs';

const readCSV = fs.readFileSync('data/judge_configs.csv', 'utf8')
  .replaceAll('\r', '')
  .split('\n')
  .filter(line => line.length > 0)
  .map(line => line.split(','));

const col_names = readCSV[0];
const judge_configs = {};

for (const line of readCSV.slice(1)) {
  const config = Object.fromEntries(col_names.map((col, i) => [col, line[i]]));
  judge_configs[line[0]] = config;
}

export { judge_configs };
