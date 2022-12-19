import type { RecipeSchemaAtomType } from './types';

export const RecipeSchemaAtom = ({
	id,
	json,
}: RecipeSchemaAtomType): JSX.Element => {
	return (
		<div data-atom-id={id} data-atom-type="recipe" data-testid="recipe">
			<script type="application/ld+json">{json}</script>
		</div>
	);
};
