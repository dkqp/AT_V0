'use client';

import React from 'react';
import styled from 'styled-components';

import { orderTest } from '@/services/backendapi';

export default function Order() {
  return (
    <Wrapper>
      <button
        onClick={e => {
          orderTest(e, 'buy');
        }}
      >
        buy order test
      </button>
      <button
        onClick={e => {
          orderTest(e, 'sell');
        }}
      >
        sell order test
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
