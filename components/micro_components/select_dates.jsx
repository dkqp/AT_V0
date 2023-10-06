import React from 'react';
import styled from 'styled-components';

export default function SelectDates({ setStartDate, setEndDate }) {
  return (
    <Dates>
      <StartDate>
        <span>start date</span>
        <input
          type="date"
          onChange={e => {
            setStartDate(new Date(e.target.value));
          }}
        />
      </StartDate>
      <EndDate>
        <span>end date</span>
        <input
          type="date"
          onChange={e => {
            const endDate = new Date(e.target.value);
            endDate.setDate(endDate.getDate() + 1);
            setEndDate(endDate);
          }}
        />
      </EndDate>
    </Dates>
  );
}

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
`;

const EndDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
