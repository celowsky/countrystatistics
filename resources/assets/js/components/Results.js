import React, { Component } from 'react';
import CountryCard from './CountryCard';

export default class Results extends Component {
    constructor(props) {
        super(props);

        this.mapDataToCountryCards = this.mapDataToCountryCards.bind(this);
    }

    mapDataToCountryCards(data) {
        if (data) {
            return data.map((country) => {
                return (
                    <CountryCard
                        countryData={country}
                    />
                );
            });
        } else {
            return (
                <p>Results will display here</p>
            );
        }
    }

    render() {
        const { countries } = this.props;
        console.log(countries);
        const { mapDataToCountryCards } = this;
        return (mapDataToCountryCards(countries));
    }
};
