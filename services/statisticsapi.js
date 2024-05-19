import axios from "axios";

const getNominalIncomeAPI = async () => {
    const axiosOptions = {
        method: 'GET',
        baseURL: process.env.NEXT_PUBLIC_DATA_SERVER_URL,
        url: '/stats/nominal_income',
    };

    const response = await axios(axiosOptions);

    return response.data;
}

const getCurrentAssetsAPI = async () => {
    const axiosOptions = {
        method: 'GET',
        baseURL: process.env.NEXT_PUBLIC_DATA_SERVER_URL,
        url: '/stats/current_assets',
    };

    const response = await axios(axiosOptions);

    return response.data;
}

const getTransactionsAPI = async () => {
    const axiosOptions = {
        method: 'GET',
        baseURL: process.env.NEXT_PUBLIC_DATA_SERVER_URL,
        url: '/stats/transactions',
    };

    const response = await axios(axiosOptions);

    return response.data;
}

const getEquityIncomeAPI = async (symbol, incomeType) => {
    const axiosOptions = {
        method: 'GET',
        baseURL: process.env.NEXT_PUBLIC_DATA_SERVER_URL,
        url: '/stats/equity_income',
        params: {
            symbol,
            incomeType,
        }
    };

    const response = await axios(axiosOptions);

    return response.data;
}

export {
    getNominalIncomeAPI,
    getCurrentAssetsAPI,
    getTransactionsAPI,
    getEquityIncomeAPI,
}
