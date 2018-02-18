import React, { Component } from 'react';
import { observer } from "mobx-react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import mainLogo from '../../assets/mbibe_merchant_icon.png'


const GenericNotFound = observer(class GenericNotFound extends Component {

  render() {
      return (
        <div style={styles.pageStyle}>
          <MuiThemeProvider>
            <div className="col-md-6 col-md-offset-3 center" style={{marginTop:'10%'}}>
              <img src={mainLogo} className="center" style={{maxHeight:100, display:'block', width:'auto' }}/>
            </div>

            <div className="col-md-6 col-md-offset-3 center card" style={{backgroundColor:'#DCDCDC', height:'auto', marginTop:'20px', borderRadius:2, minWidth:'500px'}}>
              <div style={{margin:40, textAlign:'center'}}>
                <span style={{fontSize:26, fontStyle:'bold'}}>404 - Page Not Found</span>
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

export default GenericNotFound;
