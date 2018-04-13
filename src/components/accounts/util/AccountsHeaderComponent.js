import React, { Component } from "react";
import background from '../../../assets/bar-table.jpg' // relative path to image
import pos from '../../../assets/business-owner-pos-large.jpg' // relative path to image
import logo from '../../../assets/logo.png' // relative path to image
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


const HEADER_MIN_OPACITY = 0.0;
const HEADER_MAX_OPACITY = 1;

const styles = {
  linkStyle : {
    marginRight:20,
    fontSize:14,
    color:'#000'
  },
  headerTextStyle: {
    fontSize:56,
    color:'#fff',
    maxWidth:'100%',
    fontFamily:'Raleway, sans-serif',
    minWidth:'700px',
    textAlign:'center'
  },
  headerStyle: {
    position:'absolute',
    top:'40vh',
    left:0,
    width:'100%',
    maxWidth:'100%'
  }
}

export default class AccountsHeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state ={
            currentScrollHeight:1,
            headerHeight:100,
            headerOpacity:0,
            showImageBackground: this.props.showImageBackground ? this.props.showImageBackground : true
        }
    }

    componentDidMount () {
        window.onscroll =()=>{
            let newScrollHeight = Math.ceil(window.scrollY / 20) * 20;
            if (this.state.currentScrollHeight != newScrollHeight){
                if(newScrollHeight == 0) newScrollHeight = 1;
                this.setState({currentScrollHeight: newScrollHeight})

                if(this.state.currentScrollHeight > 200) {
                    requestAnimationFrame(() => {
                        this.setState({ headerHeight: 60, headerOpacity: 1 });
                    });
                }

                if(this.state.currentScrollHeight < 150) {
                    requestAnimationFrame(() => {
                        this.setState({ headerHeight: 100, headerOpacity: 0.0 });
                    });
                }
            }


        }
    }

    handleRegisterOnClick = () => {
      this.props.history.push('/register')
    }

    handleSignInOnClick = () => {
      this.props.history.push('/login')
    }

    handleLogoOnClick = () => {
      this.props.history.push('/')
    }

/*

<Link activeClass="active" className="test1" to="second-component" spy={true} smooth={true} duration={500} style={styles.linkStyle}>PRODUCTS</Link>
<Link activeClass="active" className="test1" to="second-component" spy={true} smooth={true} duration={500} style={styles.linkStyle}>COMPANY</Link>
<Link activeClass="active" className="test1" to="second-component" spy={true} smooth={true} duration={500} style={styles.linkStyle}>CONTACT US</Link>

*/

    render() {
        const opImage = Math.min(Math.max(100 / this.state.currentScrollHeight,HEADER_MIN_OPACITY), HEADER_MAX_OPACITY)
        //const height =  Math.max(Math.min(120 - this.state.currentScrollHeight / 5, 100) , 50)
        const height = this.state.headerHeight + "px";
        const opacity = this.state.headerOpacity;
        const logoMarginTop = (this.state.headerHeight - (this.state.headerHeight / 10 * 7.5)) / 2;
        const buttonMarginTop = (this.state.headerHeight - 40) / 2;

        return (
            <div>
                <div className="header-animation" style={{height, minWidth:'700px', width:'100%', backgroundColor:'rgba(211,211,211,' + opacity + ')', position:'fixed', top:0,left:0,zIndex:999}}>
                  <div style={{width:'10%', height:'100%', position:'absolute', top:0, left:'10%'}}>
                    <img className="header-logo" src={logo} alt={"logo"} style={{top:logoMarginTop, cursor:'pointer'}} onClick={this.handleLogoOnClick}/>
                  </div>
                  <div style={{width:'70%', height:'100%', position:'absolute', top:0, right:'10%'}}>
                    <div className="header-animation"  style={{height:'auto', width:'auto', marginTop:buttonMarginTop, position:'absolute', right:0}}>
                      <div style={{marginTop:5, marginRight:20, display:'inline'}}>

                      </div>
                      <FlatButton
                        label="Register"
                        style={{marginRight:10, opacity:0.8}}
                        labelStyle={{fontFamily:'Nunito Sans, sans-serif', fontStyle:'bold'}}
                        onClick={this.handleRegisterOnClick}
                        backgroundColor="#FFAD0A"
                        hoverColor="#FFBF3E"
                      />
                      <FlatButton
                        label="Sign In"
                        style={{opacity:0.8}}
                        labelStyle={{fontFamily:'Nunito Sans, sans-serif'}}
                        onClick={this.handleSignInOnClick}
                        backgroundColor="#FFAD0A"
                        hoverColor="#FFBF3E"
                      />
                    </div>
                  </div>
                </div>
            </div>

        );
    }
}
