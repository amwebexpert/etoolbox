import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  form: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  toolbar: {
    margin: 0,
    padding: 0,
    '& > *': {
      marginLeft: theme.spacing(1),
    },
  },
  viewer: {
    padding: theme.spacing(1),
    borderColor: theme.palette.text.disabled,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
}));
