import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './redux/actions/counterSlice';
import loginReducer from './redux/actions/loginSlice';
import RegisterReducer from './redux/actions/RegisterAction';
const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    register : RegisterReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;