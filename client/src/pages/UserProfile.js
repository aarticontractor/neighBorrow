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
import { useStoreContext } from '../utils/globalState';
import { GET_ALL_PRODUCTS } from '../utils/queries';

const UserProfile = () => {
  const userObj = Auth.getUser();
  const [user, setUser] = useState({
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    userId: userObj._id,
    avatar: ''
  });
  const [state ] = useStoreContext();
  const { loading, error,  data } = useQuery(GET_ALL_PRODUCTS);
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

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUser({ ...user, avatar: data.path });

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
            <Avatar alt="User Avatar" src={user.avatar} style={{ width: 100, height: 100 }} />
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
            <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
            <Typography>User ID: {user.userId}</Typography>
          </Stack>
          {/* <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained">Main call to action</Button>
            <Button variant="outlined">Secondary action</Button>
          </Stack> */}
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
            style={{paddingBottom: "1em"}}
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
