import React, { Component } from 'react';

import ListType from './ListType';

import './Section.scss';
import './_utils.scss';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className="section">
                <ListType articles={this.props.articles}/>
            </section>
        );
    }
}



export default Section;
