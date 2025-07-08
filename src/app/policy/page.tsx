'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState,AppDispatch } from '../store';
import { increment, decrement, incrementByAmount } from '../redux/actions/counterSlice';

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())} style={{ margin: '10px' }}>
        Increment
      </button>
      <button onClick={() => dispatch(decrement())} style={{ margin: '10px' }}>
        Decrement
      </button>
      <button
        onClick={() => dispatch(incrementByAmount(5))}
        style={{ margin: '10px' }}
      >
        Increment by 5
      </button>
    </div>
  );
}