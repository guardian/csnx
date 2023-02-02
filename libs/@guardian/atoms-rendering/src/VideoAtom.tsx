import { MaintainAspectRatio } from './common/MaintainAspectRatio';
import type { VideoAtomType } from './types';

export const VideoAtom = ({
	assets,
	poster,
	height = 259,
	width = 460,
}: VideoAtomType): JSX.Element | null => {
	if (assets.length === 0) return null; // Handle empty assets array
	return (
		<MaintainAspectRatio height={height} width={width}>
			<video
				controls
				preload="metadata"
				width={width}
				height={height}
				poster={poster}
			>
				{assets.map((asset, index) => (
					<source key={index} src={asset.url} type={asset.mimeType} />
				))}
				<p>
					{`Your browser doesn't support HTML5 video. Here is a `}
					<a href={assets[0]?.url}>link to the video</a> instead.
				</p>
			</video>
		</MaintainAspectRatio>
	);
};
