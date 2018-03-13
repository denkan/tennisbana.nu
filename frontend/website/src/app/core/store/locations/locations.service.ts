import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { BackendService } from '~/core/store/backend.service';
import { LatLng, Location } from '~_shared/models';

@Injectable()
export class LocationsService {

    constructor(
        private backend: BackendService,
    ) { }

    getById$(id: string) {
        return this.backend.get<Location>(
            `locations/search/${id}`
        );
    }
}