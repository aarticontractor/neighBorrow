import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Select, MenuItem, Button, Box, Paper, InputLabel, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import anime from 'animejs';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations';
import { GET_CATEGORIES } from '../utils/queries';
import { Image } from 'cloudinary-react';
import { CloudinaryContext } from 'cloudinary-react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import animationData from '../assets/uploading.json';
import Lottie from 'react-lottie';
import Auth from '../utils/auth';

const REACT_APP_CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlfgz7bn4/image/upload"
const REACT_APP_CLOUDINARY_UPLOAD_PRESET = "neighborrow"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minHeight: '70vh',
    },
    formField: {
        marginBottom: theme.spacing(2),
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
    },
    imageUpload: {
        display: 'none',
    },
    image: {
        maxHeight: '100%',
        maxWidth: '100%',
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

const ListProduct = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [addProduct] = useMutation(ADD_PRODUCT);
    const { loading, error, data: categoryData } = useQuery(GET_CATEGORIES);
    const userObj = Auth.getUser();


    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(REACT_APP_CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setImageUrl(data.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleListProduct = async () => {
        if (imageUrl && title && category && price) {
            try {
                const { data } = await addProduct({
                    variables: {
                        name: title,
                        description,
                        image: imageUrl,
                        price,
                        categoryId: category,

                        userId: userObj._id

                    },
                });
                setUploading(true);
                console.log('Product added:', data.addProduct);

                // Open the Snackbar
                setOpenSnackbar(true);

                // Wait for 3 seconds for Snackbar to be visible then navigate
                setTimeout(() => {
                    setUploading(false);
                    navigate('/');
                }, 3000);
            } catch (err) {
                console.error('Error adding product:', err);
            }
        }
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <Container className={classes.root}>
            {uploading ? (
                <Lottie options={defaultOptions} height={400} width={400} />
            ) : (
                <>
                    <Typography variant="h2" gutterBottom className="animate">
                        List an Item
                    </Typography>

                    <Grid container spacing={3} className="animate">
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <InputLabel>Upload Image</InputLabel>
                                <Box className={classes.imageContainer}>
                                    {imageUrl ? (
                                        <CloudinaryContext cloudName="dlfgz7bn4">
                                            <Image publicId={imageUrl} className={classes.image} />
                                        </CloudinaryContext>
                                    ) : (
                                        <Typography variant="subtitle1">No image chosen</Typography>
                                    )}
                                </Box>
                                <input
                                    accept="image/*"
                                    className={classes.imageUpload}
                                    id="image-upload"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="image-upload">
                                    <Button variant="contained" color="primary" component="span" fullWidth>
                                        Choose Image
                                    </Button>
                                </label>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="h4" gutterBottom>
                                    Product Info
                                </Typography>
                                <TextField
                                    className={classes.formField}
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <TextField
                                    className={classes.formField}
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <InputLabel id="category-label">Select Category</InputLabel>
                                <Select
                                    className={classes.formField}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    {categoryData.getCategory.map((category, index) => (
                                        <MenuItem value={category._id} key={index}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="h4" gutterBottom>
                                    Pricing - $
                                </Typography>
                                <TextField
                                    className={classes.formField}
                                    label="Set Price"
                                    variant="outlined"
                                    type="number"
                                    InputProps={{ inputProps: { step: 0.01 } }}
                                    fullWidth
                                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                                    required
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} className={classes.formField}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleListProduct}>
                                List Item
                            </Button>
                        </Grid>
                    </Grid>
                    <Snackbar open={openSnackbar} autoHideDuration={3000} message="Product listed successfully!" />
                </>
            )}
        </Container>
    );
};

export default ListProduct;
