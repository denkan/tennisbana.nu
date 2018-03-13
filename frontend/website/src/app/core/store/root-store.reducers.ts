import { combineReducers, createFeatureSelector, ActionReducerMap, ActionReducer, MetaReducer, createSelector } from "@ngrx/store";
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromLocationAutocompletes from "./location-autocompletes";
import * as fromLocations from "./locations";
import * as fromPersistedData from "./persisted-data";


export interface State {
    locationAutocompletes: fromLocationAutocompletes.State
    locations: fromLocations.State,
    persistedData: fromPersistedData.State,
}

export const rootReducers: ActionReducerMap<State> = {
    locationAutocompletes: fromLocationAutocompletes.reducer,
    locations: fromLocations.reducer,
    persistedData: fromPersistedData.reducer,
};

export const selectState = (s: State) => s;


/**
 * Setup automatically persisted data by localStorage
 * @param reducer
 */
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: ['persistedData'],
        rehydrate: true,
    })(reducer);
}


export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
