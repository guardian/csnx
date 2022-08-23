import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { npmPackageGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: any) {
	await npmPackageGenerator(tree, { name: schema.name });
	await formatFiles(tree);
	return () => {
		installPackagesTask(tree);
	};
}
