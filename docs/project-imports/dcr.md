# Moving DCR into the CSNX monorepo

## Context

We want to relocate DCR in the CSNX monorepo.

## What do we hope to achieve?

- make it easier for Guardian product teams to ship by reducing the friction of interdependency between DCR and other Guardian projects (Source, Libs, consent, commercial code etc) 
- reduce the time spent by dotcom on managing their infrastructure
- standardise process: _best practice by default_

# Pre-relocation

## Rationalising NPM dependencies across the existing DCR / AR monorepo

The `dotcom-rendering` repo currently contains one yarn workspace (containing DCR and common rendering) and a third, unattached package (AR), whose dependencies are handled using NPM. 

AR consumes some undeclared dependencies from the root yarn workspace.

Common-rendering is only consumed by AR.

We will move all projects into one `yarn` workspace, and resolve any issues around shared dependencies _before_ any migration takes place.

## Adding NX to the workspace for use in DCR

We use NX in CSNX to handle our build processes. Pre-relocation we intend to add NX to the `dotcom-rendering` monorepo.

The setup should be as close as possible to CSNX.

## Identify unused config files in AR/DCR

There are a number of potentially unused files in the old monorepo root folders, are we able to remove these? `arkit.json` is a possible example

## Match package versions to infrastructure deps in CSNX

- Jest, Storybook, ESLint, Prettier etc
- Node versions

## Setup Storybook to match CSNX

Per project storybooks
Do we need a composed storybook for AR/DCR/common?
Storybooks.gutools.co.uk ?
Add to composed storybook
Remove idiosyncratic code

## What happens to AR and common rendering?

Stays where it is?
How do we not break it?

## Whats in the root that each project is using?

Eg how do we handle workflows
Riff raff
Cypress? (DCR only)

## What is the end goal?

Run an automated mirror version of DCR in CSNX
Stagger switch within Frontend (eg 10% of requests go to CSNX instance of DCR)
