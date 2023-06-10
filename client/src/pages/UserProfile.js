import React, { useState, useEffect } from 'react';
import { Avatar, Button, Box, Grid, Container, IconButton, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { GET_ALL_PRODUCTS, GET_USER } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_AVATAR, DELETE_PRODUCT } from '../utils/mutations';
import { checkDate } from '../utils/checkDate';
import Pagination from '@mui/material/Pagination';
import Lottie from 'react-lottie';
import avatarAnimation from '../assets/imageUpload.json';
import RelistModal from '../components/relistModal';

const REACT_APP_CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlfgz7bn4/image/upload";
const REACT_APP_CLOUDINARY_UPLOAD_PRESET = "neighborrow";

const UserProfile = () => {
  const userObj = Auth.getUser();
  const [updateUserAvatar, { avatarData }] = useMutation(UPDATE_USER_AVATAR);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, {
    variables: {
      userId: userObj._id
    }
  });

  const [user, setUser] = useState({
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    userId: userObj._id,
    email: userObj.email,
    avatar: userObj.image
  });

  const state = useSelector((state) => state);
  const [activeTab, setActiveTab] = useState(0);
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  const { products } = state;
  const [activeProducts, setActiveProducts] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    const filterByUser = () => {
      if (data) {
        let active = [], expired = [];
        data.getProducts.forEach(product => {
          if (product.user._id === user.userId) {
            console.log("Current start date: " + product.start_date);
            console.log("Current end date: " + product.end_date);
            console.log("Product name is: " + product.name);
            if (checkDate(product.start_date, product.end_date)) active.push(product);
            else expired.push(product);
          }
        });
        setActiveProducts(active);
        setExpiredProducts(expired);
      }
    }
    filterByUser();
  }, [products, data]);

  useEffect(() => {
    if (userData && userData.getUserByID) {
      setUser((prevState) => ({
        ...prevState,
        avatar: userData.getUserByID.image,
      }));
    }
  }, [userData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpenModal(false);
  };

  const handleRelist = (productId) => {
    const product = expiredProducts.find((product) => product._id === productId);
    handleOpenModal(product);
  };
  const handleEdit = (productId) => {
    const product = activeProducts.find((product) => product._id === productId);
    handleOpenModal(product);
  };

  const handleDelete = (productId) => {
    setDeleteProductId(productId);
    setDeleteConfirmation(true);
  };
  const handleConfirmDelete = async () => {
    await deleteProduct({ variables: { productId: deleteProductId } });
    setActiveProducts(activeProducts.filter((product) => product._id !== deleteProductId));
    setExpiredProducts(expiredProducts.filter((product) => product._id !== deleteProductId));
    setDeleteConfirmation(false);
  };
  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
  };



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: avatarAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    animationSpeed: 4,
  };

  const handleAvatarUpload = async (e) => {
    setUser((prevState) => ({ ...prevState, avatar: null }));

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        REACT_APP_CLOUDINARY_URL,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const fileData = await response.json();

      await updateUserAvatar({ variables: { image: fileData.secure_url, userId: user.userId } });
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setUser((prevState) => ({ ...prevState, avatar: fileData.secure_url }));
    } catch (error) {
      console.error('Error:', error);
      setUser((prevState) => ({ ...prevState, avatar: user.avatar }));
    }
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" color="primary" style={{ marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>
            Your Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Stack
                sx={{ pt: 4 }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                {user.avatar ?
                  <Avatar alt="User Avatar" src={user.avatar} style={{ width: 200, height: 200, border: '2px solid #333', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }} />
                  :
                  <Lottie options={defaultOptions} height={200} width={200} />
                }
                <Typography variant="body2" align="center" color="textSecondary">
                  Click on the camera icon to change photo
                </Typography>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleAvatarUpload}
                />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack
                sx={{ pt: 4 }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Typography variant="h5" style={{ marginBottom: '10px', color: '#3f51b5', fontFamily: 'Poppins, sans-serif' }}>{user.firstName} {user.lastName}</Typography>
                <Typography style={{ marginBottom: '10px', fontFamily: 'Roboto, sans-serif', color: '#757575' }}>Email: {user.email}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label={`Active Listings: ${activeProducts.length}`} />
          <Tab label={`Expired Listings: ${expiredProducts.length}`} />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <ProductList products={activeProducts} handleDelete={handleDelete} handleEdit={handleEdit} handleRelist={handleRelist} active={true} expirec={false} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <ProductList products={expiredProducts} handleDelete={handleDelete} handleEdit={handleEdit} handleRelist={handleRelist} active={false} expired={true} />
        </TabPanel>
      </Container>
      {selectedProduct && (
        <RelistModal
          open={openModal}
          handleClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
      <Dialog open={deleteConfirmation} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to permanently delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function ProductList({ products, handleDelete, handleEdit, handleRelist, active = true, expired = false }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Grid container spacing={4}>
        {products.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard product={product} handleDelete={handleDelete} handleEdit={handleEdit} handleRelist={handleRelist} active={active} expired={expired} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={Math.ceil(products.length / itemsPerPage)} page={page} onChange={handleChange} />
    </>
  );
}

function ProductCard({ product, handleDelete, handleEdit, handleRelist, active, expired }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="194"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography>${product.price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleDelete(product._id)}>Delete</Button>
        {active && <Button size="small" onClick={() => handleEdit(product._id)}>Edit</Button>}
        {expired && <Button size="small" onClick={() => handleRelist(product._id)}>Re-List</Button>}
      </CardActions>
    </Card>
  );
}

export default UserProfile;
