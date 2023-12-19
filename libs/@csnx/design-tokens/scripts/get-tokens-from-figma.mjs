import fs from 'fs';
var myHeaders = new Headers();
myHeaders.append('X-FIGMA-TOKEN', process.env.FIGMA_TOKEN);

const requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow',
};
function componentToHex(c) {
	const hex = c.toString(16);
	return hex.length === 1 ? '0' + hex : hex;
}
function rgbToHex(r, g, b) {
	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
const colours = [];
await fetch(
	'https://api.figma.com/v1/files/pFyKEeR5PLCA3ZuUEOiXoR/variables/local',
	requestOptions,
)
	.then((response) => response.text())
	.then((result) => {
		const data = JSON.parse(result);
		Object.values(data.meta.variables).forEach((variable) => {
			const name = variable.name.split('/')[2];
			const category = name.substr(0, name.lastIndexOf('-'));
			const nameArray = name.split('-');
			const value = nameArray.slice(-1);
			const rgbValues = variable.valuesByMode?.['4:0'];
			const red = Math.round(rgbValues.r * 255);
			const green = Math.round(rgbValues.g * 255);
			const blue = Math.round(rgbValues.b * 255);
			const rgb = { red, green, blue };
			const hex = rgbToHex(red, green, blue);
			colours.push({ category, value, rgb, hex });
		});
	})
	.catch((error) => console.log('error', error));

const restructuredColors = colours.reduce((acc, cur) => {
	const category = cur.category;
	const newEntry = {};
	newEntry[cur.value] = cur.hex;
	if (!(category in acc)) {
		acc[category] = {};
	}
	acc[category][cur.value] = { $value: cur.hex };
	return acc;
}, {});

const colourObject = {
	palette: {
		$type: 'color',
		...restructuredColors,
	},
};

fs.writeFile(
	'palette.tokens.json',
	JSON.stringify(colourObject, null, 2),
	'utf8',
	() => {},
);
