'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';

import Header from '@/components/header';

import CompanyList from '@/components/company_list';

export default function HomePage() {
  useEffect(() => {
    // test1(alpaca);
    // const options = {
    //   start: '2023-03-02T16:44:47.274Z', // new Date(new Date().setDate(new Date().getDate() - 1)), // 1 day ago
    //   end: '2023-03-03T16:14:47.274Z', // new Date(), // Current date
    //   feed: 'iex',
    // };
    // const dataPromise = test2(alpaca, 'TSLA', options);
    // dataPromise.then(dataList => {
    //   // console.log(dataList);
    //   console.log(dataList.length);
    //   let sum = 0;
    //   dataList.forEach(data => {
    //     sum += data['Size'];
    //   });
    //   console.log(sum);
    // });
    // const eqlist = test3(alpaca, 'iex');
    // eqlist.then(eqlist => {
    //   console.log(eqlist);
    // });
    //   const curr = new Date();
    //   curr.setHours(curr.getHours - 1);
    //   console.log(curr.toJSON());
    //   (async function () {
    //     const dd = await getBars(
    //       alpaca,
    //       'TSLA',
    //       '2023-03-15T16:44:47.274Z',
    //       curr.toJSON(),
    //       '30Minute',
    //       true,
    //     );
    //     console.log('hi');
    //     console.log(dd);
    //   })();
  }, []);

  return (
    <main>
      <Header />
      <Body>
        <Row1>
          <div style={{ width: '25%' }}>
            <CompanyList />
          </div>
        </Row1>
      </Body>
    </main>
  );
}

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Row1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
