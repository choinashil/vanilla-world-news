import React, { Component } from 'react';
import Axios from 'axios';

import './App.scss';
import Header from './Header';
import Filters from './Filters';
import './Header.scss';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: '',
            keyword: '',
            dateFrom: '2019-01-03',
            dateTo: new Date().toJSON().slice(0, 10),
            selectedSources: []
        };
    }

    componentDidMount() {
        this.requestSourceData();
    }

    requestSourceData() {
        Axios.get('https://newsapi.org/v2/sources?apiKey=18f951d779cc4afdb0207b7ae7a583f3')
        .then(data => {
            this.setState({
                sources: data.data.sources
            })
        });
    }
    
    setKeyword(keyword) {
        this.setState({
            keyword
        });
        // this.requestData(keyword);
    }

    setSelectSources(source) {
        const index = this.state.selectedSources.indexOf(source);
        // console.log('없으면 -1, 있으면 인덱스', index);

        if (index === -1) {
            this.setState(state => {
                if (state.selectedSources.length < 20) {
                    return {selectedSources: [...this.state.selectedSources, source]}
                } else {
                    alert('20개까지만 선택할 수 있습니다!');
                }
            })
        } else {
            this.setState(state => {
                let selectedSources = state.selectedSources;
                // let selectedSources = [...state.selectedSources]; 
                selectedSources.splice(index, 1);
                return {selectedSources};
            })
        }
    }

    setStartDate(date) {
        this.setState({
            dateFrom: date
        })
    }

    setEndDate(date) {
        this.setState({
            dateTo: date
        })
    }

    // requestData(keyword) {
    //     Axios.get(`https://newsapi.org/v2/everything?q=${keyword}&from=2019-12-12&to=2019-01-15&sortBy=popularity&apiKey=18f951d779cc4afdb0207b7ae7a583f3`)
    //     .then(data => console.log(data));
    // }

    getArticleData() {
        const articles = this.requestArticleData();
        console.log(articles);
    }

    async requestArticleData() {
        if (this.state.keyword && this.state.selectedSources.length) {
            return await Axios.get(`https://newsapi.org/v2/everything?q=${this.state.keyword}&sources=${this.state.selectedSources.join()}&from=${this.state.dateFrom}&to=${this.state.dateTo}&sortBy=popularity&pageSize=20&page={1}&apiKey=18f951d779cc4afdb0207b7ae7a583f3`);
        } else {
            if (this.state.keyword) {
                return await Axios.get(`https://newsapi.org/v2/everything?q=${this.state.keyword}&from=${this.state.dateFrom}&to=${this.state.dateTo}&sortBy=popularity&pageSize=20&page={1}&apiKey=18f951d779cc4afdb0207b7ae7a583f3`);

            } else if (this.state.selectedSources.length) {
                return await Axios.get(`https://newsapi.org/v2/everything?sources=${this.state.selectedSources.join()}&from=${this.state.dateFrom}&to=${this.state.dateTo}&sortBy=popularity&pageSize=20&page={1}&apiKey=18f951d779cc4afdb0207b7ae7a583f3`);

            } else {
                alert('키워드를 입력하거나 신문사를 선택해주세요');
            }
        }
    }

    renderFilters() {
        return <Filters 
            hidden={this.state.hiddenFilters} 
            sources={this.state.sources} 
            selectSources={this.setSelectSources.bind(this)} 
        />
    }

    render() {
        // console.log('from', this.state.dateFrom, 'to',this.state.dateTo);
        return (
            <div className="app">
                {this.state.sources ? this.renderFilters() : 'Loading'}
                <div className="content">
                    <Header 
                        inputKeyword={this.setKeyword.bind(this)} 
                        selectStartDate={this.setStartDate.bind(this)}
                        selectEndDate={this.setEndDate.bind(this)}
                        pressEnter={this.getArticleData.bind(this)}
                        clickSearchIcon={this.getArticleData.bind(this)}
                    />
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        // console.log('리렌더된 결과', this.state.selectedSources);
        // console.log('키워드', this.state.keyword);
        // console.log('이 날짜부터',this.state.dateFrom);
        // console.log('이 날짜까지',this.state.dateTo);
    }
}


export default App;

// 18f951d779cc4afdb0207b7ae7a583f3
