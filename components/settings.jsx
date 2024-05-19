import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import { get_default_settings, get_settings } from '@/services/settingapi';
import { make_settings_table } from '@/utils/setting_handling';
import { getCompanyList } from '@/services/backendapi';
import { apply_new_setting } from '@/utils/setting_handling';

export default function Settings() {
  const [settingValues, setSettingValues] = useState({});
  const [settingInfos, setSettingInfos] = useState({});
  const [settingKeys, setSettingKeys] = useState([]);
  const [checkChange, setCheckChange] = useState({});

  const [symbolOption, setSymbolOption] = useState([]);
  const [settingSymbol, setSettingSymbol] = useState('Default');

  useEffect(() => {
    (async function () {
      const loadedData = await get_default_settings();

      if (loadedData.message === 'success') {
        setSettingValues(() => {
          const newValue = {};
          Object.keys(loadedData.data.default).forEach(key => {
            newValue[key] = '';
          });
          return newValue;
        });
        setSettingInfos(loadedData.data);
        setSettingKeys(Object.keys(loadedData.data.default));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const loaded = await getCompanyList();
      setSymbolOption(
        loaded.data.map(company => ({
          label: company[0],
          value: company[0],
        })),
      );
    })();
  }, []);

  useEffect(() => {
    if (settingSymbol !== 'Default') {
      (async () => {
        const loadedData = await get_settings(settingSymbol);

        if (loadedData.message === 'success') {
          setSettingInfos(curr => ({
            ...curr,
            default: loadedData.data,
          }));
        }
      })();
    }
  }, [settingSymbol]);

  return (
    <Wrapper>
      <h2>Settings</h2>
      <SettingTable>
        {make_settings_table(
          settingKeys,
          settingValues,
          settingInfos,
          setSettingValues,
          checkChange,
          setCheckChange,
        )}
      </SettingTable>
      <SettingPanel>
        <p>{settingSymbol}</p>
        <Select
          name="symbol"
          placeholder="Default"
          options={symbolOption}
          onChange={e => {
            setSettingSymbol(e.value);
          }}
        />
        <button
          disabled={
            settingSymbol === 'Default' ||
            !Object.values(checkChange).includes(true)
              ? 'disabled'
              : ''
          }
          onClick={() => {
            apply_new_setting(
              settingSymbol,
              settingValues,
              settingInfos.default,
              settingInfos.types,
              setSettingInfos,
            );
          }}
        >
          Apply new setting
        </button>
      </SettingPanel>
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
`;

const SettingTable = styled.div`
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

const SettingPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  p {
    font-weight: bold;
  }
`;
