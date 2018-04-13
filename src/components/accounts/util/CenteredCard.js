import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class CenteredCard extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const height = this.props.height ? this.props.height : 400;
        const minWidth = this.props.minWidth ? this.props.minWidth : 500;
        return (
          <div className="col-md-6 col-md-offset-3 center card" style={{backgroundColor:'#DCDCDC', height, borderRadius:2, minWidth}}>
            {this.props.children}
          </div>
        );
    }
}

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
