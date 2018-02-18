import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import HeaderComponent from './HeaderComponent'
import BusinessViewComponent from './BusinessViewComponent'
import accountManagement from '../../management/cognito/AccountManagement'
import userStore from '../../management/data_stores/UserStore'
import businessManagement from '../../management/dynamodb/BusinessManagement'
import LoadingCircleComponent from '../util/LoadingCircleComponent'
import find from 'lodash/find'


const DashboardComponent = observer(class DashboardComponent extends Component {

  async componentWillMount() {
    let res = await accountManagement.isLoggedIn()
    if(res) {
      const attr = await accountManagement.getAttributes();
      userStore.attributes = attr

      let uuid = find(attr, ['name','custom:merchant_uuid'])
      console.log('uuid', uuid)
      if(uuid) {
        userStore.merchant_uuid = uuid.value
        return
      }
    }

    this.props.history.push('/login')
  }


    render() {
        return (
            <div style={styles.pageStyle}>
              <HeaderComponent />
              <div style={{width:'100%',height:50}}></div>
              {!userStore.merchant_uuid &&
                <LoadingCircleComponent message="Loading Profile" />
              }
              {userStore.merchant_uuid &&
                <Switch>
                  <Route exact path="/merchant" render={routeProps => <BusinessViewComponent {...routeProps} />} />
                </Switch>
              }
            </div>
        );
    }
});

const styles = {
  pageStyle: {
    backgroundColor: '#FFAD0A',
    minHeight: '100vh',
    overflowX:'hidden'
  },
  hintBoxStyle: {
    width:'100%',
    paddingLeft:'10px'
  },
  textBoxStyle : {
    borderWidth:'1px',
    borderStyle:'none',
    width:'100%',
    backgroundColor:"rgba(55, 53, 54, 0.5)",
    color:'#000000',
    paddingLeft:'5px',
    opacity:'0.8'
  },
  errorStyle: {
      color: "#FF00FF",
  },
  underlineStyle: {
      borderColor: "#373536",
      borderWidth:'0px'
  },
  floatingLabelStyle: {
      color: "#FF00FF",
  },
  floatingLabelFocusStyle: {
      color: "#FF00FF",
  },
  loginButtonStyle: {
  },
  optionButtonStyle: {
    fontSize:'10px',
    width:'200px',
    margin:'auto'
  }
};

export default DashboardComponent;
