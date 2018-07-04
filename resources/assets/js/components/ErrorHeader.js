import React, { Component } from 'react';

export default class ErrorHeader extends Component {
    constructor(props) {
        super(props);
        this.getErrorHeader = this.getErrorHeader.bind(this);
    }

    getErrorHeader(error) {
        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            );
        } else {
            return null;
        }
    }

    render() {
        const { error } = this.props;
        const { getErrorHeader } = this;
        return getErrorHeader(error);
    }
}
