import React, { Component } from 'react';
import './Filters.scss';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="filters">
                {this.props.sources.map(source => <SourceList key={source.id} name={source.name} />)}
            </div>
        );
    }
}

class SourceList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _selectSource(e) {
        console.log(e.target);
        e.target.classList.add('selected');
    }

    render() {
        return (
            <div onClick={this._selectSource}>{this.props.name}</div>
        );
    }
}

// function Filters({sources}) {
//     return (
//         <div className="filters">
//             {sources.map(source => <SourceList key={source.id} name={source.name} />)}
//         </div>
//     );
// }
  
// function SourceList({name}) {
//     return (
//         <div>{name}</div>
//     );
// }





export default Filters;
