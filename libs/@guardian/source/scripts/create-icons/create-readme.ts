import { ICON_FILE } from './get-svgs-from-figma';

export const createReadme = () => `# Icons

**The contents of this directory are created automatically. Any edits will be
overwritten sooner or later.**

The SVGs for these icons are automatically pulled in from the [source design file in
Figma](https://www.figma.com/file/${ICON_FILE}/%E2%97%90-Icons?node-id=55%3A2)
using the create-icons script via the Figma API:

\`\`\`sh
make @guardian/source:create-icons
\`\`\`
`;
