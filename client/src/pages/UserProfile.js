import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Box, Grid, Paper, IconButton, Container } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { dividerClasses } from '@mui/material';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const UserProfile = () => {
  
  const [user, setUser] = useState({
    name: 'John Doe',
    userId: '123456',
    avatar: '',
    selling: ['Item 1', 'Item 2', 'Item 3'],
    activeSelling: ['Item 2'],
    balance: 1000,
    totalSales: 5000,
  });
  
  console.log("user", user)

  const handleEditProfile = () => {
    console.log('Edit Profile clicked'); // update with the desired action
  };

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
            <Typography variant="h4">{user.name}</Typography>
            <Typography>User ID: {user.userId}</Typography>
            <Typography>Items Selling: {user.selling.length}</Typography>
            <Typography>Active Selling: {user.activeSelling.length}</Typography>
            <Typography>Balance: ${user.balance}</Typography>
            <Typography>Total Sales: ${user.totalSales}</Typography>
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
            Active Listings: {user.activeSelling.length}
          </Typography>
        </Stack>
        <Grid 
          container spacing={4}
        >
          {user.selling.map((card) => (
                <Grid item key={user.selling} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Heading
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to describe the
                        content.
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


























    // <Container>

    //   <Grid 
    //     container
    //     direction="column"
    //     justifyContent="center"
    //     alignItems="center"
    //     item 
    //     xs={12}
    //     style={{marginTop: "2em"}}
    //     >
    //      <Typography variant="h4">User Profile</Typography>
    //  </Grid>
    //   <Paper style={{padding: "1em", marginTop: "2em"}}>
    //   <Grid 
    //     container
    //     item
    //     // xs={1}
    //     direction="column"
    //     justifyContent="center"
    //     alignItems="center"
    //     style={{marginTop: "2em"}}
    //   >
    //     <Grid 
    //       container 
    //       justifyContent="center"
    //       alignItems="center" 
    //       item
    //       columns={16}
    //       // xs={1}
    //       >
    //       <Grid 
    //         container 
    //         item
    //         xs={4} 
    //         direction="column"
    //         justifyContent="center"
    //         alignItems="center"
    //         alignContent='center' 
    //         >
    //         <Grid 
    //           container
    //           item
    //           direction="column"
    //           justifyContent="center"
    //           alignItems="center"
    //           alignContent='center'
    //           spacing={2}
    //           // xs={1}
    //         >
    //           <Avatar alt="User Avatar" src={user.avatar} style={{ width: 100, height: 100 }} />
    //           <input
    //             accept="image/*"
    //             id="icon-button-file"
    //             type="file"
    //             style={{ display: 'none' }}
    //             onChange={handleAvatarUpload}
    //           />
    //           <label htmlFor="icon-button-file">
    //             <IconButton color="primary" aria-label="upload picture" component="span">
    //               <PhotoCamera />
    //               </IconButton>
    //           </label>
    //         </Grid>
    //       </Grid>
    //       <Grid 
    //         container direction="column"
    //         justifyContent="center"
    //         item 
    //         xs={6}
    //       >
    //         <Typography variant="h4">{user.name}</Typography>
    //         <Typography>User ID: {user.userId}</Typography>
    //         <Typography>Items Selling: {user.selling.length}</Typography>
    //         <Typography>Active Selling: {user.activeSelling.length}</Typography>
    //         <Typography>Balance: ${user.balance}</Typography>
    //         <Typography>Total Sales: ${user.totalSales}</Typography>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   </Paper>
    //   <Grid 
    //     container
    //     direction="row"
    //     justifyContent="center"
    //     alignItems="center"
    //     item 
    //     xs={12} 
    //     style={{marginTop: "2em"}}>
    //      <Button variant="contained" color="primary" onClick={handleEditProfile} style={{marginRight: "2em"}}>
    //        Edit Profile
    //      </Button>
    //      <Button component={Link} to="/public-profile" variant="contained" color="secondary">
    //        View Public Profile
    //      </Button>
    //    </Grid>
    // </Container>

    // <Grid container direction="column" alignItems="center" spacing={2} >
    //   <Grid item xs={12}>
    //     <Typography variant="h4">User Profile</Typography>
    //   </Grid>
    //     {/* <Paper > */}
    //   <Grid item xs={12}>
    //       {/* <Box p={5}> */}
    //         <Grid container  columns={30} style={{border: "solid 2px red"}}>
    //           <Grid item xs={15} sm={15} style={{border: "solid 2px blue"}}>
    //             <Avatar alt="User Avatar" src={user.avatar} />
    //             <input
    //               accept="image/*"
    //               id="icon-button-file"
    //               type="file"
    //               style={{ display: 'none' }}
    //               onChange={handleAvatarUpload}
    //             />
    //             <label htmlFor="icon-button-file">
    //               <IconButton color="primary" aria-label="upload picture" component="span">
    //                 <PhotoCamera />
    //               </IconButton>
    //             </label>
    //           </Grid>
    //           <Grid item xs={15} sm={15} style={{border: "solid 2px blue"}}>
    //             <Typography variant="h5">{user.name}</Typography>
    //             <Typography>User ID: {user.userId}</Typography>
    //             <Typography>Items Selling: {user.selling.length}</Typography>
    //             <Typography>Active Selling: {user.activeSelling.length}</Typography>
    //             <Typography>Balance: ${user.balance}</Typography>
    //             <Typography>Total Sales: ${user.totalSales}</Typography>
    //           </Grid>
    //         </Grid>
    //       {/* </Box> */}
    //   </Grid>
    //     {/* </Paper> */}
    //   <Grid item xs={12}>
    //     <Button variant="contained" color="primary" onClick={handleEditProfile}>
    //       Edit Profile
    //     </Button>
    //   </Grid>
    //   <Grid item xs={12}>
    //     <Button component={Link} to="/public-profile" variant="contained" color="secondary">
    //       View Public Profile
    //     </Button>
    //   </Grid>
    // </Grid>
  );
};

export default UserProfile;
