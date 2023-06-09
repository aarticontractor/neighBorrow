import React from 'react';
import { useQuery } from '@apollo/client';
import { Container, Grid, TextField, Button, Select, MenuItem } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { GET_ALL_PRODUCTS } from '../utils/queries';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Auth from '../utils/auth';

const PRODUCTS_PER_PAGE = 8; // set the number of products per page

const Home = () => {
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [priceRange, setPriceRange] = React.useState('All');
    const [search, setSearch] = React.useState('');
    const [filteredProducts, setFilteredProducts] = React.useState([]);
    const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
    const location = useLocation();

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const checkDate = (start_date, end_date) => {

        const startDate = moment.unix(start_date / 1000);
        const endDate = moment.unix(end_date / 1000);
        const today = moment().startOf('day');
        console.log(startDate);
        console.log(endDate);
        console.log(today);

        return startDate <= today && today <= endDate;
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


    React.useEffect(() => {
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
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1em 0' }}>
                <TextField id="search" label="Search products" variant="outlined" onChange={(event) => setSearch(event.target.value)} />
                <Select
                    value={priceRange}
                    onChange={event => setPriceRange(event.target.value)}
                >
                    <MenuItem value="All">All</MenuItem>
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
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    open={isModalOpen}
                    onClose={handleModalClose}
                />
            )}
        </Container>
    );
};

export default Home;