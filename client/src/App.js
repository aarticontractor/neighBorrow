import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Checkout from './pages/Detail.js';
import ListItem from './pages/ListItem.js';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile.js';
import About from './pages/About';
import Detail from './pages/Detail';
import { Provider } from 'react-redux';
import Cart from './pages/CartPage.js';
import store from './utils/store';

// import { StoreProvider } from './utils/globalState.js';

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
                <div>
                    {/* <StoreProvider> */}
                    <Provider store={store}>
                        <NavBar />
                        <Routes>

                            <Route path='/' element={<Home />} />
                            <Route path='/listitem' element={<ListItem />} />
                            <Route path='/checkout' element={<Checkout />} />
                            <Route path='/Login' element={<Login />} />
                            <Route path='/Signup' element={<Signup />} />
                            <Route path='/about' element={<About />} />
                            {/* <Route path='/detail' element={<Detail />} /> */}
                            <Route path='/products/:id' element={<Detail />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/UserProfile' element={<UserProfile />} />
                        </Routes>
                    </Provider>
                    {/* </StoreProvider > */}
                </div >
            </Router >
        </ApolloProvider >
    );
}

export default App;