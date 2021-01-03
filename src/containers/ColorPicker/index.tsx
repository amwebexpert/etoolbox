import React from 'react';

import { Box, Card, CardContent, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import DeleteIcon from '@material-ui/icons/Delete';
import PaletteIcon from '@material-ui/icons/Palette';

import * as copy from 'copy-to-clipboard';
import { Resizable } from "re-resizable";
import { ColorResult, SketchPicker } from 'react-color';

import FeatureTitle from '../../components/FeatureTitle';
import * as services from './services';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
import { useStyles, imageResizer } from './styled';

const ColorPicker: React.FC = () => {
    const classes = useStyles();
    const { setToasterState } = useToasterUpdate();
    const [imgDataURL, setImgDataURL] = React.useState('');
    const [background, setBackground] = React.useState('');

    function handleCopy(event: any) {
        event.preventDefault();
        if (!background) {
            return;
        }

        copy.default(background, { format: 'text/plain' });
        setToasterState({ open: true, message: 'Content copied into clipboard', type: 'success', autoHideDuration: 2000 });
    }

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
                <Box display="flex" alignItems="center" justifyContent="center">
                    {!imgDataURL && (
                        <div>
                            <p>Paste image from clipboard... Or select a file...</p>
                            <input type="file" onChange={(e: any) => onFileSelected(e.target.files[0])} />
                        </div>
                    )}
                    {imgDataURL && (
                        <Resizable style={imageResizer} defaultSize={{ width: 300, height: '100%' }}>
                            <img id="image" src={imgDataURL} alt="Clipboard content" className={classes.image} />
                        </Resizable>
                    )}
                </Box>
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

                    <Toolbar className={classes.toolbar}>
                        <Box display='flex' flexGrow={1}></Box>
                        <Button endIcon={<DeleteIcon>Clear</DeleteIcon>}
                            variant="contained" color="primary" onClick={handleClear}>Clear</Button>
                        <Button endIcon={<AssignmentTurnedIn>Copy</AssignmentTurnedIn>}
                            variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
                    </Toolbar>
                </CardContent>
            </Card>
        </div>
    );
}

export default ColorPicker;
