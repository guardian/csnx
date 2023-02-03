import { Button } from './Button';

export default {
	component: Button,
	title: 'Button/Default styles',
};

// *****************************************************************************

export const Default = () => (
	<Button>Red bg applied by a global attribute selector</Button>
);
