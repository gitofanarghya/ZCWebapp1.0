import { homePageConstants } from '../_constants';

let commissioning = JSON.parse(localStorage.getItem('commissioning'));
const initialState = commissioning ? 
                          (commissioning.done ? 
                            {
                            currentPage: 'Dashboard'
                            }: 
                            {
                            currentPage: 'Commissioning'
                            }
                          ): 
                          {
                            currentPage: 'Commissioning'
                          };

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