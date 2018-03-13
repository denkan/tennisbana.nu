import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { BackendService } from '../backend.service';
import { LatLng, LocationAutocomplete } from '~_shared/models';

@Injectable()
export class LocationAutocompletesService {

    constructor(
        private backend: BackendService,
    ) { }

    query$(q: string, fromPos: LatLng) {
        return this.backend.get<LocationAutocomplete[]>(
            'locations/search/autocomplete', 
            { params: { q, fromPos } }
        );
    }
}