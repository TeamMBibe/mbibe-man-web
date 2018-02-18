import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MasterComponent from './MasterComponent'

const routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={MasterComponent} />
        </Switch>
    </BrowserRouter>
);

export default routes;
