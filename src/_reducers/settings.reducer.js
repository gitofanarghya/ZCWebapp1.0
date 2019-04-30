import { settingsConstants } from '../_constants';

const initialState = {
  sending1: false,
  sent1:  false,
  sending2: false,
  sent2:  false,
  timezone: {
    "value": "India Standard Time",
    "abbr": "IST",
    "offset": 5.5,
    "isdst": false,
    "text": "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
    "utc": [
      "Asia/Kolkata"
    ]
  },
  maxWindSpeed1: 0,
  maxRainFall1: 0,
  meanWindSpeed1: 0,
  windSpeedTimer1: 0,
  hbinterval1: 0,
  maxMsgs1: 0,
  maxSnowFall1: 0,
  maxFloodLevel1: 0,
  panid1: 'asdfg',
  panidOK: false,
  thresholdOK: false,
  heartBeatOK: false,
}

export function settings(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {



    case settingsConstants.SET_PANID_REQUEST:
      return {
        ...state,
        sending: true,
        sent: false
      };
    case settingsConstants.SET_PANID_SUCCESS:
      return {
        ...state,
        sending: false,
        sent: true
      };
    case settingsConstants.SET_PANID_FAILURE:
      return {
        ...state,
        sending: false,
        error: action.error,
        sent: false
      };




      case settingsConstants.SET_THRESHOLD_REQUEST:
      return {
        ...state,
        sending1: true,
        sent1: false
      };
    case settingsConstants.SET_THRESHOLD_SUCCESS:
      return {
        ...state,
        sending1: false,
        sent1: true
      };
    case settingsConstants.SET_THRESHOLD_FAILURE:
      return {
        ...state,
        sending1: false,
        error: action.error,
        sent1: false
      };




      case settingsConstants.SET_HEARTBEAT_REQUEST:
      return {
        ...state,
        sending2: true,
        sent2: false
      };
    case settingsConstants.SET_HEARTBEAT_SUCCESS:
      return {
        ...state,
        sending2: false,
        sent2: true
      };
    case settingsConstants.SET_HEARTBEAT_FAILURE:
      return {
        ...state,
        sending2: false,
        error: action.error,
        sent2: false
      };




    case settingsConstants.SET_TIMEZONE_REQUEST:
      return {
        ...state,
        sending2: true,
        sent2: false
      };
    case settingsConstants.SET_TIMEZONE_SUCCESS:
      return {
        ...state,
        timezone: action.timezone
      };
    case settingsConstants.SET_TIMEZONE_FAILURE:
      return {
        ...state,
        sending2: false,
        error: action.error,
        sent2: false
      };




      case settingsConstants.SET_FREQUENCY_REQUEST:
      return {
        ...state,
        sending3: true,
        sent3: false
      };
    case settingsConstants.SET_FREQUENCY_SUCCESS:
      return {
        ...state,
        powerRequestTimePeriod1: action.power,
        statusRequestTimePeriod1: action.status
      };
    case settingsConstants.SET_FREQUENCY_FAILURE:
      return {
        ...state,
        sending3: false,
        error: action.error,
        sent3: false
      };




      case settingsConstants.GET_THRESHOLD_SUCCESS:
      return {
        ...state,
        maxRainFall1: action.threshold.maxRainFall,
        maxWindSpeed1: action.threshold.maxWindSpeed,
        windSpeedTimer1: action.threshold.windSpeedTimer,
        meanWindSpeed1: action.threshold.meanWindSpeed,
        maxFloodLevel1: action.threshold.maxFloodLevel,
        maxSnowFall1: action.threshold.maxSnowFall,
        thresholdOK: true,
      };




      case settingsConstants.GET_HEARTBEAT_SUCCESS:
      return {
        ...state,
        hbinterval1: action.heartBeat.interval,
        maxMsgs1: action.heartBeat.maxMsgs,
        heartBeatOK: true,
      };




      case settingsConstants.GET_FREQUENCY_SUCCESS:
      return {
        ...state,
        powerRequestTimePeriod1: action.frequency.powerRequestTimePeriod,
        statusRequestTimePeriod1: action.frequency.statusRequestTimePeriod,
        frequencyOK: true
      };




      case settingsConstants.GET_PANID_SUCCESS:
      return {
        ...state,
        panid1: action.panID,
        panidOK: true,
      };




    default:
      return state
  }
}
