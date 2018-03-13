import { LocationAutocompletesEffects } from "./location-autocompletes";
import { LocationsEffects } from "./locations";
import { PersistedDataEffects } from "./persisted-data";

export const rootEffects = [
    LocationAutocompletesEffects,
    LocationsEffects,
    PersistedDataEffects,
]
