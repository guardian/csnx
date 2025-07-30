import { Node } from 'prosemirror-model';
import { hasHitContributorLimit } from './lib';
import { bylineEditorSchema } from './schema';

describe('hasHitContributorLimit', () => {
	it('returns false when the limit does not exist', () => {
		const testDoc = new Node();

		const result = hasHitContributorLimit(testDoc, undefined);

		expect(result).toBe(false);
	});
	it('returns false when there are fewer nodes than the limit', () => {
		const testDoc = bylineEditorSchema.nodes.doc.create({}, [
			bylineEditorSchema.nodes.chip.create({ label: 'Test Chip 1' }),
			bylineEditorSchema.text('Test'),
			bylineEditorSchema.nodes.chip.create({ label: 'Test Chip 2' }),
		]);

		const result = hasHitContributorLimit(testDoc, 3);

		expect(result).toBe(false);
	});
	it('returns true when there are as many nodes as the limit', () => {
		const testDoc = bylineEditorSchema.nodes.doc.create({}, [
			bylineEditorSchema.nodes.chip.create({ label: 'Test Chip 1' }),
			bylineEditorSchema.text('Test'),
			bylineEditorSchema.nodes.chip.create({ label: 'Test Chip 2' }),
		]);

		const result = hasHitContributorLimit(testDoc, 2);

		expect(result).toBe(true);
	});
	it('returns true when there are more nodes than the limit', () => {
		const testDoc = bylineEditorSchema.nodes.doc.create({}, [
			bylineEditorSchema.nodes.chip.create({ label: 'Test Chip 1' }),
			bylineEditorSchema.text('Test'),
			bylineEditorSchema.nodes.chip.create({ label: 'Test Chip 2' }),
		]);

		const result = hasHitContributorLimit(testDoc, 2);

		expect(result).toBe(true);
	});
});
