import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from './SearchBox';
import SubmitButton from './SubmitButton';

export default class CountryForm extends Component {
    render() {
        return (
            <div className="form-area">
                <p>
This is the country form
                </p>
                <SearchBox />
                <SubmitButton />
            </div>
        );
    }
}
