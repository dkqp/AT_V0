import React from 'react';
import styled from 'styled-components';

export default function Header() {
  return (
    <Wrapper>
      <h2>ALGOTR</h2>
      <h3>Trade based on rules</h3>
      <p>contact: ltg0513@gmail.com</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
