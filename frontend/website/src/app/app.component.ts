import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { first } from 'rxjs/operators';

import * as fromRootStore from './core/store/root-store.reducers';
import * as fromPersistedData from './core/store/persisted-data';

@Component({
  selector: 'app-root',
  template: `
    <app-base-shell>
      <router-outlet></router-outlet>
    </app-base-shell>
    <router-outlet name="o"></router-outlet>
  `,
  styleUrls: []
})
export class AppComponent {

  constructor(
    private store: Store<fromRootStore.State>,
  ) {

    // on first load, run restore job from persisted data
    store.pipe(
      select(fromPersistedData.selectState),
      first(),
    ).subscribe(data => 
      store.dispatch(new fromPersistedData.RestoreAllAction(data))
    );
  }

}
