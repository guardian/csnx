# @csnx/design-tokens

Experimental Design Tokens package for internal use.

## Usage

### Editing Tokens

#### Colour Tokens

To update the colour tokens, you need a figma token.

1. To get a token from figma, log in to your account and follow [this guide](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens) **Make sure the token has variable read access**.

2. Once you have a token, run the script using the command below

```shell
 FIGMA_TOKEN=YOUR_FIGMA_TOKEN node libs/@csnx/design-tokens/scripts/get-tokens-from-figma.mjs
```

This will retrieve the colours from the figma variables which are located in this [file](https://www.figma.com/file/pFyKEeR5PLCA3ZuUEOiXoR/%5BTEST%5D-Variables-%2F-Primitives-Colours?type=design&node-id=16-2&mode=design&t=F8y1oWceORRqnQd5-0).

3. You will then need to [recreate the output files](#recreating-output-files).

#### Non-Colour Tokens

To modify or update the other design tokens, you need to edit the `tokens.json` file. This file currently serves as the source of truth for our non colour design-token values.

### Recreating Output Files

Once changes are made to the `tokens.json` file, the next step is to generate the output files that will be consumed by our projects.

To do this, run the following command.

```sh
pnpm nx run @csnx/design-tokens:make-tokens
```

This command triggers the token generation process, which compiles the tokens.json file into different formats (like CSS, SCSS, JavaScript, TypeScript).
