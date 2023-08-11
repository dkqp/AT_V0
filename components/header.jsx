import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import {
  LiaToggleOnSolid as OnIcon,
  LiaToggleOffSolid as OffIcon,
} from 'react-icons/lia';

import { getCompanyList, getJudgeList, newOrder } from '@/services/backendapi';

export default function Header() {
  const [algoOn, setAlgoOn] = useState(true);
  const [queue, setQueue] = useState([]);
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
    if (algoOn) {
      const inter = setInterval(async () => {
        const newQueue = await getJudgeList(symbols);

        if (newQueue.data?.length > 0) {
          setQueue([...queue, ...newQueue.data]);
        }
      }, 180000);

      return () => {
        clearInterval(inter);
      };
    }
  }, [algoOn, symbols]);

  useEffect(() => {
    if (queue.length > 0) {
      newOrder(queue);
      setQueue([]);
    }
  }, [queue]);

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
        <button onClick={() => router.push('/test')}>Test page</button>
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
