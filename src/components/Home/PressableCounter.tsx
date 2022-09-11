import { Button, Theme, withStyles, createStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            borderColor: theme.palette.text.disabled,
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: theme.shape.borderRadius,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        actions: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    });

type PressableCounterProps = {
    initialCounterValue?: number;
    onDispose?: () => void;
} & WithStyles<typeof styles>;

type PressableCounterState = {
    counter: number;
    startedAt: string;
};

type PressableCounterSnapshot = string;

class PressableCounter extends React.Component<PressableCounterProps, PressableCounterState, PressableCounterSnapshot> {
    static defaultProps = {
        initialCounterValue: 0,
    };

    constructor(props: PressableCounterProps) {
        super(props);

        this.state = {
            counter: props.initialCounterValue ?? 0,
            startedAt: new Date().toISOString(),
        };

        console.log('PressableCounter constructor', { props, state: this.state });
    }

    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo) {
        console.log('PressableCounter componentDidCatch', { error, errorInfo });
    }

    componentDidMount() {
        console.log('PressableCounter componentDidMount');
    }

    shouldComponentUpdate(nextProps: PressableCounterProps, nextState: PressableCounterState): boolean {
        console.log('PressableCounter shouldComponentUpdate', { nextProps, nextState, state: this.state });
        if (nextState.counter - (this.props.initialCounterValue ?? 0) > 5) {
            return false;
        } else {
            return true;
        }
    }

    componentWillUnmount() {
        console.log('PressableCounter componentWillUnmount');
    }

    getSnapshotBeforeUpdate(prevProps: PressableCounterProps, prevState: PressableCounterState): any {
        console.log('PressableCounter getSnapshotBeforeUpdate', { prevProps, prevState });
        return JSON.stringify({ prevProps, prevState }).replaceAll('"', "'");
    }

    componentDidUpdate(
        _prevProps: PressableCounterProps,
        _prevState: PressableCounterState,
        snapshot: PressableCounterSnapshot,
    ) {
        console.log('PressableCounter componentDidUpdate', { snapshot });
    }

    onClickInc(): void {
        this.setState({ counter: this.state.counter + 1 });
    }

    onClickDec(): void {
        this.setState({ counter: this.state.counter - 1 });
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <h3>Number of press events: {this.state.counter}</h3>

                <div className={this.props.classes.actions}>
                    <Button variant="contained" color="primary" onClick={() => this.onClickInc()}>
                        +
                    </Button>

                    {this.props.onDispose && (
                        <Button
                            variant="contained"
                            disabled={this.state.counter <= 0}
                            color="primary"
                            onClick={() => this.props.onDispose?.()}>
                            Dispose me!
                        </Button>
                    )}

                    <Button
                        variant="contained"
                        disabled={this.state.counter <= 0}
                        color="primary"
                        onClick={() => this.onClickDec()}>
                        -
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PressableCounter);
