
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      _id
      name
      description
      price
    }
  }
`;

const PRODUCTS_PER_PAGE = 2; // set the number of products per page

const Home = () => {
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const { loading, error, data } = useQuery(GET_PRODUCTS);

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

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const paginatedProducts = data.getProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1em 0' }}>
                <TextField id="search" label="Search products" variant="outlined" />
                <Button variant="contained" color="primary" style={{ margin: '0 0 0 0.5em' }}>
                    <SearchIcon />
                </Button>
            </div>
            <Grid container spacing={3}>
                {paginatedProducts.map(product => (
                    <Grid item xs={12} sm={6} md={3} key={product._id}>
                        <ProductCard product={product} onProductClick={handleProductClick} />
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={Math.ceil(data.getProducts.length / PRODUCTS_PER_PAGE)}
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
}

export default Home;
