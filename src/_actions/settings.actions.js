import { settingsConstants } from '../_constants';
import { settingsService } from '../_services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const settingsActions = {
    sendSetting,
    setPanID,
    threshold,
    heartBeat,
    timeZone,
    getSettings,
    setFrequency,
};

function sendSetting(setting) {
    return dispatch => {
        dispatch(request(setting));

        settingsService.sendSetting(setting)
            .then(
                ok => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(setting) { return { type: settingsConstants.SEND_SETTING, setting } }
    function success() { return { type: settingsConstants.SEND_SETTING_SUCCESS } }
    function failure(error) { return { type: settingsConstants.SEND_SETTING_FAILURE, error } }
}

function setPanID(panID) {
    console.log(panID);
    return dispatch => {
        dispatch(request());

        settingsService.setPanID(panID)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully set Pan ID!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in setting Pan ID!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    

    function request() { return { type: settingsConstants.SET_PANID_REQUEST } }
    function success(success) { return { type: settingsConstants.SET_PANID_SUCCESS, success } }
    function failure(error) { return { type: settingsConstants.SET_PANID_FAILURE, error } }
}



function threshold(maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer, maxFloodLevel, maxSnowFall) {
    return dispatch => {
        dispatch(request());

        settingsService.threshold(maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer, maxFloodLevel, maxSnowFall)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully set Threshold!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in setting Threshold!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    

    function request() { return { type: settingsConstants.SET_THRESHOLD_REQUEST } }
    function success(success) { return { type: settingsConstants.SET_THRESHOLD_SUCCESS, success } }
    function failure(error) { return { type: settingsConstants.SET_THRESHOLD_FAILURE, error } }
}

function heartBeat(enabled, hbinterval, maxMsgs) {
    return dispatch => {
        dispatch(request());
        settingsService.heartBeat(enabled, hbinterval, maxMsgs)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully set Heart Beat', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in setting HeartBeat!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    

    function request() { return { type: settingsConstants.SET_HEARTBEAT_REQUEST } }
    function success(success) { return { type: settingsConstants.SET_HEARTBEAT_SUCCESS, success } }
    function failure(error) { return { type: settingsConstants.SET_HEARTBEAT_FAILURE, error } }
}

function getSettings() {
    return dispatch => {
        settingsService.getFrequency()
        .then(
            frequency => { 
                dispatch(success0(frequency.message));
            },
            error => {
                dispatch(failure0(error.toString()));
            }
        );
        settingsService.getThreshold()
            .then(
                threshold => { 
                    dispatch(success(threshold.message));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
            settingsService.getHeartBeat()
            .then(
                heartBeat => { 
                    dispatch(success1(heartBeat.message));
                },
                error => {
                    dispatch(failure1(error.toString()));
                }
            );

            settingsService.getPanID()
            .then(
                panID => { 
                    dispatch(success2(panID));
                },
                error => {
                    dispatch(failure2(error.toString()));
                }
            );

    };

    
    function success0(frequency) { return { type: settingsConstants.GET_FREQUENCY_SUCCESS, frequency } }
    function failure0(error) { return { type: settingsConstants.GET_FREQUENCY_FAILURE, error } }
    function success(threshold) { return { type: settingsConstants.GET_THRESHOLD_SUCCESS, threshold } }
    function failure(error) { return { type: settingsConstants.GET_THRESHOLD_FAILURE, error } }
    function success1(heartBeat) { return { type: settingsConstants.GET_HEARTBEAT_SUCCESS, heartBeat } }
    function failure1(error) { return { type: settingsConstants.GET_HEARTBEAT_FAILURE, error } }
    function success2(panID) { return { type: settingsConstants.GET_PANID_SUCCESS, panID } }
    function failure2(error) { return { type: settingsConstants.GET_PANID_FAILURE, error } }
}

function timeZone(timezone) {
    /*return dispatch => {
        dispatch(request());
        settingsService.timeZone(time)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully set Time Zone')
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in setting Time Zone!')
                }
            );
    };*/

    return dispatch => {
        console.log(timezone);
        dispatch(success(timezone));
        toast('successfully set Time Zone', {
            position: "bottom-right"
          });
    };

    

    function success(timezone) { return { type: settingsConstants.SET_TIMEZONE_SUCCESS, timezone} }
}

function setFrequency(power, status) {
    return dispatch => {
        dispatch(request());

        settingsService.setFrequency(power, status)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully set Frequency!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in setting Frequency!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    

    function request() { return { type: settingsConstants.SET_FREQUENCY_REQUEST } }
    function success(success) { return { type: settingsConstants.SET_FREQUENCY_SUCCESS, success } }
    function failure(error) { return { type: settingsConstants.SET_FREQUENCY_FAILURE, error } }
}