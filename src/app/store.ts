import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './redux/actions/counterSlice';
import loginReducer from './redux/actions/loginSlice';
import RegisterReducer from './redux/actions/RegisterAction';
import videoReducer from './redux/actions/VideoloadAction';
const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    register : RegisterReducer,
    videos : videoReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;