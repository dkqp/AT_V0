import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import LoadingSpinner from '../micro_components/loading_spinner';
import SelectDates from '../micro_components/select_dates';
import { getCompanyList } from '@/services/backendapi';
import { getEquityPerformanceAPI } from '@/services/statisticsapi';
import { useDelayedState } from '@/hooks/customhooks';
import { LineGraph } from '@/utils/plotly';

export default function EachEquityPerformance() {
  const [symbolOption, setSymbolOption] = useState([]);
  const [settingSymbol, setSettingSymbol] = useState('');

  const incomeTypes = [
    { label: 'Nominal income', value: 'Nominal income' },
    { label: 'Realized income', value: 'Realized income' },
  ];
  const [incomeTypeValue, setIncomeTypeValue] = useState('');

  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  const [dateInterval, dateIntervalDisplayed, setDateInterval] =
    useDelayedState('1M', 2000);
  const [dateIntervalCorrect, setDateIntervalCorrect] = useState(true);

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);

  const [graphs, setGraphs] = useState(<div>loading graphs</div>);

  useEffect(() => {
    (async function () {
      const loadedSymbols = await getCompanyList();

      setSymbolOption(
        loadedSymbols.data.map(company => ({
          label: company[0],
          value: company[0],
        })),
      );
    })();
  }, []);

  useEffect(() => {
    if (settingSymbol.length > 0) {
      if (loading === false) {
        setLoading(true);
      }
    } else {
      setData(undefined);
    }
  }, [settingSymbol, startDate, endDate, dateInterval]);

  useEffect(() => {
    (async function () {
      if (loading === true && settingSymbol.length > 0 && dateIntervalCorrect) {
        const equityPerformance = await getEquityPerformanceAPI(
          settingSymbol,
          startDate,
          endDate,
          dateInterval,
        );
        console.log(equityPerformance);

        setData(equityPerformance.data);
        setLoading(false);
      }
    })();
  }, [loading, dateInterval]);

  useEffect(() => {
    if (loading === false && Object.keys(data).length > 0) {
      setGraphs(
        <Graphs>
          {LineGraph({
            xData: data.date,
            yData: data.accuQty,
            colorScale: 'Electric',
            title: 'Holding Quantity Transition',
            xLabel: 'Dates',
            yLabel: 'Holding Quantity (EA)',
          })}
          {incomeTypeValue === '' && <div>Select the income type</div>}
          {incomeTypeValue === 'Nominal income' &&
            LineGraph({
              xData: data.date,
              yData: data.o.map(
                (v, i) => v * data.accuQty[i] - data.accuFee[i],
              ),
              colorScale: 'Hot',
              title: 'Norminal Income Graph',
              xLabel: 'Dates',
              yLabel: 'Norminal Income ($)',
            })}
          {incomeTypeValue === 'Realized income' &&
            LineGraph({
              xData: data.date,
              yData: data.realized,
              colorScale: 'Picnic',
              title: 'Realized Income Graph',
              xLabel: 'Dates',
              yLabel: 'Realized Income ($)',
            })}
        </Graphs>,
      );
    }
  }, [incomeTypeValue, loading]);

  const checkDateInterval = value => {
    const pattern = /^(\d+(\.\d+)?)([YMd])$/;

    setDateIntervalCorrect(pattern.test(value));
  };

  return (
    <Wrapper>
      <SettingPanel>
        <Select
          name="symbol"
          placeholder="Select a symbol"
          options={symbolOption}
          onChange={e => {
            setSettingSymbol(e.value);
          }}
        />
        <Select
          name="Income Type"
          placeholder="Select income type"
          options={incomeTypes}
          onChange={e => {
            setIncomeTypeValue(e.value);
          }}
        />
        <SelectDates setStartDate={setStartDate} setEndDate={setEndDate} />
        <DateInterval isError={!dateIntervalCorrect}>
          <p>Date interval</p>
          <input
            name="Date Interval"
            value={dateIntervalDisplayed}
            onChange={e => {
              setDateInterval(e.target.value);
              checkDateInterval(e.target.value);
            }}
          />
          {!dateIntervalCorrect && <p>[number + 'Y' or 'M' or 'd']</p>}
        </DateInterval>
      </SettingPanel>
      {loading ? (
        <LoadingSpinner text={'Loading Equity Performance Graphes'} />
      ) : data && Object.keys(data).length > 0 ? (
        graphs
      ) : (
        <div>Select a symbol</div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SettingPanel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateInterval = styled.div`
  color: ${props => (props.isError ? 'red' : 'black')};
`;

const Graphs = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
