import React, { Component } from 'react';

export default class CountryStatistics extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { statistics } = this.props;
        const { totalNumberOfCountries, regions, subregions } = statistics;
        return (
            <footer className="row">
                <div className="col-md-4">
                    Total number of countries: {totalNumberOfCountries}
                </div>
                <div className="col-md-4">
                    Region Count:
                    <ul>
                        {
                            Object.keys(regions).map(function(keyName, keyIndex) {
                                return (<li>{keyName}: {regions[keyName]}</li>)
                            })
                        }
                    </ul>
                </div>
                <div className="col-md-4">
                    Subregion Count:
                    <ul>
                        {
                            Object.keys(subregions).map(function(keyName, keyIndex) {
                                return (<li>{keyName}: {subregions[keyName]}</li>)
                            })
                        }
                    </ul>
                </div>
            </footer>
        );
    }
}
