import { controlConstants } from '../_constants';
import { controlService } from '../_services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const controlActions = {
    sendCommand
};

function sendCommand(deviceID, command, macID) {
    return dispatch => {
        dispatch(request());

        controlService.sendCommand(deviceID, command, macID)
            .then(
                ok => { 
                    dispatch(success(ok.toString()));
                    toast('successfully sent message!', {
                        position: "bottom-right"
                      });
                },
                error => {
                    dispatch(failure(error.toString()));
                    toast('error in sending message!', {
                        position: "bottom-right"
                      });
                }
            );
    };

    function request() { return { type: controlConstants.SEND_COMMAND_REQUEST } }
    function success(success) { return { type: controlConstants.SEND_COMMAND_SUCCESS, success } }
    function failure(error) { return { type: controlConstants.SEND_COMMAND_FAILURE, error } }
}
