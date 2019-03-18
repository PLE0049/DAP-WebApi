import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import GraphPage from './components/GraphPage';
import FormExample from './components/FormExample';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/graph' component={GraphPage} />
    <Route path='/FormExample' component={FormExample} />
  </Layout>
);
