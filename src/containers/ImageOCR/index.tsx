import React from 'react';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Box, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import DeleteIcon from '@material-ui/icons/Delete';
import TextFieldsIcon from '@material-ui/icons/TextFields';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as copy from 'copy-to-clipboard';
import { Resizable } from "re-resizable";

import FeatureTitle from '../../components/FeatureTitle';
import * as services from './services';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
import { useStyles, imageResizer } from './styled';

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

    function handleCopy(event: any) {
        event.preventDefault();
        copy.default(generated, { format: 'text/plain' });
        setToasterState({ open: true, message: 'Content copied into clipboard', type: 'success', autoHideDuration: 2000 });
    }

    function handleClear(event: any) {
        event.preventDefault();
        setLogs('');
        setImgDataURL('');
        setGenerated('');
    }

    function handleProcess(event: any) {
        event.preventDefault();
        if (!imgDataURL) {
            setToasterState({ open: true, message: 'There is image to process', type: 'error', autoHideDuration: 2000 });
            return;
        }

        setLogs('Recognizing...');
        setGenerated('Processing the image, please wait...');

        const imageBuffer = Buffer.from(imgDataURL.split(',')[1], 'base64');
        services.processOCR(language, imageBuffer, logger, setGenerated)
            .then();
    }

    function logger(log: any) {
        setLogs(JSON.stringify(log, null, 2));
    }

    function onPasteFromClipboard(e: any) {
        const clipboardData = e.clipboardData || e.originalEvent.clipboardData || e.originalEvent.clipboard;
        services.clipboardToDataURL(clipboardData.items,
            (ev: ProgressEvent<FileReader>) => setImgDataURL(ev.target!.result as string));
    }

    function onFileSelected(file: File) {
        const reader = new FileReader();
        reader.onload = (ev: ProgressEvent<FileReader>) => setImgDataURL(ev.target!.result as string);
        reader.readAsDataURL(file);
    }

    React.useEffect(() => {
        document.onpaste = onPasteFromClipboard;
        return () => {
            document.removeEventListener('onpaste', onPasteFromClipboard);
        };
    }, []);

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={TextFieldsIcon} title="Image OCR (image text extraction)" />

            <form noValidate autoComplete="off" className={classes.form}>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="languageLabel">Image language</InputLabel>
                    <Select labelId="languageLabel" id="language"
                        value={language} autoFocus={isWidthUp('md', props.width)}
                        onChange={(e: any) => setLanguage(e.target.value)}
                    >
                        <MenuItem value="eng">English</MenuItem>
                        <MenuItem value="fra">French</MenuItem>
                    </Select>
                </FormControl>
            </form>

            <Card>
                <Box display="flex" alignItems="center" justifyContent="center">
                    {!imgDataURL && (
                        <div>
                            <p>Paste image from clipboard... Or select a file...</p>
                            <input type="file" onChange={(e: any) => onFileSelected(e.target.files[0])} />
                        </div>
                    )}
                    {imgDataURL && (
                        <Resizable style={imageResizer} defaultSize={{ width: 300, height: '100%' }}>
                            <img src={imgDataURL} alt="Clipboard content" className={classes.image} />
                        </Resizable>
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
