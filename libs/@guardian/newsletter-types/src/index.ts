export * from './@types/';

export type TestType = 'red' | 'blue';
export const valids: TestType[] = ['red', 'blue'];
export const testValidate = (input: unknown): input is TestType =>
	typeof input === 'string' && (valids as string[]).includes(input);
