import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import mainLogo from '../../assets/mbibe_merchant_icon.png'
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import accountManagement from '../../management/cognito/AccountManagement'
import userStore from '../../management/data_stores/UserStore'
import find from 'lodash/find';


const LoginComponent = observer(class LoginComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error:'test'
    }

  }

  handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

  handleCreateButtonOnClick = async event => {
    this.props.history.push('/register')
  }

  handleSignInOnClick = async event => {
    alert('here')
    if(this.state.email === undefined || this.state.email.length < 5) {
      alert('Not a valid email');
      return;
    } else if(this.state.password === undefined || this.state.password.length < 5) {
      alert('Not a valid password');
      return;
    }

    try {
          let user = await accountManagement.login(this.state.email, this.state.password)
          //await accountManagement.deleteAttribute('custom:merchant_uuid')
          userStore.attributes = await accountManagement.getAttributes()
          userStore.merchant_uuid = find(userStore.attributes, ['name','custom:merchant_uuid'])

          const name = find(userStore.attributes, ['name','given_name'])
          console.log('here', name)
          if(!userStore.merchant_uuid) {
            this.props.history.push('/register/invitation')
          } else if(!name) {
            this.props.history.push('/register/personal-info')
          } else {
            this.props.history.push('/merchant')
          }

      } catch (e) {
          alert(e);
          return;
      }
  }


    render() {
        return (
          <div style={styles.pageStyle}>
            <MuiThemeProvider>
              <div className="col-md-6 col-md-offset-3 center" style={{marginTop:'100px'}}>
                <img src={mainLogo} className="center" style={{maxHeight:100, display:'block', width:'auto' }}/>
              </div>

              <div className="col-md-6 col-md-offset-3 center card" style={{backgroundColor:'#DCDCDC', height:'40vh', marginTop:'20px', borderRadius:2, minWidth:'500px', minHeight:'300px'}}>
                  <div style={{ width:'50%', marginLeft:'25%', height:'100%', float:'left'}} className="row">
                      <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:0, marginTop:'20%'}}>
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

                      <div className="row" style={{marginTop:'10px'}}>
                          <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1"  style={{padding:0, marginTop:'10px'}}>
                              <RaisedButton
                                  label="Sign In"
                                  buttonStyle={styles.loginButtonStyle}
                                  overlayStyle={styles.loginButtonStyle}
                                  style={{width:'50%', marginLeft:'25%', borderRadius:'100px'}}
                                  type="submit"
                                  onClick={this.handleSignInOnClick}
                                  backgroundColor="#FFAD0A"/>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="center" style={{padding:0, width:'200px'}}>
                  <FlatButton
                      label="NEED AN ACCOUNT?"
                      onClick={this.handleCreateButtonOnClick}
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

export default LoginComponent;
