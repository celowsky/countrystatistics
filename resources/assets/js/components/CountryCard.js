import React, { Component } from 'react';

export default class CountryCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            fullName, alphaCode2, alphaCode3, flagImage, region, subregion, population, languages,
        } = this.props.countryData;
        return (
            <div className="card-holder mt-3 col-xs-12">
                <div className="card col-xs-12">
                    <img src={flagImage} className="card-img-top" alt={`Flag of country ${fullName}`} />
                    <div className="card-body">
                        <h3 className="card-title"><strong>{fullName}</strong></h3>
                        <div className="card-header">
                            Country Codes
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item">{alphaCode2}</li>
                            <li className="list-group-item">{alphaCode3}</li>
                        </ul>
                        <div className="card-header mt-2">
                            Region Info
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item">Region: {region}</li>
                            <li className="list-group-item">Subregion(s): {subregion}</li>
                        </ul>
                        <div className="card-header mt-2">
                            Languages
                        </div>
                        <ul className="list-group">
                            {languages.map((language, index) => {
                                return (
                                    <li className="list-group-item" key={language + index + fullName}>{language}</li>
                                );
                            })}
                        </ul>
                        <div className="card-text text-muted text-right">
                            Population: {population}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
