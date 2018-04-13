import React, { Component } from "react";

class MerchantApi extends Component {

  validateInviteCode = (code) => {
    fetch('https://ln7uwglvm7.execute-api.us-east-2.amazonaws.com/bibe/merchant/invite/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token'
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    }).then(res => {
      console.log('here', res)
      res.json()
    })
    .then(
      (result) => {
        console.log('result', result)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log('error', error)
      }
    )
  }

};
const Merchant = new MerchantApi();
export default Merchant;
