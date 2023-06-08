import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkout from './pages/Detail.js';
import ListItem from './pages/ListItem.js';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile.js';
import About from './pages/About';
import Detail from './pages/Detail';
// import { StoreProvider } from './utils/globalState';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { ApolloClient } from 'apollo-boost';
import NavBar from './components/NavBar';
import Home from './pages/Home';


const client = new ApolloClient({
    request: (operation) => {
        const token = localStorage.getItem('id_token');
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : '',
            },
        });
    },
    uri: '/graphql',
});


function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <Provider>
                        <NavBar />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/listitem' element={<ListItem />} />
                            <Route path='/checkout' element={<Checkout />} />
                            <Route path='/Login' element={<Login />} />
                            <Route path='/Signup' element={<Signup />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/products/:id' element={<Detail />} />
                            <Route path='/UserProfile' element={<UserProfile />} />
                        </Routes>
                    </Provider>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
