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
        return (
            <div className="list"
                data-index={this.props.index}
                onClick={this.openModal.bind(this)}
            >
                <div>{this.props.title}</div>
                <div>{this.props.writtenBy}</div>
                <div>{this.props.date}</div>
            </div>
        );
    }
}


export default ListType;
