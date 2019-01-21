import React, { Component } from 'react';

import './ListType.scss';

class ListType extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="List-wrapper">
                {this.props.articles.map((article, index) => <List
                    key={index}
                    index={index}
                    article={article}
                    clickList={this.props.clickList}
                />)}
            </div>
        );
    }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    openModal(e) {
        const index = e.currentTarget.dataset.index;
        this.props.clickList(index);
    }

    render() {
        const article = this.props.article;
        const image = {
            backgroundImage: `url(${article.urlToImage}), url(http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg)`
        };

        return (
            <div className="List"
                data-index={this.props.index}
                onClick={this.openModal.bind(this)}
            >
                <div>
                    <div style={image} className="List-img"></div>
                </div>
                <div>
                    <div>{article.title}</div>
                    <div>{article.writtenBy}</div>
                    <div>{article.date}</div>
                </div>
            </div>
        );
    }
}

export default ListType;
