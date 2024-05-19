import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import {
  LiaToggleOnSolid as OnIcon,
  LiaToggleOffSolid as OffIcon,
} from 'react-icons/lia';

import { getCompanyList } from '@/services/backendapi';
import {
  backend_server_alarming,
  data_server_alarming,
} from '@/services/alarmapi';
import { periodicSignal } from '@/recoilstore/atoms';

export default function Header() {
  const [algoOn, setAlgoOn] = useRecoilState(periodicSignal);

  const [symbols, setSymbols] = useState([]);
  const router = useRouter();

  const algoSwitch = e => {
    e.stopPropagation();
    setAlgoOn(!algoOn);
  };

  useEffect(() => {
    (async () => {
      const response = await getCompanyList();

      setSymbols(
        response.data
          .filter(company => company[2] === '1')
          .map(company => company[0]),
      );
    })();
  }, []);

  useEffect(() => {
    // periodical signaling to Backend server
    if (algoOn) {
      const inter_backend_server = setInterval(async () => {
        await backend_server_alarming(symbols);
      }, 180000);

      const inter_data_server = setInterval(async () => {
        await data_server_alarming();
      }, 1800000);

      return () => {
        clearInterval(inter_backend_server);
        clearInterval(inter_data_server);
      };
    }
  }, [algoOn, symbols]);

  return (
    <Wrapper>
      <Switch onClick={() => router.push('/')}>
        <h2>ALGOTR</h2>
        {algoOn && <OnIcon size={24} onClick={e => algoSwitch(e)} />}
        {!algoOn && <OffIcon size={24} onClick={e => algoSwitch(e)} />}
      </Switch>
      <h3>Trade based on rules</h3>
      <p>contact: ltg0513@gmail.com</p>
      <Div1>
        <button onClick={() => router.push('/log')}>Log page</button>
        <button onClick={() => router.push('/analysis')}>Analysis page</button>
      </Div1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Switch = styled.div`
  display: flex;
  flex-direction: col;
  justify-content: space-around;
  align-items: center;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
`;

const Div1 = styled.div`
  display: flex;
  flex-direction: col;
  justify-content: space-around;
  align-items: center;
`;
