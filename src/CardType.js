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
                    index={index}
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
        const index = e.currentTarget.dataset.index;
        this.props.clickCard(index);
    }

    
      
    //   function HelloWorldComponent() {
    //     return <div style={divStyle}>Hello World!</div>;
    //   }

    render() {
        // const bgImage = {
        //     backgroundImage: 'url(' + this.props.img + '), url(http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg)'
        // };

        const image = {
            backgroundImage: `url(${this.props.img}), url(http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg)`
        };

        return (
            <div className="card"
                data-index={this.props.index}
                onClick={this.openModal.bind(this)}
            >
                <div>
                    <div style={image} className="card-img"></div>
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
