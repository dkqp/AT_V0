import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import axios from 'axios';

export default function Order() {
  const orderTest = async (event, side) => {
    event.preventDefault();
    window.alert(`${side} order begins!`);

    await axios({
      method: 'post',
      baseURL: '/api',
      url: '/order',
      data: [
        {
          side,
          symbol: 'AAPL',
          qty: 15,
        },
      ],
    });
  };

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
