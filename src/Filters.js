import React, { Component } from 'react';

import Calendar from './Calendar';

import './Filters.scss';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={this.props.state ? "Filters Filters-show" : "Filters Filters-hide"}>
                <Calendar
                    selectStartDate={this.props.selectStartDate}
                    selectEndDate={this.props.selectEndDate}
                />
                <div className="Source-wrapper">
                    <div className="Source-title">PUBLISHER</div>
                    <div>
                        {this.props.sources.map(source => <SourceList
                            key={source.id}
                            id={source.id}
                            name={source.name}
                            selectSources={this.props.selectSources}
                            selectedSources={this.props.selectedSources}
                        />)}
                    </div>
                </div>
            </div>
        );
    }
}

class SourceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }

    selectSource() {
        if (this.props.selectedSources.length < 20) {
            this.setState({selected: !this.state.selected});
        } else {
            this.setState({selected: false});
        }
        this.props.selectSources(this.props.id);
    }

    render() {
        return (
            <div
                className={this.state.selected ? 'Source Source-selected' : 'Source'}
                data-id={this.props.id}
                onClick={this.selectSource.bind(this)}
            >
                {this.props.name}
            </div>
        );
    }
}

export default Filters;
