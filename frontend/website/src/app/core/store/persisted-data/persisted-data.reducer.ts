import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as pdActions from './persisted-data.actions';
import { AccessToken } from '~_shared/models';


export const featureName = 'persistedData';

export class State {
    auth: AccessToken;
    locationId: string;
};

export const initialState: State = {
    auth: null,
    locationId: null,
};

export function reducer(state = initialState, action: pdActions.Actions): State {

    switch (action.type) {

        case pdActions.ActionTypes.SAVE_LOCATION: {
            const location = (<pdActions.SaveLocationAction>action).payload;
            return { ...state, locationId: location.id };
        }

        default: {
            return state;
        }
    }
}


export const selectState = createFeatureSelector<State>(featureName);
export const selectAuth = createSelector(selectState, s => s.auth);
