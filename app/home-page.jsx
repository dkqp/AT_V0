'use client';

import React from 'react';
import styled from 'styled-components';

import Header from '@/components/header';

import CompanyList from '@/components/company_list';
import Settings from '@/components/settings';

export default function HomePage() {
  return (
    <main>
      <Header />
      <Body>
        <Row1>
          <div style={{ width: '30%' }}>
            <CompanyList />
          </div>
          <div style={{ width: '30%' }}>
            <Settings />
          </div>
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
