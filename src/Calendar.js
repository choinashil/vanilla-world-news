import React, { Component } from 'react';

import './Calender.scss';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: ''
        };
    }

    setToday() {
        const today = new Date().toJSON().slice(0, 10);
        this.setState({today});
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
        return (
            <div className="Calendar-wrapper">
                <div className="Calendar-title">DATE</div>
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
                        max={this.state.today}
                        onChange={this.setEndDate.bind(this)}
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setToday();
    }
}

export default Calendar;
