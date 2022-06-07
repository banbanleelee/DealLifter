import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Logo from './components/Logo';
import Nav from './components/Nav';
import Footer from './components/Footer';
import InfoBar from './components/InfoBar';
// import StoreList from './components/StoreList'
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Profile from '../src/pages/Profile';
import Results from '../src/pages/Results';

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
            <Nav />
            <InfoBar />
            <Routes>
              <Route exact = 'true' path = '/' element = {
                < Home />
              }>
              </Route>
              <Route exact = 'true' path = '/login' element = {
                < Login />
              }>
              </Route>
              <Route exact = 'true' path = '/profile/:userId' element = {
                < Profile />
              }>
              </Route>
              <Route exact = 'true' path = '/results/:searchParams' element = {
                < Results />
              }>
              </Route>
            </Routes>
            <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
