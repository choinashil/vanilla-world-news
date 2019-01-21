import React, { Component } from 'react';

import Results from './Results';
import Headlines from './Headlines';

import './Section.scss';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderResults() {
        return <Results articles={this.props.articles} />;
    }

    renderHeadlines() {
        return (
            <React.Fragment>
                {this.props.headlines.length ? <Headlines headlines = {this.props.headlines} /> : null}
            </React.Fragment>
        );
    }

    closeFilters() {
        this.props.clickSection();
    }

    render() {
        return (
            <section
                className="Section-wrapper"
                onClick={this.closeFilters.bind(this)}
            >
                {this.props.searched ? this.renderResults() : this.renderHeadlines()}
            </section>
        );
    }
}

export default Section;
