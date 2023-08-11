import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getLogs } from '@/services/backendapi';

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const inter = setInterval(async () => {
      const loaded = await getLogs(logs);
      if (loaded.length > 0) {
        setLogs([...logs, ...loaded]);
      }
    }, 3000);

    return () => {
      clearInterval(inter);
    };
  }, [logs]);

  return (
    <Wrapper>
      <h2>Logs</h2>
      {logs.map(log => {
        const logSplit = log.split(',');
        return (
          <LogWrapper key={log.split(',')[0]}>
            <div style={{ width: '30%' }}>{logSplit[0]}</div>
            <div style={{ width: '20%' }}>{logSplit[1]}</div>
            <div style={{ width: '50%' }}>{logSplit[2]}</div>
          </LogWrapper>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const LogWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
`;
