import React, { Component } from 'react';
import Axios from 'axios';

import Filters from './Filters';
import Header from './Header';
import Section from './Section';

import './App.scss';
import './Header.scss';
import './_utils.scss';


class App extends Component {
    // new Date().toJSON().slice(0, 10)
    constructor(props) {
        super(props);
        this.state = {
            sources: '',
            keyword: 'surfing',
            dateFrom: '',
            dateTo: '',
            selectedSources: [],
            headlines: [],
            articles: [],
            total: '',
            isRequesting: false,
            dataRequestCount: 0,
            isFiltersOpen: false,
            searched: false, // default false
            selectedCategory: ''
        };
    }

    async getHeadlinesData(category) {
        try {
            const rawData = await this.requestHeadlinesData(category);
            const modifiedData = this.modifyRawData(rawData);
            this.setState(state => {
                return {
                    isRequesting: false,
                    headlines: state.headlines.concat(modifiedData.data.articles)
                };
            })
        } catch(err) {
            console.error(err);
        }
    }


    requestHeadlinesData(category = 'general') {
        if (this.state.isRequesting) return;

        this.setState({isRequesting: true});
        this.setState({headlines: []})
        return Axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=18f951d779cc4afdb0207b7ae7a583f3`)

    }

    requestSourceData() {
        Axios.get('https://newsapi.org/v2/sources?apiKey=18f951d779cc4afdb0207b7ae7a583f3')
        .then(data => {
            this.setState({
                sources: data.data.sources
            })
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
                selectedSources.splice(index, 1);
                return {selectedSources};
            })
        }
    }

    setCategory(category) {
        this.setState({
            selectedCategory: category,
            searched: false
        });
        this.getHeadlinesData(category);
    }

    setKeyword(keyword) {
        this.setState({keyword});
    }

    setStartDate(date) {
        this.setState({dateFrom: date})
    }

    setEndDate(date) {
        this.setState({dateTo: date})
    }

    toggleSourcesState() {
        this.setState(state => {
            return {
                isFiltersOpen: !state.isFiltersOpen
            };
        })
    }

    showHeadlines() {
        this.setState({searched: false})
        this.getHeadlinesData();
    }

    showSearchedArticle() {
        this.resetPrevArticleData();
        this.getArticleData();
        this.setState(state => {
            return {
                isFiltersOpen: false,
                searched: true,
                selectedCategory: 'general'
            }
        })
    }

    resetPrevArticleData() {
        this.setState({
            articles: [],
            total: '',
            dataRequestCount: 0
        })
    }

    async getArticleData(page) {
        try {
            const rawData = await this.requestArticleData(page);
            // console.log(rawData);
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
        })

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

        console.log('asdf',url);
        if (requirements) {
            return Axios.get(url);
        } else {
            alert('키워드를 입력하거나 신문사를 선택해주세요');
        }
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

                // if (!article.content) {
                //     article.content = '';
                // }
                article.publishedAt = article.publishedAt.slice(0, 10).replace(/-/g, '. ');
            });
            return data;    
        }
    }

    setArticleData(data) {
        this.setState(state => {
            return {
                total: data.data.totalResults,
                articles: state.articles.concat(data.data.articles)
            };
        })
    }

    handleOnScroll() {
        if (this.state.searched) {
            if (window.scrollY > 10) {
                this.setState({isFiltersOpen: false})
            }
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000)) {
                if (this.state.total - (this.state.dataRequestCount * 30) > 0) {
                    this.getArticleData(this.state.dataRequestCount + 1);
                } else {
                    console.log('결과없음');
                }
            }        
        }
    }

    renderFilters() {
        return <Filters 
            // hidden={this.state.hiddenFilters} 
            sources={this.state.sources} 
            selectSources={this.setSelectSources.bind(this)}
            state={this.state.isFiltersOpen}
            selectStartDate={this.setStartDate.bind(this)}
            selectEndDate={this.setEndDate.bind(this)}

        />
    }

    render() {
        return (
            <div className="app">
                {this.state.sources ? this.renderFilters() : ''}
                <div className={this.state.isFiltersOpen ? "content content-narrow" : "content content-wide"}>
                    <Header 
                        inputKeyword={this.setKeyword.bind(this)} 
                        pressEnter={this.showSearchedArticle.bind(this)}
                        // clickSearchIcon={this.showSearchedArticle.bind(this)}
                        clickMoreIcon={this.toggleSourcesState.bind(this)}
                        showHideFilters={this.state.isFiltersOpen}
                        clickTitle={this.showHeadlines.bind(this)}
                        clickCategory={this.setCategory.bind(this)}
                    />
                    <Section 
                        searched={this.state.searched}
                        articles={this.state.articles}
                        headlines={this.state.headlines}
                        isRequesting={this.state.isRequesting}
                    />  
                </div>
                {this.state.isRequesting && <LoadingIcon />}
                
            </div>
        );
    }

    componentDidMount() {
        this.requestSourceData();
        this.getHeadlinesData();
        window.addEventListener('scroll', this.handleOnScroll.bind(this));
    }

    componentDidUpdate() {
        console.log('요청중?',this.state.isRequesting);
        console.log('데이터요청', this.state.dataRequestCount)
    }

    componentWillUnmount() {
        window.RemoveEventListener('scroll', this.handleOnScroll.bind(this));
    }
}


function LoadingIcon() {
    return(
        <div className="Loading-icon">
            <img src="https://pngimage.net/wp-content/uploads/2018/05/buffering-png-3.png" alt="loading" />
        </div>
    );
}

export default App;

