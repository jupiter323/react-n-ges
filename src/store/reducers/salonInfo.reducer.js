/**
 * Description: Reducer of the salon info
 * Date: 1/12/2019
 */

import * as Actions from '../actions';

const initialState = {
    status: false,
    info: null,
    errorMsg: ""
};

const salonInfo = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SALON_INFO:
        {
            return {
                info: action.info
            };
        }
        case Actions.ADD_SALON_INFO:
        {
            return {
                status: false,
                errorMsg: ""
            };
        }
        case Actions.ADD_SALON_INFO_SUCCESS:
        {
            return {
                ...initialState,
                status: true
            };
        }
        case Actions.ADD_SALON_INFO_SUCCESS:
        {
            return {
                status: false,
                errorMsg: action.errorMsg
            };
        }
        default:
        {
            return state
        }
    }
};

export default salonInfo;