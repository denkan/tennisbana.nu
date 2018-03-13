import { Action } from '@ngrx/store';

import { type } from '../utils';
import { LocationAutocomplete, LocationAutocompletePayload } from '~_shared/models';


export const ActionTypes = {
    QUERY:               type('LOCATION_AUTOCOMPLETES.QUERY'),
    QUERY_SUCCESS:       type('LOCATION_AUTOCOMPLETES.QUERY_SUCCESS'),
    QUERY_FAILURE:       type('LOCATION_AUTOCOMPLETES.QUERY_FAILURE'),
};


export class QueryAction implements Action {
    readonly type = ActionTypes.QUERY;
    constructor(public payload: LocationAutocompletePayload) { }
}
export class QuerySuccessAction implements Action {
    readonly type = ActionTypes.QUERY_SUCCESS;
    constructor(public payload: LocationAutocomplete[]) { }
}
export class QueryFailureAction implements Action {
    readonly type = ActionTypes.QUERY_FAILURE;
    constructor(public payload: Error) { }
}


export type Actions
    = QueryAction | QuerySuccessAction | QueryFailureAction
    ;