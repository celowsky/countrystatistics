import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountryForm from './CountryForm';

import {
    changeSearchString,
    submitForm,
    displayResults,
} from '../actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(searchString) {
        const { dispatch } = this.props;
        dispatch(changeSearchString(searchString));
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch, searchString } = this.props;
        dispatch(submitForm(searchString));
    }

    render() {
        const { searchString } = this.props;
        const { handleChange, handleSubmit, handleUpdate } = this;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <CountryForm
                                searchString={searchString}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(App);
