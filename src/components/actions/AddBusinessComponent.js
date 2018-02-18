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

const AddBusinessComponent = observer(class AddBusinessComponent extends Component {

  constructor(props) {
      super(props);
      this.state = {
          businessName:'',
          website:'',
          address:'',
          suite:'',
          state:'',
          city:'',
          zip:''
      };
  }

  handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
  }

  handleClose = () => {
    if(this.props.closeAction !== undefined) this.props.closeAction()
  }

  handleSignInOnClick = async event => {
      event.preventDefault();
      if(this.state.businessName.length < 1) {
        alert('Please enter a business name')
        return
      } else if(this.state.website.length < 1) {
        alert('Please enter a website')
        return
      } else if(this.state.address.length < 1) {
        alert('Please enter a address')
        return
      } else if(this.state.city.length < 1) {
        alert('Please enter a city')
        return
      } else if(this.state.state.length < 1) {
        alert('Please enter a state')
        return
      } else if(this.state.zip.length < 1) {
        alert('Please enter a zip')
        return
      }

      let address = this.state.address;
      if(this.state.suite.length > 1) address += " " + this.state.suite
      address += ", " + this.state.city + " " + this.state.state + ", " + this.state.zip

      try {
          const merchant_uuid = find(userStore.attributes, ['name','custom:merchant_uuid']).value
          console.log('uuid', merchant_uuid)
          await businessManagement.createBusiness(merchant_uuid, this.state.businessName, this.state.website, address)
          if(this.props.closeAction !== undefined) this.props.closeAction()
      } catch (e) {
          alert(e);
      }
  }

  render() {
    return (
      <div style={styles.pageStyle}>
        <MuiThemeProvider>

          <div className="col-md-10 col-md-offset-1 center card" style={{backgroundColor:'#DCDCDC', height:'auto', marginTop:'15px', borderRadius:2, minWidth:'300px', minHeight:'300px', marginBottom:'40px'}}>
            <div className="col-md-12" >
              <div
                style={{height:'auto', width:'auto', color:'#FFFFFF', fontSize:20, cursor:'pointer', textAlign:'center', backgroundColor:'#AA3939', borderRadius:100, padding:15, marginTop:20}}
                className="glyphicon glyphicon-remove"
                onClick={this.handleClose}>
              </div>
            </div>

            <div className="col-md-4 col-md-offset-1" style={{fontSize:'28px', fontWeight:'bold', marginTop:'25px'}}>
              Add New Business
            </div>

            <div className="col-md-10 col-md-offset-1">
              <div className="col-md-6" style={{fontSize:'18px', textAlign:'left', marginTop:'40px'}}>
                <span style={{marginRight:'15px'}}>Business Name</span>
                <TextField
                    hintText=""
                    hintBoxStyle={styles.hintBoxStyle}
                    inputStyle={styles.textBoxStyle}
                    underlineStyle={styles.underlineStyle}
                    defaultValue={this.state.email}
                    onChange={this.handleChange}
                    style={{height:'50px', width:'100%'}}
                    type="text"
                    id="businessName">
                    </TextField>
              </div>
              <div className="col-md-6" style={{fontSize:'18px', textAlign:'left', marginTop:'40px'}}>
                <span style={{marginRight:'15px'}}>Website</span>
                <TextField
                    hintText=""
                    hintBoxStyle={styles.hintBoxStyle}
                    inputStyle={styles.textBoxStyle}
                    underlineStyle={styles.underlineStyle}
                    defaultValue={this.state.email}
                    onChange={this.handleChange}
                    style={{height:'50px', width:'100%'}}
                    type="text"
                    id="website">
                    </TextField>
              </div>
            </div>

            <div className="col-md-10 col-md-offset-1">
              <div className="col-md-6" style={{fontSize:'18px', textAlign:'left', marginTop:'40px'}}>
                <span style={{marginRight:'15px'}}>Address</span>
                <TextField
                    hintText=""
                    hintBoxStyle={styles.hintBoxStyle}
                    inputStyle={styles.textBoxStyle}
                    underlineStyle={styles.underlineStyle}
                    defaultValue={this.state.email}
                    onChange={this.handleChange}
                    style={{height:'50px', width:'100%'}}
                    type="text"
                    id="address">
                    </TextField>
              </div>
              <div className="col-md-6" style={{fontSize:'18px', textAlign:'left', marginTop:'40px'}}>
                <span style={{marginRight:'15px'}}>Apt/Suite</span><br />
                <TextField
                    hintText=""
                    hintBoxStyle={styles.hintBoxStyle}
                    inputStyle={styles.textBoxStyle}
                    underlineStyle={styles.underlineStyle}
                    defaultValue={this.state.email}
                    onChange={this.handleChange}
                    style={{height:'50px', width:'25%'}}
                    type="text"
                    id="suite">
                    </TextField>
              </div>
            </div>

            <div className="col-md-10 col-md-offset-1">
              <div className="col-md-4" style={{fontSize:'18px', textAlign:'left', marginTop:'40px'}}>
                <span style={{marginRight:'15px'}}>City</span>
                <TextField
                    hintText=""
                    hintBoxStyle={styles.hintBoxStyle}
                    inputStyle={styles.textBoxStyle}
                    underlineStyle={styles.underlineStyle}
                    defaultValue={this.state.email}
                    onChange={this.handleChange}
                    style={{height:'50px', width:'100%'}}
                    type="text"
                    id="city">
                    </TextField>
              </div>
              <div className="col-md-2" style={{fontSize:'18px', textAlign:'left', marginTop:'40px'}}>
                <span style={{marginRight:'15px'}}>State</span>
                <TextField
                    hintText=""
                    hintBoxStyle={styles.hintBoxStyle}
                    inputStyle={styles.textBoxStyle}
                    underlineStyle={styles.underlineStyle}
                    defaultValue={this.state.email}
                    onChange={this.handleChange}
                    style={{height:'50px', width:'100%'}}
                    type="text"
                    id="state">
                    </TextField>
              </div>
              <div className="col-md-3" style={{fontSize:'18px', textAlign:'left', marginTop:'40px'}}>
                <span style={{marginRight:'15px'}}>Zipcode</span>
                <TextField
                    hintText=""
                    hintBoxStyle={styles.hintBoxStyle}
                    inputStyle={styles.textBoxStyle}
                    underlineStyle={styles.underlineStyle}
                    defaultValue={this.state.email}
                    onChange={this.handleChange}
                    style={{height:'50px', width:'100%'}}
                    type="text"
                    id="zip">
                    </TextField>
              </div>
            </div>

            <div className="row" style={{marginTop:'10px'}}>
                <div className="col-md-6 col-md-offset-3"  style={{padding:0, marginTop:50, marginBottom:75}}>
                    <RaisedButton
                        label="ADD"
                        buttonStyle={styles.loginButtonStyle}
                        overlayStyle={styles.loginButtonStyle}
                        style={{width:'50%', marginLeft:'25%', borderRadius:'100px'}}
                        type="submit"
                        onClick={this.handleSignInOnClick}
                        backgroundColor="#FFAD0A"/>
                </div>
            </div>
          </div>

        </MuiThemeProvider>
      </div>
    );
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



export default AddBusinessComponent;
