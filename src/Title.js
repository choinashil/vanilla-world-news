import React, { Component } from 'react';

import './Title.scss';

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    showHeadlines() {
        this.props.clickTitle();
    }

    render() {
        return (
            <div className="Title">
                <div onClick={this.showHeadlines.bind(this)}>
                    VANILLA TIMES
                </div>
                <div>
                    <img src="https://static.thenounproject.com/png/429172-200.png" alt="" />
                    <div>NEWSPAPER / MAGAZINE / PUBLISHER</div>
                    <img src="https://static.thenounproject.com/png/429172-200.png" alt="" />
                </div>
            </div>
        );
    }
}

export default Title;
