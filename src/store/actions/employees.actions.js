/**
 * Description: Reducer of the checklist data
 * Date: 1/3/2019
 */
import * as Utils from 'utils';

export const GET_EMPLOYEES = '[EMPLOYEES] GET';
export const UPDATE_EMPLOYEE     = '[EMPLOYEE] UPDATE';
export const DELETE_EMPLOYEE     = '[EMPLOYEE] DELETE';
export const CHECK_EMPLOYEE      = '[EMPLOYEE] CHECK'   ;

export function getEmployees({workingForId}) {
    const request = Utils.xapi().post('manager/employees', {
        workingForId: workingForId
    });
    return (dispatch) =>
        request.then((response) => {
            return dispatch({
                type: GET_EMPLOYEES,
                employees: response.data.employees
            });
        });
}

export function updateEmployee(data) {
    const request = Utils.xapi().post('manager/employee/update', data);
    return (dispatch) =>
        request.then((response) => {
            dispatch(getEmployees({
                workingForId: data.workingForId
            }));  
            return dispatch({
                type: UPDATE_EMPLOYEE,
            });
        });
}

export function deleteEmployee(data) {
    const request = Utils.xapi().post('manager/employee/delete', data);
    return (dispatch) =>
        request.then((response) => {
            dispatch(getEmployees({
                workingForId: data.workingForId
            }));     
            return dispatch({
                type: DELETE_EMPLOYEE
            });
        });
}

export function checkEmployee(data) {
    const request = Utils.xapi().post('employee/check', data);
    return (dispatch) =>
        request.then((response) => {   
            return dispatch({
                type: CHECK_EMPLOYEE,
                employee: response.data.employee
            });
        });
}