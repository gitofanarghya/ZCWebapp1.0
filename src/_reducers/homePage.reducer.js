import { homePageConstants } from '../_constants';

const initialState = {
    currentPage: 'Commissioning'
}

export function homePage(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {


    case homePageConstants.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };
    
  
    default:
      return state
  }
}