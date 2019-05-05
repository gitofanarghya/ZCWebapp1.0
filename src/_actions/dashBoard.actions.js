import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dashBoardConstants } from '../_constants';
import { dashBoardService } from '../_services';


export const dashBoardActions = {
    getCommissioningData,
    getCurrentTrackerInfo,
    setTrackerColor,
    triggerDiscovery,
    setWindParams,
    setMessages,
};

function getCommissioningData() {
    return dispatch => {
        dispatch(request());

        dashBoardService.getCommissioningData()
            .then(
                commissioning => { 
                    /* for(var i=0; i<commissioning.length; i++)
                    {
                        commissioning[i].color = "blue";
                    } */
                    const newCommissioning = {};
                    newCommissioning.staticData = commissioning.staticData.map(c => {
                        return {
                            ...c,
                            color: 'red'
                        }
                    });
                    dispatch(success(newCommissioning, dispatch));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: dashBoardConstants.GET_COMMISSIONING_DATA_REQUEST } }
    function success(commissioningData, dispatch) {
        dispatch(getCurrentTrackerInfo(commissioningData.staticData[0].trackerID)) 
        return { type: dashBoardConstants.GET_COMMISSIONING_DATA_SUCCESS, commissioningData } 
    }
    function failure(error) { return { type: dashBoardConstants.GET_COMMISSIONING_DATA_FAILURE, error } }
}

function getCurrentTrackerInfo(trackerID) {
    return dispatch => {
        dispatch(request(trackerID));

        dashBoardService.getCurrentTrackerInfo(trackerID)
            .then(
                trackerDetails => { 
                    dispatch(success(trackerDetails));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(trackerID) { return { type: dashBoardConstants.GET_CURRENT_TRACKER_INFO_REQUEST, trackerID } }
    function success(trackerDetails) { return { type: dashBoardConstants.GET_CURRENT_TRACKER_INFO_SUCCESS, trackerDetails } }
    function failure(error) { return { type: dashBoardConstants.GET_CURRENT_TRACKER_INFO_FAILURE, error } }
}

function setTrackerColor(trackerID, color) {
    return dispatch => {
        dispatch(success(trackerID, color));
    };
    function success(trackerID, color) { return { type: dashBoardConstants.SET_COLOR_SUCCESS, trackerID, color} }
}

function setMessages(typ, log) {
    return dispatch => {
        dispatch(success(typ, log));
    };
    function success(typ, log) { return { type: dashBoardConstants.SET_MESSAGES, typ, log} }
}

function setWindParams(windSpeed, windSpeedT) {
    return dispatch => {
        dispatch(success(windSpeed, windSpeedT));
    };
    function success(windSpeed, windSpeedT) { return { type: dashBoardConstants.SET_WINDSPEED_SUCCESS, windSpeed, windSpeedT} }
}

function triggerDiscovery() {
    return dispatch => {
        dispatch(request());

        dashBoardService.triggerDiscovery()
            .then(
                discoveryDetails => { 
                    dispatch(success(discoveryDetails))
                    toast("Successfully started discovery!", {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast("Error in starting discovering!", {
                        position: "bottom-right"
                      });
                }
            );
    };

    function request() { return { type: dashBoardConstants.TRIGGER_DISCOVERY_REQUEST} }
    function success(discoveryDetails) { return { type: dashBoardConstants.TRIGGER_DISCOVERY_SUCCESS, discoveryDetails } }
    function failure(error) { return { type: dashBoardConstants.TRIGGER_DISCOVERY_FAILURE, error } }
}