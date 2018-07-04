import React, { Component } from 'react';
import SearchBox from './SearchBox';
import SubmitButton from './SubmitButton';
import Results from './Results';

export default class CountryForm extends Component {
    render() {
        const { countries, searchString, handleChange, handleSubmit } = this.props;
        return (
            <div className="form-area">
                <h6>Search by name, full name, or country code</h6>
                <SearchBox
                    handleChange={handleChange}
                    searchString={searchString}
                />
                <SubmitButton handleSubmit={handleSubmit} />
                <Results countries={countries} />
            </div>
        );
    }
}
