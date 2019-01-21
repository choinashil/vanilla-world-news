import React, { Component } from 'react';

import ListType from './ListType';
import CardType from './CardType';
import Modal from './Modal';

import './Results.scss';

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
            return {isCardType: !state.isCardType};
        });
    }

    toggleModalState(index) {
        this.setState(state => {
            return {
                isModalOpen: !state.isModalOpen,
                articleIndexForModal: index
            };
        });
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
                    articles={this.props.articles[this.state.articleIndexForModal]}
                    clickModal={this.toggleModalState.bind(this)}
                />}
            </section>
        );
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
                <div>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        );
    }
}

export default Results;
