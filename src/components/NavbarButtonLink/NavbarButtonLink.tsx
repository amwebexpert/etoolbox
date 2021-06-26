import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    linkActive: {
        '& .MuiListItem-root': {
            backgroundColor: theme.palette.primary.main,
        }
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
    exact?: boolean;
}

export const NavbarButtonLink = ({title, detail, to, icon, exact = false} : Props) => {
    const classes = useStyles();

    return (
        <NavLink exact={exact} to={to} title={detail} className={classes.link} activeClassName={classes.linkActive}>
            <ListItem button>
                <ListItemIcon className={classes.listItemIcon}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>
        </NavLink>
    )
}