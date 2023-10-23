import type { ExecutorContext } from '@nx/devkit';
import linter from '@nx/eslint/src/executors/lint/lint.impl.js';
import type { Schema } from '@nx/eslint/src/executors/lint/schema';

// wrap @nx/linter:eslint executor with some defaults
export default function (
	options: Schema,
	context: ExecutorContext,
): Promise<{ success: boolean }> {
	options.hasTypeAwareRules = true;
	return linter(options, context);
}
