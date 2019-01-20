import React, { Component } from 'react';

import ListType from './ListType';
import CardType from './CardType';
import Modal from './Modal';

import './Results.scss';
import './_utils.scss';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCardType: true,
            isModalOpen: false,
            articleIndexForModal: ''
        };
    }

    toggleType() {
        this.setState(state => {
            return {isCardType: !state.isCardType}
        })
    }

    toggleModalState(index) {
        this.setState(state => {
            return {
                isModalOpen: !state.isModalOpen,
                articleIndexForModal: index
            }
        })
    }

    render() {
        return (
            <section className="Results-wrapper">
                <Setting 
                    clickButton={this.toggleType.bind(this)}
                />

                {this.state.isCardType ? 
                <CardType 
                    articles={this.props.articles} 
                    clickCard={this.toggleModalState.bind(this)} /> : 
                <ListType 
                    articles={this.props.articles} 
                    clickList={this.toggleModalState.bind(this)} 
                />}

                {this.state.isModalOpen && 
                <Modal 
                    clickModal={this.toggleModalState.bind(this)} 
                    articles={this.props.articles[this.state.articleIndexForModal]} 
                />}
            </section>
        );
    }

    componentDidUpdate() {
        // console.log('바꾼후',this.state.isCardType);
        // console.log('모달상태', this.state.isModalOpen);
        // console.log('보여줄인덱스', this.state.articleIndexForModal);
    }
}

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    toggleType() {
        this.props.clickButton();
    }

    render() {
        return (
            <div onClick={this.toggleType.bind(this)}>
                <div>toggle</div>
            </div>
        );
    }
}



export default Results;
