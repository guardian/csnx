export interface BuildExecutorOptions {
	main?: string;
	outputPath: string;
	tsConfig?: string;
	packageJson: string;
	assets: string[];
	pkgRoot: string;
}
