import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import Auth from '../utils/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton, makeStyles, Menu, MenuItem, CircularProgress } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
    const [anchorElCategories, setAnchorElCategories] = React.useState(null);
    const [anchorElProfile, setAnchorElProfile] = React.useState(null);
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    const user = Auth.getUser();

    const handleCategoryClick = (event) => {
        setAnchorElCategories(event.currentTarget);
    };

    const handleProfileClick = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleCategoryClose = () => {
        setAnchorElCategories(null);
    };

    const handleProfileClose = () => {
        setAnchorElProfile(null);
    };

    const handleCategoryItemClick = (parent, subCategory) => {
        navigate('/', { state: { category: { parent, name: subCategory } } });
        handleCategoryClose();
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
                </IconButton>
                <Typography variant="h5" className={classes.title}>
                    NeighBorrow
                </Typography>

                {loading ? (
                    <CircularProgress color="secondary" />
                ) : error ? (
                    <Typography variant="body1" color="secondary">
                        Error loading categories
                    </Typography>
                ) : (
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleCategoryClick} color="inherit">
                        Categories
                        <ArrowDropDownIcon />
                    </Button>
                )}

                <Menu id="simple-menu" anchorEl={anchorElCategories} keepMounted open={Boolean(anchorElCategories)} onClose={handleCategoryClose}>
                    {parentCategories &&
                        Object.entries(parentCategories).map(([parent, subCategories]) => (
                            <div key={parent}>
                                <MenuItem onClick={handleCategoryClose}>
                                    <Typography variant="h6">{parent}</Typography>
                                </MenuItem>
                                {subCategories.map((subCategory) => (
                                    <MenuItem key={subCategory} onClick={() => handleCategoryItemClick(parent, subCategory)}>
                                        {subCategory}
                                    </MenuItem>
                                ))}
                            </div>
                        ))}
                </Menu>

                {Auth.loggedIn() ? (
                    <>
                        <Button color="inherit" component={RouterLink} to="/listitem">
                            List an Item
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/about">
                            About Us
                        </Button>
                        <IconButton
                            edge="end"
                            aria-controls="account-menu"
                            aria-haspopup="true"
                            onClick={handleProfileClick}
                            color="inherit"
                        >
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            id="account-menu"
                            anchorEl={anchorElProfile}
                            keepMounted
                            open={Boolean(anchorElProfile)}
                            onClose={handleProfileClose}
                        >
                            <MenuItem onClick={handleProfileClose}>{`Welcome, ${user.firstName}`}</MenuItem>
                            <MenuItem onClick={() => Auth.logout()}>Logout</MenuItem>
                            <MenuItem component={RouterLink} to="/userProfile">Profile</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={RouterLink} to="/signup">
                            Signup
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/login">
                            Login
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Nav;