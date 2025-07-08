// src/lib/redux/reducers/counterReducer.ts
import { CounterState, CounterActionTypes } from '../types/counterTypes';
import {
  INCREMENT_ASYNC,
  INCREMENT,
  DECREMENT,
  INCREMENT_SUCCESS,
  INCREMENT_FAILURE
} from '../types/counterTypes';

const initialState: CounterState = {
  count: 0,
  loading: false,
  error: null
};

const counterReducer = (
  state = initialState,
  action: CounterActionTypes
): CounterState => {
  switch (action.type) {
    case INCREMENT_ASYNC:
      return { ...state, loading: true, error: null };
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case INCREMENT_SUCCESS:
      return { 
        ...state, 
        count: state.count + action.payload,
        loading: false 
      };
    case INCREMENT_FAILURE:
      return { 
        ...state, 
        loading: false,
        error: action.payload 
      };
    default:
      return state;
  }
};

export default counterReducer;
