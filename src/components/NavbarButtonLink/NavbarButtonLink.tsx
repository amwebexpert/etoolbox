import {makeStyles} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import {NavLink} from 'react-router-dom';
import clsx from 'clsx';

export const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  linkActive: {
    '& .MuiListItem-root': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  listItemIcon: {
    minWidth: theme.spacing(6),
  },
}));

interface Props {
  title: string;
  detail: string;
  to: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const NavbarButtonLink = ({title, detail, to, icon, onClick}: Props) => {
  const classes = useStyles();

  return (
    <NavLink to={to} title={detail} className={({isActive}) => (isActive ? clsx(classes.link, classes.linkActive) : classes.link)}>
      <ListItem button onClick={onClick}>
        <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </NavLink>
  );
};
