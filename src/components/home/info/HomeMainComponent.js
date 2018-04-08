import React, { Component } from "react";
import TopHomeComponent from './TopHomeComponent'
import SecondHomeComponent from './SecondHomeComponent'
import ThirdHomeComponent from './ThirdHomeComponent'
import BottomHomeComponent from './BottomHomeComponent'

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export default class HomeMainComponent extends Component {

    constructor(props) {
        super(props);
    }

/*
<Link activeClass="active" className="test1" to="second-component" spy={true} smooth={true} duration={500} >Test 1</Link>

<Element name="second-component" className="element">
    <SecondHomeComponent />
</Element>
<Element name="third-component" className="element">
    <ThirdHomeComponent />
</Element>
<Element name="bottom-component" className="element">
    <BottomHomeComponent />
</Element>
*/

    render() {

        return (
            <div>
                <Element name="home-component" className="element">
                    <TopHomeComponent />
                </Element>

            </div>
        );
    }
}
