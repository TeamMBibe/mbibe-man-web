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
import userStore from '../../management/data_stores/UserStore'

const VerifyAccountComponent = observer(class VerifyAccountComponent extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email: userStore.email,
        verificationCode:''
      };
  }

  validateForm() {
    return this.state.verificationCode.length >= 6;
  }

  handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
  }

  handleSubmit = async event => {
      event.preventDefault();
      try {
        await accountManagement.verify(this.state.email, this.state.verificationCode)
        this.props.history.push('/login')
      } catch (e) {
          alert(e);
      }
  }

  render() {

    return (
          < div style={styles.pageStyle}>
            <MuiThemeProvider>
              <div className="row">
                  <img src={mainLogo} className="col-xs-6 col-xs-offset-3 col-sm-2 col-sm-offset-5 col-md-2 col-md-offset-5" style={{marginTop:'15px'}}/>
              </div>
              <div style={styles.loginCardStyle} className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4">
                <form onSubmit={this.handleSubmit}>
                  <FormGroup controlId="verificationCode" bsSize="large" className="row">
                          <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
                              <TextField
                                  hintText="Verification Code"
                                  style={{width:'100%'}}
                                  underlineStyle={styles.underlineStyle}
                                  onChange={this.handleChange}
                                  type="text"
                                  id="verificationCode">
                              </TextField>
                          </div>
                      </FormGroup>
                      <div className="row">
                        <div className="col-xs-4 col-xs-offset-1 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4">
                            <RaisedButton
                                primary={true}
                                label="Verify"
                                style={styles.loginButtonStyle}
                                type="submit"
                                disabled={!this.validateForm()}/>
                        </div>
                    </div>
                </form>
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
      height: '100vh',
      width: '100vw',
  },
  errorStyle: {
      color: "#FF00FF",
  },
  underlineStyle: {
      borderColor: "#373536",
      borderWidth:'1px'
  },
  floatingLabelStyle: {
      color: "#FF00FF",
  },
  floatingLabelFocusStyle: {
      color: "#FF00FF",
  },
  loginButtonStyle: {
      width:'100%',
  }
};

export default VerifyAccountComponent;
