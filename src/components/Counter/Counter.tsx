import React from 'react';
import { connect } from 'react-redux';
import { INCREMENT, DECREMENT, INCREMENT_ASYNC } from '../../store/reducer';

const Counter = ({
  count,
  onIncrementAsync,
  onIncrement,
  onDecrement,
}: any) => {

  return (
    <div>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onIncrementAsync}>async</button>
      <div>{count}</div>
    </div>
  );
};
const action = (type: any) => () => ({ type });

export default connect((state) => ({ count: state }), {
  onIncrement: action(INCREMENT),
  onDecrement: action(DECREMENT),
  onIncrementAsync: action(INCREMENT_ASYNC),
})(Counter);
