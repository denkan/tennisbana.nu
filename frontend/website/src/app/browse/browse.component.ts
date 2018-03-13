import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRootStore from '~/core/store/root-store.reducers';
import * as fromLocationAutocompletes from '~/core/store/location-autocompletes';
import * as fromLocations from '~/core/store/locations';
import {
  LocationAutocomplete,
  LocationAutocompletePayload,
  Location,
} from '~_shared/models';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  suggestions$: Observable<LocationAutocomplete[]>;
  location$: Observable<Location>;

  ui = {
    editLocation: false,
  }

  constructor(
    private store: Store<fromRootStore.State>
  ) {
    this.suggestions$ = store.pipe(select(fromLocationAutocompletes.selectQueryResults));
    this.location$ = store.pipe(select(fromLocations.selectCurrentEntity));
  }

  ngOnInit() {
  }

  onLocationSearch(q: string) {
    this.store.dispatch(
      new fromLocationAutocompletes.QueryAction(
        new LocationAutocompletePayload(q)
      )
    );
  }
  onLocationSelect(location: LocationAutocomplete) {
    this.store.dispatch(
      new fromLocations.FetchOneAction(location.place_id)
    );
    this.ui.editLocation = false;
  }
  onChangeLocation(){
    this.ui.editLocation = true;
  }

}
