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
import userStore from '../../management/data_stores/UserStore'
import businessManagement from '../../management/dynamodb/BusinessManagement'
import find from 'lodash/find';

const CollectPersonalInfoComponent = observer(class CollectPersonalInfoComponent extends Component {

  constructor(props) {
      super(props);
      this.state = {
          firstname:'',
          lastname:'',
      };
  }

  async componentWillMount() {
    let res = await accountManagement.isLoggedIn()
    if(!res) {
      this.props.history.push('/login')
    } else if(find(userStore.attributes, ['name','given_name'])) {
      this.props.history.push('/register/business-info')
    }
  }

  handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
  }

  handleSignInButtonOnClick = async event => {
      event.preventDefault();

      if(this.state.firstname.length < 1) {
        alert('Please enter a first name')
        return
      } else if(this.state.lastname.length < 1) {
        alert('Please enter a last name')
        return
      }

      try {
          const attributes = [
            {Name: 'given_name', Value: this.state.firstname},
            {Name: 'family_name', Value:this.state.lastname}
          ]
          await accountManagement.setAttributes(attributes)
          this.props.history.push('/merchant')
      } catch (e) {
          alert(e);
      }
  }

  render() {
    return (
      <div style={styles.pageStyle}>
        <MuiThemeProvider>
          <div className="col-md-6 col-md-offset-3 center" style={{marginTop:'20px'}}>
            <img src={mainLogo} className="center" style={{maxHeight:100, display:'block', width:'auto' }}/>
          </div>

          <div className="col-md-10 col-md-offset-1 center card" style={{backgroundColor:'#DCDCDC', height:'auto', marginTop:'20px', borderRadius:2, minWidth:'300px', minHeight:'300px'}}>
            <div className="col-md-4 col-md-offset-1" style={{fontSize:'28px', fontWeight:'bold', marginTop:'65px'}}>
              Personal Information
            </div>

            <div className="col-md-10 col-md-offset-1">
              <div className="col-md-6" style={{fontSize:'18px', textAlign:'left', marginTop:'40px'}}>
                <span style={{marginRight:'15px'}}>First Name</span>
                <TextField
                    hintText=""
                    hintBoxStyle={styles.hintBoxStyle}
                    inputStyle={styles.textBoxStyle}
                    underlineStyle={styles.underlineStyle}
                    defaultValue={this.state.email}
                    onChange={this.handleChange}
                    style={{height:'50px', width:'100%'}}
                    type="text"
                    id="firstname">
                    </TextField>
              </div>
              <div className="col-md-6" style={{fontSize:'18px', textAlign:'left', marginTop:'40px'}}>
                <span style={{marginRight:'15px'}}>Last Name</span>
                <TextField
                    hintText=""
                    hintBoxStyle={styles.hintBoxStyle}
                    inputStyle={styles.textBoxStyle}
                    underlineStyle={styles.underlineStyle}
                    defaultValue={this.state.email}
                    onChange={this.handleChange}
                    style={{height:'50px', width:'100%'}}
                    type="text"
                    id="lastname">
                    </TextField>
              </div>
            </div>

            <div className="row" style={{marginTop:'10px'}}>
                <div className="col-md-6 col-md-offset-3"  style={{padding:0, marginTop:50, marginBottom:75}}>
                    <RaisedButton
                        label="Next"
                        buttonStyle={styles.loginButtonStyle}
                        overlayStyle={styles.loginButtonStyle}
                        style={{width:'50%', marginLeft:'25%', borderRadius:'100px'}}
                        type="submit"
                        onClick={this.handleSignInButtonOnClick}
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
      minHeight: '100vh',
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



export default CollectPersonalInfoComponent;
