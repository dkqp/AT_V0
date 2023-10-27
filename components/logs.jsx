import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SelectDates from './micro_components/select_dates';

import { get_logs, update_logs } from '@/services/logapi';
import { make_log_table, filter_log_by_date } from '@/utils/data_handling';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [updatedDate, setUpdatedDate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    (async function () {
      const loadedLogs = await get_logs();
      setLogs(loadedLogs.data);
      setUpdatedDate(Date());
    })();
  }, []);

  useEffect(() => {
    if (logs && startDate && endDate) {
      (async function () {
        const loadedLogs = await get_logs();
        const filteredLogs = filter_log_by_date(
          loadedLogs.data,
          startDate.toJSON(),
          endDate.toJSON(),
        );
        setLogs(filteredLogs);
      })();
    }
  }, [startDate, endDate]);

  const update_log_table = async () => {
    const loadedLogs = await update_logs();
    setLogs(loadedLogs.data);
    setUpdatedDate(Date());
  };

  const sort_logs = key => {
    setLogs(logs => {
      const sortedLogs = [...logs];

      return sortedLogs.sort((a, b) => {
        if (a[key] > b[key]) {
          return 1;
        } else if (a[key] < b[key]) {
          return -1;
        } else {
          return 0;
        }
      });
    });
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
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button onClick={update_log_table}>refresh</button>
          <SelectDates setStartDate={setStartDate} setEndDate={setEndDate} />
        </div>
      </LogHead>
      {make_log_table(logs, sort_logs)}
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

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr,
  th,
  td {
    text-align: center;
    vertical-align: middle;
    border: 1px solid #000;
  }

  th.keys_for_sort {
    cursor: pointer;
    color: orange;

    :hover {
      color: coral;
      scale: 1.05;
    }
  }

  thead {
    background-color: #333;
    color: #fff;
  }
`;

const LogHead = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
