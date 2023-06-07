import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import Auth from '../utils/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton, makeStyles, Menu, MenuItem, CircularProgress } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    const user = Auth.getUser();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCategoryClick = (parent, subCategory) => {
        navigate('/', { state: { category: { parent, name: subCategory } } });
        handleClose();
    };

    const showNavigation = () => {
        if (Auth.loggedIn()) {
            return (
                <>
                    <Button color="inherit" component={RouterLink} to="/listitem">
                        List an Item
                    </Button>
                    <Button color="inherit">
                        Welcome, {user.firstName}
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
    };

    const parentCategories = data?.getCategory?.reduce((acc, curr) => {
        if (!acc[curr.parent]) {
            acc[curr.parent] = [];
        }
        acc[curr.parent].push(curr.name);
        return acc;
    }, {});

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" component={RouterLink} to="/">
                    <HomeIcon />
                    <Typography variant="h6" className={classes.title}>
                        NeighBorrow
                    </Typography>
                </IconButton>

                {loading ? (
                    <CircularProgress color="secondary" />
                ) : error ? (
                    <Typography variant="body1" color="secondary">
                        Error loading categories
                    </Typography>
                ) : (
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
                        Categories
                        <ArrowDropDownIcon />
                    </Button>
                )}

                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    {parentCategories &&
                        Object.entries(parentCategories).map(([parent, subCategories]) => (
                            <div key={parent}>
                                <MenuItem onClick={handleClose}>
                                    <Typography variant="h6">{parent}</Typography>
                                </MenuItem>
                                {subCategories.map((subCategory) => (
                                    <MenuItem key={subCategory} onClick={() => handleCategoryClick(parent, subCategory)}>
                                        {subCategory}
                                    </MenuItem>
                                ))}
                            </div>
                        ))}
                </Menu>

                {showNavigation()}
            </Toolbar>
        </AppBar>
    );
}

export default Nav;
