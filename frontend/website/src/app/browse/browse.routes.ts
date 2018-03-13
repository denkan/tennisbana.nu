import { Routes } from "@angular/router";

import { BrowseComponent } from "./browse.component";

export const startRouteId = 'sverige';

export const routes: Routes = [
    { 
        path: ':id?', 
        component: BrowseComponent,
    },
    { path: '', redirectTo: startRouteId, pathMatch: 'full' }
]