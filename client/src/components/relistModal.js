import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    Grid,
    Typography,
    Box,
    Paper,
    InputLabel,
    Modal,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import { Image } from 'cloudinary-react';
import { CloudinaryContext } from 'cloudinary-react';
import { useMutation } from '@apollo/client';
import { UPDATE_PRODUCT_BY_ID } from '../utils/mutations';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minHeight: '70vh',
    },
    formField: {
        marginBottom: theme.spacing(2),
    },
    imageContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        cursor: 'pointer',
    },
    imageUpload: {
        display: 'none',
    },
    image: {
        maxHeight: '100%',
        maxWidth: '100%',
    },
    modalImage: {
        width: 'auto',
        height: '80vh',
        maxHeight: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        display: 'block',
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

const RelistModal = ({ open, handleClose, product }) => {
    const classes = useStyles();
    const { loading, error, data: categoryData } = useQuery(GET_CATEGORIES);
    const [title, setTitle] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [category, setCategory] = useState(product.category._id);
    const [price, setPrice] = useState(product.price);
    const [startDate, setStartDate] = useState(new Date(product.start_date));
    const [endDate, setEndDate] = useState(new Date(product.end_date));
    const [imageUrl, setImageUrl] = useState(product.image);
    const [openModal, setOpenModal] = useState(false);
    const [updateProductById] = useMutation(UPDATE_PRODUCT_BY_ID);
    const handleRelistProduct = async () => {
        try {
            const { data } = await updateProductById({
                variables: {
                    productId: product._id,
                    name: title,
                    description,
                    image: imageUrl,
                    price,
                    categoryId: category,
                    start_date: startDate.toISOString(),
                    end_date: endDate.toISOString(),
                },
            });

            console.log('Product updated:', data.updateProductById);
            handleClose();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'neighborrow'); // Update with your Cloudinary upload preset

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setImageUrl(data.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            Category
                        </Typography>
                        <Select
                            fullWidth
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            label="Category"
                        >
                            {categoryData.getCategory.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Price"
                            value={price}
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Upload Image</InputLabel>
                        <Box className={classes.imageContainer} onClick={handleOpenModal}>
                            {imageUrl ? (
                                <CloudinaryContext cloudName="your-cloud-name"> {/* Update with your Cloudinary cloud name */}
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
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={setStartDate}
                                format="MM/dd/yyyy"
                                fullWidth
                            />
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={setEndDate}
                                format="MM/dd/yyyy"
                                fullWidth
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleRelistProduct} color="primary">
                    Save
                </Button>
            </DialogActions>
            <Modal open={openModal} onClose={handleCloseModal}>
                <img src={imageUrl} alt="Product" className={classes.modalImage} />
            </Modal>
        </Dialog>
    );
};

export default RelistModal;
