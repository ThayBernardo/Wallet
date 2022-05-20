// Coloque aqui suas actions

export const USER_INFO = 'USER_INFO';
export const GET_COIN = 'GET_COIN';
export const EXPENSE_CASE = 'EXPENSE_CASE';

export const userInfo = (email) => ({
  type: USER_INFO,
  payload: email,
});

export const getCoin = (currencies) => ({
  type: GET_COIN,
  payload: currencies,
});

export const expenses = (expense) => ({
  type: EXPENSE_CASE,
  payload: expense,
});

export const fetchCoin = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    const obj = Object.keys(result);
    const filter = obj.filter((coin) => coin !== 'USDT');
    dispatch(getCoin(filter));
  } catch (error) {
    console.log(error);
  }
};

export const ObjFor = (expense) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    delete result.USDT;
    dispatch(expenses({ ...expense, exchangeRates: result }));
  } catch (error) {
    console.log(error);
  }
};
