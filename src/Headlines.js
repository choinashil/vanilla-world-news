import React, { Component } from 'react';

import './Headlines.scss';
import './_utils.scss';

class Headlines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topHeadline: [],
            verticalHeadline: [],
            horizontalHeadline: []
        };
    }

    setHeadlines() {
        const headlines = this.props.headlines;
        this.setState({
            topHeadline: headlines[0],
            verticalHeadline: headlines.slice(1, 6),
            horizontalHeadline: headlines.slice(6)
        })
    }

    render() {
        return(
            <div className="Headlines-wrapper">
                <TopHeadline headlines={this.state.topHeadline} />
                <VerticalHeadline headlines={this.state.verticalHeadline} />
                <HorizontalHeadline headlines={this.state.horizontalHeadline} />
            </div>
        );
    }

    componentDidMount() {
        // console.log('didmount');
        this.setHeadlines();
    }

    componentDidUpdate() {
        // console.log('탑',this.state.topHeadline);
        // console.log('두번째',this.state.verticalHeadline);
        // console.log('세번째',this.state.horizontalHeadline);
    }
}

class TopHeadline extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const headlines = this.props.headlines;
        console.log('탑뉴스', headlines);
        const image = {
            backgroundImage: `url(${headlines.urlToImage}), url(http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg)`
        };

        return (
            <div className="TopHeadline-wrapper">
                <div>
                    <div style={image} className="img"></div>
                </div>
                <div>
                    <div className="title">{headlines.title}</div>
                </div>
                <div>
                    <div>
                        <div className="source">
                            {headlines.source ? headlines.source.name : headlines.author}
                        </div>
                        <div className="date">{headlines.publishedAt}</div>
                    </div>
                    <div>
                        <div className="description">{headlines.description}</div>
                    </div>
                </div>
            </div> 
        );
    }
}

class VerticalHeadline extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const headlines = this.props.headlines;

        return(
            <div className="VerticalHeadline-wrapper">
                <div className="VH-sub-title">TOP ARTICLES</div>

                {headlines.length ? 
                    headlines.map((headline, index) => <VerticalHeadlineList
                        key={index}
                        headline={headline}
                    />)
                : null}

            </div>
        );
    }
}

function VerticalHeadlineList(props) {
    const headline = props.headline;
    const bgImage = {backgroundImage: `url(${headline.urlToImage}), url(https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)`}

    return (
        <div className="VerticalHeadlineList">
            <div>
                <div className="title">{headline.title}</div>
                <div className="date">{headline.source.name}</div>
            </div>
            <div>
                <div style={bgImage} className="img"></div>
            </div>
        </div>
    );
}

class HorizontalHeadline extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return(
            <div className="HorizontalHeadline-wrapper">

            </div>
        );
    }
}

export default Headlines;

