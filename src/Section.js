import React, { Component } from 'react';

import Results from './Results';
import Headlines from './Headlines';

import './Section.scss';
import './_utils.scss';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderResults() {
        return <Results articles={this.props.articles} />
    }

    renderHeadlines() {
        return (
            <React.Fragment>
                {this.props.headlines.length ? <Headlines headlines = {this.props.headlines} /> : null }
            </React.Fragment>
        );
    }

    render() {
        return(
            <section className="Section-wrapper">
                {this.props.searched ? this.renderResults() : this.renderHeadlines()}
            </section>
        );
    }
}


export default Section;
