import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap, catchError, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as laActions from './location-autocompletes.actions';
import * as fromRootStore from '../root-store.reducers';
import * as fromLocationAutocompletes from './location-autocompletes.reducer';
import { LocationAutocompletesService } from './location-autocompletes.service';

@Injectable()
export class LocationAutocompletesEffects {
    constructor(
        private actions$: Actions,
        private store$: Store<fromRootStore.State>,
        private laService: LocationAutocompletesService,
    ) { }

    @Effect() query$: Observable<Action> = this.actions$.pipe(
        ofType<laActions.QueryAction>(laActions.ActionTypes.QUERY),
        map(action => action.payload),
        debounceTime(300),
        distinctUntilChanged(),
        withLatestFrom(
            this.store$.pipe(select(fromLocationAutocompletes.selectState))
        ),
        switchMap(([queryPayload, state]) => {
            const q = queryPayload.query.trim().toLowerCase();
            const qkey = queryPayload.asKey();

            if (q.length < 2) return empty();

            if (state.queries[qkey]) {
                // pass already loaded
                return of(new laActions.QuerySuccessAction(
                    state.queries[qkey].map(id => state.entities[id])
                ));
            }

            return this.laService
                .query$(queryPayload.query, queryPayload.fromPos)
                .pipe(
                    map(results => new laActions.QuerySuccessAction(results)),
                    catchError(err => of(new laActions.QueryFailureAction(err)))
                );
        })
    );
}