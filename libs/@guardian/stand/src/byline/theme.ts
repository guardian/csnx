import type { DeepPartial } from './util';

type BylineTheme = {
	editor: {
		color: string;
		border: string;
		background: string;
		chip: {
			color: string;
			border: string;
			padding: string;
			borderRadius: string;
			taggedBackground: string;
			untagged: {
				color: string;
			};
			selected: {
				border: string;
			};
		};
		placeholder: {
			color: string;
		};
	};
	dropdown: {
		background: string;
		border: string;
		li: {
			color: string;
			borderBottom: string;
			selected: {
				background: string;
				color: string;
			};
		};
	};
};

export type PartialBylineTheme = DeepPartial<BylineTheme>;
