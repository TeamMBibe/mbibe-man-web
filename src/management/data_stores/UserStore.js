import React from 'react'
import {action, extendObservable} from "mobx";
import AWS from 'aws-sdk';

class UserStore {
    constructor() {

        extendObservable(this, {
            email: null,
            user: null,

            selected_business_uuid:null,
            selected_business_info:null,
            selected_business_members:null,

            merchant_uuid:null,
            attributes:null,

            memberObject: null,
            businessObject: null,

            areaMenuObject: null,

            leaveArea() {
              this.businessObject = null;
              this.memberObject = null;
              localStorage.getItem('selectedAreaMemberProfile', null)
              localStorage.setItem('selectedArea', null)
            },

            signUserOut() {
              if(this.user) {
                this.user.signOut();
              }
            },
        });

    }
}

const userStore = new UserStore();
export default userStore;
