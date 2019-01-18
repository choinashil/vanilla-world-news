import React, { Component } from 'react';

import ListType from './ListType';
import CardType from './CardType';
import Modal from './Modal';

import './Section.scss';
import './_utils.scss';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCardType: true,
            isModalOpen: false
        };
    }

    toggleType() {
        this.setState(state => {
            return {isCardType: !state.isCardType}
        })
    }

    toggleModalState() {
        this.setState(state => {
            return {isModalOpen: !state.isModalOpen}
        })
    }

    render() {
        return (
            <section className="section">
                <Setting 
                    clickButton={this.toggleType.bind(this)}
                />

                {this.state.isCardType ? <CardType articles={this.props.articles} clickCard={this.toggleModalState.bind(this)}
/> : <ListType articles={this.props.articles} />}

                {this.state.isModalOpen && <Modal clickModal={this.toggleModalState.bind(this)}/>}
            </section>
        );
    }

    componentDidUpdate() {
        // console.log('바꾼후',this.state.isCardType);
        console.log('모달상태', this.state.isModalOpen);

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



export default Section;
