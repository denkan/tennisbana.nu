import { BackendService } from "./backend.service";
import { LocationAutocompletesService } from "./location-autocompletes";
import { LocationsService } from "./locations";

export const rootServices = [
    BackendService,
    LocationAutocompletesService,
    LocationsService,
]
