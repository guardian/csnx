import { ThemeProvider } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
	Button,
	buttonThemeBrand,
	Column,
	Columns,
	Hide,
	Link,
	linkThemeBrand,
} from '@guardian/source-react-components';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import {
	fullWidthContainer,
	getItemStyles,
	getListStyles,
	linkElementStyles,
	footerButtonColumnItemStyles,
} from './footerLinksStyles';

type FooterLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
	/**
	 * The URL of the link
	 */
	href?: string;
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

export const FooterLinks = ({
	links = defaultGuardianLinks,
	forceColumns = false,
}: FooterLinksProps): EmotionJSX.Element => {
	const useColumns = links.length > 3 || forceColumns;
	const isFooterLink = (
		link: FooterLink | FooterButton,
	): link is FooterLink => {
		return (link as FooterLink).href !== undefined;
	};
	return (
		<div css={fullWidthContainer}>
			<Hide from="tablet">
				<ul css={getListStyles(useColumns)}>
					{links.map((link, index) => {
						const key = `link-${index}`;
						if (isFooterLink(link)) {
							const { href, text, isExternal, ...linkAttrs } = link;
							return (
								<li key={key} css={getItemStyles(useColumns)}>
									<ThemeProvider theme={linkThemeBrand}>
										<Link
											cssOverrides={linkElementStyles}
											href={href}
											rel={isExternal ? 'noopener noreferrer' : ''}
											{...linkAttrs}
										>
											{text}
										</Link>
									</ThemeProvider>
								</li>
							);
						}
						const { text, onClick, ...linkAttrs } = link;
						return (
							<li key={key} css={getItemStyles(useColumns)}>
								<ThemeProvider theme={buttonThemeBrand}>
									<Button
										cssOverrides={linkElementStyles}
										iconSide="left"
										priority="subdued"
										size="default"
										onClick={onClick}
										{...linkAttrs}
									>
										{text}
									</Button>
								</ThemeProvider>
							</li>
						);
					})}
				</ul>
			</Hide>
			<Hide until="tablet">
				<Columns cssOverrides={getListStyles(useColumns)}>
					{links.map((link, index) => {
						const key = `link-${index}`;
						if (isFooterLink(link)) {
							const { href, text, isExternal, ...linkAttrs } = link;
							return (
								<Column
									key={key}
									span={[0, 3, 2]}
									cssOverrides={getItemStyles(useColumns)}
								>
									<ThemeProvider theme={linkThemeBrand}>
										<Link
											cssOverrides={linkElementStyles}
											href={href}
											rel={isExternal ? 'noopener noreferrer' : ''}
											{...linkAttrs}
										>
											{text}
										</Link>
									</ThemeProvider>
								</Column>
							);
						}
						const { text, onClick, ...linkAttrs } = link;
						return (
							<Column
								key={key}
								span={[0, 3, 2]}
								cssOverrides={getItemStyles(useColumns)}
							>
								<ThemeProvider theme={buttonThemeBrand}>
									<Button
										cssOverrides={linkElementStyles}
										iconSide="left"
										priority="subdued"
										size="default"
										onClick={onClick}
										{...linkAttrs}
									>
										{text}
									</Button>
								</ThemeProvider>
							</Column>
						);
					})}
				</Columns>
			</Hide>
		</div>
	);
};
