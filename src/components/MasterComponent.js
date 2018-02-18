import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import PropTypes from 'prop-types';
import LoginComponent from './accounts/LoginComponent'
import CreateAccountComponent from './accounts/CreateAccountComponent'
import CollectBusinessInfoComponent from './accounts/CollectBusinessInfoComponent'
import CollectPersonalInfoComponent from './accounts/CollectPersonalInfoComponent'
import InvitationComponent from './accounts/InvitationComponent'
import VerifyAccountComponent from './accounts/VerifyAccountComponent'
import DashboardComponent from './dashboard/DashboardComponent'
import GenericNotFound from './util/GenericNotFound'
import HomeComponent from './util/HomeComponent'
import accountManagement from '../management/cognito/AccountManagement'
import userStore from '../management/data_stores/UserStore'
import find from 'lodash/find';


const MasterComponent = observer(class MasterComponent extends Component {

  static contextTypes = {
    router: PropTypes.object
  };



    render() {
        return (
            <div>
                <Switch>
                  <Route exact path="/" render={routeProps => <HomeComponent {...routeProps} />} />
                  <Route exact path="/login" render={routeProps => <LoginComponent {...routeProps} />} />
                  <Route exact path="/register" render={routeProps => <CreateAccountComponent {...routeProps} />} />
                  <Route exact path="/register/personal-info" render={routeProps => <CollectPersonalInfoComponent {...routeProps} />} />
                  <Route exact path="/register/invitation" render={routeProps => <InvitationComponent {...routeProps} />} />
                  <Route exact path="/register/verify-account" render={routeProps => <VerifyAccountComponent {...routeProps} />} />
                  <Route path="/merchant" render={routeProps => <DashboardComponent {...routeProps} />} />
                  <Route path="*" render={routeProps => <GenericNotFound {...routeProps} />} />
                </Switch>
            </div>
        );
    }
});

export default MasterComponent;
