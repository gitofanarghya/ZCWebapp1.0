import { dashBoardConstants } from '../_constants';
import update from 'react-addons-update';

const initialState = {
  requesting: false,
  commissioningData: null,
  loaded:  false,
  requestingTrackerInfo: false,
  loadedTrackerInfo: false,
  selectedTrackerDetails: null,
  selectedTrackerID: "tracker001",
  trackerColor: {
    trackerID: "",
    color: "",
  },
  triggeringDiscovery: false,
  discoveryDetails: null,
  windSpeed: 0.0,
  windSpeedT: 0.0,
  logs: [],
  xbeelogs: [],
}

export function dashBoard(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {


    case dashBoardConstants.GET_COMMISSIONING_DATA_REQUEST:
      return {
        ...state,
        requesting: true,
        loaded: false
      };
    case dashBoardConstants.GET_COMMISSIONING_DATA_SUCCESS:
      return {
        ...state,
        requesting: false,  
        commissioningData: action.commissioningData.staticData,
        loaded: true
      };
    case dashBoardConstants.GET_COMMISSIONING_DATA_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.error,
        loaded: false
      };



    case dashBoardConstants.GET_CURRENT_TRACKER_INFO_REQUEST:
      return {
        ...state,
        requestingTrackerInfo: true,
        selectedTrackerID: action.trackerID
      };
    case dashBoardConstants.GET_CURRENT_TRACKER_INFO_SUCCESS:
      return {
        ...state,
        requestingTrackerInfo: false,  
        selectedTrackerDetails: action.trackerDetails,
        loadedTrackerInfo: true
      };
    case dashBoardConstants.GET_CURRENT_TRACKER_INFO_FAILURE:
      return {
        ...state,
        requestingTrackerInfo: false,
        error: action.error,
        loadedTrackerInfo: false
      };



    case dashBoardConstants.SET_COLOR_SUCCESS:
    {
      var temp = 0;
      for(var i=0; i< state.commissioningData.length ;i++)
      {
        if(state.commissioningData[i].trackerID === action.trackerID)
        {
          temp = i;
          break;
        }
      }
        return update(state, { 
          commissioningData: { 
            [temp]: {
              color: {$set: action.color}
            }
          }
        });
      
    }




    case dashBoardConstants.SET_WINDSPEED_SUCCESS:
    {
      return {
        ...state,
        windSpeed: action.windSpeed, windSpeedT: action.windSpeedT
      };
    }
    case dashBoardConstants.TRIGGER_DISCOVERY_REQUEST:
    return {
      ...state,
      triggeringDiscovery: true,
      discoveryDetails: false,
      loaded: true
    };




  case dashBoardConstants.TRIGGER_DISCOVERY_SUCCESS:
    return {
      ...state,
      triggeringDiscovery: false,  
      discoveryDetails: action.discoveryDetails,
      loaded: true
    };
  case dashBoardConstants.TRIGGER_DISCOVERY_FAILURE:
    return {
      ...state,
      triggeringDiscovery: false,
      error: action.error,
      loaded: true
    };


    

    case dashBoardConstants.SET_MESSAGES:
    if(action.typ === "logs")
    {
      return {
        ...state,
        logs: [...state.logs, action.log],
      };
    }

    else{
      return {
        ...state,
        xbeelogs: [...state.xbeelogs, action.log],
      };
    }


    
  
    default:
      return state
  }
}