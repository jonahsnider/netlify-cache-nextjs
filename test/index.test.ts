import test from 'ava';
import {helloWorld} from '../src';

test('hello world', t => {
	t.is(helloWorld(), 'Hello, world.', 'says hello world when subject is not provided');
	t.is(helloWorld('TypeScript'), 'Hello, TypeScript.', 'uses subject param when provided');
});
