import { beforeEach, describe, expect, it, vi } from 'vitest';
import TimeCache from './timer-cache';

describe.concurrent('test TimerCache', () => {
	/** @type TimeCache */
	let cache;
	beforeEach(() => {
		cache = new TimeCache();
	});

	vi.useFakeTimers();
	it('should set and get a value from the cache', () => {
		cache.set('key', 1, 10);
		vi.advanceTimersByTime(5);
		expect(cache.get('key')).toBe(1);
	});

	it('should return undefined for expired cache entry', () => {
		cache.set('key', 1, 10);
		vi.advanceTimersByTime(11);
		expect(cache.get('key')).toBeUndefined();
	});

	it('should be valid when given ttl unit', () => {
		cache.set('key', 1, 10, TimeCache.SECONDS);
		vi.advanceTimersByTime(1000 * 9);
		expect(cache.get('key')).toBe(1);
		vi.advanceTimersByTime(1000 * 1);
		expect(cache.get('key')).toBeUndefined();
	});
});
