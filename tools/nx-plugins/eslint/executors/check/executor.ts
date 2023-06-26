import type { ExecutorContext } from '@nx/devkit';
import linter from '@nx/linter/src/executors/eslint/lint.impl.js';
import type { Schema } from '@nx/linter/src/executors/eslint/schema';

// wrap @nx/linter:eslint executor with some defaults
export default function (
	options: Schema,
	context: ExecutorContext,
): Promise<{ success: boolean }> {
	options.hasTypeAwareRules = true;
	return linter(options, context);
}
