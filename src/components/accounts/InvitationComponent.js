import React, { Component } from 'react';
import { observer } from "mobx-react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import mainLogo from '../../assets/mbibe_merchant_icon.png'
import userStore from '../../management/data_stores/UserStore'
import accountManagement from '../../management/cognito/AccountManagement'
import businessManagement from '../../management/dynamodb/BusinessManagement'
import find from 'lodash/find';


const InvitationComponent = observer(class InvitationComponent extends Component {

constructor(props) {
  super(props)
  this.state = {
    'code':null
  }
}

async componentWillMount() {
  let res = await accountManagement.isLoggedIn()
  if(!res) {
    this.props.history.push('/login')
  } else if(find(userStore.attributes, ['name','custom:merchant_uuid'])) {
    this.props.history.push('/register/personal-info')
  }
}

  handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

  handleSignInOnClick = async event => {
    if(this.state.code === undefined || this.state.code.length < 1) {
      alert('Not a valid code');
      return;
    }

    try {
          let invite = await businessManagement.getInvitation(this.state.code)
          if(!invite || invite.length == 0) {
            alert('That invite was not found.')
            return
          } else {
            if(invite.email.S !== userStore.email) {
              alert('That invite does not belong to you')
              return
            } else {
              await accountManagement.setAttribute('custom:merchant_uuid', invite.assigned_merchant_uuid.S)
              this.props.history.push('/register/personal-info')
            }
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
            <div className="col-md-6 col-md-offset-3 center" style={{marginTop:'10%'}}>
              <img src={mainLogo} className="center" style={{maxHeight:100, display:'block', width:'auto' }}/>
            </div>

            <div className="col-md-6 col-md-offset-3 center card" style={{backgroundColor:'#DCDCDC', height:'auto', marginTop:'20px', borderRadius:2, minWidth:'500px'}}>
              <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:20}}>
                  <p style={{fontSize:24, fontStyle:'bold'}}>Welcome!</p>
                  <p style={{fontSize:18}}>Please enter your official MBibe Merchant Invite code below.</p>
              </div>

              <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1" style={{padding:20}}>
                  <TextField
                      hintText="Invitation Code"
                      hintBoxStyle={styles.hintBoxStyle}
                      inputStyle={styles.textBoxStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={this.handleChange}
                      style={{width:'90%', marginLeft:'5%', height:'50px'}}
                      type="text"
                      id="code">
                  </TextField>
              </div>
              <div className="row" style={{marginTop:'10px'}}>
                  <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1"  style={{padding:20}}>
                      <RaisedButton
                          label="Submit"
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

export default InvitationComponent;
