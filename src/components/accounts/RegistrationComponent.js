import React, { Component } from "react";
import GenericNotFound from '../util/GenericNotFound'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RegistrationInviteComponent from './registration/RegistrationInviteComponent'
import RegistrationInfoComponent from './registration/RegistrationInfoComponent'
import AccountsHeaderComponent from './util/AccountsHeaderComponent'

import background from '../../assets/bar-table.jpg' // relative path to image


import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const styles = {
  backgroundStyle : {
    position:'fixed',
    top:0,
    left:0,
    height:'100%',
    width:'100vw',
    backgroundColor:'#373536'
  }
}

export default class RegistrationComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={{height:'auto'}}>

              <MuiThemeProvider>
                <AccountsHeaderComponent history={this.props.history} />
                <div id="background-img" style={styles.backgroundStyle}>
                  <img src={background} alt={"logo"} style={{opacity:'0.4', minHeight:'100vh', minWidth:'900px', maxWidth:'100%', position:'absolute', width:'auto', top:0,left:0}}/>
                </div>

                <Switch>
                  <Route exact path="/register" render={routeProps => <RegistrationInviteComponent {...routeProps} />} />
                  <Route exact path="/register/invite" render={routeProps => <RegistrationInviteComponent {...routeProps} />} />
                  <Route exact path="/register/info" render={routeProps => <RegistrationInfoComponent {...routeProps} />} />
                  <Route exact path="/invite" render={routeProps => <RegistrationInviteComponent {...routeProps} />} />
                  <Route path="*" render={routeProps => <GenericNotFound {...routeProps} />} />
                </Switch>
              </MuiThemeProvider>
            </div>
        );
    }
}
