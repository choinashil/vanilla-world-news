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
                {/* {this.props.sources.map(source => <SourceList key={source.id} name={source.name} id={source.id} selectSources={this.props.selectSources} />)} */}

                {console.log(this.props.articles)}

                {this.props.articles.map(article => <List key={article.title} title={article.title}/>)}


            </div>
        );
    }

}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="list">
                {this.props.title}
            </div>
        );
    }
}


export default ListType;
