/**
 * Represents a time-based cache.
 * @class
 */
export default class TimeCache {
  /**
   * The unit conversion factors for different time units.
   * @type {number}
   * @static
   */
  static MILLISECONDS = 1;
  static SECONDS = this.MILLISECONDS * 1000;
  static MINUTES = this.SECONDS * 60;
  static HOURS = this.MINUTES * 60;
  static DAYS = this.HOURS * 24;

  /**
   * Creates a new instance of TimeCache.
   * @constructor
   */
  constructor() {
    /** @private */
    this.cache = new Map();
  }

  /**
   * Sets a key-value pair in the cache with a specified time-to-live (TTL).
   * @param {string} key - The key for the cache entry.
   * @param {*} value - The value to be cached.
   * @param {number} ttl - The time-to-live (TTL) for the cache entry.
   * @param {number} [unit=TimeCache.MILLISECONDS] - The unit of time for the TTL. 
   *        Defaults to milliseconds.
   */
  set(key, value, ttl, unit = TimeCache.MILLISECONDS) {
    this.cache.set(key, value);
    setTimeout(() => this.cache.delete(key), ttl * unit);
  }

  /**
   * Retrieves the value associated with the specified key from the cache,
   * if it exists and has not expired.
   * @param {string} key - The key for the cache entry.
   * @returns {*} The value associated with the key, or undefined if not found or expired.
   */
  get(key) {
    return this.cache.get(key);
  }
}
