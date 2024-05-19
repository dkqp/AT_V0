import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { BarGraph } from '@/utils/plotly';
import { getCurrentAssetsAPI } from '@/services/statisticsapi';
import LoadingSpinner from '../micro_components/loading_spinner';

export default function CurrentAssets() {
  const [data, setData] = useState({
    symbols: [],
    currentPositions: [],
    currentSum: 1,
    availableAssets: 1,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const currentAssets = await getCurrentAssetsAPI();

      setData(currentAssets.data);
      setLoading(false);
    })();
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <LoadingSpinner text={'Loading Current Assets Graph'} />
      ) : (
        BarGraph({
          xData: data.symbols,
          yData: data.currentPositions.map(x => (x / data.currentSum) * 100),
          text: data.currentPositions.map(value => `${'$'}${value}`),
          colorScale: 'Cividis',
          title: 'Current Positions Graph',
          xLabel: 'Symbols',
          yLabel: 'Current Positions (% of all long positions)',
          annotations: `All long positions: ${'$'}${data.currentSum}`,
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
