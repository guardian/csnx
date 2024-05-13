import type { TransformOptions } from '@babel/core';
import { transform } from '@svgr/core';
import type { Config } from '@svgr/core';
import { labels } from '../../src/icons/labels';

// SVGR uses babel under the hood to create the jsx
// this is our custom transform for it to use
const createBabelConfig = ({ retainFill }: { retainFill: boolean }) => {
	const babelConfig: TransformOptions = {};
	const plugins = [];

	// remove fill attribute from all icons except those with special fill colours
	if (!retainFill) {
		plugins.push([
			'@svgr/babel-plugin-remove-jsx-attribute',
			{
				elements: ['svg', 'path'],
				attributes: ['fill'],
			},
		]);
		plugins.push([
			'@svgr/babel-plugin-add-jsx-attribute',
			{
				elements: ['path'],
				attributes: [
					{
						name: 'fill',
						value: 'theme?.fill',
						spread: false,
						literal: true,
						position: 'end',
					},
				],
			},
		]);
	}

	// replace viewbox with legacy 30x30 viewbox
	// TODO: a future version of Source should expose icons with the viewboxes
	// defined in Figma
	plugins.push([
		'@svgr/babel-plugin-replace-jsx-attribute-value',
		{
			values: [
				{ value: '0 0 24 24', newValue: '-3 -3 30 30' },
				// legacy 50x20 wide viewbox
				{ value: '0 0 48 24', newValue: '-1 2 50 20' },
			],
		},
	]);

	if (plugins.length === 0) {
		return {};
	}

	babelConfig.plugins = plugins;

	return babelConfig;
};

type CreateIconComponentProps = {
	icon: { name: string; svg: string };
	retainFill: boolean;
	isWideIcon: boolean;
};
export const createIconComponent = async ({
	icon,
	retainFill,
	isWideIcon,
}: CreateIconComponentProps) => {
	// SVGR template
	// https://react-svgr.com/docs/node-api/
	const template: Config['template'] = (variables, { tpl }) => {
		if (!retainFill) {
			return tpl`
			import { css } from '@emotion/react';

			import { iconSize, visuallyHidden } from '@guardian/source-foundations';
			import type { IconProps } from '../..';

			${variables.imports};

			const ${variables.componentName} = ({
				size,
				theme,
			}: IconProps) => (
				${variables.jsx}
			);
		  `;
		}
		return tpl`
			import { css } from '@emotion/react';

			import { iconSize, visuallyHidden } from '@guardian/source-foundations';
			import type { IconProps } from '../..';

			${variables.imports};

			const ${variables.componentName} = ({
				size,
			}: IconProps) => (
				${variables.jsx}
			);
		  `;
	};

	const svgProps = {
		focusable: '{false}',
		'aria-hidden': '{true}',
		width: isWideIcon ? '{undefined}' : '{size ? iconSize[size] : undefined}',
		height: isWideIcon ? '{size ? iconSize[size] : undefined}' : '{undefined}',
	};

	const svgComponentName = 'Svg';

	const iconComponentName =
		'Svg' +
		icon.name
			.split('-')
			.map((s) => {
				const [firstLetter, ...rest] = s;
				if (firstLetter) {
					return firstLetter.toLocaleUpperCase() + rest.join('');
				}
				return s;
			})
			.join('');

	const iconComponent = await transform(
		icon.svg,
		{
			icon: true,
			plugins: [
				'@svgr/plugin-svgo',
				'@svgr/plugin-jsx',
				'@svgr/plugin-prettier',
			],
			jsx: {
				babelConfig: createBabelConfig({ retainFill }),
			},
			svgoConfig: {
				plugins: [
					{ name: 'cleanupIds', params: { minify: true } },
					{ name: 'prefixIds', params: { prefix: icon.name } },
					{ name: 'convertPathData' },
				],
			},
			typescript: true,
			jsxRuntime: 'automatic',
			expandProps: false,
			svgProps,
			template,
		},
		{
			componentName: svgComponentName,
		},
	);

	const label = labels[icon.name];

	if (!label) {
		// This error is thrown when the accessible label data for the icon is missing in Figma.
		throw new Error(
			`Warning: No accessible label found for ${icon.name}! Please double check that it is specified correctly in Figma.`,
		);
	}

	const iconComponentExport = `
		export const ${iconComponentName} = ({
			size,${!retainFill ? '\ntheme,' : ''}
			isAnnouncedByScreenReader = false,
		}: IconProps) => (
			<>
				<${svgComponentName} size={size} ${!retainFill ? 'theme={theme}' : ''} />
				{isAnnouncedByScreenReader ? (
					<span
						css={css\`
							\${visuallyHidden}
						\`}
					>
						${label}
					</span>
				) : (
					''
				)}
			</>
		);`;
	return {
		componentName: iconComponentName,
		component: [iconComponent, iconComponentExport].join('\n'),
	};
};
