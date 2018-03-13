import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import * as fromRootStore from '../root-store.reducers';
import * as pdActions from './persisted-data.actions';
import * as lActions from '../locations/locations.actions';
import * as fromLocations from '../locations/locations.reducer';
import { } from '~_shared/models';



@Injectable()
export class PersistedDataEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRootStore.State>
    ) { }



    @Effect()
    $saveLocation: Observable<Action> = this.actions$.pipe(
        ofType<lActions.FetchOneSuccessAction>(lActions.ActionTypes.FETCH_ONE_SUCCESS),
        map(action => action.payload),
        map(location => new pdActions.SaveLocationAction(location)),
    );

    @Effect()
    $restoreLocation: Observable<Action> = this.actions$.pipe(
        ofType<pdActions.RestoreLocationAction>(pdActions.ActionTypes.RESTORE_LOCATION),
        map(action => action.payload),
        switchMap(locationId => {
            if(!locationId) return empty();
            return of(new lActions.FetchOneAction(locationId));
        }),
    );


    @Effect()
    $restoreAll: Observable<Action> = this.actions$.pipe(
        ofType<pdActions.RestoreAllAction>(pdActions.ActionTypes.RESTORE_ALL),
        map(action => action.payload),
        switchMap(s => [
            new pdActions.RestoreLocationAction(s.locationId),
        ]),
    );


}
