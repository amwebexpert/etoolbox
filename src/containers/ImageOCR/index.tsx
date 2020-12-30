import React from 'react';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Box, Card, CardContent, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import DeleteIcon from '@material-ui/icons/Delete';
import TextFieldsIcon from '@material-ui/icons/TextFields';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as copy from 'copy-to-clipboard';

import FeatureTitle from '../../components/FeatureTitle';
import * as services from './services';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
const { createWorker } = require('tesseract.js');

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    form: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
    cardContent: {
        minHeight: 50,
        minWidth: 50,
        maxWidth: 100,
        maxHeight: 100,
        margin: 20
    },
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
    formatted: {
        padding: theme.spacing(1),
        border: '1px solid grey',
        wordWrap: 'break-word',
        height: 116,
    },
}));

interface Props {
    width: Breakpoint;
}

const ImageOCR: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { setToasterState } = useToasterUpdate();
    const [language, setLanguage] = React.useState('eng');
    const [logs, setLogs] = React.useState('');
    const [imgDataURL, setImgDataURL] = React.useState('');
    const [generated, setGenerated] = React.useState('');

    const handleCopy = (event: any) => {
        event.preventDefault();
        copy.default(generated, { format: 'text/plain' });
        setToasterState({ open: true, message: 'Content copied into clipboard', type: 'success', autoHideDuration: 2000 });
    }

    const handleClear = (event: any) => {
        event.preventDefault();
        setLogs('');
        setImgDataURL('');
        setGenerated('');
    }

    const handleProcess = (event: any) => {
        event.preventDefault();
        if (!imgDataURL) {
            setToasterState({ open: true, message: 'There is image to process', type: 'error', autoHideDuration: 2000 });
            return;
        }

        const imageBuffer = Buffer.from(imgDataURL.split(',')[1], 'base64');
        setLogs('Recognizing...');
        setGenerated('Processing the image, please wait...');

        (async () => {
            const worker = createWorker({
                logger: (log: any) => setLogs(JSON.stringify(log, null, 2))
            });
            await worker.load();
            await worker.loadLanguage(language);
            await worker.initialize(language);
            const result = await worker.recognize(imageBuffer);
            setGenerated(result.data.text);
            await worker.terminate();
        })();
    }


    React.useEffect(() => {
        document.onpaste = onPasteFromClipboard;
        return () => {
            document.removeEventListener('onpaste', onPasteFromClipboard);
        };
    }, []);

    function onPasteFromClipboard(e: any) {
        const clipboardData = e.clipboardData || e.originalEvent.clipboardData || e.originalEvent.clipboard;
        const items: DataTransferItemList = clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            const item: DataTransferItem = items[i];
            if (item.type.startsWith('image')) {
                const reader = new FileReader();
                reader.onload = (e: any) => setImgDataURL(e.target.result);
                reader.readAsDataURL(item.getAsFile() as Blob);
                break;
            }
        }
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={TextFieldsIcon} title="Image OCR" />

            <form noValidate autoComplete="off" className={classes.form}>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
                    <Grid container spacing={1}>
                        <Grid item md={1} sm={2} xs={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="languageLabel">
                                    Image language
                                </InputLabel>
                                <Select labelId="languageLabel" id="language"
                                    value={language} autoFocus={isWidthUp('md', props.width)}
                                    onChange={(e: any) => setLanguage(e.target.value)}
                                >
                                    <MenuItem value="eng">English</MenuItem>
                                    <MenuItem value="fra">French</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={1} sm={2} xs={3}>
                        </Grid>
                    </Grid>
                </Grid>
            </form>

            <Card>
                <Box display="flex" alignItems="center" justifyContent="center">
                    {!imgDataURL && (
                        <div>Paste image from clipboard...</div>
                    )}
                    {imgDataURL && (
                        <img src={imgDataURL} alt="Clipboard content" className={classes.cardContent} />
                    )}
                </Box>
                <CardContent>
                    <TextField
                        label="Extracted text"
                        fullWidth
                        value={generated}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows="8"
                    />
                    <Toolbar className={classes.toolbar}>
                        <Box display='flex' flexGrow={1}></Box>
                        <Button endIcon={<DeleteIcon>Clear</DeleteIcon>}
                            variant="contained" color="primary" onClick={handleClear}>Clear</Button>
                        <Button endIcon={<AssignmentTurnedIn>Copy</AssignmentTurnedIn>}
                            variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
                        <Button variant="contained" color="primary"
                            onClick={handleProcess}
                            endIcon={<TextFieldsIcon>Process</TextFieldsIcon>}>Process</Button>
                    </Toolbar>
                </CardContent>
            </Card>

            <SyntaxHighlighter language="json" style={docco} className={classes.formatted}>
                {logs}
            </SyntaxHighlighter>
        </div>
    );
}

export default withWidth()(ImageOCR);
