import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { observer } from "mobx-react";
import { withRouter, Redirect } from 'react-router'
import PropTypes from 'prop-types';


const MasterComponent = observer(class MasterComponent extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

    render() {
        return (
            <div>
                This is the home component
            </div>
        );
    }
});

export default MasterComponent;
