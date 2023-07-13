// eslint-disable-next-line @typescript-eslint/ban-types -- Function can be any function callback type
export type EventCallback = Function;

type Event = {
	fn: EventCallback;
	ctx?: unknown;
};

export type EventName =
	| 'added'
	| 'authStateChange'
	| 'removed'
	| 'renew'
	| 'storage';

/**
 * @class Emitter
 * @description A simple event emitter, based on TinyEmitter (https://github.com/scottcorgan/tiny-emitter)
 *
 * Made this class to avoid importing the entire tiny-emitter package, and only use the parts we need.
 */
export class Emitter {
	// List of all events
	#events: Record<string, Event[]>;

	constructor() {
		this.#events = {};
	}

	/**
	 * @name on
	 * @description Used to subscribe to an event by name
	 *
	 * @param name - The name of the event to subscribe to
	 * @param callback - The callback to run when the event is emitted
	 * @param ctx - The context to run the callback in
	 * @returns this - The emitter for chaining purposes
	 */
	public on(name: EventName, callback: EventCallback, ctx?: unknown): this {
		// get the events object
		const events = this.#events;

		// see if an event array already exists for this event name, if not create one
		const eventArr = events[name] ?? (events[name] = []);

		// push the callback and context to the array
		// so that when the event is emitted, the callback can be run
		eventArr.push({
			fn: callback,
			ctx,
		});

		// return the emitter for chaining purposes
		return this;
	}

	/**
	 * @name off
	 * @description Used to unsubscribe from an event by name
	 *
	 * @param name - The name of the event to unsubscribe from
	 * @param callback - The callback to unsubscribe
	 * @returns this - The emitter for chaining purposes
	 */
	public off(name: EventName, callback?: EventCallback): this {
		// get the events object
		const events = this.#events;
		// get the event array for the event name
		const eventArr = events[name];
		// create an array to hold the current live events
		const liveEvents: Event[] = [];

		// if there is an event array, filter out the callback
		if (eventArr && callback) {
			liveEvents.push(...eventArr.filter((event) => event.fn !== callback));
		}

		// if there are live events, set them to the event name, otherwise delete the event name
		liveEvents.length ? (events[name] = liveEvents) : delete events[name];

		// return the emitter for chaining purposes
		return this;
	}

	/**
	 * @name emit
	 * @description Used to emit an event by name
	 *
	 * @param name - The name of the event to emit
	 * @param data - The data to pass to the callback
	 * @returns this - The emitter for chaining purposes
	 */
	public emit(name: EventName, ...data: unknown[]): this {
		// get the event array for the event name, if it exists
		const eventArr = (this.#events[name] ?? []).slice();

		// loop through the event array and run the callback for each event
		eventArr.forEach((event) => {
			event.fn.apply(event.ctx, data);
		});

		// return the emitter for chaining purposes
		return this;
	}
}
