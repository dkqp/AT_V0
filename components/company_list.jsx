import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import axios from 'axios';

import { barToCSVDownload } from '@/utils/data_handling';

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
      const response = await axios({
        method: 'get',
        baseURL: '/api',
        url: '/historical_data/company_list',
      });
      if (response.data) {
        setCompanyList(
          response.data.map(company => (
            <tr key={company[0]}>
              <td>{company[0]}</td>
              <td>{company[1]}</td>
              <td>
                {company[2] === '1' && (
                  <input type="checkbox" id="scales" checked readOnly />
                )}
                {company[2] === '0' && (
                  <input type="checkbox" id="scales" readOnly />
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

  const download_all_list = async (
    event,
    selectedSymbols,
    startDate,
    endDate,
    timeframe,
  ) => {
    event.preventDefault();
    window.alert('Download begins!');

    const response = await axios({
      method: 'get',
      baseURL: '/api',
      url: '/historical_data/download_stock_data',
      params: {
        symbols: selectedSymbols.join(','),
        startDate: new Date(startDate).toJSON(),
        endDate: new Date(endDate).toJSON(),
        timeframe: timeframe,
      },
    });

    barToCSVDownload(response.data, timeframe);
  };

  return (
    <Wrapper>
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
        <Dates>
          <StartDate>
            <p>start date</p>
            <input
              type="date"
              onChange={e => {
                setStartDate(e.target.value);
              }}
            />
          </StartDate>
          <EndDate>
            <p>end date</p>
            <input
              type="date"
              onChange={e => {
                setEndDate(e.target.value);
              }}
            />
          </EndDate>
        </Dates>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

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

const List = styled.div`
  width: 100%;
  height: 50vh;
  padding: 5%;

  display: flex;
  flex-direction: row;
  justify-content: center;

  border: 1px solid #333;
  overflow-y: scroll;
`;

const Download = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

const Dates = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const StartDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  p {
    height: 5px;
  }
`;

const EndDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  p {
    height: 5px;
  }
`;
