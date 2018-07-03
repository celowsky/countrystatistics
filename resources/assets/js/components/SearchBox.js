import React, { Component } from 'react';

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { handleChange } = this.props;
        handleChange(e.target.value);
    }

    render() {
        const { handleChange } = this;
        const { searchString } = this.props;
        return (
            <input type="text" onChange={handleChange} value={searchString} />
        );
    }
}
