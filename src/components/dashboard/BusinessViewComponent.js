import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import HeaderComponent from './HeaderComponent'
import businessManagement from '../../management/dynamodb/BusinessManagement'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import LoadingCircleComponent from '../util/LoadingCircleComponent'
import {Glyphicon} from 'react-bootstrap'
import AddBusinessComponent from '../actions/AddBusinessComponent'
import Paper from 'material-ui/Paper';


const BusinessViewComponent = observer(class BusinessViewComponent extends Component {


  constructor(props) {
    super(props)
    this.state = {
      loadingTitle:this.props.location.business_name,
      businessInfo: null,
      businessMembers: null
    }

    if(this.props.location.search) {
      this.business_uuid = this.props.location.search.replace('?uuid=','')
    } else {
      this.props.history.push('/merchant')
      return;
    }
  }

  async componentWillMount() {
    try {
      let info = await businessManagement.getBusiness(this.business_uuid)
      let members = await businessManagement.getBusinessMembers(this.business_uuid)
      console.log('info', info)
      console.log('members', members)
      this.setState({businessInfo:info, businessMembers:members})
    } catch(err) {
      alert('The requested business does not exist');
      this.props.history.push('/merchant')
    }
  }

  handleManageMembersOnClick = () => {
    this.props.history.push({
      pathname: '/merchant/business-view/members',
      business_uuid: this.business_uuid,
      business_members: this.state.businessMembers,
      business_info: this.state.businessInfo
    })
  }

    render() {
        return (
            <div>
              <MuiThemeProvider>
                {!this.state.businessInfo &&
                  <LoadingCircleComponent message={this.state.loadingTitle?"Loading " + this.state.loadingTitle : "Loading Business"} />
                }

                {this.state.businessInfo &&
                  <div className="col-md-12">
                    <div className="col-md-4">
                      <Paper style={styles.paperStyle} zDepth={2}>
                        <div style={{width:'100%', backgroundColor:'#373536', height:10}}></div>
                        <div style={{height:'auto', width:'100%', backgroundColor:'#DCDCDC', paddingBottom:20}}>
                          <div
                            style={{height:'auto', width:'auto', color:'#FFFFFF', fontSize:100, cursor:'pointer', textAlign:'center', backgroundColor:'#373536', borderRadius:200, padding:30, marginTop:20}}
                            className="glyphicon glyphicon-info-sign"
                            onClick={this.handleClose}>
                          </div>
                          <div style={{fontSize:26, paddingTop:10, textAlign:'center', color:'#373536'}}>Information</div>
                        </div>
                      </Paper>
                    </div>
                    <div className="col-md-4 ">
                      <Paper style={styles.paperStyle} zDepth={2}>
                        <div style={{width:'100%', backgroundColor:'#373536', height:10}}></div>
                          <div style={{height:'auto', width:'100%', backgroundColor:'#DCDCDC', paddingBottom:20}}>
                            <div
                              style={{height:'auto', width:'auto', color:'#FFFFFF', fontSize:100, cursor:'pointer', textAlign:'center', backgroundColor:'#373536', borderRadius:200, padding:30, marginTop:20}}
                              className="glyphicon glyphicon-user"
                              onClick={this.handleClose}>
                            </div>
                          <div style={{fontSize:26, paddingTop:10, textAlign:'center', color:'#373536'}}>Members</div>
                        </div>
                        <div style={{fontSize:18, paddingTop:10, marginBottom:30, textAlign:'center', color:'#373536'}}>Active: {this.state.businessMembers.length}</div>
                        <RaisedButton
                            label="Manage Members"
                            style={{width:'50%', borderRadius:'100px'}}
                            onClick={this.handleManageMembersOnClick}
                            backgroundColor="#FFAD0A"/>
                      </Paper>
                    </div>
                    <div className="col-md-4 ">
                      <Paper style={styles.paperStyle} zDepth={2}>
                      <div style={{width:'100%', backgroundColor:'#373536', height:10}}></div>
                        <div style={{height:'auto', width:'100%', backgroundColor:'#DCDCDC', paddingBottom:20}}>
                          <div
                            style={{height:'auto', width:'auto', color:'#FFFFFF', fontSize:100, cursor:'pointer', textAlign:'center', backgroundColor:'#373536', borderRadius:200, padding:30, marginTop:20}}
                            className="glyphicon glyphicon-home"
                            onClick={this.handleClose}>
                          </div>
                        <div style={{fontSize:26, paddingTop:10, textAlign:'center', color:'#373536'}}>My Business</div>
                      </div>
                      </Paper>
                    </div>

                  </div>
                }
              </MuiThemeProvider>
            </div>
        );
    }
});

const styles = {

  paperStyle: {
    height: 'auto',
    minHeight:400,
    width: '100%',
    marginTop: 50,
    textAlign: 'center',
    display: 'inline-block',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  actionButtonStyle: {
    position:'fixed',
    right:25,
    bottom:25
  },
  optionButtonStyle: {
    marginTop:20,
    height:'auto',
    borderWidth:10,
    borderColor:'#ADADAD',
    borderStyle:'solid',
    borderRadius:3,
  },
  optionButtonText: {
    color:'#ADADAD',
    fontSize:24,
    paddingTop:70,
    paddingBottom:70,
    textAlign:'center',
  }
};

export default BusinessViewComponent;
