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

- per-project storybooks
- standardise on idiomatic storybook code/structure (if needed)

## What happens to AR and `common-rendering`?

- we will set up `dotcom-rendering` repo as full monorepo
- AR and CR will both be able to use NX, although this will not be CSTI's initial focus
- AR and CR will remain in the `dotcom-rendering` repo for now

# Questions

## Whats processes/services do DCR and AR currently share?

e.g.
- workflows
- Riff raff
- Cypress

## How do manage the final switch over?

- run a mirror of DCR in CSNX that automatically keeps in sync?
- stagger the switch over from inside Frontend (eg 10% > 50% > 100% of requests go to CSNX instance of DCR)
