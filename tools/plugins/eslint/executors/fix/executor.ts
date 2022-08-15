import type { ExecutorContext } from '@nrwl/devkit';
import type { Schema } from '@nrwl/linter/src/executors/eslint/schema';
import linter from '../check/executor';

// wrap @csnx/eslint:check executor with fix=true
export default function (
	options: Schema,
	context: ExecutorContext,
): Promise<{ success: boolean }> {
	options.fix = true;
	return linter(options, context);
}
