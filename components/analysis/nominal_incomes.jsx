import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { BarGraph } from '@/utils/plotly';
import { getNominalIncomeAPI } from '@/services/statisticsapi';
import LoadingSpinner from '../micro_components/loading_spinner';

export default function NominalIncomes() {
  const [data, setData] = useState({ symbols: [], nominalIncomes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const nominalIncomes = await getNominalIncomeAPI();

      setData(nominalIncomes.data);
      setLoading(false);
    })();
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <LoadingSpinner text={'Loading Nominal Incomes Graph'} />
      ) : (
        BarGraph({
          xData: data.symbols,
          yData: data.nominalIncomes,
          title: 'Nominal Incomes Graph',
          xLabel: 'Symbols',
          yLabel: 'Nominal Incomes ($)',
        })
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
