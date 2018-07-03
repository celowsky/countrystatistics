import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountryForm from './CountryForm';

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
Hello, world!
                            </div>
                            <CountryForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(App);
