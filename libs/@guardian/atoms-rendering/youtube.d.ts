import type { google } from './src/ima';
import type { ImaManager } from './src/YoutubeAtomPlayer';

declare global {
	interface Window {
		/**
		 * Here we want to type the google object that will be added to window.
		 * Since the imported google namespace is a value rather than a type, use typeof.
		 */
		google: typeof google;
		YT: {
			ImaManager: typeof ImaManager;
		};
	}
}
