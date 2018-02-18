import React, { Component } from "react";
import { observer } from "mobx-react";
import AWS from "aws-sdk"
import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute
} from "amazon-cognito-identity-js";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import userStore from '../data_stores/UserStore'

const AccountManagement = observer(class AccountManagement extends Component {

  constructor(props) {
    super(props);
    const storage = window.localStorage;
    //this.props.userStore = new userStore();
    this.state = {
      USER_POOL_ID: "us-east-2_SVtG899jG",
      APP_CLIENT_ID: "2e1u1rr6k358jdf4j165kn4fu4",
      TEST_ID_POOL: 'us-east-2:58b685bb-94ef-40cf-b474-c11cc51d4f5a'
    }
  }

  login(email, password) {
      const userPool = new CognitoUserPool({
          UserPoolId: this.state.USER_POOL_ID,
          ClientId: this.state.APP_CLIENT_ID
      });

      const user = new CognitoUser({ Username: email, Pool: userPool });
      const authenticationData = { Username: email, Password: password };
      const authenticationDetails = new AuthenticationDetails(authenticationData);

      return new Promise((resolve, reject) => {
          user.authenticateUser(authenticationDetails, {
              onSuccess: result => {
                  userStore.user = user;
                  userStore.email = email;
                  resolve(user)
              },
              onFailure: err => reject(err),
              mfaRequired: function(codeDeliveryResults) {
                  alert("MFA is required");
                  reject("MFA is required");
              },
              newPasswordRequired: function(userAttributes, requiredAttributes) {
                  alert("New password required");
                  reject("New password required");
              }
          })
      });
    }

    signup(email, password, phone) {

        const userPool = new CognitoUserPool({
            UserPoolId: this.state.USER_POOL_ID,
            ClientId: this.state.APP_CLIENT_ID
        });

        var attributeList = [];

        const attributeEmail = new CognitoUserAttribute({
            Name : 'email',
            Value : email
        });

        /*const attributePhoneNumber = new CognitoUserAttribute({
            Name : 'phone_number',
            Value : phone
        });*/

        attributeList.push(attributeEmail);
        //attributeList.push(attributePhoneNumber);

        return new Promise((resolve, reject) =>
            userPool.signUp(email, password, attributeList, null, function(err, result){
                if (err) {
                    reject(err);
                    return;
                } else {
                    resolve();
                    console.log(result)
                    userStore.user = result.user;
                    userStore.email = email;

                    // Get the JWT (JSON Web Key Token)
                    //userStore.accessToken = result.getAccessToken().getJwtToken();
                    //userStore.refreshToken = result.getRefreshToken().getToken();
                    //userStore.idToken = result.getIdToken().getJwtToken();


                    console.log(userStore)
                }
            })
        );
    }

    verify(email, code) {
        var poolData = {
            UserPoolId: this.state.USER_POOL_ID,
            ClientId: this.state.APP_CLIENT_ID
        };

        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username : email,
            Pool : userPool
        };

        var cognitoUser = new CognitoUser(userData);

        return new Promise((resolve, reject) =>
            cognitoUser.confirmRegistration(code, true, function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                console.log('call result: ' + result);
                resolve();
            })
        );
    }

    getAttributes() {
      if(!userStore.user) {
        return null
      }

      return new Promise((resolve, reject) =>
        userStore.user.getUserAttributes(function(err, result) {
          if (err) {
              reject(err);
              return;
          }
          const attributes = result.map(function(item) {
            return ({
              name: item.getName(),
              value: item.getValue(),
            })
          })
          console.log(attributes)
          resolve(attributes);
        })
      );
    }

    setAttribute(attributeName, attributeValue) {
      var attributeList = [];
      var attribute = {
          Name : attributeName,
          Value : attributeValue
      };
      var attribute = new CognitoUserAttribute(attribute);
      attributeList.push(attribute);

      return new Promise((resolve, reject) =>
        userStore.user.updateAttributes(attributeList, function(err, result) {
            if (err) {
                reject(err);
                return;
            } else {
              resolve()
            }
        })
      );
    }

    setAttributes(attributes) {
      const list = attributes.map(item => {
        return new CognitoUserAttribute(item)
      })

      return new Promise((resolve, reject) =>
        userStore.user.updateAttributes(list, function(err, result) {
            if (err) {
                reject(err);
                return;
            } else {
              resolve()
            }
        })
      );
    }

    deleteAttribute(attributeName) {
      var attributeList = [];
      attributeList.push(attributeName);

      return new Promise((resolve, reject) =>
        userStore.user.updateAttributes(attributeList, function(err, result) {
            if (err) {
                reject(err);
                return;
            } else {
              resolve()
            }
        })
      );
    }

    isLoggedIn() {
      var poolData = {
          UserPoolId: this.state.USER_POOL_ID,
          ClientId: this.state.APP_CLIENT_ID
      };

      var userPool = new CognitoUserPool(poolData);
      var cognitoUser = userPool.getCurrentUser();

      const context = this
      if (cognitoUser != null) {
        return new Promise((resolve, reject) => {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    reject(err);
                    return;
                }
                userStore.user = cognitoUser;
                userStore.email = cognitoUser.username
                if(!session.isValid()) reject();
                else resolve(cognitoUser.username);
            })


        });
      }
    }

    /*changePassword() {

        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });

        return new Promise((resolve, reject) =>
            cognitoUser.changePassword(this.state.oldPassword, this.state.newPassword, function(err, result) {
                if (err) {
                    alert(err);
                    return;
                }
                console.log('call result: ' + result);
            })
        );
    }*/
});

const accountManagement = new AccountManagement();
export default accountManagement;
