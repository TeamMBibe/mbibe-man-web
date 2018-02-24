import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {observer} from "mobx-react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { withRouter } from 'react-router'
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import mainLogo from '../../assets/mbibe_merchant_icon.png'
import accountManagement from '../../management/cognito/AccountManagement'
import businessManagement from '../../management/dynamodb/BusinessManagement'
import userStore from '../../management/data_stores/UserStore'
import find from 'lodash/find';


const ViewBusinessInfoComponent = observer(class ViewBusinessInfoComponent extends Component {

    handleClose = () => {
      if(this.props.closeAction !== undefined) this.props.closeAction()
    }

    render() {
        return (
          <div style={styles.pageStyle}>
            <MuiThemeProvider>

              <div className="col-md-6 col-md-offset-3 center card" style={{backgroundColor:'#DCDCDC', height:'auto', marginTop:'15px', borderRadius:2, minWidth:'600px', width:'100%', minHeight:'300px', maxHeight:'600px', marginBottom:'40px', overflowY:'scroll'}}>
                <div className="col-md-2" >
                  <div
                    style={{height:'auto', width:'auto', color:'#FFFFFF', fontSize:20, cursor:'pointer', textAlign:'center', backgroundColor:'#AA3939', borderRadius:100, padding:15, marginTop:20}}
                    className="glyphicon glyphicon-remove"
                    onClick={this.handleClose}>
                  </div>
                </div>
                <div className="col-md-10" style={{fontSize:'28px', fontWeight:'bold', marginTop:'25px'}}>
                  Business Information
                </div>

                <div className="col-md-10 col-md-offset-2" style={{fontSize:'14px', textAlign:'left', marginTop:'40px', height:'auto'}}>
                  <span style={{marginRight:'15px'}}>Business Name: {userStore.selected_business_info.business_name.S}</span>
                </div>
                <div className="col-md-10 col-md-offset-2" style={{fontSize:'14px', textAlign:'left', marginTop:'10px', height:'auto'}}>
                  <span style={{marginRight:'15px'}}>Address: {userStore.selected_business_info.address.S}</span>
                </div>
                <div className="col-md-10 col-md-offset-2" style={{fontSize:'14px', textAlign:'left', marginTop:'10px', height:'auto'}}>
                  <span style={{marginRight:'15px'}}>Website: {userStore.selected_business_info.website.S}</span>
                </div>


              </div>

            </MuiThemeProvider>
          </div>
        )
    }
});

const styles = {
    loginCardStyle: {
      marginTop:'50px'
    },
    pageStyle: {
      overflow: 'hidden',
      height:'auto',
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


export default ViewBusinessInfoComponent;
