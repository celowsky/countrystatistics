import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountryForm from './CountryForm';
import CountryStatistics from './CountryStatistics';
import ErrorHeader from './ErrorHeader';
import Results from './Results';
import {
    changeSearchString,
    submitForm,
} from '../actions';


class App extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        const { countries, error, searchString, statistics } = this.props;
        const { handleChange, handleSubmit } = this;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <ErrorHeader error={error} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-3">
                        <CountryForm
                            searchString={searchString}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <Results
                            countries={countries}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="card-holder mt-5 mb-3 col-md-8">
                        <CountryStatistics statistics={statistics} />
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
