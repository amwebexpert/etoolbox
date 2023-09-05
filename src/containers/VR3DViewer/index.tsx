/* eslint-disable react/no-unknown-property */
import React from 'react';

import FileIcon from '@mui/icons-material/AttachmentOutlined';
import VR3DIcon from '@mui/icons-material/ViewInAr';
import { FormControl, MenuItem, TextField, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';

import { FeatureScreen } from '../../components/FeatureScreen/FeatureScreen';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
import { FILE_ENCODING_LABELS_SORTED } from '../../services/encodings';
import { useIsWidthUp } from '../../theme';
import { useStyles } from './styled';
import Trees from './Trees';

const VR3DViewer: React.FC = () => {
  const title = '3D Viewer';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const { setToasterState } = useToasterUpdate();

  function handleClear(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  function handleProcess(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setToasterState({
      open: true,
      message: 'There is no file to process',
      type: 'error',
      autoHideDuration: 2000,
    });
  }

  function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    console.info('onFileSelected', e);
    if (!e?.target?.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    console.info('onFileSelected', file);
  }

  return (
    <FeatureScreen iconType={VR3DIcon} title={title}>
      <Toolbar className={classes.toolbar}>
        <FormControl className={classes.formControl} sx={{ mr: 1 }}>
          <input
            type="file"
            color="primary"
            accept="*/*"
            onChange={onFileSelected}
            id="files-selector-action"
            data-testid="files-selector-action"
            style={{ display: 'none' }}
          />
          <label htmlFor="files-selector-action">
            <Button
              variant="contained"
              component="span"
              color="primary"
              title="Select the 3D model file from your device">
              <FileIcon />
            </Button>
          </label>
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            select={true}
            label="File format"
            style={isMdUp ? { width: 320 } : undefined}
            id="fileFormat"
            value=""
            autoFocus={isMdUp}
            onChange={e => console.info('fileFormat', e.target.value)}>
            {FILE_ENCODING_LABELS_SORTED.map((item, index) => (
              <MenuItem key={`${index}-${item.label}`} value={item.label}>
                {item.label} ({item.name})
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Toolbar>

      <Trees />
    </FeatureScreen>
  );
};

export default VR3DViewer;
