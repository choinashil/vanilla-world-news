import React, { Component } from 'react';

import './Modal.scss';
import './_utils.scss';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
    }

    closeModal() {
        setTimeout(() => this.props.clickModal(), 500);
        this.setState(state => {
            return {isModalOpen: !state.isModalOpen}
        })
    }

    render() {
        return(
            <React.Fragment>
                <div 
                    className={this.state.isModalOpen ? "modal-background modal-background-fadeout" : "modal-background"}
                    onClick={this.closeModal.bind(this)}
                >
                </div>
                <div className={this.state.isModalOpen ? "modal modal-down" : "modal modal-up"}>
                    <div>
                        <img src={this.props.articles.urlToImage} alt={this.props.articles.title} />
                    </div>
                    <div>
                        <div>{this.props.articles.title}</div>
                        <div>{this.props.articles.writtenBy}</div>
                        <div>{this.props.articles.publishedAt}</div>
                        <div>{this.props.articles.content}</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        window.document.body.style.overflow="hidden";
    }

    componentWillUnmount() {
        window.document.body.style.overflow="auto";
    }

}


export default Modal;

