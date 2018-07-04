import React, { Component } from 'react';
import SearchBox from './SearchBox';
import SubmitButton from './SubmitButton';
import Results from './Results';

export default class CountryForm extends Component {
    render() {
        const { countries, searchString, handleChange, handleSubmit } = this.props;
        return (
            <form>
                <div className="form-group">
                    <SearchBox
                        handleChange={handleChange}
                        searchString={searchString}
                    />
                    <SubmitButton handleSubmit={handleSubmit} />
                    <Results countries={countries} />
                </div>
            </form>
        );
    }
}
