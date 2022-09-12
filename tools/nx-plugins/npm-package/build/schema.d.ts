export interface BuildExecutorOptions {
	entry?: string;
	outputPath: string;
	tsConfig?: string;
	packageJson: string;
	assets: string[];
	pkgRoot: string;
}
