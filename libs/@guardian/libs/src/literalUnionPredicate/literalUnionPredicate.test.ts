import { literalUnionPredicate } from './literalUnionPredicate';

describe('literalUnionPredicate', () => {
	it('should narrow string literals', () => {
		const stages = ['PROD', 'CODE', 'DEV'] as const;
		const isStage = literalUnionPredicate(stages);

		for (const stage of stages) {
			expect(isStage(stage)).toBe(true);
		}

		expect(isStage('NOT_A_STAGE')).toBe(false);
	});

	it('should narrow number literals', () => {
		const primes = [1, 3, 5, 7] as const;
		const isPrime = literalUnionPredicate(primes);

		for (const prime of primes) {
			expect(isPrime(prime)).toBe(true);
		}

		expect(isPrime(0)).toBe(false);
		expect(isPrime(2)).toBe(false);
		expect(isPrime(11)).toBe(false);
		expect(isPrime('1')).toBe(false);
	});

	it('should actually narrow values', () => {
		const liberalNewspaper = ['The Guardian'] as const;
		const isLiberalNewspaper = literalUnionPredicate(liberalNewspaper);

		const newspapers = ['The Grauniad', 'The Guardian', 'Guardian Unlimited'];

		for (const newspaper of newspapers) {
			if (isLiberalNewspaper(newspaper)) {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition --- we confirm type narrowing
				expect(newspaper === 'The Guardian').toBe(true);
			} else {
				expect(newspaper).not.toBe('The Guardian');
			}
		}
	});
});
