import React, { Component } from 'react';

import './Modal.scss';
import './_utils.scss';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    closeModal() {
        this.props.clickModal();
    }

    render() {
        return(
            <div 
                className="modal-wrapper"
                onClick={this.closeModal.bind(this)}
            >
                <div className="modal">modal</div>
            </div>
        );
    }

}


export default Modal;

