import React, { Component } from 'react';

export default class CountryStatistics extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { statistics } = this.props;
        const { totalNumberOfCountries, regions, subregions } = statistics;
        return (
            <div className="card col-xs-12">
                <div className="card-header">
                    Total Countries Found: {totalNumberOfCountries}
                </div>
                <div className="card-header mt-2">
                    Region Count
                </div>
                <ul className="list-group">
                    {
                        Object.keys(regions).map(function(keyName, keyIndex) {
                            return (<li className="list-group-item">{keyName}: {regions[keyName]}</li>);
                        })
                    }
                </ul>
                <div className="card-header mt-2">
                    Subregion Count
                </div>
                <ul className="list-group">
                    {
                        Object.keys(subregions).map(function(keyName, keyIndex) {
                            return (<li className="list-group-item">{keyName}: {subregions[keyName]}</li>);
                        })
                    }
                </ul>
            </div>
        );
    }
}
