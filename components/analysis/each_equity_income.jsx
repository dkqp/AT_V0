import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import LoadingSpinner from '../micro_components/loading_spinner';
import SelectDates from '../micro_components/select_dates';
import { getCompanyList } from '@/services/backendapi';
import { getEquityIncomeAPI } from '@/services/statisticsapi';

export default function EachEquityIncome() {
  const [symbolOption, setSymbolOption] = useState([]);
  const [settingSymbol, setSettingSymbol] = useState('');

  const incomeTypes = [
    { label: 'Nominal income', value: 'Nominal income' },
    { label: 'Realized income', value: 'Realized income' },
  ];
  const [incomeTypeValue, setIncomeTypeValue] = useState('');

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [data, setData] = useState();

  const [loading, setLoading] = useState(false);

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
    if (settingSymbol.length > 0 && incomeTypeValue.length > 0) {
      if (loading === false) {
        setLoading(true);
      }
    } else {
      setData(undefined);
    }
  }, [settingSymbol, incomeTypeValue]);

  useEffect(() => {
    (async function () {
      if (
        loading === true &&
        settingSymbol.length > 0 &&
        incomeTypeValue.length > 0
      ) {
        const equityIncome = await getEquityIncomeAPI(
          settingSymbol,
          incomeTypeValue,
        );
        console.log(equityIncome);

        setData(equityIncome.data);
        setLoading(false);
      }
    })();
  }, [loading, settingSymbol, incomeTypeValue]);

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
      </SettingPanel>
      {loading ? (
        <LoadingSpinner text={'Loading Equity Income Graphes'} />
      ) : data ? (
        <div>data is here</div>
      ) : (
        <div>Select a symbol and type of income</div>
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
