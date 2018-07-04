import React, { Component } from 'react';

export default class CountryStatistics extends Component {
    constructor(props) {
        super(props);
        this.getRegions = this.getRegions.bind(this);
        this.getSubregions = this.getSubregions.bind(this);
    }

    getRegions(regions) {
        // if regions is not an object or is an empty object
        if (typeof regions !== 'object' || (Object.keys(regions).length === 0 && regions.constructor === Object)) {
            return '';
        } else {
            return Object.keys(regions).map(function(keyName, keyIndex) {
                return (<li className="list-group-item" key={keyName + keyIndex + regions[keyName]}>{keyName}: {regions[keyName]}</li>);
            });
        }
    }

    getSubregions(subregions) {
        // if subregions is not an object or is an empty object
        if (typeof subregions !== 'object' || (Object.keys(subregions).length === 0 && subregions.constructor === Object)) {
            return '';
        } else {
            return Object.keys(subregions).map(function(keyName, keyIndex) {
                return (<li className="list-group-item" key={keyName + keyIndex + subregions[keyName]}>{keyName}: {subregions[keyName]}</li>);
            });
        }
    }

    render() {
        const { statistics } = this.props;
        const { totalNumberOfCountries, regions, subregions } = statistics;
        const { getRegions, getSubregions } = this;
        return (
            <div className="card col-xs-12">
                <div className="card-header">
                    Total Countries Found: {totalNumberOfCountries}
                </div>
                <div className="card-header mt-2">
                    Region Count
                </div>
                <ul className="list-group">
                    {getRegions(regions)}
                </ul>
                <div className="card-header mt-2">
                    Subregion Count
                </div>
                <ul className="list-group">
                    {getSubregions(subregions)}
                </ul>
            </div>
        );
    }
}
