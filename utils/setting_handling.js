import Select from 'react-select';
import InputboxMessage from '@/components/micro_components/inputbox_message';

import { set_settings } from "@/services/settingapi";

const make_settings_table = (settingKeys, settingValues, settingInfos, setSettingValues, checkChange, setCheckChange) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Setting items</th>
          <th>Setting values</th>
        </tr>
      </thead>
      <tbody>
        {settingKeys.map(key => {
          if (settingInfos.types[key] === 'select' && settingValues[key] !== '' && checkChange[key] !== (settingValues[key] !== settingInfos.default[key])) {
            setCheckChange(curr => {
              const newValue = { ...curr };
              newValue[key] =
                settingValues[key] !== settingInfos.default[key];
              return newValue;
            });
          }

          return (
            <tr key={key}>
              <td style={{ fontWeight: (checkChange[key] && 'bold') }}>{key}{checkChange[key] && '*'}</td>
              <td>
                {settingInfos.default &&
                  ((settingInfos.types[key] !== 'select' && (
                    <InputboxMessage
                      name={key}
                      defaultValue={settingInfos.default[key]}
                      type={settingInfos.types[key]}
                      range={settingInfos.ranges[key]}
                      value={settingValues[key]}
                      setSettingValues={setSettingValues}
                      setCheckChange={setCheckChange}
                    />
                  )) ||
                    (settingInfos.types[key] === 'select' && (
                      <Select
                        name={key}
                        placeholder={settingInfos.default[key]}
                        options={settingInfos.ranges[key].map(v => {
                          return {
                            label: v,
                            value: v,
                          };
                        })}
                        onChange={e => {
                          setSettingValues(curr => {
                            const newValue = { ...curr };
                            newValue[key] = e.value;
                            return newValue;
                          });
                          setCheckChange(curr => {
                            const newValue = { ...curr };
                            newValue[key] =
                              e.value !== settingInfos.default[key];
                            return newValue;
                          });
                        }}
                      />
                    )))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const apply_new_setting = async (
  symbol,
  settingValues,
  defaultValues,
  defaultTypes,
  setSettingInfos,
) => {
  const args = {};
  Object.keys(settingValues).forEach(key => {
    if (
      settingValues[key] !== '' &&
      settingValues[key] !== defaultValues[key]
    ) {
      args[key] = ['int', 'float'].includes(defaultTypes[key])
        ? Number(settingValues[key])
        : settingValues[key];
    }
  });

  const loadedData = await set_settings(symbol, args);

  if (loadedData.message === 'success') {
    console.log(`New Setting for ${symbol} is below:`);
    console.log(loadedData.data);

    setSettingInfos(curr => ({
      ...curr,
      default: loadedData.data,
    }));
  }
};

export {
  make_settings_table,
  apply_new_setting,
}
