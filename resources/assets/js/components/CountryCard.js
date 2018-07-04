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
                    <div className="country-full-name col-xs-12">
                        <h3 className="text-center">{fullName}</h3>
                    </div>
                    <div className="flag-image col-xs-12">
                        <img src={flagImage} className="img-fluid" alt={`Flag of country ${fullName}`} />
                    </div>
                    <div className="country-codes col-xs-6">
                        <h5><strong>Country Codes</strong></h5>
                        <ul className="list-group col-xs-12">
                            <li className="list-group-item col-xs-6">{alphaCode2}</li>
                            <li className="list-group-item col-xs-6">{alphaCode3}</li>
                        </ul>
                    </div>
                    <div className="region col-xs-6">
                        <h5><strong>Region Info</strong></h5>
                        <ul className="list-group col-xs-12">
                            <li className="list-group-item col-xs-6">{region}</li>
                            <li className="list-group-item col-xs-6">{subregion}</li>
                        </ul>
                    </div>
                    <div className="population col-xs-6">
                        <h5><strong>Population: </strong>{population}</h5>
                    </div>
                    <div className="languages col-xs-6">
                        <h5><strong>Languages</strong></h5>
                        <ul className="list-group col-xs-12">
                            {languages.map((language) => {
                                return (
                                    <li className="list-group-item col-xs-6">{language}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
