import React from 'react';

import { Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet';

import Banner from '../../images/icon.png';
import AppShare from '../AppShare/AppShare';
import AppDetail from './AppDetail';

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
  const title = 'About…';

  return (
    <>
      <Helmet title={title} />
      <Grid container justifyContent="center" className={classes.root}>
        <Card className={classes.rootCard}>
          <CardActionArea>
            <CardMedia className={classes.media} image={Banner} title="Web Toolbox" />
            <CardContent>
              <Typography variant="h5">Web Toolbox</Typography>

              <AppShare />

              <Typography variant="subtitle2" className={classes.appDescription}>
                Collection of web developer utilities
              </Typography>

              <AppDetail />

              <Typography variant="subtitle2" className={classes.openSource}>
                Open source app powered by{' '}
                <Link href="https://reactjs.org/docs/create-a-new-react-app.html">Create React App</Link>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}
