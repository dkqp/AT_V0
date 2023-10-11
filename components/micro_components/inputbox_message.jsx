import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function InputboxMessage({
  name,
  defaultValue,
  type,
  range,
  value,
  setSettingValues,
  setCheckChange,
}) {
  const [correct, setCorrect] = useState(true);

  useEffect(() => {
    if (range) {
      if (value === '') {
        setCorrect(true);
      } else if (
        (type === 'int' ? Number.isInteger(Number(value)) : true) &&
        (range.hasOwnProperty('min') ? Number(value) >= range.min : true) &&
        (range.hasOwnProperty('max') ? Number(value) <= range.max : true)
      ) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    }
  }, [value]);

  useEffect(() => {
    if (value === '' || !correct || Number(value) === defaultValue) {
      setCheckChange(curr => {
        const newValue = { ...curr };
        newValue[name] = false;
        return newValue;
      });
    } else {
      setCheckChange(curr => {
        const newValue = { ...curr };
        newValue[name] = true;
        return newValue;
      });
    }
  }, [value, defaultValue, correct]);

  return (
    <Wrapper>
      <input
        name={name}
        placeholder={defaultValue}
        value={value}
        onChange={e =>
          setSettingValues(curr => {
            const newValue = { ...curr };
            newValue[name] = e.target.value;
            return newValue;
          })
        }
        style={{ textAlign: 'center' }}
      />
      <Mention correct={correct}>
        {`Type: ${type}, `}
        {range.hasOwnProperty('min') && `Min: ${range.min}`}
        {range.hasOwnProperty('min') && range.hasOwnProperty('max') && ' '}
        {range.hasOwnProperty('max') && `Max: ${range.max}`}
      </Mention>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Mention = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 0.8em;
  color: ${props => (props.correct ? 'green' : 'red')};
`;
