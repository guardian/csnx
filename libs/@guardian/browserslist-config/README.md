# `@guardian/browserslist-config`

> [Browserslist](https://github.com/browserslist/browserslist) config for Guardian websites.

## Installation

```bash
yarn add -D @guardian/browserslist-config
```

or

```bash
npm install --save-dev @guardian/browserslist-config
```

## Usage

In your `.browserslistrc`:

```
extends @guardian/browserslist-config
```

Or in your `package.json`:

```json
  "browserslist": [
    "extends @guardian/browserslist-config"
  ]
```

## Rules

- support `<script type="module">` _and_ at least 0.01% of page views on theguardian.com

## Included browsers

<!-- INCLUDED -->

| Browser           | Versions                                                                                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chrome (android)  | 151                                                                                                                                                                                 |
| chrome            | 98, 103, 109, 116, 117, 120, 122, 124, 126, 128, 131, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151                                 |
| edge              | 131, 145, 146, 147, 148, 149, 150                                                                                                                                                   |
| firefox (android) | 153                                                                                                                                                                                 |
| firefox           | 78, 115, 132, 140, 147, 148, 149, 150, 151, 152, 153                                                                                                                                |
| opera (mobile)    | 80                                                                                                                                                                                  |
| safari (mobile)   | 12.2-12.5, 15.6-15.8, 16.1, 16.2, 16.3, 16.5, 16.6-16.7, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6-17.7, 18.0, 18.1, 18.2, 18.3, 18.4, 18.5-18.7, 26.0, 26.1, 26.2, 26.3, 26.4, 26.5, 26.6 |
| safari            | 13.1, 14.1, 15.6, 16.1, 16.3, 16.5, 16.6, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 18.1, 18.2, 18.3, 18.4, 26.1, 26.2, 26.3, 26.4, 26.5, 26.6, 27                                        |

<!-- /INCLUDED -->

## Usage Stats

These are the numbers that were used to generate the list of included browsers.

<!-- USAGE -->

| Browser                   | Usage  |
| ------------------------- | ------ |
| chrome (android) 156      | 31.97% |
| safari (mobile) 18.5-18.7 | 22.63% |
| chrome 150                | 7.89%  |
| safari (mobile) 26.5      | 6.37%  |
| safari 26.5               | 4.43%  |
| chrome 149                | 4.39%  |
| edge 150                  | 3.37%  |
| firefox 152               | 2.00%  |
| firefox (android) 158     | 1.33%  |
| edge 149                  | 0.89%  |
| chrome 148                | 0.81%  |
| firefox 153               | 0.61%  |
| safari (mobile) 16.6-16.7 | 0.49%  |
| safari (mobile) 17.6-17.7 | 0.31%  |
| safari 17.6               | 0.31%  |
| safari (mobile) 15.6-15.8 | 0.30%  |
| safari 16.6               | 0.29%  |
| safari 26.3               | 0.22%  |
| chrome 147                | 0.21%  |
| safari (mobile) 18.3      | 0.20%  |
| safari (mobile) 26.3      | 0.19%  |
| firefox 140               | 0.18%  |
| chrome 138                | 0.17%  |
| safari 15.6               | 0.16%  |
| safari 26.2               | 0.15%  |
| firefox 115               | 0.14%  |
| safari (mobile) 26.4      | 0.14%  |
| safari (mobile) 26.2      | 0.13%  |
| chrome 142                | 0.12%  |
| chrome 151                | 0.12%  |
| safari (mobile) 18.1      | 0.12%  |
| safari 26.4               | 0.12%  |
| chrome 109                | 0.11%  |
| chrome 146                | 0.11%  |
| chrome 116                | 0.10%  |
| edge 148                  | 0.09%  |
| firefox 151               | 0.09%  |
| safari (mobile) 17.5      | 0.09%  |
| chrome 145                | 0.08%  |
| chrome 144                | 0.07%  |
| safari (mobile) 26.6      | 0.07%  |
| safari 18.3               | 0.07%  |
| chrome 128                | 0.06%  |
| chrome 143                | 0.05%  |
| chrome 98                 | 0.05%  |
| safari (mobile) 16.1      | 0.05%  |
| safari (mobile) 18.0      | 0.05%  |
| safari (mobile) 18.4      | 0.05%  |
| safari 17.5               | 0.05%  |
| safari 26.6               | 0.05%  |
| chrome 103                | 0.04%  |
| firefox 150               | 0.04%  |
| safari (mobile) 16.3      | 0.04%  |
| safari (mobile) 17.4      | 0.04%  |
| safari (mobile) 18.2      | 0.04%  |
| safari (mobile) 26.1      | 0.04%  |
| opera mini all            | 0.04%  |
| safari 18.1               | 0.04%  |
| safari 26.1               | 0.04%  |
| chrome 122                | 0.03%  |
| chrome 126                | 0.03%  |
| chrome 131                | 0.03%  |
| chrome 140                | 0.03%  |
| chrome 141                | 0.03%  |
| safari (mobile) 12.2-12.5 | 0.03%  |
| safari 14.1               | 0.03%  |
| safari 17.4               | 0.03%  |
| chrome 117                | 0.02%  |
| chrome 120                | 0.02%  |
| chrome 124                | 0.02%  |
| chrome 133                | 0.02%  |
| chrome 134                | 0.02%  |
| chrome 135                | 0.02%  |
| chrome 136                | 0.02%  |
| chrome 139                | 0.02%  |
| edge 147                  | 0.02%  |
| firefox 149               | 0.02%  |
| safari (mobile) 16.2      | 0.02%  |
| safari (mobile) 17.3      | 0.02%  |
| safari (mobile) 26.0      | 0.02%  |
| safari (mobile) 27.0      | 0.02%  |
| opera (mobile) 10         | 0.02%  |
| opera (mobile) 11         | 0.02%  |
| opera (mobile) 11.1       | 0.02%  |
| opera (mobile) 11.5       | 0.02%  |
| opera (mobile) 12         | 0.02%  |
| opera (mobile) 12.1       | 0.02%  |
| opera (mobile) 80         | 0.02%  |
| safari 13.1               | 0.02%  |
| safari 16.3               | 0.02%  |
| safari 16.5               | 0.02%  |
| safari 17.1               | 0.02%  |
| safari 17.3               | 0.02%  |
| safari 18.2               | 0.02%  |
| safari 18.4               | 0.02%  |
| safari 27                 | 0.02%  |
| chrome 114                | 0.01%  |
| chrome 121                | 0.01%  |
| chrome 125                | 0.01%  |
| chrome 127                | 0.01%  |
| chrome 130                | 0.01%  |
| chrome 132                | 0.01%  |
| chrome 137                | 0.01%  |
| chrome 87                 | 0.01%  |
| edge 109                  | 0.01%  |
| edge 131                  | 0.01%  |
| edge 142                  | 0.01%  |
| edge 144                  | 0.01%  |
| edge 145                  | 0.01%  |
| edge 146                  | 0.01%  |
| edge 151                  | 0.01%  |
| firefox 128               | 0.01%  |
| firefox 132               | 0.01%  |
| firefox 136               | 0.01%  |
| firefox 145               | 0.01%  |
| firefox 146               | 0.01%  |
| firefox 147               | 0.01%  |
| firefox 148               | 0.01%  |
| firefox 78                | 0.01%  |
| safari (mobile) 14.0-14.4 | 0.01%  |
| safari (mobile) 14.5-14.8 | 0.01%  |
| safari (mobile) 15.2-15.3 | 0.01%  |
| safari (mobile) 15.4      | 0.01%  |
| safari (mobile) 15.5      | 0.01%  |
| safari (mobile) 16.0      | 0.01%  |
| safari (mobile) 16.5      | 0.01%  |
| safari (mobile) 17.0      | 0.01%  |
| safari (mobile) 17.1      | 0.01%  |
| safari (mobile) 17.2      | 0.01%  |
| safari 14                 | 0.01%  |
| safari 15.5               | 0.01%  |
| safari 16.1               | 0.01%  |
| safari 16.2               | 0.01%  |
| safari 16.4               | 0.01%  |
| safari 17.2               | 0.01%  |

<!-- /USAGE -->

## Updating

Usage is based on our Ophan browser stats.

To update it, go to https://metrics.gutools.co.uk/d/ja7sk9c/browser-share, in the 3 dots menu for the Raw data panel, click Inspect > Data and export the data as CSV.

The format is the same as the CSV exported by Google Analytics so we can use it with `browserslist-ga-export`.

This data updates monthly.

You can then use `browserslist-ga-export` to convert the exported CSV data into a `browserslist-stats.json` file.

```
$ npx browserslist-ga-export path/to/exported.csv
```

### Report content

Views:

- Editorial AUS Timezone
- Editorial UK Timezone
- Editorial US Timezone

Date range: Last 30 days

### Updating the readme

Then run `pnpm --filter="browserslist-config" update-readme` (from the root – `pnpm update-readme` from this directory) and publish the new version.
