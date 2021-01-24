import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import SearchIcon from '@material-ui/icons/Search';

import TocIcon from '@material-ui/icons/Toc';
import TextField from '@material-ui/core/TextField';
import * as copy from 'copy-to-clipboard';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, Toolbar } from '@material-ui/core';
import FeatureTitle from '../../components/FeatureTitle';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
    },
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
}));

interface Props {
    width: Breakpoint;
    inputText?: string;
    storeInputText: (name: string, value: string) => void;
}

const CommonLists: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { setToasterState } = useToasterUpdate();
    const { inputText, storeInputText } = props;

    const handleCopy = (event: any) => {
        event.preventDefault();
        copy.default('Not implemented yet!', { format: 'text/plain' });
        setToasterState({ open: true, message: 'Content copied into clipboard', type: 'success', autoHideDuration: 2000 });
    }

    function handleFilter(value: string) {
        storeInputText('lastSearchValue', value);
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={TocIcon} title="Mime-types, HTML Entities..." />

            <form noValidate autoComplete="off">
                <div>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                        <InputLabel htmlFor="searchField">Search</InputLabel>
                        <Input
                            id="searchField"
                            type="text"
                            autoFocus={isWidthUp('md', props.width)}
                            value={inputText}
                            onChange={e => handleFilter(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton><SearchIcon /></IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
            </form>

            <Toolbar className={classes.toolbar}>
                <Box display='flex' flexGrow={1}></Box>
                <Button endIcon={<AssignmentTurnedIn>Copy</AssignmentTurnedIn>}
                    variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
            </Toolbar>
        </div>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs.map.get('lastSearchValue')
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(CommonLists));
