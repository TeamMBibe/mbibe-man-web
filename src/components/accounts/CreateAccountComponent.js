import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {observer} from "mobx-react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { withRouter } from 'react-router'
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import mainLogo from '../../assets/mbibe_merchant_icon.png'
import accountManagement from '../../management/cognito/AccountManagement'
import businessManagement from '../../management/dynamodb/BusinessManagement'

const CreateAccountComponent = observer(class CreateAccountComponent extends Component {

  constructor(props) {
      super(props);
      this.state = {
          email:'',
          password:'',
          confirmPassword:'',
          phone:''
      };
  }

  validateForm() {
    return this.state.email.length > 0
          && this.state.password.length > 0
          && this.state.phone.length > 0
          && this.state.confirmPassword === this.state.password;
  }

  handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
  }

  handleSignInButtonOnClick = event => {
      this.props.history.push('/login')
  }

  handleSubmit = async event => {
      event.preventDefault();
      try {
          await accountManagement.signup(this.state.email, this.state.password, this.state.phone)
          this.props.history.push('/verify-account')
      } catch (e) {
          alert(e);
      }
  }



  render() {
    return (
      <div style={styles.pageStyle}>
        <MuiThemeProvider>
          <div className="col-md-6 col-md-offset-3 center" style={{marginTop:'100px'}}>
            <img src={mainLogo} className="center" style={{maxHeight:100, display:'block', width:'auto' }}/>
          </div>

          <div className="col-md-6 col-md-offset-3 center card" style={{backgroundColor:'#DCDCDC', height:'50vh', marginTop:'20px', borderRadius:2, minWidth:'300px', minHeight:'300px'}}>
              <div style={{ width:'60%', marginLeft:'20%', height:'100%', float:'left'}} className="row">
                  <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:0, marginTop:'10%'}}>
                      <TextField
                          hintText="E-mail"
                          hintBoxStyle={styles.hintBoxStyle}
                          inputStyle={styles.textBoxStyle}
                          underlineStyle={styles.underlineStyle}
                          defaultValue={this.state.email}
                          onChange={this.handleChange}
                          style={{width:'90%', marginLeft:'5%', height:'50px'}}
                          type="email"
                          id="email">
                      </TextField>
                  </div>
                  <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:0, marginTop:5}}>
                      <TextField
                          hintText="Password"
                          hintBoxStyle={styles.hintBoxStyle}
                          inputStyle={styles.textBoxStyle}
                          underlineStyle={styles.underlineStyle}
                          defaultValue={this.state.email}
                          onChange={this.handleChange}
                          style={{width:'90%', marginLeft:'5%', height:'50px'}}
                          type="password"
                          id="password">
                      </TextField>
                  </div>
                  <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:0, marginTop:5}}>
                      <TextField
                          hintText="Confirm Password"
                          hintBoxStyle={styles.hintBoxStyle}
                          inputStyle={styles.textBoxStyle}
                          underlineStyle={styles.underlineStyle}
                          defaultValue={this.state.email}
                          onChange={this.handleChange}
                          style={{width:'90%', marginLeft:'5%', height:'50px'}}
                          type="password"
                          id="confirmPassword">
                      </TextField>
                  </div>
                  <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:0, marginTop:5}}>
                      <TextField
                          hintText="Phone"
                          hintBoxStyle={styles.hintBoxStyle}
                          inputStyle={styles.textBoxStyle}
                          underlineStyle={styles.underlineStyle}
                          defaultValue={this.state.email}
                          onChange={this.handleChange}
                          style={{width:'90%', marginLeft:'5%', height:'50px'}}
                          type="phone"
                          id="phone">
                      </TextField>
                  </div>

                  <div className="row" style={{marginTop:'10px'}}>
                      <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1"  style={{padding:0, marginTop:10}}>
                          <RaisedButton
                              label="Create Account"
                              buttonStyle={styles.loginButtonStyle}
                              overlayStyle={styles.loginButtonStyle}
                              style={{width:'50%', marginLeft:'25%', borderRadius:'100px'}}
                              type="submit"
                              onClick={this.handleSubmit}
                              backgroundColor="#FFAD0A"/>
                      </div>
                  </div>
              </div>
          </div>

          <div className="center" style={{padding:0, width:'200px'}}>
              <FlatButton
                  label="Have An Account?"
                  onClick={this.handleSignInButtonOnClick}
                  style={{width:'200px', margin:'auto'}}
                  labelStyle={styles.optionButtonStyle} />
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
      backgroundColor: '#FFAD0A',
      backgroundRepeat  : 'no-repeat',
      backgroundPosition: 'center',
      overflow:'hidden',
      height: '100vh',
      width: '100vw',
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



export default CreateAccountComponent;
