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
                />
                <Title />
            </header>
        );
    }
}

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
 
    setKeyword(e) {
        const keyword = e.target.value
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

    openFilterBar(e) {
        // console.log(e.currentTarget.parentElement.parentElement.parentElement);
        // this.setState(prevState => {hidden: !prevState.hidden})
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
        return (
            <div className="input">
                <div 
                    className="filters-btn-wrapper"
                    onClick={this.openFilterBar}
                >
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>MORE</div>
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
                        value={today} 
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
            <div>VANILLA WORLD NEWS</div>
        </div>
    );
}  


export default Header;
