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
                    pressEnter={this.props.pressEnter}
                    // clickSearchIcon={this.props.clickSearchIcon}
                    clickMoreIcon={this.props.clickMoreIcon}
                    showHideFilters={this.props.showHideFilters}
                />
                <Title 
                    clickTitle={this.props.clickTitle}
                />
                <Category 
                    clickCategory={this.props.clickCategory}
                />
            </header>
        );
    }
}

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBtnTypeMore: true,
            isInputOpen: false,
            today: ''
        };
    }
 
    setKeyword(e) {
        const keyword = e.target.value;
        this.props.inputKeyword(keyword);
    }

    showAndHideFilters() {
        this.props.clickMoreIcon();
    }

    requestArticleData(e) {
        if (e.keyCode === 13) {
            this.props.pressEnter(); 
        }
    }

    openInput() {
        this.setState(state => {
            return {
                isInputOpen: !state.isInputOpen
            };
        })
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
            <div className="input">

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
                        {/* <div>{this.props.showHideFilters ? "CLOSE" : "MORE"}</div> */}
                    </div>
                    <div className="input-wrapper">
                        <i 
                            className="fas fa-search"
                            onClick={this.openInput.bind(this)}
                        />
                        <div className={this.state.isInputOpen ? 'input input-close' : 'input input-open'}>
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


class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    showHeadlines() {
        this.props.clickTitle();
    }

    render() {
        return (
            <div className="Title">
                <div
                    onClick={this.showHeadlines.bind(this)}
                >
                    VANILLA TIMES
                </div>
                <div>
                    <img src="https://static.thenounproject.com/png/429172-200.png" alt="" />
                    <div>NEWSPAPER / MAGAZINE / PUBLISHER</div>
                    <img src="https://static.thenounproject.com/png/429172-200.png" alt="" />
                </div>

            </div>
        );
    }
}

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    changeCategory(e) {
        const category = e.target.textContent.toLowerCase();
        this.props.clickCategory(category);
    }

    render() {
        const categories = ['BUSINESS', 'ENTERTAINMENT', 'SPORTS', 'SCIENCE', 'TECHNOLOGY', 'HEALTH'];

        return(
            <div className="Category-wrapper">
                <div>
                    {categories.map((category) => <div 
                        key={category}
                        className="Category"
                        onClick={this.changeCategory.bind(this)}
                    >
                        {category}
                    </div>)}
                </div>
            </div>
        );
    }
}


export default Header;
