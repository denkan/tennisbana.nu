import { Model } from '@mean-expert/model';
import { pick, merge } from 'lodash';

/**
 * @module Location
 * @description
 * Search locations by Google Maps
 **/
@Model({
  hooks: {},
  remotes: {
    fetchAutocompleteFromGoogle: {
      accepts: [
        { arg: 'q', type: 'string' },
        { arg: 'fromPos', type: 'string' },
        { arg: 'ctx', type: 'object', http: { source: 'context' } },
      ],
      returns: { root: true, type: 'array' },
      http: { path: '/search/autocomplete', verb: 'get' }
    },
    getOrFetch: {
      accepts: [
        { arg: 'id', type: 'string' },
        { arg: 'ctx', type: 'object', http: { source: 'context' } },
      ],
      returns: { root: true, type: 'array' },
      http: { path: '/search/:id', verb: 'get' }
    }
  }
})
class Location {

  constructor(public model: any) { }


  getOrFetch(id: string, ctx: any, next: Function) {
    this.model.findById(id, (err, location) => {
      // found in own db
      if (location) return next(null, location);

      // not found - fetch from google and save to db
      this.fetchDetailsFromGoogle(id, ctx, (err, fetchedDetails) => {
        if (err) return next(err);
        const newAddress = {
          id: fetchedDetails.place_id,
          title: fetchedDetails.title,
          details: fetchedDetails,
          detailsOrigin: 'google',
          location: ((fetchedDetails || {}).geometry || {}).location,
        }
        this.model.replaceOrCreate(newAddress, next);
      });
    });

    function _getSlug(fetchedDetails: any) {

    }
  }

  /**
   * Search place by string input
   * @param q 
   * @param ctx
   * @param next 
   */
  fetchAutocompleteFromGoogle(q: string, fromPos: string, ctx: any, next: Function): void {

    const cache = this.model.app.models.Cache.createContainer('location.search'),
      cacheKey = `[${fromPos}]${q}`,
      cachedResults = cache.get(cacheKey);

    if (cachedResults) {
      return next(null, cachedResults);
    }

    const GoogleMapsSdk = this.model.app.models.GoogleMaps.sdk();
    const defaultOptions = {
      input: q,
      location: fromPos,
      language: 'sv',
      radius: 1000, // 1 km
      types: '(regions)',
      components: { country: 'se' }
    };
    const validOptions = pick(ctx.req.query, ['location']);
    const searchOptions = merge({}, defaultOptions, validOptions);

    GoogleMapsSdk.placesAutoComplete(searchOptions)
      .asPromise()
      .then(_filterAndCacheData)
      .catch(next);

    function _filterAndCacheData(googleData: any) {
      let results = ((googleData.json) || {}).predictions || [];
      results = results.map(r => {
        //r = pick(r, ['id', 'description', 'place_id']);
        //r.description = r.description.split(', ').slice(0, -1).join(', ');
        r.title = _formattedTitle(r);
        return r;
      });
      cache.set(cacheKey, results);
      next(null, results);
    }

    function _formattedTitle(googleDetails: any) {
      const isPostalCode = googleDetails.types.indexOf('postal_code') >= 0;
      return isPostalCode
        ? `${googleDetails.terms[1].value} (${googleDetails.terms[0].value})`
        : googleDetails.terms[0].value + (googleDetails.terms.length > 2 ? `, ${googleDetails.terms[1].value}` : '');
    }
  }

  /**
   * Geocode (search lat/lng) by placeid (retrieved from searchLocations)
   * @param placeId 
   * @param ctx 
   * @param next 
   */
  fetchDetailsFromGoogle(placeId: string, ctx: any, next: Function) {
    const cache = this.model.app.models.Cache.createContainer('location.geocode'),
      cachedResults = cache.get(placeId);

    if (cachedResults) {
      return next(null, cachedResults);
    }

    const GoogleMapsSdk = this.model.app.models.GoogleMaps.sdk();
    const defaultOptions = {
      placeid: placeId,
      language: 'sv',
    };
    const validOptions = pick(ctx.req.query, []);
    const searchOptions = merge({}, defaultOptions, validOptions);

    GoogleMapsSdk.place(searchOptions)
      .asPromise()
      .then(_filterAndCacheData)
      .catch(next);

    function _filterAndCacheData(googleData) {
      let result = ((googleData.json) || {}).result || {};
      //result = pick(result, ['id', 'formatted_address', 'geometry', 'place_id']);
      //result.formatted_address = result.formatted_address.split(', ').slice(0, -1).join(', ');
      result = Object.assign(result, _getAddressComponents(result));
      result.title = _formattedTitle(result);
      cache.set(placeId, result);
      cache.set(result.place_id, result);
      next(null, result);
    }

    function _getAddressComponents(googleDetails: any) {
      const addr = googleDetails.address_components;

      const postalCode = (addr.find(x =>
        x.types.indexOf('postal_code') >= 0
      ) ||  {}).long_name;

      const county = (addr.find(x =>
        x.types.indexOf('administrative_area_level_1') >= 0
      ) ||  {}).long_name;

      const city = (addr.find(x =>
        x.types.indexOf('postal_town') >= 0
        ||
        x.types.indexOf('locality') >= 0
      ) ||  {}).long_name;

      const sublocality = (addr.find(x =>
        x.types.indexOf('sublocality_level_1') >= 0
      ) ||  {}).long_name;

      return { city, postalCode, county, sublocality };
    }

    function _formattedTitle(googleDetails: any) {
      const a = googleDetails.city ? googleDetails : _getAddressComponents(googleDetails);

      let title = a.city ||  googleDetails.formatted_address;
      title = a.postalCode  ? `${title} (${a.postalCode})` : 
              a.sublocality ? `${a.sublocality}, ${title}` : 
              a.county      ? `${title}, ${a.county}` : 
              title;
              
      return title;
    }
  }

}

module.exports = Location;


