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

    renderContent() {
        const articles = this.props.articles;
        return (
            <div>
                <div>
                    {articles.content.repeat(2)}
                    ...
                    <span> +</span>
                    <span>
                        <a href={articles.url} target="_blank" rel="noopener noreferrer">more</a>
                    </span>
                </div>
            </div>
        );
    }

    render() {
        const articles = this.props.articles;
        return(
            <div className="modal-wrapper">
                <div 
                    className={this.state.isModalOpen ? "modal-background modal-background-fadeout" : "modal-background"}
                    onClick={this.closeModal.bind(this)}
                >
                </div>
                <div className={this.state.isModalOpen ? "modal modal-down" : "modal modal-up"}>
                    <div>
                        <img src={articles.urlToImage} alt={articles.title} />
                    </div>
                    <div>
                        <div>
                            <div>{articles.title}</div>
                        </div>
                        <div>
                            <div>{articles.author ? articles.author : ''}</div>
                            <div>{articles.source.name}</div>
                            <div>{articles.publishedAt}</div>
                        </div>
                        {articles.content ? this.renderContent() : ''}
                    </div>
                </div>
            </div>
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

