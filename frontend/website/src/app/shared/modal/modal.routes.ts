import { Routes, Route } from "@angular/router";
import { Component, Type } from "@angular/core";

import { ModalComponent } from "./modal.component";



export function modalRoute(path: string, component: Type<any>, dialogOptions?: any): Route {
    return <Route>{
        path,
        component: ModalComponent,
        outlet: 'o',
        data: {
            modalComponent: component,
            dialogOptions,
        }
    }
}

export const globalModalRoutes: Routes = [
    // modalRoute('login', LoginComponent, 'sm'),
    // modalRoute('logout', LogoutComponent, 'xs'),
    // modalRoute('ad/:id/form', AdFormModalComponent, 'sm'),
    /*
    modalRoute('login', LoginComponent) = {
        path: 'login',
        component: ModalComponent,
        outlet: 'o',
        data: { modalComponent: LoginComponent }
    },
    */
]
