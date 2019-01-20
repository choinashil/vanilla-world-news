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
            <div 
                className={this.props.state ? "Filters Filters-show" : "Filters Filters-hide" }
            >   
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
                        />)}
                    </div>
                </div>
            </div>
        );
    }
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    setStartDate(e) {
        const startDate = e.target.value;
        this.props.selectStartDate(startDate);
    }

    setEndDate(e) {
        const endDate = e.target.value;
        this.props.selectEndDate(endDate);
    }

    render() {
        const today = new Date().toJSON().slice(0, 10);

        return (
            <div className="Calendar-wrapper">
                <div>DATE</div>
                <div className="Calendar-from">
                    <p>from</p>
                    <input 
                        type="date" 
                        id="from" 
                        onChange={this.setStartDate.bind(this)} 
                    />
                </div>
                <div className="Calendar-to">
                    <p>to</p>
                    <input 
                        type="date" 
                        id="to" 
                        max={today} 
                        // value={today} 
                        onChange={this.setEndDate.bind(this)} 
                    />
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
        this.setState({
            selected: !this.state.selected
        })

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
