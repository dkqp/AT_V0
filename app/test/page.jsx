'use client';

import React from 'react';
import styled from 'styled-components';

import Header from '@/components/header';
import Logs from '@/components/logs';

import Order from '@/components/order';

import { testAlgorithm } from '@/services/backendapi';

export default function TestPage() {
  return (
    <main>
      <Header />
      <Body>
        <Row1>
          <div>
            <Order />
            <button onClick={testAlgorithm}>test algorithm</button>
          </div>
          <Logs />
        </Row1>
      </Body>
    </main>
  );
}

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Row1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
