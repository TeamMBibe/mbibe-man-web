import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import HeaderComponent from './HeaderComponent'
import businessManagement from '../../management/dynamodb/BusinessManagement'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AddMemberComponent from '../actions/AddMemberComponent'
import LoadingCircleComponent from '../util/LoadingCircleComponent'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


const MembersViewComponent = observer(class MembersViewComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showAddBox:false,
    }
  }

  async componentWillMount() {
    if(!this.props.location.business_uuid) {
      this.props.history.push('/merchant')
    } else if(!this.props.location.business_info) {
      this.props.history.push({
        pathname: '/merchant/business-view',
        search: '?uuid=' + this.props.location.business_uuid
      })
    } else {
      let members = await businessManagement.getBusinessMembers(this.props.location.business_uuid)
      this.setState({
        businessUuid: this.props.location.business_uuid,
        businessMembers: members,
        businessInfo: this.props.location.business_info
      })
    }
  }

  handleAddButtonClick = () => {
    this.setState({showAddBox:!this.state.showAddBox})
  }

  handleClose = async event => {
    let members = await businessManagement.getBusinessMembers(this.state.businessUuid)
    this.setState({businessMembers: members, showAddBox:false})
  }

  renderMembers = () => {
    console.log('mems', this.state.businessMembers)
    return this.state.businessMembers.map(item => {
      return(
        <TableRow>
          <TableRowColumn>{item}</TableRowColumn>
          <TableRowColumn>John Smith</TableRowColumn>
          <TableRowColumn>Employed</TableRowColumn>
        </TableRow>
      )
    })
  }

    render() {
        return (
            <div>
              <MuiThemeProvider>
                {!this.state.businessMembers &&
                  <LoadingCircleComponent message="Loading Members" />
                }

                {this.state.businessMembers &&
                  <div className={this.state.showAddBox ? "blur" : ''}>
                    <div className="col-md-12" style={{marginTop:10, marginBottom:10}}>
                      <RaisedButton
                          label="Add"
                          onClick={this.handleAddButtonClick}
                          backgroundColor="#55AA55"
                          style={{marginRight:10}}/>
                      <RaisedButton
                          label="Edit"
                          onClick={this.handleManageMembersOnClick}
                          backgroundColor="#407F7F"
                          style={{marginRight:10}}/>
                      <RaisedButton
                          label="Remove"
                          onClick={this.handleManageMembersOnClick}
                          backgroundColor="#D46A6A"
                          style={{marginRight:10}}/>
                      <RaisedButton
                          label="Attach Database"
                          onClick={this.handleManageMembersOnClick}
                          backgroundColor="#407F7F"
                          style={{marginLeft:40}}/>
                    </div>
                    <div className="col-md-12">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {this.renderMembers()}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                }

                {this.state.showAddBox &&
                  <div style={{position:'absolute', top:50, left:0, height:'auto'}}>
                    <AddMemberComponent business_uuid={this.state.businessUuid} closeAction={this.handleClose} />
                  </div>
                }
              </MuiThemeProvider>
            </div>
        );
    }
});

const styles = {

  paperStyle: {
    height: 'auto',
    minHeight:400,
    width: '100%',
    marginTop: 50,
    textAlign: 'center',
    display: 'inline-block',
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

export default MembersViewComponent;
