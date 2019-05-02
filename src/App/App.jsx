import React from 'react';
import { connect } from 'react-redux';
import { HomePage } from '../HomePage';

class App extends React.Component {

    render() {
        return ( 
                <div className="h100">
                    <HomePage />
                </div>
        );
    }
}

function mapStateToProps(state) {
    const { refreshed, loggedIn } = state.authentication;
    return {
        refreshed,
        loggedIn
    };
}


const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 