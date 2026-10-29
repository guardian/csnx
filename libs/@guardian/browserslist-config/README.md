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
| qq (android) 14.9         | 0.00%  |
| uc (android) 15.5         | 0.00%  |
| android 156               | 0.00%  |
| android 2.1               | 0.00%  |
| android 2.2               | 0.00%  |
| android 2.3               | 0.00%  |
| android 3                 | 0.00%  |
| android 4                 | 0.00%  |
| android 4.1               | 0.00%  |
| android 4.2-4.3           | 0.00%  |
| android 4.4               | 0.00%  |
| android 4.4.3-4.4.4       | 0.00%  |
| baidu 13.52               | 0.00%  |
| blackberry 10             | 0.00%  |
| blackberry 7              | 0.00%  |
| chrome 10                 | 0.00%  |
| chrome 100                | 0.00%  |
| chrome 101                | 0.00%  |
| chrome 102                | 0.00%  |
| chrome 104                | 0.00%  |
| chrome 105                | 0.00%  |
| chrome 106                | 0.00%  |
| chrome 107                | 0.00%  |
| chrome 108                | 0.00%  |
| chrome 11                 | 0.00%  |
| chrome 110                | 0.00%  |
| chrome 111                | 0.00%  |
| chrome 112                | 0.00%  |
| chrome 113                | 0.00%  |
| chrome 115                | 0.00%  |
| chrome 118                | 0.00%  |
| chrome 119                | 0.00%  |
| chrome 12                 | 0.00%  |
| chrome 123                | 0.00%  |
| chrome 129                | 0.00%  |
| chrome 13                 | 0.00%  |
| chrome 14                 | 0.00%  |
| chrome 15                 | 0.00%  |
| chrome 152                | 0.00%  |
| chrome 153                | 0.00%  |
| chrome 154                | 0.00%  |
| chrome 155                | 0.00%  |
| chrome 156                | 0.00%  |
| chrome 157                | 0.00%  |
| chrome 158                | 0.00%  |
| chrome 159                | 0.00%  |
| chrome 16                 | 0.00%  |
| chrome 17                 | 0.00%  |
| chrome 18                 | 0.00%  |
| chrome 19                 | 0.00%  |
| chrome 20                 | 0.00%  |
| chrome 21                 | 0.00%  |
| chrome 22                 | 0.00%  |
| chrome 23                 | 0.00%  |
| chrome 24                 | 0.00%  |
| chrome 25                 | 0.00%  |
| chrome 26                 | 0.00%  |
| chrome 27                 | 0.00%  |
| chrome 28                 | 0.00%  |
| chrome 29                 | 0.00%  |
| chrome 30                 | 0.00%  |
| chrome 31                 | 0.00%  |
| chrome 32                 | 0.00%  |
| chrome 33                 | 0.00%  |
| chrome 34                 | 0.00%  |
| chrome 35                 | 0.00%  |
| chrome 36                 | 0.00%  |
| chrome 37                 | 0.00%  |
| chrome 38                 | 0.00%  |
| chrome 39                 | 0.00%  |
| chrome 4                  | 0.00%  |
| chrome 40                 | 0.00%  |
| chrome 41                 | 0.00%  |
| chrome 42                 | 0.00%  |
| chrome 43                 | 0.00%  |
| chrome 44                 | 0.00%  |
| chrome 45                 | 0.00%  |
| chrome 46                 | 0.00%  |
| chrome 47                 | 0.00%  |
| chrome 48                 | 0.00%  |
| chrome 49                 | 0.00%  |
| chrome 5                  | 0.00%  |
| chrome 50                 | 0.00%  |
| chrome 51                 | 0.00%  |
| chrome 52                 | 0.00%  |
| chrome 53                 | 0.00%  |
| chrome 54                 | 0.00%  |
| chrome 55                 | 0.00%  |
| chrome 56                 | 0.00%  |
| chrome 57                 | 0.00%  |
| chrome 58                 | 0.00%  |
| chrome 59                 | 0.00%  |
| chrome 6                  | 0.00%  |
| chrome 60                 | 0.00%  |
| chrome 61                 | 0.00%  |
| chrome 62                 | 0.00%  |
| chrome 63                 | 0.00%  |
| chrome 64                 | 0.00%  |
| chrome 65                 | 0.00%  |
| chrome 66                 | 0.00%  |
| chrome 67                 | 0.00%  |
| chrome 68                 | 0.00%  |
| chrome 69                 | 0.00%  |
| chrome 7                  | 0.00%  |
| chrome 70                 | 0.00%  |
| chrome 71                 | 0.00%  |
| chrome 72                 | 0.00%  |
| chrome 73                 | 0.00%  |
| chrome 74                 | 0.00%  |
| chrome 75                 | 0.00%  |
| chrome 76                 | 0.00%  |
| chrome 77                 | 0.00%  |
| chrome 78                 | 0.00%  |
| chrome 79                 | 0.00%  |
| chrome 8                  | 0.00%  |
| chrome 80                 | 0.00%  |
| chrome 81                 | 0.00%  |
| chrome 83                 | 0.00%  |
| chrome 84                 | 0.00%  |
| chrome 85                 | 0.00%  |
| chrome 86                 | 0.00%  |
| chrome 88                 | 0.00%  |
| chrome 89                 | 0.00%  |
| chrome 9                  | 0.00%  |
| chrome 90                 | 0.00%  |
| chrome 91                 | 0.00%  |
| chrome 92                 | 0.00%  |
| chrome 93                 | 0.00%  |
| chrome 94                 | 0.00%  |
| chrome 95                 | 0.00%  |
| chrome 96                 | 0.00%  |
| chrome 97                 | 0.00%  |
| chrome 99                 | 0.00%  |
| edge 100                  | 0.00%  |
| edge 101                  | 0.00%  |
| edge 102                  | 0.00%  |
| edge 103                  | 0.00%  |
| edge 104                  | 0.00%  |
| edge 105                  | 0.00%  |
| edge 106                  | 0.00%  |
| edge 107                  | 0.00%  |
| edge 108                  | 0.00%  |
| edge 110                  | 0.00%  |
| edge 111                  | 0.00%  |
| edge 112                  | 0.00%  |
| edge 113                  | 0.00%  |
| edge 114                  | 0.00%  |
| edge 115                  | 0.00%  |
| edge 116                  | 0.00%  |
| edge 117                  | 0.00%  |
| edge 118                  | 0.00%  |
| edge 119                  | 0.00%  |
| edge 12                   | 0.00%  |
| edge 120                  | 0.00%  |
| edge 121                  | 0.00%  |
| edge 122                  | 0.00%  |
| edge 123                  | 0.00%  |
| edge 124                  | 0.00%  |
| edge 125                  | 0.00%  |
| edge 126                  | 0.00%  |
| edge 127                  | 0.00%  |
| edge 128                  | 0.00%  |
| edge 129                  | 0.00%  |
| edge 13                   | 0.00%  |
| edge 130                  | 0.00%  |
| edge 132                  | 0.00%  |
| edge 133                  | 0.00%  |
| edge 134                  | 0.00%  |
| edge 135                  | 0.00%  |
| edge 136                  | 0.00%  |
| edge 137                  | 0.00%  |
| edge 138                  | 0.00%  |
| edge 139                  | 0.00%  |
| edge 14                   | 0.00%  |
| edge 140                  | 0.00%  |
| edge 141                  | 0.00%  |
| edge 143                  | 0.00%  |
| edge 15                   | 0.00%  |
| edge 152                  | 0.00%  |
| edge 153                  | 0.00%  |
| edge 154                  | 0.00%  |
| edge 155                  | 0.00%  |
| edge 16                   | 0.00%  |
| edge 17                   | 0.00%  |
| edge 18                   | 0.00%  |
| edge 79                   | 0.00%  |
| edge 80                   | 0.00%  |
| edge 81                   | 0.00%  |
| edge 83                   | 0.00%  |
| edge 84                   | 0.00%  |
| edge 85                   | 0.00%  |
| edge 86                   | 0.00%  |
| edge 87                   | 0.00%  |
| edge 88                   | 0.00%  |
| edge 89                   | 0.00%  |
| edge 90                   | 0.00%  |
| edge 91                   | 0.00%  |
| edge 92                   | 0.00%  |
| edge 93                   | 0.00%  |
| edge 94                   | 0.00%  |
| edge 95                   | 0.00%  |
| edge 96                   | 0.00%  |
| edge 97                   | 0.00%  |
| edge 98                   | 0.00%  |
| edge 99                   | 0.00%  |
| firefox 10                | 0.00%  |
| firefox 100               | 0.00%  |
| firefox 101               | 0.00%  |
| firefox 102               | 0.00%  |
| firefox 103               | 0.00%  |
| firefox 104               | 0.00%  |
| firefox 105               | 0.00%  |
| firefox 106               | 0.00%  |
| firefox 107               | 0.00%  |
| firefox 108               | 0.00%  |
| firefox 109               | 0.00%  |
| firefox 11                | 0.00%  |
| firefox 110               | 0.00%  |
| firefox 111               | 0.00%  |
| firefox 112               | 0.00%  |
| firefox 113               | 0.00%  |
| firefox 114               | 0.00%  |
| firefox 116               | 0.00%  |
| firefox 117               | 0.00%  |
| firefox 118               | 0.00%  |
| firefox 119               | 0.00%  |
| firefox 12                | 0.00%  |
| firefox 120               | 0.00%  |
| firefox 121               | 0.00%  |
| firefox 122               | 0.00%  |
| firefox 123               | 0.00%  |
| firefox 124               | 0.00%  |
| firefox 125               | 0.00%  |
| firefox 126               | 0.00%  |
| firefox 127               | 0.00%  |
| firefox 129               | 0.00%  |
| firefox 13                | 0.00%  |
| firefox 130               | 0.00%  |
| firefox 131               | 0.00%  |
| firefox 133               | 0.00%  |
| firefox 134               | 0.00%  |
| firefox 135               | 0.00%  |
| firefox 137               | 0.00%  |
| firefox 138               | 0.00%  |
| firefox 139               | 0.00%  |
| firefox 14                | 0.00%  |
| firefox 141               | 0.00%  |
| firefox 142               | 0.00%  |
| firefox 143               | 0.00%  |
| firefox 144               | 0.00%  |
| firefox 15                | 0.00%  |
| firefox 154               | 0.00%  |
| firefox 155               | 0.00%  |
| firefox 156               | 0.00%  |
| firefox 157               | 0.00%  |
| firefox 158               | 0.00%  |
| firefox 159               | 0.00%  |
| firefox 16                | 0.00%  |
| firefox 160               | 0.00%  |
| firefox 161               | 0.00%  |
| firefox 17                | 0.00%  |
| firefox 18                | 0.00%  |
| firefox 19                | 0.00%  |
| firefox 2                 | 0.00%  |
| firefox 20                | 0.00%  |
| firefox 21                | 0.00%  |
| firefox 22                | 0.00%  |
| firefox 23                | 0.00%  |
| firefox 24                | 0.00%  |
| firefox 25                | 0.00%  |
| firefox 26                | 0.00%  |
| firefox 27                | 0.00%  |
| firefox 28                | 0.00%  |
| firefox 29                | 0.00%  |
| firefox 3                 | 0.00%  |
| firefox 3.5               | 0.00%  |
| firefox 3.6               | 0.00%  |
| firefox 30                | 0.00%  |
| firefox 31                | 0.00%  |
| firefox 32                | 0.00%  |
| firefox 33                | 0.00%  |
| firefox 34                | 0.00%  |
| firefox 35                | 0.00%  |
| firefox 36                | 0.00%  |
| firefox 37                | 0.00%  |
| firefox 38                | 0.00%  |
| firefox 39                | 0.00%  |
| firefox 4                 | 0.00%  |
| firefox 40                | 0.00%  |
| firefox 41                | 0.00%  |
| firefox 42                | 0.00%  |
| firefox 43                | 0.00%  |
| firefox 44                | 0.00%  |
| firefox 45                | 0.00%  |
| firefox 46                | 0.00%  |
| firefox 47                | 0.00%  |
| firefox 48                | 0.00%  |
| firefox 49                | 0.00%  |
| firefox 5                 | 0.00%  |
| firefox 50                | 0.00%  |
| firefox 51                | 0.00%  |
| firefox 52                | 0.00%  |
| firefox 53                | 0.00%  |
| firefox 54                | 0.00%  |
| firefox 55                | 0.00%  |
| firefox 56                | 0.00%  |
| firefox 57                | 0.00%  |
| firefox 58                | 0.00%  |
| firefox 59                | 0.00%  |
| firefox 6                 | 0.00%  |
| firefox 60                | 0.00%  |
| firefox 61                | 0.00%  |
| firefox 62                | 0.00%  |
| firefox 63                | 0.00%  |
| firefox 64                | 0.00%  |
| firefox 65                | 0.00%  |
| firefox 66                | 0.00%  |
| firefox 67                | 0.00%  |
| firefox 68                | 0.00%  |
| firefox 69                | 0.00%  |
| firefox 7                 | 0.00%  |
| firefox 70                | 0.00%  |
| firefox 71                | 0.00%  |
| firefox 72                | 0.00%  |
| firefox 73                | 0.00%  |
| firefox 74                | 0.00%  |
| firefox 75                | 0.00%  |
| firefox 76                | 0.00%  |
| firefox 77                | 0.00%  |
| firefox 79                | 0.00%  |
| firefox 8                 | 0.00%  |
| firefox 80                | 0.00%  |
| firefox 81                | 0.00%  |
| firefox 82                | 0.00%  |
| firefox 83                | 0.00%  |
| firefox 84                | 0.00%  |
| firefox 85                | 0.00%  |
| firefox 86                | 0.00%  |
| firefox 87                | 0.00%  |
| firefox 88                | 0.00%  |
| firefox 89                | 0.00%  |
| firefox 9                 | 0.00%  |
| firefox 90                | 0.00%  |
| firefox 91                | 0.00%  |
| firefox 92                | 0.00%  |
| firefox 93                | 0.00%  |
| firefox 94                | 0.00%  |
| firefox 95                | 0.00%  |
| firefox 96                | 0.00%  |
| firefox 97                | 0.00%  |
| firefox 98                | 0.00%  |
| firefox 99                | 0.00%  |
| ie 10                     | 0.00%  |
| ie 11                     | 0.00%  |
| ie 5.5                    | 0.00%  |
| ie 6                      | 0.00%  |
| ie 7                      | 0.00%  |
| ie 8                      | 0.00%  |
| ie 9                      | 0.00%  |
| ie (mobile) 10            | 0.00%  |
| ie (mobile) 11            | 0.00%  |
| safari (mobile) 10.0-10.2 | 0.00%  |
| safari (mobile) 10.3      | 0.00%  |
| safari (mobile) 11.0-11.2 | 0.00%  |
| safari (mobile) 11.3-11.4 | 0.00%  |
| safari (mobile) 12.0-12.1 | 0.00%  |
| safari (mobile) 13.0-13.1 | 0.00%  |
| safari (mobile) 13.2      | 0.00%  |
| safari (mobile) 13.3      | 0.00%  |
| safari (mobile) 13.4-13.7 | 0.00%  |
| safari (mobile) 15.0-15.1 | 0.00%  |
| safari (mobile) 16.4      | 0.00%  |
| safari (mobile) 27.1      | 0.00%  |
| safari (mobile) 27.2      | 0.00%  |
| safari (mobile) 3.2       | 0.00%  |
| safari (mobile) 4.0-4.1   | 0.00%  |
| safari (mobile) 4.2-4.3   | 0.00%  |
| safari (mobile) 5.0-5.1   | 0.00%  |
| safari (mobile) 6.0-6.1   | 0.00%  |
| safari (mobile) 7.0-7.1   | 0.00%  |
| safari (mobile) 8         | 0.00%  |
| safari (mobile) 8.1-8.4   | 0.00%  |
| safari (mobile) 9.0-9.2   | 0.00%  |
| safari (mobile) 9.3       | 0.00%  |
| kaios 2.5                 | 0.00%  |
| kaios 3.0-3.1             | 0.00%  |
| opera 10.0-10.1           | 0.00%  |
| opera 10.5                | 0.00%  |
| opera 10.6                | 0.00%  |
| opera 100                 | 0.00%  |
| opera 101                 | 0.00%  |
| opera 102                 | 0.00%  |
| opera 103                 | 0.00%  |
| opera 104                 | 0.00%  |
| opera 105                 | 0.00%  |
| opera 106                 | 0.00%  |
| opera 107                 | 0.00%  |
| opera 108                 | 0.00%  |
| opera 109                 | 0.00%  |
| opera 11                  | 0.00%  |
| opera 11.1                | 0.00%  |
| opera 11.5                | 0.00%  |
| opera 11.6                | 0.00%  |
| opera 110                 | 0.00%  |
| opera 111                 | 0.00%  |
| opera 112                 | 0.00%  |
| opera 113                 | 0.00%  |
| opera 114                 | 0.00%  |
| opera 115                 | 0.00%  |
| opera 116                 | 0.00%  |
| opera 117                 | 0.00%  |
| opera 118                 | 0.00%  |
| opera 119                 | 0.00%  |
| opera 12                  | 0.00%  |
| opera 12.1                | 0.00%  |
| opera 120                 | 0.00%  |
| opera 121                 | 0.00%  |
| opera 122                 | 0.00%  |
| opera 123                 | 0.00%  |
| opera 124                 | 0.00%  |
| opera 125                 | 0.00%  |
| opera 126                 | 0.00%  |
| opera 127                 | 0.00%  |
| opera 131                 | 0.00%  |
| opera 132                 | 0.00%  |
| opera 133                 | 0.00%  |
| opera 134                 | 0.00%  |
| opera 135                 | 0.00%  |
| opera 15                  | 0.00%  |
| opera 16                  | 0.00%  |
| opera 17                  | 0.00%  |
| opera 18                  | 0.00%  |
| opera 19                  | 0.00%  |
| opera 20                  | 0.00%  |
| opera 21                  | 0.00%  |
| opera 22                  | 0.00%  |
| opera 23                  | 0.00%  |
| opera 24                  | 0.00%  |
| opera 25                  | 0.00%  |
| opera 26                  | 0.00%  |
| opera 27                  | 0.00%  |
| opera 28                  | 0.00%  |
| opera 29                  | 0.00%  |
| opera 30                  | 0.00%  |
| opera 31                  | 0.00%  |
| opera 32                  | 0.00%  |
| opera 33                  | 0.00%  |
| opera 34                  | 0.00%  |
| opera 35                  | 0.00%  |
| opera 36                  | 0.00%  |
| opera 37                  | 0.00%  |
| opera 38                  | 0.00%  |
| opera 39                  | 0.00%  |
| opera 40                  | 0.00%  |
| opera 41                  | 0.00%  |
| opera 42                  | 0.00%  |
| opera 43                  | 0.00%  |
| opera 44                  | 0.00%  |
| opera 45                  | 0.00%  |
| opera 46                  | 0.00%  |
| opera 47                  | 0.00%  |
| opera 48                  | 0.00%  |
| opera 49                  | 0.00%  |
| opera 50                  | 0.00%  |
| opera 51                  | 0.00%  |
| opera 52                  | 0.00%  |
| opera 53                  | 0.00%  |
| opera 54                  | 0.00%  |
| opera 55                  | 0.00%  |
| opera 56                  | 0.00%  |
| opera 57                  | 0.00%  |
| opera 58                  | 0.00%  |
| opera 60                  | 0.00%  |
| opera 62                  | 0.00%  |
| opera 63                  | 0.00%  |
| opera 64                  | 0.00%  |
| opera 65                  | 0.00%  |
| opera 66                  | 0.00%  |
| opera 67                  | 0.00%  |
| opera 68                  | 0.00%  |
| opera 69                  | 0.00%  |
| opera 70                  | 0.00%  |
| opera 71                  | 0.00%  |
| opera 72                  | 0.00%  |
| opera 73                  | 0.00%  |
| opera 74                  | 0.00%  |
| opera 75                  | 0.00%  |
| opera 76                  | 0.00%  |
| opera 77                  | 0.00%  |
| opera 78                  | 0.00%  |
| opera 79                  | 0.00%  |
| opera 80                  | 0.00%  |
| opera 81                  | 0.00%  |
| opera 82                  | 0.00%  |
| opera 83                  | 0.00%  |
| opera 84                  | 0.00%  |
| opera 85                  | 0.00%  |
| opera 86                  | 0.00%  |
| opera 87                  | 0.00%  |
| opera 88                  | 0.00%  |
| opera 89                  | 0.00%  |
| opera 9                   | 0.00%  |
| opera 9.5-9.6             | 0.00%  |
| opera 90                  | 0.00%  |
| opera 91                  | 0.00%  |
| opera 92                  | 0.00%  |
| opera 93                  | 0.00%  |
| opera 94                  | 0.00%  |
| opera 95                  | 0.00%  |
| opera 96                  | 0.00%  |
| opera 97                  | 0.00%  |
| opera 98                  | 0.00%  |
| opera 99                  | 0.00%  |
| safari 10                 | 0.00%  |
| safari 10.1               | 0.00%  |
| safari 11                 | 0.00%  |
| safari 11.1               | 0.00%  |
| safari 12                 | 0.00%  |
| safari 12.1               | 0.00%  |
| safari 13                 | 0.00%  |
| safari 15                 | 0.00%  |
| safari 15.1               | 0.00%  |
| safari 15.2-15.3          | 0.00%  |
| safari 15.4               | 0.00%  |
| safari 16.0               | 0.00%  |
| safari 17.0               | 0.00%  |
| safari 18.0               | 0.00%  |
| safari 18.5-18.7          | 0.00%  |
| safari 26.0               | 0.00%  |
| safari 27.1               | 0.00%  |
| safari 27.2               | 0.00%  |
| safari 3.1                | 0.00%  |
| safari 3.2                | 0.00%  |
| safari 4                  | 0.00%  |
| safari 5                  | 0.00%  |
| safari 5.1                | 0.00%  |
| safari 6                  | 0.00%  |
| safari 6.1                | 0.00%  |
| safari 7                  | 0.00%  |
| safari 7.1                | 0.00%  |
| safari 8                  | 0.00%  |
| safari 9                  | 0.00%  |
| safari 9.1                | 0.00%  |
| safari TP                 | 0.00%  |
| samsung 10.1              | 0.00%  |
| samsung 11.1-11.2         | 0.00%  |
| samsung 12.0              | 0.00%  |
| samsung 13.0              | 0.00%  |
| samsung 14.0              | 0.00%  |
| samsung 15.0              | 0.00%  |
| samsung 16.0              | 0.00%  |
| samsung 17.0              | 0.00%  |
| samsung 18.0              | 0.00%  |
| samsung 19.0              | 0.00%  |
| samsung 20                | 0.00%  |
| samsung 21                | 0.00%  |
| samsung 22                | 0.00%  |
| samsung 23                | 0.00%  |
| samsung 24                | 0.00%  |
| samsung 25                | 0.00%  |
| samsung 26                | 0.00%  |
| samsung 27                | 0.00%  |
| samsung 28                | 0.00%  |
| samsung 29                | 0.00%  |
| samsung 30                | 0.00%  |
| samsung 4                 | 0.00%  |
| samsung 5.0-5.4           | 0.00%  |
| samsung 6.2-6.4           | 0.00%  |
| samsung 7.2-7.4           | 0.00%  |
| samsung 8.2               | 0.00%  |
| samsung 9.2               | 0.00%  |

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
