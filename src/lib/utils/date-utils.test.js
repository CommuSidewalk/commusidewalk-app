import { describe, expect, it } from 'vitest';
import { isValidISODateString } from './date-utils';

describe.concurrent('test isValidISODateString', () => {
	it('should return true for valid iso string', () => {
		expect(isValidISODateString('2022-02-04')).toBeTruthy();
	});
	it('should return false for invalid iso string', () => {
		expect(isValidISODateString('2022/02/04')).toBeFalsy();
		expect(isValidISODateString('hello world')).toBeFalsy();
	});
});
