// DO NOT EDIT
// this file is auto-generated by libs/@guardian/source/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { IconProps } from '../..';
import { iconSize, visuallyHidden } from '../../../foundations';

const Svg = ({ size, theme }: IconProps) => (
	<svg
		width={size ? iconSize[size] : undefined}
		height={undefined}
		viewBox="-3 -3 30 30"
		xmlns="http://www.w3.org/2000/svg"
		focusable={false}
		aria-hidden={true}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="m20.427 3.484-1.841-1.6-1.03 1.265 2.174 1.102zM8.072 2.45l-1.1-.458-.868 2.07L7.8 4.22zm11.192 14.01-1.207 1.094 1.087 1.214.957-1.373zm.744-6.249 2.382-.5.184 1.021-2.19 1.068zm-5.344 3.7.113.468c.063.277.094.629.094.965a7 7 0 0 1-.7-.262c-.937-.42-2.136-1.252-3.314-2.43-1.179-1.178-2.01-2.377-2.43-3.315-.099-.22-.185-.5-.224-.712.734.07 1.203.203 1.83.445l.469-1.004c-1.617-.99-3.037-1.304-3.667-.673a1.1 1.1 0 0 0-.282.522l-4 12.333L3.6 21.264l12.066-4.329q.265-.08.449-.261c.536-.537.39-1.644-.276-2.958zm.462-6.442c.801-.737 2.194-.795 3.05.059 1.007 1.005.575 2.417-.417 3.41 0 0-.269-.176-.57-.442s-.485-.488-.485-.488c.38-.34.898-1.033.453-1.477-.215-.215-.664-.401-1.072-.062-.407.339-.347 1.192.112 1.734 1.196 1.412 2.844 2.275 4.469 3.078l-.621 1.333c-1.828-.904-3.02-1.719-3.96-2.505-1.262-1.054-2.412-3.304-.96-4.64m-.959 3.842c-.496.168-1.139.385-1.485.439l.224 1.192c.86-.134 1.725-.376 2.517-.699 0 0-.218-.223-.437-.528-.218-.305-.352-.559-.352-.559-.121.038-.284.093-.467.155m-.96-3.248c-.105 1.022-.755 1.953-1.812 3.312l-.954-.749c.912-1.172 1.2-2.044 1.268-2.703.06-.589-.041-1.057-.155-1.581q-.029-.129-.056-.262c-.126-.606-.257-1.42.328-2.213.516-.7 1.5-1.252 3.039-1.817l.56 1.525c-.108.04-.25.087-.41.14-.504.168-1.181.394-1.495.598-.687.444-.557 1.306-.418 2.231.076.507.155 1.032.105 1.519M8.994 6.25a.813.813 0 1 0 0-1.625.813.813 0 0 0 0 1.625m-3.812.813a.813.813 0 1 1-1.625 0 .813.813 0 0 1 1.625 0m14.812.187a.813.813 0 1 0 0-1.625.813.813 0 0 0 0 1.625"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgPartyPopperFilled = ({
	size,
	theme,
	isAnnouncedByScreenReader = false,
}: IconProps) => (
	<>
		<Svg size={size} theme={theme} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				Celebration
			</span>
		) : (
			''
		)}
	</>
);
