import { commissioningConstants } from '../_constants';

const initialState = {
  sending: false,
  sent:  false,
  sendingFile: false,
  sentFile:  false,
  sendingKey: false,
  sentKey:  false,
  windSensor1: '',
  rainSensor1: '',
  floodSensor1: '',
  snowSensor1: '',
  windSensorAddress: '',
}

export function commissioning(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case commissioningConstants.SET_WIFI_INFO_REQUEST:
      return {
        ...state,
        sending: true,
        sent: false
      };
    case commissioningConstants.SET_WIFI_INFO_SUCCESS:
      return {
        ...state,
        sending: false,
        sent: true
      };
    case commissioningConstants.SET_WIFI_INFO_FAILURE:
      return {
        ...state,
        sending: false,
        error: action.error,
        sent: false
      };




      case commissioningConstants.SELECT_SENSOR_REQUEST:
      return {
        ...state,
        sending1: true,
        sent1: false
      };
    case commissioningConstants.SELECT_SENSOR_SUCCESS:
      return {
        ...state,
        sending1: false,
        sent1: true
      };
    case commissioningConstants.SELECT_SENSOR_FAILURE:
      return {
        ...state,
        sending1: false,
        error: action.error,
        sent1: false
      };




      case commissioningConstants.SET_WIND_ADDRESS_SUCCESS:
      return {
        ...state,
        sending3: false,
        sent3: true
      };
    case commissioningConstants.SET_WIND_ADDRESS_FAILURE:
      return {
        ...state,
        sending3: false,
        error: action.error,
        sent3: false
      };




      case commissioningConstants.GET_WIND_ADDRESS_SUCCESS:
      return {
        ...state,
        sending3: false,
        sent3: true,
        windSensorAddress: action.address.message.deviceAddress
      };
    case commissioningConstants.GET_WIND_ADDRESS_FAILURE:
      return {
        ...state,
        sending3: false,
        error: action.error,
        sent3: false
      };



      
      case commissioningConstants.GET_SENSORS_SUCCESS:
      return {
        ...state,
        windSensor1: action.sensors.windSensor,
        rainSensor1: action.sensors.rainSensor,
        floodSensor1: action.sensors.floodSensor,
        snowSensor1: action.sensors.snowSensor,
      };
    case commissioningConstants.GET_SENSORS_FAILURE:
      return {
        ...state,
        error: action.error,

      };




    case commissioningConstants.UPLOAD_REQUEST:
      return {
        ...state,
        sendingFile: true,
        sentFile: false
      };
    case commissioningConstants.UPLOAD_SUCCESS:
      return {
        ...state,
        sendingFile: false,
        sentFile: true
      };
    case commissioningConstants.UPLOAD_FAILURE:
      return {
        ...state,
        sendingFile: false,
        error: action.error,
        sentFile: false
      };




      case commissioningConstants.UPLOAD_KEY_REQUEST:
      return {
        ...state,
        sendingKey: true,
        sentKey: false
      };
    case commissioningConstants.UPLOAD_KEY_SUCCESS:
      return {
        ...state,
        sendingKey: false,
        sentKey: true
      };
    case commissioningConstants.UPLOAD_KEY_FAILURE:
      return {
        ...state,
        sendingKey: false,
        error: action.error,
        sentKey: false
      };
    default:
      return state
  }
}