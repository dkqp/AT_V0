import { atom } from 'recoil';
import { v4 } from 'uuid';

const periodicSignal = atom({
  key: `periodicSignal/${v4()}`,
  default: false,
});

const algoSymbols = atom({
  key: `algoSymbols/${v4()}`,
  default: [],
});

export {
  periodicSignal,
  algoSymbols,
};
