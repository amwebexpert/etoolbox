import {makeStyles} from '@material-ui/core';

export const imageResizer = {
  marginTop: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px blue',
};

export const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  image: {
    width: '100%',
    margin: 5,
    border: 'dashed 1px grey',
  },
  imageSelector: {
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  toolbar: {
    margin: theme.spacing(2),
  },
  sample: {
    cursor: 'pointer',
    width: '100%',
    height: 50,
    marginBottom: theme.spacing(1),
    borderColor: theme.palette.text.disabled,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'monospace',
    textShadow: '1px 1px lightgrey',
  },
  colorPicker: {
    marginTop: theme.spacing(2),
  },
}));
