import { Emitter } from '../emitter';

describe('IdentityAuth#Emitter', () => {
	let emitter: Emitter;

	beforeEach(() => {
		emitter = new Emitter();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should subscribe to and emit events', () => {
		const eventName = 'testEvent';
		const eventData = 'testData';
		const callback = jest.fn();

		emitter.on(eventName, callback);

		emitter.emit(eventName, eventData);

		expect(callback).toHaveBeenCalledWith(eventData);
	});

	it('should handle multiple event subscribers', () => {
		const eventName = 'testEvent';
		const eventData = 'testData';
		const callback1 = jest.fn();
		const callback2 = jest.fn();

		emitter.on(eventName, callback1);
		emitter.on(eventName, callback2);

		emitter.emit(eventName, eventData);

		expect(callback1).toHaveBeenCalledWith(eventData);
		expect(callback2).toHaveBeenCalledWith(eventData);
	});

	it('should unsubscribe from events', () => {
		const eventName = 'testEvent';
		const eventData = 'testData';
		const callback = jest.fn();

		emitter.on(eventName, callback);
		emitter.off(eventName, callback);

		emitter.emit(eventName, eventData);

		expect(callback).not.toHaveBeenCalled();
	});

	it('should allow unsubscribing from a specific callback only', () => {
		const eventName = 'testEvent';
		const eventData = 'testData';
		const callback1 = jest.fn();
		const callback2 = jest.fn();

		emitter.on(eventName, callback1);
		emitter.on(eventName, callback2);

		emitter.off(eventName, callback1);

		emitter.emit(eventName, eventData);

		expect(callback1).not.toHaveBeenCalled();
		expect(callback2).toHaveBeenCalledWith(eventData);
	});

	it('should handle unsubscribing from non-existing events', () => {
		const eventName = 'testEvent';
		const callback = jest.fn();

		emitter.off(eventName, callback);

		expect(callback).not.toHaveBeenCalled();
	});

	it('should allow passing a context to the callback', () => {
		const eventName = 'testEvent';
		const eventData = 'testData';
		const callback = jest.fn();

		const context = {
			value: 42,
		};

		emitter.on(eventName, callback, context);

		emitter.emit(eventName, eventData);

		expect(callback).toHaveBeenCalledWith(eventData);
		expect(callback.mock.instances[0]).toBe(context);
	});
});
