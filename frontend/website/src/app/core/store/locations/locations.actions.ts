import { Action } from '@ngrx/store';

import { type } from '../utils';
import { Location } from '~_shared/models';


export const ActionTypes = {
    FETCH_ONE:           type('LOCATIONS.FETCH_ONE'),
    FETCH_ONE_SUCCESS:   type('LOCATIONS.FETCH_ONE_SUCCESS'),
    FETCH_ONE_FAILURE:   type('LOCATIONS.FETCH_ONE_FAILURE'),
};


export class FetchOneAction implements Action {
    readonly type = ActionTypes.FETCH_ONE;
    constructor(public payload: string) { }
}
export class FetchOneSuccessAction implements Action {
    readonly type = ActionTypes.FETCH_ONE_SUCCESS;
    constructor(public payload: Location) { }
}
export class FetchOneFailureAction implements Action {
    readonly type = ActionTypes.FETCH_ONE_FAILURE;
    constructor(public payload: Error) { }
}


export type Actions
    = FetchOneAction | FetchOneSuccessAction | FetchOneFailureAction
    ;

