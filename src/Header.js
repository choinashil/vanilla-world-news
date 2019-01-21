import React, { Component } from 'react';

import Input from './Input';
import Title from './Title';
import Category from './Category';

import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <header className="Header">
                <Input
                    pressEnter={this.props.pressEnter}
                    clickMoreIcon={this.props.clickMoreIcon}
                    showHideFilters={this.props.showHideFilters}
                />
                <Title clickTitle={this.props.clickTitle} />
                <Category clickCategory={this.props.clickCategory} />
            </header>
        );
    }
}

export default Header;
