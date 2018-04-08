import React, { Component } from "react";


export default class SecondHomeComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div ref={node => this.something = node} id="second-home-component" style={{height:'115vh', backgroundColor:'#373536', position:'relative'}}>
                <div className="triangle-bottomright-shadow" >
                </div>
            </div>
        );
    }
}
