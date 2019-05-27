import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import GraphPage from './components/GraphPage';
import Net23DStepTwo from './components/Net23DStepTwo';
import Net23DStepOne from './components/Net23DStepOne';
import Parent from './components/Parent';

const App = props => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/Net23DStepOne' component={Net23DStepOne} />
        <Route path='/Net23DStepTwo/:graphId' component={Net23DStepTwo} />
    </Layout>
);

export default App;