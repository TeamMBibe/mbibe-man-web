import React, { Component } from "react";
import CenteredCard from '../util/CenteredCard'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import businessManagement from '../../../management/dynamodb/BusinessManagement'

/*
 TODO:
- Add incorrect attempt counter then present 'Need Invite'
button after so many failed attempts
*/

export default class RegistrationInviteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          inviteCardOpacity:0,
          validationStep:'input',
          validationError:false,
          validationErrorDetails:null,
          inviteCodeBoxClass:''
        }
        this.code="000000";
    }

    componentDidMount () {
      if(this.input_one) this.input_one.focus();
    }

    replaceAt = (theString, index, replacement) => {
      return theString.substr(0, index) + replacement+ theString.substr(index + replacement.length);
    }

    handleInviteCodeChange = (e) => {
      let jsonData = { }
      jsonData["inviteCode" +  e.target.id] = e.target.value;
      this.setState(jsonData);
      if(e.target.value == '') return;
      this.code = this.replaceAt(this.code, parseInt(e.target.id)-1, e.target.value)

      if(!this.state.inviteCode1 && e.target.id != 1) { this.input_one.focus(); }
      else if(!this.state.inviteCode2 && e.target.id != 2) {this.input_two.focus();}
      else if(!this.state.inviteCode3 && e.target.id != 3) {this.input_three.focus();}
      else if(!this.state.inviteCode4 && e.target.id != 4) {this.input_four.focus();}
      else if(!this.state.inviteCode5 && e.target.id != 5) {this.input_five.focus();}
      else if(!this.state.inviteCode6 && e.target.id != 6) {this.input_six.focus();}
      else {
        this.setState({validationStep:'validating'});
        this.validateCode(this.code.toUpperCase());
      }
    }

    async validateCode(inviteCode) {
      let resp = await businessManagement.getInvitation(inviteCode)
      console.log('resp', resp)
      if(resp === undefined || resp == null) {
        this.setState({
          validationStep:'input',
          validationError:true,
          validationErrorDetails:'Oops! That code is not valid.',
          inviteCode1:null,inviteCode2:null,inviteCode3:null,inviteCode4:null,inviteCode5:null,inviteCode6:null,
          inviteCodeBoxClass:'animated fadeIn'
        });
        this.input_one.focus();
      } else {
        this.setState({
          validationStep:'success',
          validationError:false,
          inviteCode1:null,inviteCode2:null,inviteCode3:null,inviteCode4:null,inviteCode5:null,inviteCode6:null
        });
        await this.sleep(3000);
        this.props.history.push({
          pathname: '/register/info',
          invite_id: this.code,
          merchant_uuid: resp.assigned_merchant_uuid.S
        })
      }
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    renderSubtitleText = () => {
      if(this.state.validationStep == 'validating') {
        return (
          <div style={styles.textSubtitleStyle}>Validating your code.</div>
        )
      } else if(this.state.validationError) {
        return (
          <div style={styles.textSubtitleErrorStyle}>{this.state.validationErrorDetails}</div>
        )
      } else if(this.state.validationStep == 'input') {
        return (
          <div style={styles.textSubtitleStyle}>Please enter your invitation code below.</div>
        )
      } else {
        return (<div style={styles.textSubtitleErrorStyle}></div>)
      }
    }

    renderInputSection = () => {
      if(this.state.validationStep == 'input') {
        return (
          <div className={this.state.inviteCodeBoxClass} style={{width:'360px', height:'100%', margin:'auto', animationDuration:'0.5s'}}>
            <input type="text" ref={(input) => { this.input_one = input; }} id="1" class="invitation-text-box" maxlength="1" onChange={(e) => {this.handleInviteCodeChange(e)}} />
            <input type="text" ref={(input) => { this.input_two = input; }} id="2" class="invitation-text-box" maxlength="1" onChange={(e) => {this.handleInviteCodeChange(e)}} />
            <input type="text" ref={(input) => { this.input_three = input; }} id="3" class="invitation-text-box" maxlength="1" onChange={(e) => {this.handleInviteCodeChange(e)}} />
            <input type="text" ref={(input) => { this.input_four = input; }} id="4" class="invitation-text-box" maxlength="1" onChange={(e) => {this.handleInviteCodeChange(e)}} />
            <input type="text" ref={(input) => { this.input_five = input; }} id="5" class="invitation-text-box" maxlength="1" onChange={(e) => {this.handleInviteCodeChange(e)}} />
            <input type="text" ref={(input) => { this.input_six = input; }} id="6" class="invitation-text-box" maxlength="1" onChange={(e) => {this.handleInviteCodeChange(e)}} />
          </div>
        )
      } else if(this.state.validationStep == 'validating') {
        return (
          <div style={{width:'50px', height:'50px',}} className="center">
            <RefreshIndicator
              size={50}
              left={0}
              top={0}
              loadingColor="#FF9800"
              status="loading"
              style={{position:'relative'}}
            />
          </div>
        )
      } else if(this.state.validationStep == 'success') {
        return (
          <div style={styles.paperDivStyle}>
            <Paper className="animated fadeIn paper-gradient-background" style={styles.circlePaperStyle} zDepth={3} circle={true}>
              <div style={{fontSize:50, marginTop:50, color:'#fff', animationDuration:'0.5s'}} className="glyphicon glyphicon-ok animated zoomIn"></div>
            </Paper>
            <div style={styles.textSubtitleStyle}>
              <div className="animated fadeIn" style={{animationDelay:'0.5s'}}>Now lets get you going...</div>
            </div>
          </div>
        )
      } else {
        return (<div></div>)
      }
    }

    render() {
        const opacity = this.state.inviteCardOpacity
        const title = this.state.validationStep == 'success' ? 'Success!' : 'Welcome';
        return (
          <div className="animated fadeIn" style={{animationDuration:'0.3s', animationDelay:'0.3s', height:'700px',width:'100%', marginBottom:'auto', marginTop:'auto', marginTop:'200px', marginBottom:50}}>
            <CenteredCard
              height="auto">
              <div className="col-md-12" style={{marginTop:20, height:'auto'}}>
                <div style={styles.textTitleStyle}>{title}</div>
                {this.renderSubtitleText()}
              </div>
              <div className="col-md-12" style={{marginTop:40, height:'auto', padding:10}}>
                {this.renderInputSection()}
              </div>
              <div className="col-md-12" style={{marginTop:40, marginBottom:20, height:'auto'}}>
               {this.state.validationStep != 'success' &&
                  <div className="text-button" style={styles.textStyle}>Want an invite?</div>
                }

              </div>
            </CenteredCard>
          </div>
        );
    }
}

const styles = {
  cardStyle: {
      marginTop:'50px'
  },
  textTitleStyle: {
    fontSize:36,
    width:'100%',
    fontFamily:'Raleway, sans-serif',
    textAlign:'center'
  },
  textSubtitleStyle: {
    fontSize:20,
    width:'100%',
    fontFamily:'Raleway, sans-serif',
    textAlign:'center'
  },
  paperDivStyle : {
    fontSize:20,
    width:'100%',
    fontFamily:'Raleway, sans-serif',
    textAlign:'center',
    marginBottom:30,
    height:'auto'
  },
  textSubtitleErrorStyle: {
    fontSize:20,
    width:'100%',
    fontFamily:'Raleway, sans-serif',
    textAlign:'center',
    color:'#F60A21'
  },
  textStyle: {
    fontSize:16,
    width:'auto',
    fontFamily:'Raleway, sans-serif',
    textAlign:'center',
    padding:'5px'
  },
  circlePaperStyle: {
    height: 150,
    width: 150,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    animationDuration:'0.5s'
  }

};
