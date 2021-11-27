import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Box, Toolbar } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import SaveIcon from '@material-ui/icons/Save';
import WrapTextIcon from '@material-ui/icons/WrapText';
import TextField from '@material-ui/core/TextField';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
import * as fileService from '../../services/file-utils';
import FeatureTitle from '../../components/FeatureTitle';
import CopyButton from '../../components/CopyButton';
import { Helmet } from 'react-helmet';
import { useSyntaxHighlightTheme } from '../../hooks/useSyntaxHighlightTheme';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    formatted: {
        borderColor: theme.palette.text.disabled,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: theme.shape.borderRadius,
        maxHeight: '500px',
        width: '100%',
        overflow: 'auto',
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

const JSONFormatter: React.FC<Props> = (props: Props) => {
    const title = 'JSON Formatter';
    const classes = useStyles();
    const syntaxTheme = useSyntaxHighlightTheme();
    const { inputText, storeInputText } = props;
    const [formatted, setFormatted] = React.useState('');

    React.useEffect(() => {
        setFormatted(services.formatJson(inputText));
    }, [inputText]);

    const handleSaveAs = (event: any) => {
        event.preventDefault();
        fileService.saveJsonAs(formatted);
    };

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={WrapTextIcon} title={title} />

                <form noValidate autoComplete='off'>
                    <div>
                        <TextField
                            autoFocus={isWidthUp('md', props.width)}
                            label='JSON Content'
                            placeholder='Paste or type the json content here'
                            multiline
                            minRows={10}
                            maxRows={isWidthUp('md', props.width) ? 20 : 10}
                            variant='outlined'
                            margin='normal'
                            fullWidth={true}
                            value={inputText}
                            onChange={(e) => storeInputText('lastJSONFormatterValue', e.target.value)}
                        />
                    </div>
                </form>

                <Toolbar className={classes.toolbar}>
                    <Box display='flex' flexGrow={1}></Box>
                    <CopyButton data={formatted} />
                    <Button
                        endIcon={<SaveIcon>Save As...</SaveIcon>}
                        disabled={!formatted}
                        variant='contained'
                        color='primary'
                        onClick={handleSaveAs}
                    >
                        Save As...
                    </Button>
                </Toolbar>

                <SyntaxHighlighter style={syntaxTheme} language='json' className={classes.formatted}>
                    {formatted}
                </SyntaxHighlighter>
            </div>
        </>
    );
};

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs['lastJSONFormatterValue'],
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(JSONFormatter));
