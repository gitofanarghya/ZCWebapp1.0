import { wifiConstants } from '../_constants';
import { wifiService } from '../_services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const wifiActions = {
    setWifiInfo,
    upload,
    selectSensor,
    uploadKey,
    getSensors,
    getWindAddress
};

function setWifiInfo(ssid, pass) {
    return dispatch => {
        dispatch(request());

        wifiService.setWifiInfo(ssid, pass)
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

    function request() { return { type: wifiConstants.SET_WIFI_INFO_REQUEST } }
    function success(success) { return { type: wifiConstants.SET_WIFI_INFO_SUCCESS, success } }
    function failure(error) { return { type: wifiConstants.SET_WIFI_INFO_FAILURE, error } }
}



function upload(file) {
    return dispatch => {
        dispatch(request());

        wifiService.upload(file)
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

    function request() { return { type: wifiConstants.UPLOAD_REQUEST } }
    function success(success) { return { type: wifiConstants.UPLOAD_SUCCESS, success } }
    function failure(error) { return { type: wifiConstants.UPLOAD_FAILURE, error } }
}

function uploadKey(key) {
    return dispatch => {
        dispatch(request());

        wifiService.uploadKey(key)
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

    function request() { return { type: wifiConstants.UPLOAD_KEY_REQUEST } }
    function success(success) { return { type: wifiConstants.UPLOAD_KEY_SUCCESS, success } }
    function failure(error) { return { type: wifiConstants.UPLOAD_KEY_FAILURE, error } }
}

function selectSensor(windSensor, rainSensor, floodSensor, snowSensor, windAddress) {
    return dispatch => {

        dispatch(request());
        wifiService.selectSensor(windSensor, rainSensor, floodSensor, snowSensor)
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
            
            wifiService.setWindAddress(windAddress)
            .then(
                ok => {
                    dispatch(success1(ok.toString()));
                },
                error => {
                    dispatch(failure1(error.toString()));
                }
            );  
    };

    function success1(){return {type: wifiConstants.SET_WIND_ADDRESS_SUCCESS}}
    function failure1(error) { return { type: wifiConstants.SET_WIND_ADDRESS_FAILURE, error } }
    function request() { return { type: wifiConstants.SELECT_SENSOR_REQUEST } }
    function success(success) { return { type: wifiConstants.SELECT_SENSOR_SUCCESS, success } }
    function failure(error) { return { type: wifiConstants.SELECT_SENSOR_FAILURE, error } }
}

function getWindAddress() {
    return dispatch => {
        wifiService.getWindAddress()
        .then(
            address => { 
                dispatch(success(address));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );
    };

    function success(address) { return { type: wifiConstants.GET_WIND_ADDRESS_SUCCESS, address } }
    function failure(error) { return { type: wifiConstants.GET_SENSORS_FAILURE, error } }
}



function getSensors() {
    return dispatch => {
        wifiService.getSensors()
        .then(
            sensors => { 
                dispatch(success(sensors.message));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );
    };

    function success(sensors) { return { type: wifiConstants.GET_SENSORS_SUCCESS, sensors } }
    function failure(error) { return { type: wifiConstants.GET_SENSORS_FAILURE, error } }
}

