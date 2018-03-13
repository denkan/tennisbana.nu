import { Routes } from "@angular/router";
import { ModalComponent } from "~/shared/modal/modal.component";
import { globalModalRoutes } from "~/shared/modal";


export const routes: Routes = [
    { path: 'sa-funkar-det', loadChildren: './pages/how-it-works/how-it-works.module#HowItWorksModule' },
    { path: 'om-oss', loadChildren: './pages/about/about.module#AboutModule' },
    { path: 'i', loadChildren: './browse/browse.module#BrowseModule' },
    { path: '', redirectTo: 'i', pathMatch: 'full' },
    ...globalModalRoutes,
]
