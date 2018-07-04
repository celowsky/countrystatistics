import React, { Component } from 'react';
import CountryCard from './CountryCard';

export default class Results extends Component {
    constructor(props) {
        super(props);

        this.mapDataToCountryCards = this.mapDataToCountryCards.bind(this);
    }

    mapDataToCountryCards(data) {
        if (data) {
            return data.map((country, index) => {
                return (
                    <CountryCard
                        countryData={country}
                        key={country + index}
                    />
                );
            });
        } else {
            return null;
        }
    }

    render() {
        const { countries } = this.props;
        const { mapDataToCountryCards } = this;
        return (mapDataToCountryCards(countries));
    }
};
