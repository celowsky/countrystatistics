import React, { Component } from 'react';
import SearchBox from './SearchBox';
import SubmitButton from './SubmitButton';

export default class CountryForm extends Component {
    render() {
        const { searchString, handleChange, handleSubmit } = this.props;
        return (
            <form>
                <div className="form-group">
                    <SearchBox
                        handleChange={handleChange}
                        searchString={searchString}
                    />
                    <SubmitButton handleSubmit={handleSubmit} />
                </div>
            </form>
        );
    }
}
