import React from 'react';

import { Box, Card, CardContent, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PaletteIcon from '@material-ui/icons/Palette';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import { Resizable } from "re-resizable";
import { ColorResult, SketchPicker } from 'react-color';

import FeatureTitle from '../../components/FeatureTitle';
import * as services from './services';
import { useStyles, imageResizer } from './styled';
import CopyButton from '../../components/CopyButton';

const ColorPicker: React.FC = () => {
    const classes = useStyles();
    const [imgDataURL, setImgDataURL] = React.useState('');
    const [background, setBackground] = React.useState('');

    function handleClear(event: any) {
        event.preventDefault();
        setImgDataURL('');
        setBackground('');
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

        // Unmount cleanup
        return () => {
            document.removeEventListener('onpaste', onPasteFromClipboard);
        };
    }, []);

    React.useEffect(() => {
        if (imgDataURL) {
            document.getElementById('image')!.addEventListener('click', onImageClick);
        }
    }, [imgDataURL]);

    function onImageClick(event: MouseEvent) {
        const image = document.getElementById('image')! as HTMLImageElement;
        const color = services.retrieveClickedColor(event, image);
        setBackground(color);
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={PaletteIcon} title="Color picker" />

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
                            <img id="image" src={imgDataURL} alt="Clipboard content" className={classes.image} />
                        </Resizable>
                    )}
                </Box>

                {imgDataURL && (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button endIcon={<DeleteIcon />} variant="contained" color="primary" onClick={handleClear}>Clear</Button>
                    </Box>
                )}

                <CardContent>

                    <Box display="flex" alignItems="center" justifyContent="center">
                        <div className={classes.sample} style={{ backgroundColor: background }}>
                            {background}
                        </div>
                    </Box>

                    <Box display="flex" alignItems="center" justifyContent="center">
                        <SketchPicker color={background}
                            onChangeComplete={(color: ColorResult) => setBackground(color.hex)} />
                    </Box>

                    <Box display="flex" alignItems="center" justifyContent="center" className={classes.toolbar}>
                        <CopyButton data={background} />
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default ColorPicker;
