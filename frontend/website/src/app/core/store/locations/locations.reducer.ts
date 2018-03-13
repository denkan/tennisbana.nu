import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Location } from '~_shared/models';
import * as lActions from './locations.actions';


export const featureName = 'locations';

export interface State extends EntityState<Location> {
    currentId: string | null;
};

export const entityAdapter = createEntityAdapter<Location>()

export const initialState: State = entityAdapter.getInitialState({
    currentId: null,
});

export function reducer(state = initialState, action: lActions.Actions): State {

    switch (action.type) {

        case lActions.ActionTypes.FETCH_ONE_SUCCESS: {
            const item = (<lActions.FetchOneSuccessAction>action).payload;
            return {
                ...entityAdapter.addOne(item, state),
                currentId: item.id
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

export const selectCurrentId = createSelector(selectState, s => s.currentId);
export const selectCurrentEntity = createSelector(
    selectEntities, 
    selectCurrentId,
    (entities, currentId) => currentId && entities[currentId]
);


