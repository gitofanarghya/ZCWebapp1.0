import React from 'react';
import { connect } from 'react-redux';
import { HomePage } from '../HomePage';
import { settingsActions } from '../_actions';
import {timezones} from '../Settings/timeZones';

class App extends React.Component {

    componentDidMount(){
        console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
        for(var i=0; i<timezones.length; i++)
        {
            
            if(timezones[i]["utc"].includes(Intl.DateTimeFormat().resolvedOptions().timeZone))
            {
                console.log(timezones[i]);
                this.props.setTimeZone(timezones[i]);
                break;
            }
            else if(timezones[i]["utc"].includes('Asia/Kolkata') && Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Calcutta')
            {
                this.props.setTimeZone(timezones[i]);
                break;
            }
        }
        this.props.getTimeZone();
    }

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

const mapDispatchToProps = (dispatch) => ({
    setTimeZone: (timeZone) => {
        dispatch(settingsActions.setInitialTimeZone(timeZone)) 
    },
    getTimeZone: () => {
        dispatch(settingsActions.getTimeZone()) 
    },
  })

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App }