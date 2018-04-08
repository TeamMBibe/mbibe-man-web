import React, { Component } from "react";
import HomeHeaderComponent from './util/HomeHeaderComponent'
import GenericNotFound from '../util/GenericNotFound'
import HomeMainComponent from './info/HomeMainComponent'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
    }



    render() {

        return (
            <div style={{height:'auto'}}>
              <MuiThemeProvider>
                <HomeHeaderComponent history={this.props.history}/>
                <Switch>
                  <Route exact path="/" render={routeProps => <HomeMainComponent {...routeProps} />} />
                  <Route path="*" render={routeProps => <GenericNotFound {...routeProps} />} />
                </Switch>
              </MuiThemeProvider>
            </div>
        );
    }
}
