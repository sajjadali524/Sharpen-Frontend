import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from '../../store/slices/counterSlice';

const ReduxCounter = () => {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value)

  return (
    <div>
        <p>{count}</p>
        <button onClick={() => {dispatch(setValue(count + 1))}}>+</button>
        <button onClick={() => {dispatch(setValue(count - 1))}}>-</button>
    </div>
  )
}

export default ReduxCounter;