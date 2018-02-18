import React, { Component } from 'react';
import { observer } from "mobx-react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';



const LoadingCircleComponent = observer(class LoadingCircleComponent extends Component {

    constructor(props) {
      super(props)
      this.state = {
        message:(!this.props.message)?"Loading...":this.props.message
      }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{width:'50px', height:'50px', marginTop:'20%'}} className="center">
                  <RefreshIndicator
                    size={50}
                    left={0}
                    top={0}
                    loadingColor="#FF9800"
                    status="loading"
                    style={{position:'relative'}}
                  />
                </div>
                <div style={{textAlign:'center', fontSize:24, fontStyle:'bold', width:'100%'}}>{this.state.message}</div>
            </MuiThemeProvider>
        );
    }
});

export default LoadingCircleComponent;
