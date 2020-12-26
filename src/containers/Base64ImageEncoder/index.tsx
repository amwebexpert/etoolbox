import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import * as copy from 'copy-to-clipboard';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, TextField, LinearProgress, Toolbar, Box, Button } from '@material-ui/core';

import PanoramaIcon from '@material-ui/icons/Panorama';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';

import FeatureTitle from '../../components/FeatureTitle';
import { EncodedFile, ErrorFile, loadFile, rejectFiles } from './services';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        flexGrow: 1,
    },
    header: {
        padding: '20px 0'
    },
    dropzone: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: '2px',
        borderRadius: '2px',
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    },
    cardContent: {
        minHeight: 50,
        minWidth: 50,
        maxWidth: 100,
        maxHeight: 100,
        margin: 20
    }
}));

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
        accept: ["image/jpeg", "image/png", "image/gif", "image/*"],
        maxSize: 100000000,
        multiple: true,
        onDrop
    });

    const handleCopy = (event: any, data: string) => {
        event.preventDefault();
        copy.default(data, { format: 'text/plain' });
        setToasterState({ open: true, message: 'Content copied into clipboard', type: 'success', autoHideDuration: 2000 });
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={PanoramaIcon} title="Base 64 encode image to be used inline" />

            <div {...getRootProps({ className: classes.dropzone })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <div>
                {errors && errors.map((err: ErrorFile, idx: number) => (
                    <div key={idx}>
                        <Typography color="secondary" variant="h5">
                            <b>{err.name}</b> ({err.size} bytes): {err.error}
                        </Typography>
                    </div>
                ))}
            </div>
            <div>
                {acceptedFiles.length !== encodedFiles.length &&
                    <div>
                        <Typography color="secondary" variant="h5">
                            Processing {acceptedFiles.length - encodedFiles.length} files. Wait a moment ...
                        </Typography>
                        <br />
                        <LinearProgress />
                        <br />
                    </div>
                }
            </div>
            {encodedFiles && encodedFiles.map((file: EncodedFile, idx: number) => (
                <div key={idx}>
                    <Card>
                        <img src={file.encoded} alt={file.name} className={classes.cardContent} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                multiline
                                rows="8"
                            />
                            <Toolbar>
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
