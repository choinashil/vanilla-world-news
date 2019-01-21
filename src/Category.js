import React, { Component } from 'react';

import './Category.scss';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    changeCategory(e) {
        const category = e.target.textContent.toLowerCase();
        this.props.clickCategory(category);
    }

    render() {
        const categories = ['BUSINESS', 'ENTERTAINMENT', 'SPORTS', 'SCIENCE', 'TECHNOLOGY', 'HEALTH'];

        return (
            <div className="Category-wrapper">
                <div>
                    {categories.map((category) => <div
                        key={category}
                        className="Category"
                        onClick={this.changeCategory.bind(this)}
                    >
                        {category}
                    </div>)}
                </div>
            </div>
        );
    }
}

export default Category;
