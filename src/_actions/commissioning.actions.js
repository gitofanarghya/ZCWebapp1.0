import { commissioningConstants } from '../_constants';
import { commissioningService } from '../_services';
import { dashBoardActions } from './dashBoard.actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const commissioningActions = {
    setWifiInfo,
    upload,
    selectSensor,
    uploadKey,
    getSensors,
    getWindAddress,
    caliberate,
};

function setWifiInfo(ssid, pass) {
    return dispatch => {
        dispatch(request());

        commissioningService.setWifiInfo(ssid, pass)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully set wifi info!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in setting wifi info!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    function request() { return { type: commissioningConstants.SET_WIFI_INFO_REQUEST } }
    function success(success) { return { type: commissioningConstants.SET_WIFI_INFO_SUCCESS, success } }
    function failure(error) { return { type: commissioningConstants.SET_WIFI_INFO_FAILURE, error } }
}



function upload(file) {
    return dispatch => {
        dispatch(request());

        commissioningService.upload(file)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    dashBoardActions.getCommissioningData();
                    var commissioningObject = { done: true };
                    localStorage.setItem('commissioning', JSON.stringify(commissioningObject));
                    toast('successfully uploaded!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in uploading!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    function request() { return { type: commissioningConstants.UPLOAD_REQUEST } }
    function success(success) { return { type: commissioningConstants.UPLOAD_SUCCESS, success } }
    function failure(error) { return { type: commissioningConstants.UPLOAD_FAILURE, error } }
}

function uploadKey(key) {
    return dispatch => {
        dispatch(request());

        commissioningService.uploadKey(key)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully uploaded!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in uploading!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    function request() { return { type: commissioningConstants.UPLOAD_KEY_REQUEST } }
    function success(success) { return { type: commissioningConstants.UPLOAD_KEY_SUCCESS, success } }
    function failure(error) { return { type: commissioningConstants.UPLOAD_KEY_FAILURE, error } }
}

function selectSensor(windSensor, rainSensor, floodSensor, snowSensor, windAddress) {
    return dispatch => {

        dispatch(request());
        commissioningService.selectSensor(windSensor, rainSensor, floodSensor, snowSensor)
            .then(
                ok => {
                    dispatch(success(ok.toString()));
                    toast('successfully set sensors!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in setting sensors!', {
                        position: "bottom-right"
                      });
                }
            ); 
            
            commissioningService.setWindAddress(windAddress)
            .then(
                ok => {
                    dispatch(success1(ok.toString()));
                },
                error => {
                    dispatch(failure1(error.toString()));
                }
            );  
    };

    function success1(){return {type: commissioningConstants.SET_WIND_ADDRESS_SUCCESS}}
    function failure1(error) { return { type: commissioningConstants.SET_WIND_ADDRESS_FAILURE, error } }
    function request() { return { type: commissioningConstants.SELECT_SENSOR_REQUEST } }
    function success(success) { return { type: commissioningConstants.SELECT_SENSOR_SUCCESS, success } }
    function failure(error) { return { type: commissioningConstants.SELECT_SENSOR_FAILURE, error } }
}

function getWindAddress() {
    return dispatch => {
        commissioningService.getWindAddress()
        .then(
            address => { 
                dispatch(success(address));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );
    };

    function success(address) { return { type: commissioningConstants.GET_WIND_ADDRESS_SUCCESS, address } }
    function failure(error) { return { type: commissioningConstants.GET_SENSORS_FAILURE, error } }
}



function getSensors() {
    return dispatch => {
        commissioningService.getSensors()
        .then(
            sensors => { 
                dispatch(success(sensors.message));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );
    };

    function success(sensors) { return { type: commissioningConstants.GET_SENSORS_SUCCESS, sensors } }
    function failure(error) { return { type: commissioningConstants.GET_SENSORS_FAILURE, error } }
}

function caliberate(sensor) {
    return dispatch => {
        commissioningService.caliberate(sensor)
        .then(
            data => {
                if(data.Result === "success")
                {                
                  toast('Successfully calibrated at ' + data.message + '!', {
                    position: "bottom-right"
                  });
                }
                else
                {
                    toast('Error in calibrating ' + sensor + '!', {
                        position: "bottom-right"
                      });
                }
            },
            error => {
                toast('Error in calibrating ' + sensor + '!', {
                    position: "bottom-right"
                  });
            }
        );
    };
}

