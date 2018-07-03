import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class SubmitButton extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <input type="submit" value="Submit" onClick={handleSubmit} />
        );
    }
}
