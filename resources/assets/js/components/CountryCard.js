import React, { Component } from 'react';

export default class CountryCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { fullName, alphaCode2, alphaCode3, flag, region, subregion, population, languages } = this.props.countryData;
        return (
            <div className="card-holder col-xs-12">
                Fullname: {fullName}
            </div>
        );
    }
}
