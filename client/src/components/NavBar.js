import React from "react";
import Auth from "../utils/auth";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, IconButton, makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Nav() {
    const classes = useStyles();

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <>
                    <Button color="inherit" component={RouterLink} to="/listitem">
                        List an Item
                    </Button>
                    <Button color="inherit">
                        Welcome, {Auth.getUsername()}
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/about">
                        About Us
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/reviews">
                        Reviews
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/contact">
                        Contact Us
                    </Button>
                    <Button color="inherit" onClick={() => Auth.logout()}>
                        Logout
                    </Button>
                </>
            );
        } else {
            return (
                <>
                    <Button color="inherit" component={RouterLink} to="/signup">
                        Signup
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/login">
                        Login
                    </Button>
                </>
            );
        }
    }

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" component={RouterLink} to="/">
                    <HomeIcon />
                    <Typography variant="h6" className={classes.title}>
                        NeighBorrow
                    </Typography>
                </IconButton>
                {showNavigation()}
            </Toolbar>
        </AppBar>
    );
}

export default Nav;
