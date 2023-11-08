**You should follow the [project instruction](https://github.com/AutoBuySell) first to have a fully working service**

## Installation (In local server)
1. Install NVM
    1. Node Version Manager(NVM)
    2. Installation & Usage : https://github.com/nvm-sh/nvm#installing-and-updating
2. Install node of 16.14.0 version using NVM
    1. `nvm install 16.14.0`
    2. `nvm use 16.14.0`
    3. https://github.com/nvm-sh/nvm#usage
3. Clone this repository
    1. `git clone https://github.com/AutoBuySell/AT_V0.git`
4. Move into the cloned folder
5. Install node dependency environments
    1. `npm i`
6. Set .env file
```shell
ALPACA_PAPER_ENDPOINT=https://paper-api.alpaca.markets
ALPACA_PAPER_KEY=XXXXXXXXXXXXXX <= enter your key from Alpaca
ALPACA_PAPER_KEY_SECRET=XXXXXXXXXXXXXXXXXXXX <= enter your key secret

ALPACA_HISTORY_DATA_URL=https://data.alpaca.markets/v2

NEXT_PUBLIC_DATA_SERVER_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_SERVER_URL=http://localhost:8001
```
7. Make data folder
    1. Make 'data' folder in the root folder
    2. Make 'target_company.csv' file in the 'data' folder
    3. Write 'target_company.csv' file with your stock symbols in interest
       ```shell
       Symbol,Name,Judge
       TSLA,Tesla,1
       MSFT,Microsoft,1
       META,Meta platforms,1
       NVDA,Nvidia,1
       ```
9. Start server
    1. `npm run dev`
