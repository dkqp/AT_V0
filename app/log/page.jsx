'use client';

import React from 'react';
import styled from 'styled-components';

import Header from '@/components/header';
import Logs from '@/components/logs';

export default function TestPage() {
  return (
    <main>
      <Header />
      <Body>
        <Row1>
          <Logs />
        </Row1>
      </Body>
    </main>
  );
}

const Body = styled.div`
  width: 100%;
  max-height: 90vh;
`;

const Row1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
