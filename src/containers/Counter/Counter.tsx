import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { decrementAction, incrementAction, incrementAsyncAction } from '../../actions/counter-actions';
import { CounterState } from '../../reducers/counter-reducer';

interface Props {
    count?: number;
    increment?: (value: number) => void;
    incrementAsync?: (value: number) => void;
    decrement?: (value: number) => void;
}

const Counter: React.FC<Props> = (props: Props) => {
    return (
        <div>
            <button onClick={() => props.increment!(1)}>+</button>
            <button onClick={() => props.decrement!(1)}>-</button>
            <button onClick={() => props.incrementAsync!(1)}>async</button>
            <div>{props.count}</div>
        </div>
    );
}

export function mapStateToProps(state: any, ownProps: any) {
    return {
        count: state.counter.count
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        increment: (value: number) => dispatch(incrementAction(value)),
        incrementAsync: (value: number) => dispatch(incrementAsyncAction(value)),
        decrement: (value: number) => dispatch(decrementAction(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
