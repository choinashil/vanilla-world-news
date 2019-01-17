import React, { Component } from 'react';
import './Filters.scss';
import './_utils.scss';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="filters">
                <div>
                    <i className="fas fa-angle-double-left"></i>
                </div>
                <div>
                    {this.props.sources.map(source => <SourceList key={source.id} name={source.name} id={source.id} selectSources={this.props.selectSources} />)}
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

    selectSource(e) {
        this.setState({
            selected: !this.state.selected
        })

        this.props.selectSources(this.props.id);
    }

    render() {
        return (
            <div 
                className={this.state.selected ? 'source selected' : 'source'} 
                onClick={this.selectSource.bind(this)}>{this.props.name}
            </div>
        );
    }
}


export default Filters;
