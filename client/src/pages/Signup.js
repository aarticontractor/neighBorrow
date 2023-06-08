import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';

import Auth from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme.spacing(4),
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  formInput: {
    marginBottom: theme.spacing(2),
  },
  successMessage: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  errorMessage: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log("dat",data)
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className={classes.card}>
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title="Sign Up"
        />
        <CardContent className={classes.cardContent}>
          {data ? (
            <Typography variant="body1" className={classes.successMessage}>
              Thank you for Signing up! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </Typography>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <TextField
                className={classes.formInput}
                label="First Name"
                name="firstName"
                type="text"
                value={formState.firstName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                className={classes.formInput}
                label="Last Name"
                name="lastName"
                type="text"
                value={formState.lastName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                className={classes.formInput}
                label="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                className={classes.formInput}
                label="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                fullWidth
              />
              <Button
              className={classes.formInput}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              >
              Submit
              </Button>
              </form>
              )}

              {error && (
              <Typography variant="body1" className={classes.errorMessage}>
                {error.message}
              </Typography>
              )}
              </CardContent>
              </Card>
    </main>
  );
};

export default Signup;



