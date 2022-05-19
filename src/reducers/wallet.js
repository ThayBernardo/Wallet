// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_COIN } from '../actions';

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case GET_COIN:
    return { ...state,
      currencies: action.payload,
    }; default:
    return state;
  }
};

export default wallet;
