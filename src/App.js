import React, { Component } from 'react';
import Axios from 'axios';

import './App.scss';
// import Header from './Header';
import Filters from './Filters';
import './Header.scss';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: ''
        };
    }

    componentDidMount() {
        Axios.get('https://newsapi.org/v2/sources?apiKey=18f951d779cc4afdb0207b7ae7a583f3')
        .then(data => {
            this.setState({
                sources: data.data.sources
            })
        });
    }

    _renderFilters = () => {
        return <Filters sources={this.state.sources} />
    }

    render() {
        return (
            <div>
            <Header />
            {this.state.sources ? this._renderFilters() : 'Loading'}
            </div>
        );
    }
}





class Header extends Component {
    render() {
        return (
            <div className="header">
                <Input />
                <Title />
            </div>
        );
    }
}

class Input extends Component {

  // _getData = async(e) => {
  //   if (e.keyCode === 13) {
  //     console.log('requestData:' , e.target.value);
  //     e.target.value = '';
  //     const data = await this._requestData();
  //     console.log('data: ',data);
  //   }
  // }

  // _requestData = () => {
  //   return Axios.get('https://newsapi.org/v2/sources?apiKey=18f951d779cc4afdb0207b7ae7a583f3');
  // }
  

    render() {
        return (
            <div>
                <div className="filters-btn">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <input type="text" onKeyDown={this._getData} autoFocus />
            </div>
        );
    }
}

function Title() {
  return (
      <div>
          <div>Vanilla World News</div>
      </div>
  );
}  


export default App;

// 18f951d779cc4afdb0207b7ae7a583f3
