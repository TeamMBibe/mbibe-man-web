import React, { Component } from "react";
import CenteredCard from '../util/CenteredCard'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import businessManagement from '../../../management/dynamodb/BusinessManagement'


export default class RegistrationInfoComponent extends Component {

    constructor(props) {
        super(props);

        console.log('props', this.props)
    }

    componentWillMount() {
      //if(!this.props.location.invite_id || !this.props.location.merchant_uuid) this.props.history.push('/register')
    }

    render() {
        return (
          <div className="animated fadeIn" style={{animationDuration:'0.5s', animationDelay:'0.3s', height:'700px',width:'100%', marginBottom:'auto', marginTop:'auto', marginTop:'200px', marginBottom:50}}>
            <CenteredCard
              height="auto">
              <div className="col-md-12" style={{marginTop:20, height:'auto'}}>
                <div style={styles.textTitleStyle}>Tell Us About You</div>
              </div>
              <div className="col-md-12" style={{marginTop:20, marginBottom:60, height:'auto', padding:10}}>
                <div style={styles.textQuestionStyle}>What is your first name?</div>
                <div style={{width:'360px', height:'100%', margin:'auto', marginTop:10, animationDuration:'0.5s'}}>
                  <TextField
                    fullWidth={true}
                    underlineShow={true}
                    underlineStyle={{borderColor:'#373536'}}
                    style={styles.textFieldTextStyle}
                    inputStyle={styles.textFieldInputStyle}
                  />
                </div>
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
  textQuestionStyle: {
    marginTop:40,
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
  textFieldTextStyle : {
    fontSize:24,
      textAlign:'center',
      fontFamily:'Nunito Sans, sans-serif'
  },
  textFieldInputStyle : {
    textAlign:'center'
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
