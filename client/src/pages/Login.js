import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
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
  errorMessage: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

      // update state based on form input changes
    const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // console.log(formState);
        try {
          const { data } = await login({
            variables: { ...formState },
          });
          // console.log('loginData', data)
          Auth.login(data);
        } catch (e) {
          console.error(e);
        }
    
        // clear form values
        setFormState({
          email: '',
          password: '',
        });
      };

      return (
        <main className={classes.card}>
          <Card>
            <CardHeader
              className={classes.cardHeader}
              title="Login"
            />
            <CardContent className={classes.cardContent}>
              {data ? (
                <Typography variant="body1">
                  Success! You may now head{' '}
                  <Link to="/">back to the homepage.</Link>
                </Typography>
              ) : (
                <form onSubmit={handleFormSubmit}>
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
                <div className={classes.errorMessage}>
                  {error.message}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      );
    };
    
    export default Login;

