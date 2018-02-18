import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import mainLogo from '../../assets/mbibe_icon.png'


const HeaderComponent = observer(class HeaderComponent extends Component {

    render() {
        return (
            <div className="col-md-12" style={styles.headerStyle}>
              <div className="col-md-4" style={{marginTop:5}}>
                <img src={mainLogo} style={{maxHeight:40, display:'block', width:'auto' }}/>
              </div>
            </div>
        );
    }
});

const styles = {
  headerStyle: {
    width:'100%',
    height:50,
    backgroundColor:'#EFEFEF',
    position:'fixed',
    top:0,
    left:0,
    zIndex:999
  }
};

export default HeaderComponent;
