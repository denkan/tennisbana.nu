import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import * as C from './components';
import { RootStoreModule } from '~/core/store/root-store.module';
import { MaterialModule, ModalModule } from '~/shared';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        RootStoreModule,
        MaterialModule,
        ModalModule,
    ],
    declarations: [
        C.BaseShellComponent,
        C.SiteHeaderComponent,
        C.SiteFooterComponent,
        C.SiteNavComponent,
    ],
    exports: [
        C.BaseShellComponent,
    ],
    providers: [

    ],
})
export class CoreModule {}
