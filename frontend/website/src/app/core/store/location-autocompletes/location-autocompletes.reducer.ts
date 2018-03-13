import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LocationAutocomplete, LocationAutocompletePayload, LatLng } from '~_shared/models';
import * as laActions from './location-autocompletes.actions';


export const featureName = 'locationAutocompletes';

export interface State extends EntityState<LocationAutocomplete> {
    queryPayload: LocationAutocompletePayload | null;
    queries: { [queryAsKey: string]: string[] };
};

export const entityAdapter = createEntityAdapter<LocationAutocomplete>()

export const initialState: State = entityAdapter.getInitialState({
    queryPayload: null,
    queries: {},
});

export function reducer(state = initialState, action: laActions.Actions): State {

    switch (action.type) {

        case laActions.ActionTypes.QUERY: {
            const queryPayload = (<laActions.QueryAction>action).payload;
            return { ...state, queryPayload };
        }

        case laActions.ActionTypes.QUERY_SUCCESS: {
            const results = (<laActions.QuerySuccessAction>action).payload;
            const queries = {
                ...state.queries,
                [state.queryPayload.asKey()]: results.map(r => r.id),
            }
            return {
                ...entityAdapter.addMany(results, state),
                queries,
            };
        }

        default: {
            return state;
        }
    }
}


export const selectState = createFeatureSelector<State>(featureName);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = entityAdapter.getSelectors(selectState);

export const selectQueryPayload = createSelector(selectState, s => s.queryPayload);
export const selectQueries = createSelector(selectState, s => s.queries);
export const selectQueriesWithEntities = createSelector(
    selectEntities,
    selectQueries,
    (entities, queries) => {
        const queriesWithEntities: { [q: string]: LocationAutocomplete[] } = {};
        Object.keys(queries).map(q => {
            queriesWithEntities[q] = queries[q].map(id => entities[id]);
        });
        return queriesWithEntities;
    }
);
export const selectQueryResults = createSelector(
    selectEntities,
    selectQueries,
    selectQueryPayload,
    (entities, queries, queryPayload) => {
        return queryPayload
            && (queries[queryPayload.asKey()] || []).map(id => entities[id]);
    }
);