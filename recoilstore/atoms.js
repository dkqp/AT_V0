import { atom } from 'recoil';
import { v4 } from 'uuid';

const periodicSignal = atom({
  key: `periodicSignal/${v4()}`,
  default: false,
});

export {
  periodicSignal,
};
