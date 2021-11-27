import React, {useEffect} from 'react';

import {Box, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PaletteIcon from '@material-ui/icons/Palette';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import {Resizable} from 're-resizable';
import {ColorResult, RGBColor, SketchPicker} from 'react-color';

import FeatureTitle from '../../components/FeatureTitle';
import * as services from './services';
import {useStyles, imageResizer} from './styled';
import CopyButton from '../../components/CopyButton';
import {Helmet} from 'react-helmet';
import {useToasterUpdate} from '../../components/Toaster/ToasterProvider';
import * as copy from 'copy-to-clipboard';

const ColorPicker: React.FC = () => {
  const title = 'Color picker';
  const classes = useStyles();
  const {setToasterState} = useToasterUpdate();
  const [imgDataURL, setImgDataURL] = React.useState('');
  const [rgb, setRgb] = React.useState<RGBColor>();

  // Derived values (recomputed on rgb change)
  const [background, setBackground] = React.useState('');
  const [backgroundWithAlpha, setBackgroundWithAlpha] = React.useState('');
  const [backgroundRgb, setBackgroundRgb] = React.useState('');
  const [backgroundRgbWithAlpha, setBackgroundRgbWithAlpha] = React.useState('');

  useEffect(() => {
    if (rgb) {
      setBackground(services.rgbColorToHex(rgb));
      setBackgroundWithAlpha(services.rgbColorToHex(rgb) + services.getOpacityHexValue(rgb.a ?? 1));
      setBackgroundRgb(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      setBackgroundRgbWithAlpha(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a ?? 1})`);
    } else {
      setBackground('');
      setBackgroundWithAlpha('');
      setBackgroundRgb('');
      setBackgroundRgbWithAlpha('');
    }
  }, [rgb]);

  function handleClear(event: any) {
    event.preventDefault();
    setImgDataURL('');
    setRgb(undefined);
  }

  function onPasteFromClipboard(e: any) {
    const clipboardData = e.clipboardData || e.originalEvent.clipboardData || e.originalEvent.clipboard;
    services.clipboardToDataURL(clipboardData.items, (ev: ProgressEvent<FileReader>) =>
      setImgDataURL(ev.target!.result as string),
    );
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
    setRgb(color);
  }

  const handleCopy = (data: string) => {
    const feedback = data.substr(0, 20);
    const message = `Content copied into clipboard: ${feedback} …`;

    copy.default(data, {format: 'text/plain'});
    setToasterState({open: true, message, type: 'success', autoHideDuration: 2000});
  };

  return (
    <>
      <Helmet title={title} />
      <div className={classes.root}>
        <FeatureTitle iconType={PaletteIcon} title={title} />

        <Box display="flex" alignItems="center" justifyContent="center" className={classes.imageSelector}>
          {!imgDataURL && (
            <div>
              <Typography>paste image from clipboard or select a file</Typography>
              <input
                type="file"
                color="primary"
                accept="image/*"
                onChange={(e: any) => onFileSelected(e.target.files[0])}
                id="icon-button-file"
                style={{display: 'none'}}
              />
              <label htmlFor="icon-button-file">
                <Button variant="contained" component="span" color="primary">
                  <PhotoCameraIcon />
                </Button>
              </label>
            </div>
          )}
          {imgDataURL && (
            <Resizable style={imageResizer} defaultSize={{width: 300, height: '100%'}}>
              <img id="image" src={imgDataURL} alt="Clipboard content" className={classes.image} />
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

        {rgb && (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <div
              className={classes.sample}
              style={{backgroundColor: background}}
              onClick={() => handleCopy(background)}>
              {background}
            </div>
            <div
              className={classes.sample}
              style={{backgroundColor: backgroundWithAlpha}}
              onClick={() => handleCopy(backgroundWithAlpha)}>
              {backgroundWithAlpha}
            </div>
            <div
              className={classes.sample}
              style={{backgroundColor: backgroundRgb}}
              onClick={() => handleCopy(backgroundRgb)}>
              {backgroundRgb}
            </div>
            <div
              className={classes.sample}
              style={{backgroundColor: backgroundRgbWithAlpha}}
              onClick={() => handleCopy(backgroundRgbWithAlpha)}>
              {backgroundRgbWithAlpha}
            </div>
          </Box>
        )}

        <Box display="flex" alignItems="center" justifyContent="center">
          <SketchPicker color={rgb} onChangeComplete={(color: ColorResult) => setRgb(color.rgb)} />
        </Box>
      </div>
    </>
  );
};

export default ColorPicker;
