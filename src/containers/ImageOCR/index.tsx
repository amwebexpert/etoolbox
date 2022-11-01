import { Buffer } from 'buffer';

import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import OCRIcon from '@mui/icons-material/Scanner';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  LinearProgress,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { Resizable } from 're-resizable';
import { Helmet } from 'react-helmet';

import CopyButton from '../../components/CopyButton';
import FeatureTitle from '../../components/FeatureTitle';
import { Spinner } from '../../components/Spinner/Spinner';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
import { useIsWidthUp } from '../../theme';
import * as services from './services';
import { imageResizer, useStyles } from './styled';

interface WorkerStatus {
  workerId: string;
  jobId: string;
  status: string;
  progress: number;
}

const INITIAL_WORKER_STATUS: WorkerStatus = {
  workerId: '',
  jobId: '',
  status: '',
  progress: 0,
};

const ImageOCR: React.FC = () => {
  const title = 'Image OCR (text extraction)';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const { setToasterState } = useToasterUpdate();
  const [language, setLanguage] = React.useState('eng');
  const [workerStatus, setWorkerStatus] = React.useState<WorkerStatus>(INITIAL_WORKER_STATUS);
  const [imgDataURL, setImgDataURL] = React.useState('');
  const [imgExtractedText, setImgExtractedText] = React.useState('');

  function handleClear(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setWorkerStatus(INITIAL_WORKER_STATUS);
    setImgDataURL('');
    setImgExtractedText('');
  }

  function handleProcess(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!imgDataURL) {
      setToasterState({
        open: true,
        message: 'There is no image to process',
        type: 'error',
        autoHideDuration: 2000,
      });
      return;
    }

    setImgExtractedText('Processing the image, please wait…');

    const imageBuffer = Buffer.from(imgDataURL.split(',')[1], 'base64');
    services.processOCR(language, imageBuffer, logger, setImgExtractedText).then();
  }

  function logger(workerStatus: WorkerStatus) {
    setWorkerStatus(workerStatus);
    setImgExtractedText(`Processing the image\n\t → ${workerStatus.status}…`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onPasteFromClipboard(e: any) {
    const clipboardData = e.clipboardData || e.originalEvent.clipboardData || e.originalEvent.clipboard;
    services.clipboardToDataURL(clipboardData.items, (ev: ProgressEvent<FileReader>) =>
      setImgDataURL(ev.target?.result as string),
    );
  }

  function onFileSelected(file?: File) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => setImgDataURL(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  React.useEffect(() => {
    document.onpaste = onPasteFromClipboard;
    return () => {
      document.removeEventListener('onpaste', onPasteFromClipboard);
    };
  }, []);

  return (
    <>
      <Helmet title={title} />
      <div className={classes.root}>
        <FeatureTitle iconType={OCRIcon} title={title} />

        <form noValidate autoComplete="off" className={classes.form}>
          <FormControl className={classes.formControl}>
            <TextField
              select={true}
              label="Image language"
              id="language"
              style={{ width: 160 }}
              value={language}
              autoFocus={isMdUp}
              onChange={e => setLanguage(e.target.value)}>
              {/**
               * TODO: Add all Tesseract.js supported languages:
               * https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016
               */}
              <MenuItem value="eng">English</MenuItem>
              <MenuItem value="fra">French</MenuItem>
            </TextField>
          </FormControl>
        </form>

        <Card>
          <Box display="flex" alignItems="center" justifyContent="center" className={classes.imageSelector}>
            {!imgDataURL && (
              <div>
                <Typography>paste image from clipboard</Typography>
                <Typography>or select a file</Typography>
                <input
                  type="file"
                  color="primary"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFileSelected(e.target.files?.[0])}
                  id="icon-button-file"
                  style={{ display: 'none' }}
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
              <Button endIcon={<DeleteIcon />} variant="contained" color="primary" onClick={handleClear}>
                Clear
              </Button>
            </Box>
          )}
          <CardContent>
            <Spinner active={imgExtractedText.startsWith('Processing')}>
              <TextField
                label="Extracted text"
                fullWidth
                value={imgExtractedText}
                margin="normal"
                variant="outlined"
                multiline
                minRows="8"
              />
            </Spinner>
            <LinearProgress variant="determinate" value={workerStatus.progress * 100} />
            <Toolbar className={classes.toolbar}>
              <Box display="flex" flexGrow={1}></Box>
              <CopyButton data={imgExtractedText} sx={{ mr: 1 }} />
              <Button
                variant="contained"
                title="Run optical caracters recognition process to extract text"
                color="primary"
                onClick={handleProcess}
                disabled={!imgDataURL}
                endIcon={<OCRIcon />}>
                Run
              </Button>
            </Toolbar>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ImageOCR;
