import React, { Component } from 'react';
import './Header.scss';
import './_utils.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        // console.log('header에서 this: ',this);
        return (
            <header className="header">
                <Input 
                    inputKeyword={this.props.inputKeyword}
                    selectStartDate={this.props.selectStartDate}
                    selectEndDate={this.props.selectEndDate}
                    pressEnter={this.props.pressEnter}
                    clickSearchIcon={this.props.clickSearchIcon}
                    clickMoreIcon={this.props.clickMoreIcon}
                    showHideFilters={this.props.showHideFilters}
                />
                <Title />
            </header>
        );
    }
}

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBtnTypeMore: true
        };
    }
 
    setKeyword(e) {
        const keyword = e.target.value;
        this.props.inputKeyword(keyword);
    }

    setStartDate(e) {
        const startDate = e.target.value;
        this.props.selectStartDate(startDate);
    }

    setEndDate(e) {
        const endDate = e.target.value;
        this.props.selectEndDate(endDate);
    }

    showAndHideFilters() {
        this.props.clickMoreIcon();
    }

    requestArticleData(e) {
        if (e.nativeEvent.type === 'keypress' && e.key === 'Enter') {
            this.props.pressEnter();
        } else if (e.nativeEvent.type === 'click') {
            this.props.clickSearchIcon();
        }
    }

    render() {
        const today = new Date().toJSON().slice(0, 10);
        // debugger
        return (
            <div className="input">
                <div 
                    className={this.props.showHideFilters ? "filters-btn filters-btn-close" : "filters-btn filters-btn-more"}
                    onClick={this.showAndHideFilters.bind(this)}
                >
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>{this.props.showHideFilters ? "CLOSE" : "MORE"}</div>
                </div>
                <div className="input-wrapper">
                    <input 
                        type="text" 
                        autoFocus
                        onChange={this.setKeyword.bind(this)}
                        onKeyPress={this.requestArticleData.bind(this)}
                    />
                    <i 
                        className="fas fa-search"
                        onClick={this.requestArticleData.bind(this)}
                    />
                </div>
                <div className="date-wrapper">
                    <p>from</p>
                    <input 
                        type="date" 
                        id="from" 
                        onChange={this.setStartDate.bind(this)} 
                    />
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

function Title() {
    return (
        <div className="title">
            <div>VANILLA TIMES</div>
        </div>
    );
}  


export default Header;
