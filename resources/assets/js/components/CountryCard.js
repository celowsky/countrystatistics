import React, { Component } from 'react';

export default class CountryCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { fullName, alphaCode2, alphaCode3, flag, region, subregion, population, languages } = this.props.countryData;
        return (
            <div className="card-holder col-xs-12">
                <div className="card col-xs-12">
                    fullName: {fullName}
                    alphaCode2: {alphaCode2}
                    alphaCode3: {alphaCode3}
                    flag: {flag}
                    region: {region}
                    subregion: {subregion}
                    population: {population}
                    languages: {languages}
                </div>
            </div>
        );
    }
}
