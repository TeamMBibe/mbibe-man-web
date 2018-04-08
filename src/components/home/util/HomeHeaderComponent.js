import React, { Component } from "react";
import background from '../../../assets/bar-table.jpg' // relative path to image
import pos from '../../../assets/business-owner-pos-large.jpg' // relative path to image
import logo from '../../../assets/logo.png' // relative path to image
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import RaisedButton from 'material-ui/RaisedButton';


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
    width:'40%',
    marginLeft:'30%',
    textAlign:'left',
    fontFamily:'Raleway, sans-serif'
  },
  headerStyle: {
    position:'absolute',
    top:'40vh',
    left:0,
    width:'100%',
  }
}

export default class HomeHeaderComponent extends Component {

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
                    <img className="header-logo" src={logo} alt={"logo"} style={{top:logoMarginTop}}/>
                  </div>
                  <div style={{width:'70%', height:'100%', position:'absolute', top:0, right:'10%'}}>
                    <div className="header-animation"  style={{height:'auto', width:'auto', marginTop:buttonMarginTop, position:'absolute', right:0}}>
                      <div style={{marginTop:5, marginRight:20, display:'inline'}}>

                      </div>
                      <RaisedButton label="Register" style={{marginRight:10}} onClick={this.handleRegisterOnClick}/>
                      <RaisedButton label="Sign In" onClick={this.handleSignInOnClick}/>
                    </div>
                  </div>
                </div>
                {this.state.showImageBackground &&
                  <div className="header-animation" style={{position:'fixed',top:0,left:0,width:'100%',height:'100vh'}}>
                    <div id="top-home-left" style={{position:'absolute',top:0,left:0,width:'100vw',height:'100%',backgroundColor:'#373536'}}>
                      <div style={styles.headerStyle}>
                        <div style={styles.headerTextStyle}>Something Awesome Is Coming...</div>
                      </div>
                      <img src={background} alt={"logo"} style={{opacity:'0.4', maxWidth:'100%',height:'auto', position:'absolute', top:0,left:0}}/>
                    </div>
                  </div>
                }
            </div>

        );
    }
}
