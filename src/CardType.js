import React, { Component } from 'react';

import './CardType.scss';

class CardType extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className="Card-wrapper">
                {this.props.articles.map((article, index) => <Card
                    key={index}
                    index={index}
                    article={article}
                    clickCard={this.props.clickCard}
                />)}
            </div>
        );
    }
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    openModal(e) {
        const index = e.currentTarget.dataset.index;
        this.props.clickCard(index);
    }

    render() {
        const article = this.props.article;
        const image = {
            backgroundImage: `url(${article.urlToImage}), url(http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg)`
        };

        return (
            <div className="Card"
                data-index={this.props.index}
                onClick={this.openModal.bind(this)}
            >
                <div>
                    <div style={image} className="Card-img">
                        <div className="Card-content">
                            <div>{article.title}</div>
                            <div>{article.writtenBy}</div>
                            <div>{article.publishedAt}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardType;
