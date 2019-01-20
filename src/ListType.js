import React, { Component } from 'react';


import './ListType.scss';
import './_utils.scss';

class ListType extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className="list-wrapper">
                {this.props.articles.map((article, index) => <List 
                    key={index} 
                    index={index}
                    title={article.title} 
                    writtenBy={article.writtenBy} 
                    date={article.publishedAt} 
                    img={article.urlToImage} 
                    clickList={this.props.clickList}
                />)}
            </div>
        );
    }

}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    openModal(e) {
        const index = e.currentTarget.dataset.index;
        this.props.clickList(index);
    }

    render() {
        const bgImage = {
            backgroundImage: 'url(' + this.props.img + '), url(https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)'
        };

        return (
            <div className="list"
                data-index={this.props.index}
                onClick={this.openModal.bind(this)}
            >
                <div>
                    <div style={bgImage} className="list-img"></div>
                </div>
                <div>   
                    <div>{this.props.title}</div>
                    <div>{this.props.writtenBy}</div>
                    <div>{this.props.date}</div>
                </div>
            </div>
        );
    }
}


export default ListType;
