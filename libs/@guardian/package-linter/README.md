# @guardian/package-linter

Lint your `package.json` to @guardian standards.

This ensures your package follows our own recommendations, which none
of the popular package managers are strict about (pnpm, yarn, npm).
Linted packages are guaranteed (\*) that:

- All direct dependencies’s peer dependencies are met
  - (currently this only applies one level down)
- Peer dependencies have a matching pinned dependency to the range’s minimum
- Dependencies relying on `@types/*` have compatible matching ones

(\*) unless the authors of this package were sloppy 😆

> **Note**
> In order for teams to gradually adopt this tool, there is a mechanism to
> ignore currently known issues.

## How to get a lint report for your `package.json`?

1. Install this package, e.g.: `pnpm @guardian/package-linter`
2. Pass in your `package.json` to the `packageLinterReport` method
3. Run this as part of your continuous integration workflow

```ts
// package-lint.mjs
const pkg = JSON.parse(fs.readTextFile('./package.json'));
const errors = lintPackage(pkg);
// if no errors, exit with “success” (0), otherwise exit “error” (1+)
process.exit(errors);
```

## Shapes used in this project

All sourced from [Geometric Shapes][] and [Box-drawing characters][]
on Wikipedia.

[geometric shapes]: https://en.wikipedia.org/wiki/Geometric_Shapes_(Unicode_block)
[box-drawing characters]: https://en.wikipedia.org/wiki/Box-drawing_character

```sh
# Rounded corners and symbols
╭─────────╮
│ ○ △ □ × │
╰─────────╯
# single and double lines
┌─┬┐  ╔═╦╗  ╓─╥╖  ╒═╤╕
│ ││  ║ ║║  ║ ║║  │ ││
├─┼┤  ╠═╬╣  ╟─╫╢  ╞═╪╡
└─┴┘  ╚═╩╝  ╙─╨╜  ╘═╧╛
```

## TODO

- package + @types/package info
- better testing
- improved error messages
- maybe a way to call a bin?
