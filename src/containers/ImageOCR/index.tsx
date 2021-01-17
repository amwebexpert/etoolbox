import React from 'react';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Box, Card, CardContent, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField, Toolbar, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import DeleteIcon from '@material-ui/icons/Delete';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import * as copy from 'copy-to-clipboard';
import { Resizable } from "re-resizable";
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';

import FeatureTitle from '../../components/FeatureTitle';
import * as services from './services';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
import { useStyles, imageResizer } from './styled';

interface Props {
    width: Breakpoint;
}

interface WorkerStatus {
    workerId: string;
    jobId: string;
    status: string;
    progress: number;
}

const INITIAL_WORKER_STATUS: WorkerStatus = {
    workerId: '', jobId: '', status: '', progress: 0
}

const ImageOCR: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { setToasterState } = useToasterUpdate();
    const [language, setLanguage] = React.useState('eng');
    const [workerStatus, setWorkerStatus] = React.useState<WorkerStatus>(INITIAL_WORKER_STATUS);
    const [imgDataURL, setImgDataURL] = React.useState('');
    const [imgExtractedText, setImgExtractedText] = React.useState('');

    function handleCopy(event: any) {
        event.preventDefault();
        copy.default(imgExtractedText, { format: 'text/plain' });
        setToasterState({ open: true, message: 'Content copied into clipboard', type: 'success', autoHideDuration: 2000 });
    }

    function handleClear(event: any) {
        event.preventDefault();
        setWorkerStatus(INITIAL_WORKER_STATUS);
        setImgDataURL('');
        setImgExtractedText('');
    }

    function handleProcess(event: any) {
        event.preventDefault();
        if (!imgDataURL) {
            setToasterState({ open: true, message: 'There is image to process', type: 'error', autoHideDuration: 2000 });
            return;
        }

        setImgExtractedText('Processing the image, please wait...');

        const imageBuffer = Buffer.from(imgDataURL.split(',')[1], 'base64');
        services.processOCR(language, imageBuffer, logger, setImgExtractedText)
            .then();
    }

    function logger(workerStatus: WorkerStatus) {
        setWorkerStatus(workerStatus);
        setImgExtractedText(`Processing the image\n    ----> ${workerStatus.status}...`);
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
            <FeatureTitle iconType={TextFieldsIcon} title="Image OCR (text extraction)" />

            <form noValidate autoComplete="off" className={classes.form}>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="languageLabel">Image language</InputLabel>
                    <Select labelId="languageLabel" id="language"
                        value={language} autoFocus={isWidthUp('md', props.width)}
                        onChange={(e: any) => setLanguage(e.target.value)}
                    >
                        {/**
                         * TODO: Add all Tesseract.js supported languages:
                         * https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016
                         */}
                        <MenuItem value="eng">English</MenuItem>
                        <MenuItem value="fra">French</MenuItem>
                    </Select>
                </FormControl>
            </form>

            <Card>
                <Box display="flex" alignItems="center" justifyContent="center" className={classes.imageSelector}>
                    {!imgDataURL && (
                        <div>
                            <Typography>paste image from clipboard</Typography>
                            <Typography>or select a file</Typography>
                            <input type="file" color="primary" accept="image/*"
                                onChange={(e: any) => onFileSelected(e.target.files[0])}
                                id="icon-button-file" style={{ display: 'none', }}
                            />
                            <label htmlFor="icon-button-file">
                                <Button variant="contained" component="span" color="primary">
                                    <PhotoCameraIcon />
                                </Button>
                            </label>
                        </div>
                    )}
                    {imgDataURL && (
                        <Resizable style={imageResizer} defaultSize={{ width: 300, height: '100%' }}>
                            <img src={imgDataURL} alt="Clipboard content" className={classes.image} />
                        </Resizable>
                    )}
                </Box>
                {imgDataURL && (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button endIcon={<DeleteIcon />} variant="contained" color="primary" onClick={handleClear}>Clear</Button>
                    </Box>
                )}
                <CardContent>
                    <LoadingOverlay 
                        active={imgExtractedText.startsWith('Processing')} 
                        spinner={<ScaleLoader />}>
                        <TextField
                            label="Extracted text"
                            fullWidth
                            value={imgExtractedText}
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows="8"
                        />
                    </LoadingOverlay>
                    <LinearProgress variant="determinate" value={workerStatus.progress * 100} />
                    <Toolbar className={classes.toolbar}>
                        <Box display='flex' flexGrow={1}></Box>
                        <Button endIcon={<AssignmentTurnedIn />}
                            variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
                        <Button variant="contained" color="primary"
                            onClick={handleProcess}
                            endIcon={<TextFieldsIcon />}>Run</Button>
                    </Toolbar>
                </CardContent>
            </Card>
        </div>
    );
}

export default withWidth()(ImageOCR);
