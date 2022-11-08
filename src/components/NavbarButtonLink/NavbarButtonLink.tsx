import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

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

type Props = {
  title: string;
  detail: string;
  to: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

export const NavbarButtonLink: React.FC<Props> = ({ title, detail, to, icon, onClick }) => {
  const classes = useStyles();

  return (
    <NavLink
      role="link"
      to={to}
      title={detail}
      className={({ isActive }) => (isActive ? clsx(classes.link, classes.linkActive) : classes.link)}>
      <ListItem button onClick={onClick}>
        <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </NavLink>
  );
};
