import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { rootReducers, metaReducers } from './root-store.reducers';
import { rootEffects } from './root-store.effects';
import { rootServices } from './root-store.services';


@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        StoreModule.forRoot(rootReducers, {metaReducers}),
        EffectsModule.forRoot(rootEffects),
        StoreDevtoolsModule.instrument({
          maxAge: 50,
        }),
    ],
    exports: [

    ],
    providers: [
        ...rootServices,
    ],
})
export class RootStoreModule {}