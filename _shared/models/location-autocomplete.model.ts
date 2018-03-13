import { LatLng } from './lat-lng.model';

export interface LocationAutocompleteInterface {
  id?: string;
  title?: string;
  matched_substring?: { length?: number, offset?: number }[];
  place_id?: string;
  reference?: string;
  structured_formatting?: {
    main_text?: string,
    main_text_matched_substrings?: { length?: number, offset?: number }[],
    secondary_text?: string
  };
  terms?: { offset?: number, value?: string }[];
  types?: string[];
}

export class LocationAutocomplete implements LocationAutocompleteInterface {
  id: string;
  title: string;
  matched_substring: { length?: number, offset?: number }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text?: string,
    main_text_matched_substrings?: { length?: number, offset?: number }[],
    secondary_text?: string
  };
  terms: { offset?: number, value?: string }[];
  types: string[];

  constructor(data?: LocationAutocompleteInterface) {
    Object.assign(this, data);
  }
}


export class LocationAutocompletePayload {
  query: string;
  fromPos: LatLng;

  constructor(query?: string, fromPos?: LatLng) {
    this.query = query;
    this.fromPos = fromPos;
  }

  asKey() {
    return (this.query || '') + ':' + (this.fromPos || '').toString();
  }
}
