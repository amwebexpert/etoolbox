import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AppDetail from './AppDetail';
import Banner from './icon.png';
import Counter from '../../containers/Counter/Counter';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  },
  media: {
    height: 240,
    margin: 20,
  },
  appDescription: {
    marginBottom: theme.spacing(4),
  },
  openSource: {
    marginTop: theme.spacing(4),
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={Banner} title="Web Toolbox" />
          <CardContent>
            <Typography variant="h5">
              Web Toolbox
            </Typography>

            <Typography variant="subtitle2" className={classes.appDescription}>
              Collection of web developer utilities
            </Typography>

            <AppDetail />

            <Typography variant="subtitle2" className={classes.openSource}>
              Open source app powered by <a href="https://reactjs.org/docs/create-a-new-react-app.html">Create React App</a>
            </Typography>

          </CardContent>
        </CardActionArea>
        <Counter />
      </Card>
    </Grid>
  );
}
