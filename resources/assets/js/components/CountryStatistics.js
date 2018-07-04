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
                <h5 className="card-title p-2">
                    Total Countries Found: {totalNumberOfCountries}
                </h5>
                <div className="card-header">
                    Region Count
                </div>
                <ul className="list-group">
                    {
                        Object.keys(regions).map(function(keyName, keyIndex) {
                            return (<li className="list-group-item">{keyName}: {regions[keyName]}</li>);
                        })
                    }
                </ul>
                <div className="card-header">
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
