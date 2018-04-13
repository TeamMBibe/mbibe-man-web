import React from 'react'
import {action, extendObservable} from "mobx";
import AWS from 'aws-sdk';

class UserAccountStore {
    constructor() {

        extendObservable(this, {
            user_email: null,
            cognito_user_object: null,

            signUserOut() {
              if(this.cognito_user_object) {
                this.cognito_user_object.signOut();
              }
            },
        });

    }
}

const UserAccount = new UserAccountStore();
export default UserAccount;
