import React, { useState, useEffect } from 'react';
import { Avatar, Button, Box, Grid, Container, IconButton } from '@material-ui/core';
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
import { GET_ALL_PRODUCTS } from '../utils/queries';
import { GET_USER } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_AVATAR } from '../utils/mutations';

const REACT_APP_CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlfgz7bn4/image/upload"
const REACT_APP_CLOUDINARY_UPLOAD_PRESET = "neighborrow"

const UserProfile = () => {
  const userObj = Auth.getUser();
  const [updateUserAvatar, { avatarData }] = useMutation(UPDATE_USER_AVATAR);
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, {
    variables: {
      userId: userObj._idf
    }
  });

  const [user, setUser] = useState({
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    userId: userObj._id,
    email: userObj.email,
    avatar: userObj.image
  });


  const state = useSelector((state) => {
    return state;
});
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  const { products } = state;
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    const filterByUser = () => {
      if (data) {
        let filtered = data.getProducts.filter(product => product.user._id === user.userId);
        setFilteredProducts(filtered)
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

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    try {
      // Upload file to Cloudinary
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

      // Now, we update the user avatar in your user database
      await updateUserAvatar({ variables: { image: fileData.secure_url, userId: user.userId } });

      // Then we also update it in the local state
      setUser((prevState) => ({ ...prevState, avatar: fileData.secure_url }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Profile
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Avatar alt="User Avatar" src={user.avatar} style={{ width: 200, height: 200, border: '2px solid #333', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }} />
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
          <Stack
            sx={{ pt: 4 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h4" style={{ marginBottom: '10px' }}>{user.firstName} {user.lastName}</Typography>
            <Typography style={{ marginBottom: '10px' }}>Email: {user.email}</Typography>
            <Typography>User ID: {user.userId}</Typography>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Stack
          sx={{ pt: 4 }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography
            component="h5"
            variant="h5"
            align="center"
            color="text.primary"
            gutterBottom
            style={{ paddingBottom: "1em" }}
          >
            Active Listings: {filteredProducts.length}
          </Typography>
        </Stack>
        <Grid
          container spacing={4}
        >
          {filteredProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image={product.image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>
                    ${product.price}
                  </Typography>
                  <Typography>
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                  <Button size="small">Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default UserProfile;
