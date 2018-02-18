import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import HeaderComponent from './HeaderComponent'
import businessManagement from '../../management/dynamodb/BusinessManagement'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import LoadingCircleComponent from '../util/LoadingCircleComponent'
import {Glyphicon} from 'react-bootstrap'


const BusinessViewComponent = observer(class BusinessViewComponent extends Component {


  constructor(props) {
    super(props)
    this.state = {
      businesses:null,
      showOptions:false,
    }
  }

  async componentWillMount() {
    let bs = await businessManagement.getMerchantBusinesses()
    this.setState({businesses:bs})
  }

  handleActionButtonClick = () => {
    this.setState({showOptions:!this.state.showOptions})
  }

  renderBusinesses = () => {

      let items = this.state.businesses.map(item => {
        return (
          <div className="col-md-5 col-md-offset-1 business-card" style={styles.businessCardStyle}>
          <div style={{width:'100%', paddingTop:50, paddingBottom:50}}>
            <p style={{textAlign:'center', fontSize:20, paddingTop:5, width:'100%'}}>{item.business_name.S}</p>
          </div>
        </div>
      )})

        /*items.push(
          <div className="col-md-3 col-md-offset-1 business-card" style={styles.businessCardStyle}>
            <div style={{width:'100%'}}>
              <p style={{textAlign:'center', fontSize:20, paddingTop:5, width:'100%'}}>Add New</p>
            </div>
          </div>
        )*/

        return items


  }

    render() {
        return (
            <div>
              <MuiThemeProvider>
              <div className={this.state.showOptions?'blur':''}>
                  <div className="row">
                      <div className="col-md-2" style={{backgroundColor:'#373536', minHeight:'100vh'}}>
                      </div>
                      <div className="col-md-9" style={{minHeight:'100vh'}}>
                        <div className="col-md-12" style={{marginTop:15, marginLeft:10}}>
                          <span style={{fontSize:24}}>Businesses</span>
                        </div>
                        {!this.state.businesses &&
                          <LoadingCircleComponent message="Loading Businesses"/>
                        }

                        {this.state.businesses &&
                          this.renderBusinesses()
                        }

                      </div>
                      <div className="col-md-1" style={{minHeight:'100vh'}}>
                      </div>
                  </div>
                  {this.state.businesses &&
                    <div style={styles.actionButtonStyle}>
                      <FloatingActionButton
                        backgroundColor='#373536'
                        onClick={this.handleActionButtonClick}>
                        <ContentAdd />
                      </FloatingActionButton>
                    </div>
                  }
                </div>

                {this.state.showOptions &&
                  <div style={styles.blackout}>
                    <div style={{width:'100%', height:'20%'}}></div>
                    <div className="col-md-9 col-md-offset-3" >
                      <div
                        style={{height:'auto', width:'auto', color:'#FFFFFF', fontSize:20, cursor:'pointer', textAlign:'center', backgroundColor:'#AA3939', borderRadius:100, padding:15}}
                        className="glyphicon glyphicon-remove"
                        onClick={this.handleActionButtonClick}>
                      </div>
                    </div>
                    <div className="col-md-3 col-md-offset-4">
                      <div style={styles.optionButtonStyle} className="option-button" onClick={this.handleActionButtonClick}>
                        <div style={styles.optionButtonText}>Add New Business</div>
                      </div>
                    </div>
                  </div>
                }
              </MuiThemeProvider>
            </div>
        );
    }
});

const styles = {
  pageStyle: {
    backgroundColor: '#FFAD0A',
    minHeight: '100vh',
    overflowX:'hidden'
  },
  blackout: {
    position:'fixed',
    top:0,
    left:0,
    backgroundColor:'rgba(0,0,0,0.6)',
    width:'100vw',
    height:'100vh',
    overflow:'hidden'
  },
  businessCardStyle: {
    marginTop:20,
    height:'auto',
    borderWidth:2,
    borderColor:'#ADADAD',
    borderStyle:'solid',
    backgroundColor:'#DEDEDE',
    borderRadius:3
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  actionButtonStyle: {
    position:'fixed',
    right:25,
    bottom:25
  },
  optionButtonStyle: {
    marginTop:20,
    height:'auto',
    borderWidth:10,
    borderColor:'#ADADAD',
    borderStyle:'solid',
    borderRadius:3,
  },
  optionButtonText: {
    color:'#ADADAD',
    fontSize:24,
    paddingTop:70,
    paddingBottom:70,
    textAlign:'center',
  }
};

export default BusinessViewComponent;
