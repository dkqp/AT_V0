import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import LoadingSpinner from '../micro_components/loading_spinner';
import { getTransactionsAPI } from '@/services/statisticsapi';
import { VerticalGraph } from '@/utils/plotly';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const loadedTransactions = await getTransactionsAPI();
      const transactionsData = loadedTransactions.data;

      let transactionsSum = 0;
      for (let i = transactionsData.length - 1; i >= 0; i--) {
        transactionsData[i]['accNetAmount'] = transactionsSum;
        transactionsSum += transactionsData[i]['netAmount'];
      }

      setTransactions(transactionsData);
    })();
  }, []);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      setSelectedTransaction(transactions[0]);
    }
  }, [transactions]);

  useEffect(() => {
    if (selectedTransaction) {
      setLoading(false);
    }
  }, [selectedTransaction]);

  const handleClick = data => {
    const pointIndex = data.points[0].pointIndex;
    setSelectedTransaction(transactions[pointIndex]);
  };

  return (
    <Wrapper>
      {loading ? <LoadingSpinner /> : VerticalGraph(transactions, handleClick)}
      {!loading && (
        <DescWrapper>
          <h3>From Selected Transaction to Today</h3>
          <p>Date: {selectedTransaction.dateTime.split('T')[0]}</p>
          <p>
            Total Equity Changed: $
            {(
              transactions[transactions.length - 1].equity -
              selectedTransaction.equity
            ).toFixed(2)}
          </p>
          <p>
            Total Deposit or Withdrawal: $
            {selectedTransaction.accNetAmount.toFixed(2)}
          </p>
          <p>
            Net Earning: $
            {(
              transactions[transactions.length - 1].equity -
              selectedTransaction.equity -
              selectedTransaction.accNetAmount
            ).toFixed(2)}
          </p>
        </DescWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DescWrapper = styled.div`
  min-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
