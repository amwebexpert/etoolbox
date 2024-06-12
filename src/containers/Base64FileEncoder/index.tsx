import React, { useCallback, useState } from 'react';

import PanoramaIcon from '@mui/icons-material/Panorama';
import { Box, Card, CardContent, TextField, Toolbar, Typography } from '@mui/material';
import prettyBytes from 'pretty-bytes';
import { Resizable } from 're-resizable';
import { FileRejection, useDropzone } from 'react-dropzone';

import CopyButton from '../../components/CopyButton';
import { FeatureScreen } from '../../components/FeatureScreen/FeatureScreen';
import { Spinner } from '../../components/Spinner/Spinner';
import { EncodedFile, ErrorFile, loadFile, MAX_FILE_SIZE_BYTES, rejectFiles } from './services';
import { imageResizer, useStyles } from './styled';

const Base64FileEncoder: React.FC = () => {
  const title = 'Base64 file encoder';
  const classes = useStyles();
  const [encodedFiles, setEncodedFiles] = useState<EncodedFile[]>([]);
  const [errors, setErrors] = useState<ErrorFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setErrors(rejectFiles(rejectedFiles)); // set/reset errors
    setEncodedFiles([]); // reset UI

    acceptedFiles.forEach((file: File) =>
      loadFile(file)
        .then((encFile) => setEncodedFiles((list) => [...list, encFile]))
        .catch((error) =>
          setErrors((list) => [
            ...list,
            {
              name: file.name,
              size: file.size,
              error,
            },
          ])
        )
    );
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxSize: MAX_FILE_SIZE_BYTES,
    multiple: true,
    onDrop,
  });

  const processing = acceptedFiles.length !== encodedFiles.length;

  return (
    <FeatureScreen iconType={PanoramaIcon} title={title}>
      <Spinner active={processing}>
        <Card {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <Typography variant='body1'>Drag 'n' drop some files here</Typography>
          <Typography variant='body1'>or just click to select files</Typography>
        </Card>
      </Spinner>
      <div>
        {errors &&
          errors.map((errFile: ErrorFile, idx: number) => {
            const size = prettyBytes(errFile.size);
            return (
              <div key={idx}>
                <Typography variant='body1'>
                  <strong>{errFile.name}</strong> ({size} bytes): {errFile.error}
                </Typography>
              </div>
            );
          })}
      </div>
      <div>
        {processing && (
          <Typography color='secondary' variant='h5'>
            Processing {acceptedFiles.length - encodedFiles.length} file(s)
          </Typography>
        )}
      </div>

      {encodedFiles.map((file: EncodedFile, idx: number) => (
        <div key={idx}>
          <Card sx={{ mt: 2 }}>
            {file.encoded.startsWith('data:image/') && (
              <Box component='div' alignItems='center' justifyContent='center'>
                <Resizable style={imageResizer} defaultSize={{ width: 300, height: '100%' }}>
                  <img src={file.encoded} alt={file.name} className={classes.image} />
                </Resizable>
              </Box>
            )}
            <CardContent>
              <Typography gutterBottom align='center' variant='h5' component='h2'>
                <b>{file.name}</b> ({prettyBytes(file.size)})
              </Typography>
              {file.encoded.startsWith('data:image/') && (
                <TextField
                  label='Full img tag'
                  fullWidth
                  value={`<img alt="${file.name}" src="${file.encoded}"/>`}
                  margin='normal'
                  variant='outlined'
                />
              )}
              <TextField
                label="Base64 encoded. Copy-paste into 'src' attribute"
                fullWidth
                value={file.encoded}
                margin='normal'
                variant='outlined'
                multiline={true}
                minRows='8'
              />
              <Toolbar className={classes.toolbar}>
                <Box component='div' flexGrow={1}></Box>
                <CopyButton data={file.encoded} />
              </Toolbar>
            </CardContent>
          </Card>
        </div>
      ))}
    </FeatureScreen>
  );
};

export default Base64FileEncoder;
