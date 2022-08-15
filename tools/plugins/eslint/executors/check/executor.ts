import type { ExecutorContext } from '@nrwl/devkit';
import linter from '@nrwl/linter/src/executors/eslint/lint.impl.js';
import type { Schema } from '@nrwl/linter/src/executors/eslint/schema';

// wrap @nrwl/linter:eslint executor with some defaults
export default function (
	options: Schema,
	context: ExecutorContext,
): Promise<{ success: boolean }> {
	options.hasTypeAwareRules = true;
	return linter(options, context);
}
