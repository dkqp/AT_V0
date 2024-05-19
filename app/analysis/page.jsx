'use client';

import React from 'react';
import styled from 'styled-components';

import Header from '@/components/header';
import OverallState from '@/components/analysis/overall';
import NominalIncomes from '@/components/analysis/nominal_incomes';
import CurrentAssets from '@/components/analysis/current_positions';
import FinancialChart from '@/components/analysis/transactions';
import EachEquityIncome from '@/components/analysis/each_equity_income';

export default function AnalysisPage() {
  return (
    <main>
      <Header />
      <Body>
        <Row1>
          <Row1Col1>
            <FinancialChart />
          </Row1Col1>
          <Row1Col2>
            <Row1Col2Row1>
              <NominalIncomes />
            </Row1Col2Row1>
            <Row1Col2Row2>
              <CurrentAssets />
            </Row1Col2Row2>
          </Row1Col2>
        </Row1>
        <Row2>
          <EachEquityIncome />
        </Row2>
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

const Row1Col1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Row1Col2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Row1Col2Row1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Row1Col2Row2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Row2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
