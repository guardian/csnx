import { helloWorld } from '../alex';
import isString from 'is-string';

if (isString('this string')) {
	helloWorld();
}
