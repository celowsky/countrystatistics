import React, { Component } from 'react';
import SearchBox from './SearchBox';
import SubmitButton from './SubmitButton';
import Results from './Results';

export default class CountryForm extends Component {
    render() {
        const { searchString, handleChange, handleSubmit } = this.props;
        return (
            <div className="form-area">
                <p>
This is the country form
                </p>
                <SearchBox
                    handleChange={handleChange}
                    searchString={searchString}
                />
                <SubmitButton handleSubmit={handleSubmit} />
                <Results />
            </div>
        );
    }
}
