import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import SelectDates from './micro_components/select_dates';

import { download_all_list, getCompanyList } from '@/services/backendapi';

export default function CompanyList() {
  const [companyList, setCompanyList] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [timeframe, setTimeframe] = useState();
  const [symbolOption, setSymbolOption] = useState();
  const [selectedSymbols, setSelectedSymbols] = useState();

  const timeframeOption = [
    { value: '1Day', label: '1 day' },
    { value: '1Hour', label: '1 hour' },
    { value: '30Minute', label: '30 mins' },
    { value: '15Minute', label: '15 mins' },
  ];

  useEffect(() => {
    (async () => {
      const response = await getCompanyList();
      if (response.data) {
        setCompanyList(
          response.data.map(company => (
            <tr key={company[0]}>
              <td>{company[0]}</td>
              <td>{company[1]}</td>
              <td>
                {company[2] === '1' && (
                  <input name={company[0]} type="checkbox" checked readOnly />
                )}
                {company[2] === '0' && (
                  <input name={company[0]} type="checkbox" readOnly />
                )}
              </td>
            </tr>
          )),
        );

        setSymbolOption(
          response.data.map(company => {
            return {
              value: company[0],
              label: company[0],
            };
          }),
        );
      }
    })();
  }, []);

  return (
    <Wrapper>
      <h2>Company List</h2>
      <List>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Company Name</th>
              <th>Judge</th>
            </tr>
          </thead>
          <tbody>{companyList}</tbody>
        </table>
      </List>
      <Download>
        <SelectDates setStartDate={setStartDate} setEndDate={setEndDate} />
        <Select
          name="timeframe"
          placeholder="time frame"
          options={timeframeOption}
          onChange={e => {
            setTimeframe(e.value);
          }}
        />
        <Select
          isMulti
          name="symbols"
          placeholder="symbols"
          options={symbolOption}
          onChange={e => {
            setSelectedSymbols(e.map(s => s.value));
          }}
        />
        <button
          onClick={e => {
            download_all_list(
              e,
              selectedSymbols,
              startDate,
              endDate,
              timeframe,
            );
          }}
        >
          Download historical data
        </button>
      </Download>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: visible;
`;

const List = styled.div`
  width: 100%;
  height: 60vh;
  padding: 5%;

  display: flex;
  flex-direction: row;
  justify-content: center;

  border: 1px solid #333;
  overflow-y: scroll;

  table {
    width: 100%;
  }

  table,
  td {
    border: 1px solid #333;
    text-align: center;
  }

  thead {
    background-color: #333;
    color: #fff;
  }
`;

const Download = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;
