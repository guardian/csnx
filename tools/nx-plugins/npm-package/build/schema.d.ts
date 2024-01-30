export interface BuildExecutorOptions {
	entry?: string | Record<string, string>;
	outputPath: string;
	tsConfig?: string;
	packageJson: string;
	assets: string[];
	pkgRoot: string;
}
