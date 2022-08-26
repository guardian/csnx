import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { LibGeneratorSchema } from './schema';

describe('lib generator', () => {
	let appTree: Tree;
	const options: LibGeneratorSchema = { name: 'test' };

	beforeEach(() => {
		appTree = createTreeWithEmptyWorkspace();
	});

	it('should run successfully', async () => {
		await generator(appTree, options);
		const config = readProjectConfiguration(appTree, 'test');
		expect(config).toBeDefined();
	});
});
