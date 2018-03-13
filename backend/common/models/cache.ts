import { Model } from '@mean-expert/model';
/**
 * @module Cache
 * @description
 * Cache functionality
 * For now, memory only. In future, Redis.
 **/
@Model({})
class Cache {
  private $cacheHash: { [key: string]: any };

  constructor(public model: any) {
    this.model['$cacheHash'] = this.$cacheHash = {};
    this.model['get'] = this.get;
    this.model['set'] = this.set;
    this.model['createContainer'] = this.createContainer;
  }

  get(key: string) {
    key = (key+'').toUpperCase();
    return this.$cacheHash[key];
  }

  set(key: string, value: any) {
    key = (key+'').toUpperCase();
    this.$cacheHash[key] = value;
  }

  createContainer(name: string) {
    const keyName = (key: string) => `${name}.${key}`;

    return {
      get: (key: string) => this.get(keyName(key)),
      set: (key: string, value: any) => this.set(keyName(key), value)
    }
  }
}

module.exports = Cache;
