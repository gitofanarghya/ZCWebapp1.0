import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout'
import { } from '../_actions';
import { DashBoard } from '../DashBoard';
import { Control } from '../Control';
import { Commissioning } from '../Commissioning';
import { dashBoardActions } from '../_actions';
import { Settings } from '../Settings';
import { About } from '../About';
import {Logs} from '../Logs';
import io from 'socket.io-client';

class HomePage extends React.Component {

    state = {
        mobileOpen: false,
        start: true,
        messages:[],
        xbeeMessages: [],
        color: "",
        buttonObject: {
          "id": "zone1",
          "location": "19.8,20.8 Chennai",
          "rainfall": 0.0,
          "windspeed": 0.0,
          "rainfallT": 0.0,
          "windspeedT": 0.0,
          "swversion": "1.0.CT",
          "hwversion": "1.0.0",
          "trackerID": "",
        },
		    modal: false,
    };

    hostname = window.location.hostname +':5000';

    logObj ={}

    componentDidMount() {
        var func = this;
        var socket = io(`http://${this.hostname}`);
        socket.on("connect", () => {
            console.log("Connected to server!!!");
            socket.emit("subscribeToMessages",{});
        });
    
        socket.on("disconnect", () => {
            console.log("Disconnect!!!");
        });
    
        socket.on('message', function (data) {
              var res = [];
            
              res = data.message.split(" ");
              if(data.message.includes("rainFall"))
              {
                
                func.setState({...func.state, buttonObject: {
                  ...func.state.buttonObject,
                  rainfall: Number(Number(res[2]).toFixed(2))
                }});
                func.setState({...func.state, buttonObject: {
                  ...func.state.buttonObject,
                  rainfallT: Number(Number(res[4]).toFixed(2))
                }});
              }
              if(data.message.includes("windSpeed"))
              {
                func.props.setWindParams(Number(Number(res[2]).toFixed(2)), Number(Number(res[4]).toFixed(2)))
              }
              if(data.message.includes("Rover"))
              {
                func.props.setTrackerColor(res[1], (res[2] === "offline"? "red":"blue"));
              }
              if(data.message.includes("CMD") && data.message.includes("DID"))
              {
                this.logsObj = {
                    log: data.message,
                }
                func.props.setMessages("xbee", this.logsObj);
              }
              else{
                this.logsObj = {
                    date: data.timeStamp,
                    time: data.timeStamp,
                    log: data.message,
                }
                func.props.setMessages("logs", this.logsObj);
              }     
        });
        func.setState({start: true});
    }

    render() {
        return(
            <Layout selected={this.props.currentPage}>
                {
                        this.props.currentPage === 'Dashboard' ? <DashBoard /> :
                          this.props.currentPage === 'Control' ? <Control /> :
                            this.props.currentPage === 'Commissioning' ? <Commissioning />:
                              this.props.currentPage === 'Settings' ? <Settings /> :
                                  this.props.currentPage === 'Logs' ? <Logs /> : <About />
                }
            </Layout>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => ({
    getCommissioningData: () => {
        dispatch(dashBoardActions.getCommissioningData()) 
    },
    setWindParams: (windSpeed, windSpeedT) =>{
        dispatch(dashBoardActions.setWindParams(windSpeed, windSpeedT))
    },
        setTrackerColor: (trackerID, color) =>{
        dispatch(dashBoardActions.setTrackerColor(trackerID, color))
    },
    setMessages: (typ, log) =>{
        dispatch(dashBoardActions.setMessages(typ, log))
    },
})

const mapStateToProps = (state) => {
    const { timezone } = state.settings;
    const { currentPage } = state.homePage;
    return {
      timezone,
      currentPage
    };
}

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };
