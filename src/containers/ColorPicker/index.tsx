import {Box, Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PaletteIcon from '@material-ui/icons/Palette';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import * as copy from 'copy-to-clipboard';
import {Resizable} from 're-resizable';
import React, {useEffect} from 'react';
import {ColorResult, RGBColor, SketchPicker} from 'react-color';
import {Helmet} from 'react-helmet';
import FeatureTitle from '../../components/FeatureTitle';
import {useToasterUpdate} from '../../components/Toaster/ToasterProvider';
import * as services from './services';
import {imageResizer, useStyles} from './styled';

const DEFAULT_BACKGROUND = '';

const ColorPicker: React.FC = () => {
  const title = 'Color picker';
  const classes = useStyles();
  const {setToasterState} = useToasterUpdate();
  const [imgDataURL, setImgDataURL] = React.useState('');
  const [rgb, setRgb] = React.useState<RGBColor>();

  // Derived values (recomputed on rgb change)
  const [background, setBackground] = React.useState(DEFAULT_BACKGROUND);
  const [backgroundWithAlpha, setBackgroundWithAlpha] = React.useState(DEFAULT_BACKGROUND);
  const [backgroundRgb, setBackgroundRgb] = React.useState(DEFAULT_BACKGROUND);
  const [backgroundRgbWithAlpha, setBackgroundRgbWithAlpha] = React.useState(DEFAULT_BACKGROUND);

  useEffect(() => {
    if (rgb) {
      setBackground(services.rgbColorToHex(rgb));
      setBackgroundWithAlpha(services.rgbColorToHex(rgb) + services.getOpacityHexValue(rgb.a ?? 1));
      setBackgroundRgb(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      setBackgroundRgbWithAlpha(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a ?? 1})`);
    } else {
      setBackground(DEFAULT_BACKGROUND);
      setBackgroundWithAlpha(DEFAULT_BACKGROUND);
      setBackgroundRgb(DEFAULT_BACKGROUND);
      setBackgroundRgbWithAlpha(DEFAULT_BACKGROUND);
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
              <Typography variant="body2">
                paste image or select a file:{' '}
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
              </Typography>
            </div>
          )}
          {imgDataURL && (
            <Resizable style={imageResizer} defaultSize={{width: 300, height: '100%'}}>
              <img id="image" src={imgDataURL} alt="Clipboard content" className={classes.image} />
            </Resizable>
          )}
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          className={classes.colorPicker}>
          <Typography variant="body2">or just pick a color:</Typography>
          <SketchPicker color={rgb} onChangeComplete={(color: ColorResult) => setRgb(color.rgb)} />

          <pre>
            Opacity to hexa: {(rgb?.a ?? 1) * 100}% = {rgb?.a ?? 1} = {services.getOpacityHexValue(rgb?.a ?? 1)}
          </pre>
        </Box>

        {imgDataURL && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button endIcon={<DeleteIcon />} variant="contained" color="primary" onClick={handleClear}>
              Clear
            </Button>
          </Box>
        )}

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <div className={classes.sample} style={{backgroundColor: background}} onClick={() => handleCopy(background)}>
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
      </div>
    </>
  );
};

export default ColorPicker;
