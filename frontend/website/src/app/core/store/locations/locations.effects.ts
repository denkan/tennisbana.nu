import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import * as lActions from './locations.actions';
import * as fromRootStore from '../root-store.reducers';
import * as fromLocations from './locations.reducer';
import { LocationsService } from './locations.service';



@Injectable()
export class LocationsEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRootStore.State>,
        private locations: LocationsService
    ) { }

    @Effect() fetchOne$: Observable<Action> = this.actions$.pipe(
        ofType<lActions.FetchOneAction>(lActions.ActionTypes.FETCH_ONE),
        map(action => action.payload),
        withLatestFrom(
            this.store$.pipe(select(fromLocations.selectEntities))
        ),
        switchMap(([id, entities]) => {
            if(!id) {
                return empty();
            }

            if(entities[id]) {
                return of(new lActions.FetchOneSuccessAction(entities[id]));
            }
            
            return this.locations.getById$(id)
                .pipe(
                    map(result => new lActions.FetchOneSuccessAction(result)),
                    catchError(err => of(new lActions.FetchOneFailureAction(err)))
                );
        }),
    );

}