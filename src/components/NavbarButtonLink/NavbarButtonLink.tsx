import { makeStyles } from '@mui/styles';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { NavLink } from 'react-router-dom';
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

export const NavbarButtonLink = ({ title, detail, to, icon, onClick }: Props) => {
  const classes = useStyles();

  return (
    <NavLink
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
