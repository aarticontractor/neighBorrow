import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Checkout from './pages/Checkout.js';
import UserPage from './pages/UserPage.js';
import Login from './pages/Login';
import Signup from './pages/Signup';


import NavBar from './components/NavBar';
import Home from './pages/Home';



const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/UserPage' element={<UserPage />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/Signup' element={<Signup />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;
