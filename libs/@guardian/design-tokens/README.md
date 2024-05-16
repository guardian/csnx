# @guardian/design-tokens

Experimental Design Tokens package for internal use.

## Usage

### Editing Tokens

To modify or update design tokens, you need to edit the `tokens.json` file. This file currently serves as the source of truth for our design-token values.

### Recreating Output Files

Once changes are made to the `tokens.json` file, the next step is to generate the output files that will be consumed by our projects.

To do this, run the following command.

```sh
make @guardian/design-tokens:build
```

This command triggers the token generation process, which compiles the tokens.json file into different formats (like CSS, SCSS, JavaScript, TypeScript).
