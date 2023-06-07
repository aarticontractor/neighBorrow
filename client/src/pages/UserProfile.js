import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Typography, Box, Grid, Paper, IconButton, Container } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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
    <Container 
    alignItems="center">

      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center"xs={12}
        style={{marginTop: "2em"}}>
         <Typography variant="h4">User Profile</Typography>
     </Grid>
      <Paper style={{padding: "1em", marginTop: "2em"}}>
      <Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{marginTop: "2em"}}
      >
        <Grid container justifyContent="center"
        alignItems="center" spacing={2} columns={16}>
          <Grid 
            item xs={4} container direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent='center' >
            <Grid 
              container 
              direction="column"
              justifyContent="center"
              alignItems="center"
              alignContent='center'
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
            </Grid>
          </Grid>
          <Grid item spacing={6} xs={6}>
            {/* <item> */}
              <Typography variant="h4">{user.name}</Typography>
              <Typography>User ID: {user.userId}</Typography>
              <Typography>Items Selling: {user.selling.length}</Typography>
              <Typography>Active Selling: {user.activeSelling.length}</Typography>
              <Typography>Balance: ${user.balance}</Typography>
              <Typography>Total Sales: ${user.totalSales}</Typography>
            {/* </item> */}
          </Grid>
        </Grid>
      </Grid>
      </Paper>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center" xs={12} style={{marginTop: "2em"}}>
         <Button item variant="contained" color="primary" onClick={handleEditProfile} style={{marginRight: "2em"}}>
           Edit Profile
         </Button>
         <Button item component={Link} to="/public-profile" variant="contained" color="secondary">
           View Public Profile
         </Button>
       </Grid>
    </Container>

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
