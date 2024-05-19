import React from 'react';
import styled from 'styled-components';

import { BarGraph } from '@/utils/plotly';

export default function OverallState() {
  return <Wrapper>{BarGraph({})}</Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
