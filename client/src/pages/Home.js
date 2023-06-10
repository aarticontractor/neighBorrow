import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Grid, TextField, Typography, Button, Select, MenuItem } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import ProductCard from '../components/ProductCard';
import { GET_ALL_PRODUCTS } from '../utils/queries';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Auth from '../utils/auth';
import { checkDate } from '../utils/checkDate';
import { makeStyles } from '@material-ui/core/styles';

const PRODUCTS_PER_PAGE = 8;
const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '2em',
    },
    title: {
        fontFamily: "'Pacifico', cursive",
        fontWeight: '700',
        color: '#ffffff',
        textShadow: '5px 5px 20px #000000',
        marginTop: '0.4em',
        marginBottom: '0.5em',
    },
    tagline: {
        fontFamily: "'Roboto Slab', serif",
        fontWeight: '500',
        color: '#ffffff',
        textShadow: '5px 5px 10px #000000',
        marginBottom: '1em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    typewriter: {
        overflow: 'hidden',
        borderRight: '.15em solid white',
        whiteSpace: 'nowrap',
        margin: '0 auto',
        letterSpacing: '.15em',
        animation: '$typewriter 4s steps(40) 1s infinite, $blink-text .75s step-end infinite',
    },
    '@keyframes typewriter': {
        '0%, 70%': { width: '60%' },
        '50%': { width: 0 },
    },
    '@keyframes blink-text': {
        '50%': { borderRightColor: 'transparent' },
    },
    description: {
        fontFamily: "'Roboto Slab', serif",
        fontWeight: '500',
        color: '#ffffff',
        textShadow: '3px 2px 8px #000000',
        marginBottom: '1em',
    },
}));



const Home = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [priceRange, setPriceRange] = React.useState('All');
    const [search, setSearch] = React.useState('');
    const [filteredProducts, setFilteredProducts] = React.useState([]);
    const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
    const location = useLocation();

    const classes = useStyles();

    const handleProductClick = (product) => {
        console.log('product :', product);
        setSelectedProduct(product);
        console.log(' selectedProduct:', selectedProduct);
        // setIsModalOpen(true);
    };

    // const handleModalClose = () => {
    //     setIsModalOpen(false);
    // };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSearch = () => {
        if (data) {
            let filtered = data.getProducts.filter(product => {
                const nameMatch = product.name.toLowerCase().includes(search.toLowerCase());
                const categoryMatch =
                    location.state?.category
                        ? product.category.parent === location.state.category.parent &&
                        product.category.name === location.state.category.name
                        : true;

                if (priceRange === 'All') {
                    return nameMatch && categoryMatch;
                } else {
                    const [minPrice, maxPrice] = priceRange.split('-');
                    const inPriceRange =
                        product.price >= Number(minPrice) &&
                        (!maxPrice || product.price <= Number(maxPrice));
                    const inDateRange = checkDate(product.start_date, product.end_date);
                    return nameMatch && inPriceRange && categoryMatch && inDateRange;
                }
            });
            setPage(1);
            setFilteredProducts(filtered);
        }
    };

    useEffect(() => {
        if (data) {
            handleSearch();
        }

    },
        [data, search, priceRange, location.state?.category]);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const paginatedProducts = filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);


    return (
        <Container>
            <Typography variant="h3" align="center" className={classes.title}> Welcome to NeighBorrow!</Typography>
            <Typography variant="h5" align="center" className={classes.tagline}>
                <span className={classes.typewriter}> "Sharing Resources, Building Connections" </span>
            </Typography>
            <Typography variant="h6" align="center" paragraph className={classes.description}> Join us in sharing your redundant items and help to foster community collaboration with your neighborhood! </Typography>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '1em 0' }}>
                <TextField id="search" label="Search products to rent.." variant="outlined" onChange={(event) => setSearch(event.target.value)} />
                <Select
                    value={priceRange}
                    onChange={event => setPriceRange(event.target.value)}
                >
                    <MenuItem value="All">Price $</MenuItem>
                    <MenuItem value="0-50">$0 - $50</MenuItem>
                    <MenuItem value="50-100">$50 - $100</MenuItem>
                    <MenuItem value="100-200">$100 - $200</MenuItem>
                    <MenuItem value="200-500">$200 - $500</MenuItem>
                    <MenuItem value="500">$500+</MenuItem>
                </Select>
                <Button variant="contained" color="primary" style={{ margin: '0 0 0 0.5em' }} onClick={handleSearch}>
                    <SearchIcon />
                </Button>
            </div>
            <Grid container spacing={3}>
                {paginatedProducts.map(product => (
                    <Grid item xs={12} sm={6} md={3} key={product._id}>
                        <ProductCard
                            product={product}
                            onProductClick={handleProductClick}
                            disabled={!checkDate(product.start_date, product.end_date) || !Auth.loggedIn()}
                        />
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
                page={page}
                onChange={handlePageChange}
                color="primary"
            />
            {/* {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    open={isModalOpen}
                    onClose={handleModalClose}
                />
            )} */}
        </Container>
    );
};

export default Home;