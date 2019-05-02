import { homePageConstants } from '../_constants';

export const homePageActions = {
    setCurrentPage
};

function setCurrentPage(currentPage) {
    return dispatch => {
        dispatch(success(currentPage));
    };
    function success(currentPage) { return { type: homePageConstants.SET_CURRENT_PAGE, currentPage} }
}
