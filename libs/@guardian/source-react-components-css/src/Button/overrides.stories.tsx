import styled from '@emotion/styled';

import { Button } from './Button';

import styles from './overrides.module.css';
import { overrides } from './overrides';

export default {
	component: Button,
	title: 'Button/Style overrides',
};

// These mimic how a consumer could apply their own styles.

export const InlineStyles = () => (
	<>
		<Button>Red bg applied by a global attribute selector</Button>
		<Button style={overrides}>
			Yellow bg override applied by inline style
		</Button>
	</>
);

const StyledButton = styled(Button)(overrides);
export const Emotion = () => (
	<>
		<Button>Red bg applied by a global attribute selector</Button>
		<StyledButton>Yellow bg override applied by emotion</StyledButton>
	</>
);

export const CssModule = () => (
	<>
		<Button>Red bg applied by a global attribute selector</Button>
		<Button className={styles.overrides}>
			Yellow bg override applied from a CSS module
		</Button>
	</>
);
