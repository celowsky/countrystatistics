import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class SubmitButton extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        );
    }
}
