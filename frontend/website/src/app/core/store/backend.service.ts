import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { AccessToken } from '~_shared/models';
import * as fromRootStore from './root-store.reducers';

@Injectable()
export class BackendService {

    private _baseUrl: string = 'http://localhost:3000/api';
    private _userAuth: AccessToken;

    get baseUrl(): string {
        return this._baseUrl;
    }

    constructor(
        private http: HttpClient,
        private store: Store<fromRootStore.State>,
    ) {
    }

    url(url: string): string {
        url = url || '';
        url = url.replace(/\\/g, '/');

        if (url.length && url.substring(0, 1) !== '/')
            url = '/' + url;

        return this.baseUrl + url;
    }

    defaultOptions(options?: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': (this._userAuth || <AccessToken>{}).id || '',
        });

        let allOptions = { headers };
        Object.assign(allOptions, options);
        return allOptions;
    }

    get<T>(url: string, options?: any) {
        return this.http.get<T>(this.url(url), this.defaultOptions(options));
    }
    post<T>(url: string, body: any, options?: any) {
        return this.http.post<T>(this.url(url), body, this.defaultOptions(options));
    }
    put<T>(url: string, body: any, options?: any) {
        return this.http.put<T>(this.url(url), body, this.defaultOptions(options));
    }
    patch<T>(url: string, body: any, options?: any) {
        return this.http.patch<T>(this.url(url), body, this.defaultOptions(options));
    }
    delete<T>(url: string, body: any, options?: any) {
        return this.http.delete<T>(this.url(url), this.defaultOptions(options));
    }

}
