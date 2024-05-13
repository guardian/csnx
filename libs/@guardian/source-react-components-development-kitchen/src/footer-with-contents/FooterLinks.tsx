import { ThemeProvider } from '@emotion/react';
import {
	ButtonLink,
	Column,
	Columns,
	Hide,
	Link,
	linkThemeBrand,
} from '@guardian/source/react-components';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import {
	fullWidthContainer,
	getItemStyles,
	getListStyles,
	linkElementStyles,
} from './footerLinksStyles';

type FooterLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
	/**
	 * The URL of the link
	 */
	href: string;
	/**
	 * The visible text of the link
	 */
	text: string;
	/**
	 * A link marked as external will apply rel="noopener noreferrer"
	 */
	isExternal?: boolean;
};

type FooterButton = ButtonHTMLAttributes<HTMLButtonElement> & {
	/**
	 * onClick handler for the link
	 */
	onClick: () => void;
	/**
	 * The visible text of the link
	 */
	text: string;
};

export const defaultGuardianLinks: Array<FooterLink | FooterButton> = [
	{
		href: 'https://www.theguardian.com/info/privacy',
		text: 'Privacy policy',
		isExternal: true,
	},
	{
		href: 'https://www.theguardian.com/help/contact-us',
		text: 'Contact us',
		isExternal: true,
	},
	{
		href: 'https://www.theguardian.com/help',
		text: 'Help centre',
		isExternal: true,
	},
];

export interface FooterLinksProps {
	/**
	 * An array of links, specifying the link text and href, if the link is external, and any other HTML attributes for an anchor tag
	 */
	links?: Array<FooterLink | FooterButton>;
	/**
	 * Force the links into a column layout below desktop, regardless of the amount of links
	 */
	forceColumns?: boolean;
}

const getLink = ({ href, text, isExternal, ...linkAttrs }: FooterLink) => (
	<Link
		cssOverrides={linkElementStyles}
		href={href}
		rel={isExternal ? 'noopener noreferrer' : ''}
		{...linkAttrs}
	>
		{text}
	</Link>
);

const getButtonLink = ({ text, onClick, ...linkAttrs }: FooterButton) => (
	<ButtonLink cssOverrides={linkElementStyles} onClick={onClick} {...linkAttrs}>
		{text}
	</ButtonLink>
);

export const FooterLinks = ({
	links = defaultGuardianLinks,
	forceColumns = false,
}: FooterLinksProps) => {
	const useColumns = links.length > 3 || forceColumns;

	return (
		<div css={fullWidthContainer}>
			<Hide from="tablet">
				<ul css={getListStyles(useColumns)}>
					{links.map((link, index) => {
						{
							return (
								<li key={`link-${index}`} css={getItemStyles(useColumns)}>
									<ThemeProvider theme={linkThemeBrand}>
										{'href' in link ? getLink(link) : getButtonLink(link)}
									</ThemeProvider>
								</li>
							);
						}
					})}
				</ul>
			</Hide>
			<Hide until="tablet">
				<Columns cssOverrides={getListStyles(useColumns)}>
					{links.map((link, index) => {
						return (
							<Column
								key={`link-${index}`}
								span={[0, 3, 2]}
								cssOverrides={getItemStyles(useColumns)}
							>
								<ThemeProvider theme={linkThemeBrand}>
									{'href' in link ? getLink(link) : getButtonLink(link)}
								</ThemeProvider>
							</Column>
						);
					})}
				</Columns>
			</Hide>
		</div>
	);
};
