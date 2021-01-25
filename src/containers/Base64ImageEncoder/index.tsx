import React, { useCallback, useState } from 'react';

import { useDropzone, FileRejection } from 'react-dropzone';
import * as copy from 'copy-to-clipboard';
import { Resizable } from 're-resizable';
import prettyBytes from 'pretty-bytes';

import { Card, CardContent, Typography, TextField, Toolbar, Box, Button } from '@material-ui/core';
import PanoramaIcon from '@material-ui/icons/Panorama';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';

import FeatureTitle from '../../components/FeatureTitle';
import { EncodedFile, ErrorFile, loadFile, rejectFiles, MAX_FILE_SIZE_BYTES } from './services';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
import { useStyles, imageResizer } from './styled';
import { Spinner } from '../../components/Spinner/Spinner';

const Base64ImageEncoder: React.FC = () => {
    const classes = useStyles();
    const { setToasterState } = useToasterUpdate();
    const [encodedFiles, setEncodedFiles] = useState<EncodedFile[]>([]);
    const [errors, setErrors] = useState<ErrorFile[]>([]);

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        setErrors(rejectFiles(rejectedFiles)); // set/reset errors
        setEncodedFiles([]); // reset UI

        acceptedFiles.forEach((file: File) =>
            loadFile(file)
                .then(encFile => setEncodedFiles(list => [...list, encFile]))
                .catch(error => setErrors(list => [...list, {
                    name: file.name,
                    size: file.size,
                    error
                }]))
        );
    }, []);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: ['image/jpeg', 'image/png', 'image/gif', 'image/*'],
        maxSize: MAX_FILE_SIZE_BYTES,
        multiple: true,
        onDrop
    });

    const processing = acceptedFiles.length !== encodedFiles.length;

    const handleCopy = (event: any, data: string) => {
        event.preventDefault();
        copy.default(data, { format: 'text/plain' });
        setToasterState({ open: true, message: 'Content copied into clipboard', type: 'success', autoHideDuration: 2000 });
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={PanoramaIcon} title="Base64 image encoder" />

            <Spinner active={processing}>
                <div {...getRootProps({ className: classes.dropzone })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </Spinner>
            <div>
                {errors && errors.map((errFile: ErrorFile, idx: number) => {
                    const size = prettyBytes(errFile.size);
                    return (
                        <div key={idx}>
                            <Typography variant="body1">
                                <strong>{errFile.name}</strong> ({size} bytes): {errFile.error}
                            </Typography>
                        </div>
                    )
                })}
            </div>
            <div>
                {processing &&
                    <Typography color="secondary" variant="h5">
                        Processing {acceptedFiles.length - encodedFiles.length} file(s)
                    </Typography>
                }
            </div>

            {encodedFiles && encodedFiles.map((file: EncodedFile, idx: number) => (
                <div key={idx}>
                    <Card>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Resizable style={imageResizer} defaultSize={{ width: 300, height: '100%' }}>
                                <img src={file.encoded} alt={file.name} className={classes.image} />
                            </Resizable>
                        </Box>
                        <CardContent>
                            <Typography gutterBottom align="center" variant="h5" component="h2">
                                <b>{file.name}</b> ({file.size} bytes)
                            </Typography>
                            <TextField
                                label="Full img tag"
                                fullWidth
                                value={`<img alt="${file.name}" src="${file.encoded}"/>`}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Base64 encoded. Copy-paste into 'src' attribute"
                                fullWidth
                                value={file.encoded}
                                margin="normal"
                                variant="outlined"
                                multiline
                                rows="8"
                            />
                            <Toolbar className={classes.toolbar}>
                                <Box display='flex' flexGrow={1}></Box>
                                <Button endIcon={<AssignmentTurnedIn>Copy</AssignmentTurnedIn>}
                                    onClick={(e) => handleCopy(e, file.encoded)}
                                    variant="contained" color="primary">Copy</Button>
                            </Toolbar>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default Base64ImageEncoder;
