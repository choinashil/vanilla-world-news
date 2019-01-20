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
                <VerticalListHeadline headlines={this.state.verticalHeadline} />
                <HorizontalListHeadline headlines={this.state.horizontalHeadline} />
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
        const bgImage = {
            backgroundImage: `url(${headlines.urlToImage}), url(https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)`
        };

        return (
            <div className="TopHeadline-wrapper">
                <div>
                    <div style={bgImage}></div>
                </div>
                <div>
                    {headlines.title}
                </div>
                <div>
                    <div>
                        <div>
                            {headlines.source ? headlines.source.name : headlines.author}
                        </div>
                        <div>{headlines.publishedAt}</div>
                    </div>
                    <div>
                        <div>{headlines.description}</div>
                    </div>
                </div>
            </div> 
        );
    }
}

class VerticalListHeadline extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className="VerticalListHeadline-wrapper">

            </div>
        );
    }
}

class HorizontalListHeadline extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return(
            <div className="HorizontalListHeadline-wrapper">

            </div>
        );
    }
}

export default Headlines;

