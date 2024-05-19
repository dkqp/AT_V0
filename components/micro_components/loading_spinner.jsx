import React from 'react';
import styled from 'styled-components';

export default function LoadingSpinner({ text }) {
  return (
    <Wrapper>
      <LSpinner />
      <div>{text}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LSpinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid orange;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
