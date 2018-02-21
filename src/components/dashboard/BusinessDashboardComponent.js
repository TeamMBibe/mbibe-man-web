import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import PropTypes from 'prop-types';
import BusinessViewComponent from './BusinessViewComponent'
import MembersViewComponent from './MembersViewComponent'
import businessManagement from '../../management/dynamodb/BusinessManagement'
import userStore from '../../management/data_stores/UserStore'
import GenericNotFound from '../util/GenericNotFound'
import LoadingCircleComponent from '../util/LoadingCircleComponent'

const BusinessDashboardComponent = observer(class BusinessDashboardComponent extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props)
    this.state = {
      businessInfo: null,
      businessMembers: null
    }

    if(!userStore.selected_business_uuid) {
      this.props.history.push('/merchant')
      return;
    }
  }

  async componentWillMount() {
    const businessUUID = userStore.selected_business_uuid;
    console.log('uuid', businessUUID)
    try {
      let info = await businessManagement.getBusiness(businessUUID)
      let members = await businessManagement.getBusinessMembers(businessUUID)
      console.log('info', info)
      console.log('members', members)
      this.setState({businessInfo:info, businessMembers:members})
    } catch(err) {
      alert('The requested business does not exist');
      this.props.history.push('/merchant')
    }
  }

  handleBusinessInformationClick = () => {
    this.props.history.push({
      pathname: '/merchant/business-view/info'
    })
  }

  render() {
    return (
      <div>
        <div className="col-md-12" style={{backgroundColor:'#ADADAD', position:'fixed', top:50, left:0, fontSize:20, paddingTop:10, paddingBottom:10, paddingLeft:20}}>
          <span>{this.state.businessInfo && this.state.businessInfo.business_name.S}</span>
          <div
            style={{height:'auto', width:'auto', color:'#FFFFFF', fontSize:15, paddingLeft:20, paddingTop:8, cursor:'pointer', position:'relative'}}
            className="glyphicon glyphicon-pencil"
            onClick={this.handleBusinessInformationClick}>
          </div>
        </div>
        <div style={{height:40, width:'100%'}}></div>
        {!this.state.businessInfo &&
          <LoadingCircleComponent message={"Loading Business"} />
        }

        {this.state.businessInfo &&
          <Switch>
            <Route exact path="/merchant/business-view" render={routeProps => <BusinessViewComponent {...routeProps} businessInfo={this.state.businessInfo} businessMembers={this.state.businessMembers} />} />
            <Route exact path="/merchant/business-view/members" render={routeProps => <MembersViewComponent {...routeProps} businessInfo={this.state.businessInfo} businessMembers={this.state.businessMembers} />} />
            <Route exact path="/merchant/business-view/info" render={routeProps => <MembersViewComponent {...routeProps} businessInfo={this.state.businessInfo} businessMembers={this.state.businessMembers} />} />
            <Route path="*" render={routeProps => <GenericNotFound {...routeProps} />} />
          </Switch>
        }

      </div>
    );
  }
});

export default BusinessDashboardComponent;
