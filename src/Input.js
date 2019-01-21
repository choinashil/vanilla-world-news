import React, { Component } from 'react';

import './Input.scss';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBtnTypeMore: true,
            isInputOpen: false,
            today: '',
            keyword: 'google'
        };
    }

    showAndHideFilters() {
        this.props.clickMoreIcon();
    }

    setKeyword(e) {
        this.setState({keyword: e.target.value});
    }

    requestArticleData(e) {
        if (e.keyCode === 13) {
            this.props.pressEnter(this.state.keyword);
        }
    }

    openInput() {
        this.setState(state => {
            return {
                isInputOpen: !state.isInputOpen
            };
        });
    }

    setToday() {
        const monthArr = ['JAN', 'FEB', 'MAR', "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const d = new Date();
        const today = `${dayArr[d.getDay()]}, ${d.getDate()} ${monthArr[d.getMonth()]} ${d.getFullYear()}`;
        this.setState({today});
    }

    render() {
        return (
            <div className="Input">
                <div>
                    <div
                        className={this.props.showHideFilters ? "filters-btn filters-btn-close" : "filters-btn filters-btn-more"}
                        onClick={this.showAndHideFilters.bind(this)}
                    >
                        <div className="more-btn">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="Input-wrapper">
                        <i
                            className="fas fa-search"
                            onClick={this.openInput.bind(this)}
                        />
                        <div className={this.state.isInputOpen ? 'Input Input-close' : 'Input Input-open'}>
                            <input
                                type="text"
                                autoFocus
                                onChange={this.setKeyword.bind(this)}
                                onKeyDown={this.requestArticleData.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <div className="today">{this.state.today}</div>
            </div>
        );
    }

    componentDidMount() {
        this.setToday();
    }
}

export default Input;
