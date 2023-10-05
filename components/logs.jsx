import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { get_logs, update_logs } from '@/services/logapi';
import { make_log_table } from '@/utils/data_handling';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [updatedDate, setUpdatedDate] = useState();

  useEffect(() => {
    (async function () {
      const loadedLogs = await get_logs();
      setLogs(loadedLogs.data);
      setUpdatedDate(Date());
    })();
  }, []);

  const update_log_table = async () => {
    const loadedLogs = await update_logs();
    setLogs(loadedLogs.data);
    setUpdatedDate(Date());
  };

  return (
    <Wrapper>
      <LogHead>
        <p style={{ width: '40%' }}>updated: {updatedDate}</p>
        <h2 style={{ width: '20%', textAlign: 'center' }}>Logs</h2>
        <div
          style={{
            width: '40%',
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
        >
          <button onClick={update_log_table}>reflesh</button>
        </div>
      </LogHead>
      <LogTable>{make_log_table(logs)}</LogTable>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogHead = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LogTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr,
  th,
  td {
    text-align: center;
    vertical-align: middle;
    border: 1px solid #000;
  }
`;
