import React, { Component } from 'react';

import './CardType.scss';
import './_utils.scss';

class CardType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isModalOpen: false
        };
    }

    // changeModalState() {
    //     this.setState(state => {
    //         return {isModalOpen: true}
    //     })
    // }

    render() {
        return(
            <div className="card-wrapper">
                {this.props.articles.map((article, index) => <Card 
                    key={index} 
                    title={article.title} 
                    source={article.source.name} 
                    author={article.author} 
                    writtenBy={article.writtenBy} 
                    date={article.publishedAt} 
                    img={article.urlToImage} 
                    description={article.description} 
                    content={article.content}
                    clickCard={this.props.clickCard}
                />)}
            </div>
        );
    }

}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    openModal(e) {
        // console.log('클릭함',e.currentTarget);
        // console.log(e.currentTarget);
        this.props.clickCard();
    }

    render() {
        return (
            <div className="card" onClick={this.openModal.bind(this)}>
                <div>
                    <img src={this.props.img} alt="" />
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


export default CardType;
