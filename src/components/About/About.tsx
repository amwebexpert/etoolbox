import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AppDetail from './AppDetail';
import Banner from '../../images/icon.png';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 10,
  },
  rootCard: {
    textAlign: 'center',
  },
  media: {
    height: 240,
    margin: theme.spacing(3),
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
    <Grid container justifyContent="center" className={classes.root}>
      <Card className={classes.rootCard}>
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
              Open source app powered by <Link href="https://reactjs.org/docs/create-a-new-react-app.html">Create React App</Link>
            </Typography>

          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
