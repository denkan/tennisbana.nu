import { Action } from '@ngrx/store';

import { type } from '../utils';
import { AccessToken, Location } from '~_shared/models';
import * as fromPersistedData from './persisted-data.reducer';


export const ActionTypes = {

    SAVE_LOCATION:       type('PERSISTED_DATA.SAVE_LOCATION'),
    RESTORE_LOCATION:    type('PERSISTED_DATA.RESTORE_LOCATION'),

    RESTORE_ALL:         type('PERSISTED_DATA.RESTORE_ALL'),
};


export class SaveLocationAction implements Action {
    readonly type = ActionTypes.SAVE_LOCATION;
    constructor(public payload: Location) { }
}
export class RestoreLocationAction implements Action {
    readonly type = ActionTypes.RESTORE_LOCATION;
    constructor(public payload: string) { }
}

export class RestoreAllAction implements Action {
    readonly type = ActionTypes.RESTORE_ALL;
    constructor(public payload: fromPersistedData.State) { }
}

export type Actions
    = SaveLocationAction | RestoreLocationAction
    | RestoreAllAction
    ;

