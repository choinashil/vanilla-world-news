import React, { Component } from 'react';
import Axios from 'axios';

import Filters from './Filters';
import Header from './Header';
import Section from './Section';
import LoadingIcon from './LoadingIcon';

import './App.scss';
import './Header.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            dateFrom: '',
            dateTo: '',
            total: '',
            selectedCategory: '',
            allSources: [],
            selectedSources: [],
            headlines: [],
            articles: [],
            dataRequestCount: 0,
            isRequesting: false,
            isFiltersOpen: false,
            searched: false
        };
    }

    async getHeadlinesData(category) {
        try {
            const rawData = await this.requestHeadlinesData(category);
            const modifiedData = this.modifyRawData(rawData);
            this.setState({
                isRequesting: false,
                headlines: modifiedData.data.articles
            });
        } catch(err) {
            console.error(err);
        }
    }

    requestHeadlinesData(category = 'general') {
        if (this.state.isRequesting) return;

        this.setState({
            isRequesting: true,
            headlines: []
        });

        return Axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=18f951d779cc4afdb0207b7ae7a583f3`);
    }

    modifyRawData(data) {
        if (data) {
            var articles = data.data.articles;
            articles.map(article => {
                if (article.author) {
                    article.writtenBy = `${article.author} / ${article.source.name}`;
                } else {
                    article.writtenBy = article.source.name;
                }
                if (article.content) {
                    article.content = article.content.replace(/. \[\+\d+[ ]?[a-z]+\]/g, ' ');
                }
                if (!article.urlToImage) {
                    article.urlToImage = 'http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg';
                }
                article.publishedAt = article.publishedAt.slice(0, 10).replace(/-/g, '. ');
            });
            return data;
        }
    }

    requestSourceData() {
        Axios.get('https://newsapi.org/v2/sources?apiKey=18f951d779cc4afdb0207b7ae7a583f3')
        .then(data => this.setState({allSources: data.data.sources}));
    }

    setSelectSources(source) {
        const index = this.state.selectedSources.indexOf(source);
        if (index === -1) {
            this.setState(state => {
                if (state.selectedSources.length < 20) {
                    return {selectedSources: [...this.state.selectedSources, source]};
                } else {
                    alert('20개까지만 선택할 수 있습니다!');
                }
            });
        } else {
            this.setState(state => {
                let selectedSources = state.selectedSources;
                selectedSources.splice(index, 1);
                return {selectedSources};
            });
        }
    }

    setCategory(category) {
        this.setState({
            selectedCategory: category,
            searched: false
        });
        this.getHeadlinesData(category);
    }

    setStartDate(date) {
        this.setState({dateFrom: date});
    }

    setEndDate(date) {
        this.setState({dateTo: date});
    }

    toggleFiltersState() {
        this.setState(state => {
            return {
                isFiltersOpen: !state.isFiltersOpen
            };
        });
    }

    closeFilters() {
        this.setState({isFiltersOpen: false});
    }

    showHeadlines() {
        this.setState({searched: false});
        this.getHeadlinesData();
    }

    showSearchedArticle(keyword) {
        this.setState({
            keyword,
            articles: [],
            total: '',
            dataRequestCount: 0,
            isFiltersOpen: false,
            searched: true,
            selectedCategory: 'general'
        }, this.getArticleData);
    }

    async getArticleData(page) {
        try {
            const rawData = await this.requestArticleData(page);
            const modifiedData = this.modifyRawData(rawData);
            this.setState({isRequesting: false});
            if (modifiedData.data.totalResults) {
                this.setArticleData(modifiedData);
            } else {
                alert('검색 결과가 없습니다');
            }
        } catch(err) {
            console.error(err);
        }
    }

    requestArticleData(page = 1) {
        if (this.state.isRequesting) return;

        this.setState(state => {
            return {
                dataRequestCount: state.dataRequestCount + 1,
                isRequesting: true
            };
        });

        let requirements = 0;
        let url = `https://newsapi.org/v2/everything?&from=${this.state.dateFrom}&to=${this.state.dateTo}&sortBy=popularity&pageSize=30&page=${page}&apiKey=18f951d779cc4afdb0207b7ae7a583f3`;

        if (this.state.keyword) {
            requirements++;
            url += `&q=${this.state.keyword}`;
        }
        if (this.state.selectedSources.length) {
            requirements++;
            url += `&sources=${this.state.selectedSources.join()}`;
        }

        if (requirements) {
            return Axios.get(url);
        } else {
            alert('키워드를 입력하거나 신문사를 선택해주세요');
        }
    }

    setArticleData(data) {
        this.setState(state => {
            return {
                total: data.data.totalResults,
                articles: state.articles.concat(data.data.articles)
            };
        });
    }

    handleOnScroll() {
        if (!this.state.searched) return;
        if (window.scrollY > 10) {
            this.setState({isFiltersOpen: false})
        }
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
            if (this.state.total - (this.state.dataRequestCount * 30) > 0) {
                this.getArticleData(this.state.dataRequestCount + 1);
            } else {
                alert('더 이상 결과가 없습니다');
            }
        }
    }

    renderFilters() {
        return <Filters
            sources={this.state.allSources}
            state={this.state.isFiltersOpen}
            selectedSources={this.state.selectedSources}
            selectSources={this.setSelectSources.bind(this)}
            selectStartDate={this.setStartDate.bind(this)}
            selectEndDate={this.setEndDate.bind(this)}
        />
    }

    render() {
        return (
            <div className="App">
                {this.state.allSources && this.renderFilters()}
                <div className={this.state.isFiltersOpen ? "content content-narrow" : "content content-wide"}>
                    <Header
                        showHideFilters={this.state.isFiltersOpen}
                        pressEnter={this.showSearchedArticle.bind(this)}
                        clickMoreIcon={this.toggleFiltersState.bind(this)}
                        clickTitle={this.showHeadlines.bind(this)}
                        clickCategory={this.setCategory.bind(this)}
                    />
                    <Section
                        searched={this.state.searched}
                        articles={this.state.articles}
                        headlines={this.state.headlines}
                        isRequesting={this.state.isRequesting}
                        clickSection={this.closeFilters.bind(this)}

                    />
                </div>
                {this.state.isRequesting && <LoadingIcon />}
            </div>
        );
    }

    componentDidMount() {
        this.getHeadlinesData();
        this.requestSourceData();
        window.addEventListener('scroll', this.handleOnScroll.bind(this));
    }

    componentWillUnmount() {
        window.RemoveEventListener('scroll', this.handleOnScroll.bind(this));
    }
}

export default App;
