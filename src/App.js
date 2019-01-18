import React, { Component } from 'react';
import Axios from 'axios';

import Filters from './Filters';
import Header from './Header';
import Section from './Section';

import './App.scss';
import './Header.scss';
import './_utils.scss';
// import { try } from 'q';


class App extends Component {
    // new Date().toJSON().slice(0, 10)
    constructor(props) {
        super(props);
        this.state = {
            sources: '',
            keyword: '',
            dateFrom: '',
            dateTo: '',
            selectedSources: [],
            articles: []
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
    }

    setSelectSources(source) {
        const index = this.state.selectedSources.indexOf(source);

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

    setArticles(articles) {
        this.setState(state => {
            return {articles: this.state.articles.concat(articles)};
        })
    }

    async getArticleData() {
        try {
            const data = await this.requestArticleData();
            if (data.data.totalResults) {
                this.setArticles(data.data.articles);
            } else {
                alert('검색 결과가 없습니다');
            }
        } catch(err) {
            console.error(err);
        }
    }

    requestArticleData(page = 1) {
        let requirements = 0;
        let url = `https://newsapi.org/v2/everything?&from=${this.state.dateFrom}&to=${this.state.dateTo}&sortBy=popularity&pageSize=20&page=${page}&apiKey=18f951d779cc4afdb0207b7ae7a583f3`;

        if (this.state.keyword) {
            requirements++;
            url += `&q=${this.state.keyword}`;
        }
        if (this.state.selectedSources.length) {
            requirements++;
            url += `&sources=${this.state.selectedSources.join()}`;
        }

        if (requirements) {
            console.log(url)
            return Axios.get(url);
        } else {
            alert('키워드를 입력하거나 신문사를 선택해주세요');
        }
    }

    renderFilters() {
        return <Filters 
            // hidden={this.state.hiddenFilters} 
            sources={this.state.sources} 
            selectSources={this.setSelectSources.bind(this)} 
        />
    }

    render() {
        // console.log('from', this.state.dateFrom, 'to',this.state.dateTo);
        return (
            <div className="app">
                {this.state.sources ? this.renderFilters() : ''}
                <div className="content">
                    <Header 
                        inputKeyword={this.setKeyword.bind(this)} 
                        selectStartDate={this.setStartDate.bind(this)}
                        selectEndDate={this.setEndDate.bind(this)}
                        pressEnter={this.getArticleData.bind(this)}
                        clickSearchIcon={this.getArticleData.bind(this)}
                    />
                    <Section 
                        articles={this.state.articles}
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
        console.log('state에 저장된 articles', this.state.articles);
    }
}


export default App;

// 18f951d779cc4afdb0207b7ae7a583f3
