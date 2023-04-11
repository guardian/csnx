/** Common Guardian blue label. Do not edit */
const commonStyle = /** @type {const} */ ({
	common: {
		background: '#052962',
		font: '#ffffff',
	},
});

/**
 * You can only subscribe to teams from this list.
 * Add your team name below to start logging.
 *
 * Make sure your label has a contrast ratio of 4.5 or more.
 * */
const teamStyles = /** @type {const} */ ({
	commercial: {
		background: '#77EEAA',
		font: '#004400',
	},
	cmp: {
		background: '#FF6BB5',
		font: '#2F0404',
	},
	dotcom: {
		background: '#000000',
		font: '#ff7300',
	},
	design: {
		background: '#185E36',
		font: '#FFF4F2',
	},
	tx: {
		background: '#2F4F4F',
		font: '#FFFFFF',
	},
	supporterRevenue: {
		background: '#0F70B7',
		font: '#ffffff',
	},
	identity: {
		background: '#6F5F8F',
		font: '#ffffff',
	},
});

/** @typedef {keyof typeof teamStyles} TeamName */
/** @typedef {TeamName | keyof typeof commonStyle} TeamStyle */

/** @type {(team: string) => team is TeamName} */
const isTeam = (team) => team in teamStyles;

export { commonStyle, teamStyles, isTeam };
