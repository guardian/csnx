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

| Browser           | Versions                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| chrome (android)  | 108                                                                                                                    |
| chrome            | 70, 76, 79, 87, 91, 92, 93, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111                     |
| edge              | 99, 108                                                                                                                |
| firefox (android) | 107                                                                                                                    |
| firefox           | 78, 102, 109                                                                                                           |
| safari (mobile)   | 10.3, 12.2-12.5, 13.3, 13.4-13.7, 14.0-14.4, 14.5-14.8, 15.0-15.1, 15.2-15.3, 15.4, 15.5, 15.6, 16.0, 16.1, 16.2, 16.3 |
| safari            | 11.1, 12.1, 13, 13.1, 14, 14.1, 15, 15.1, 15.4, 15.5, 15.6, 16.1, 16.2, 16.3                                           |
| samsung           | 16.0, 17.0, 18.0, 19.0                                                                                                 |

<!-- /INCLUDED -->

## Usage Stats

These are the numbers that were used to generate the list of included browsers.

<!-- USAGE -->

| Browser                   | Usage  |
| ------------------------- | ------ |
| chrome (android) 114      | 24.89% |
| chrome 113                | 11.73% |
| safari (mobile) 16.5      | 9.97%  |
| safari (mobile) 16.4      | 6.77%  |
| chrome 114                | 5.19%  |
| safari (mobile) 16.3      | 4.16%  |
| safari (mobile) 16.1      | 3.55%  |
| edge 113                  | 3.21%  |
| safari 16.5               | 2.90%  |
| firefox 113               | 2.67%  |
| safari 16.4               | 2.03%  |
| samsung 21                | 1.99%  |
| android 113               | 1.54%  |
| safari (mobile) 16.2      | 1.50%  |
| edge 114                  | 1.25%  |
| safari 16.3               | 1.21%  |
| safari (mobile) 15.6      | 1.20%  |
| safari 15.6               | 1.15%  |
| chrome 112                | 0.92%  |
| firefox (android) 113     | 0.76%  |
| safari (mobile) 16.0      | 0.75%  |
| chrome 109                | 0.50%  |
| safari (mobile) 14.5-14.8 | 0.44%  |
| safari 14.1               | 0.43%  |
| safari 16.2               | 0.43%  |
| safari (mobile) 15.5      | 0.34%  |
| safari (mobile) 12.2-12.5 | 0.28%  |
| chrome 111                | 0.27%  |
| safari 13.1               | 0.27%  |
| safari 16.1               | 0.27%  |
| chrome 103                | 0.24%  |
| edge 112                  | 0.20%  |
| firefox 102               | 0.20%  |
| samsung 20                | 0.20%  |
| safari (mobile) 15.2-15.3 | 0.18%  |
| safari (mobile) 15.4      | 0.18%  |
| opera 99                  | 0.18%  |
| chrome 108                | 0.17%  |
| safari (mobile) 14.0-14.4 | 0.15%  |
| safari 15.5               | 0.15%  |
| opera 98                  | 0.14%  |
| chrome 110                | 0.12%  |
| safari 14                 | 0.11%  |
| chrome 105                | 0.10%  |
| safari (mobile) 15.0-15.1 | 0.10%  |
| safari 15.4               | 0.10%  |
| firefox 112               | 0.09%  |
| firefox 78                | 0.08%  |
| safari (mobile) 13.3      | 0.08%  |
| safari 12.1               | 0.07%  |
| safari (mobile) 10.3      | 0.06%  |
| safari (mobile) 13.4-13.7 | 0.05%  |
| opera (mobile) 10         | 0.05%  |
| opera (mobile) 11         | 0.05%  |
| opera (mobile) 11.1       | 0.05%  |
| opera (mobile) 11.5       | 0.05%  |
| opera (mobile) 12         | 0.05%  |
| opera (mobile) 12.1       | 0.05%  |
| opera (mobile) 73         | 0.05%  |
| safari 15.1               | 0.05%  |
| samsung 19.0              | 0.05%  |
| chrome 107                | 0.04%  |
| chrome 87                 | 0.04%  |
| chrome 99                 | 0.04%  |
| edge 109                  | 0.04%  |
| chrome 104                | 0.03%  |
| edge 110                  | 0.03%  |
| firefox 111               | 0.03%  |
| firefox 48                | 0.03%  |
| safari 11.1               | 0.03%  |
| safari 13                 | 0.03%  |
| safari 15                 | 0.03%  |
| chrome 100                | 0.02%  |
| chrome 102                | 0.02%  |
| chrome 106                | 0.02%  |
| chrome 49                 | 0.02%  |
| chrome 70                 | 0.02%  |
| chrome 91                 | 0.02%  |
| chrome 93                 | 0.02%  |
| chrome 97                 | 0.02%  |
| edge 111                  | 0.02%  |
| edge 99                   | 0.02%  |
| firefox 109               | 0.02%  |
| firefox 114               | 0.02%  |
| opera 95                  | 0.02%  |
| safari 16.6               | 0.02%  |
| samsung 17.0              | 0.02%  |
| samsung 18.0              | 0.02%  |
| uc (android) 13.4         | 0.01%  |
| chrome 101                | 0.01%  |
| chrome 115                | 0.01%  |
| chrome 62                 | 0.01%  |
| chrome 65                 | 0.01%  |
| chrome 66                 | 0.01%  |
| chrome 67                 | 0.01%  |
| chrome 76                 | 0.01%  |
| chrome 79                 | 0.01%  |
| chrome 80                 | 0.01%  |
| chrome 81                 | 0.01%  |
| chrome 83                 | 0.01%  |
| chrome 84                 | 0.01%  |
| chrome 85                 | 0.01%  |
| chrome 86                 | 0.01%  |
| chrome 89                 | 0.01%  |
| chrome 90                 | 0.01%  |
| chrome 92                 | 0.01%  |
| chrome 94                 | 0.01%  |
| chrome 96                 | 0.01%  |
| chrome 98                 | 0.01%  |
| edge 107                  | 0.01%  |
| edge 108                  | 0.01%  |
| edge 18                   | 0.01%  |
| firefox 105               | 0.01%  |
| firefox 107               | 0.01%  |
| firefox 108               | 0.01%  |
| firefox 110               | 0.01%  |
| firefox 52                | 0.01%  |
| firefox 88                | 0.01%  |
| firefox 91                | 0.01%  |
| safari (mobile) 11.0-11.2 | 0.01%  |
| safari (mobile) 11.3-11.4 | 0.01%  |
| safari (mobile) 12.0-12.1 | 0.01%  |
| safari (mobile) 13.0-13.1 | 0.01%  |
| safari 10.1               | 0.01%  |
| samsung 15.0              | 0.01%  |
| samsung 16.0              | 0.01%  |
| qq (android) 13.1         | 0.00%  |
| android 2.1               | 0.00%  |
| android 2.2               | 0.00%  |
| android 2.3               | 0.00%  |
| android 3                 | 0.00%  |
| android 4                 | 0.00%  |
| android 4.1               | 0.00%  |
| android 4.2-4.3           | 0.00%  |
| android 4.4               | 0.00%  |
| android 4.4.3-4.4.4       | 0.00%  |
| baidu 13.18               | 0.00%  |
| blackberry 10             | 0.00%  |
| blackberry 7              | 0.00%  |
| chrome 10                 | 0.00%  |
| chrome 11                 | 0.00%  |
| chrome 116                | 0.00%  |
| chrome 117                | 0.00%  |
| chrome 12                 | 0.00%  |
| chrome 13                 | 0.00%  |
| chrome 14                 | 0.00%  |
| chrome 15                 | 0.00%  |
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
| chrome 63                 | 0.00%  |
| chrome 64                 | 0.00%  |
| chrome 68                 | 0.00%  |
| chrome 69                 | 0.00%  |
| chrome 7                  | 0.00%  |
| chrome 71                 | 0.00%  |
| chrome 72                 | 0.00%  |
| chrome 73                 | 0.00%  |
| chrome 74                 | 0.00%  |
| chrome 75                 | 0.00%  |
| chrome 77                 | 0.00%  |
| chrome 78                 | 0.00%  |
| chrome 8                  | 0.00%  |
| chrome 88                 | 0.00%  |
| chrome 9                  | 0.00%  |
| chrome 95                 | 0.00%  |
| edge 100                  | 0.00%  |
| edge 101                  | 0.00%  |
| edge 102                  | 0.00%  |
| edge 103                  | 0.00%  |
| edge 104                  | 0.00%  |
| edge 105                  | 0.00%  |
| edge 106                  | 0.00%  |
| edge 12                   | 0.00%  |
| edge 13                   | 0.00%  |
| edge 14                   | 0.00%  |
| edge 15                   | 0.00%  |
| edge 16                   | 0.00%  |
| edge 17                   | 0.00%  |
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
| firefox 10                | 0.00%  |
| firefox 100               | 0.00%  |
| firefox 101               | 0.00%  |
| firefox 103               | 0.00%  |
| firefox 104               | 0.00%  |
| firefox 106               | 0.00%  |
| firefox 11                | 0.00%  |
| firefox 115               | 0.00%  |
| firefox 12                | 0.00%  |
| firefox 13                | 0.00%  |
| firefox 14                | 0.00%  |
| firefox 15                | 0.00%  |
| firefox 16                | 0.00%  |
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
| firefox 49                | 0.00%  |
| firefox 5                 | 0.00%  |
| firefox 50                | 0.00%  |
| firefox 51                | 0.00%  |
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
| firefox 89                | 0.00%  |
| firefox 9                 | 0.00%  |
| firefox 90                | 0.00%  |
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
| safari (mobile) 13.2      | 0.00%  |
| safari (mobile) 17        | 0.00%  |
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
| opera mini all            | 0.00%  |
| opera 10.0-10.1           | 0.00%  |
| opera 10.5                | 0.00%  |
| opera 10.6                | 0.00%  |
| opera 11                  | 0.00%  |
| opera 11.1                | 0.00%  |
| opera 11.5                | 0.00%  |
| opera 11.6                | 0.00%  |
| opera 12                  | 0.00%  |
| opera 12.1                | 0.00%  |
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
| opera 96                  | 0.00%  |
| opera 97                  | 0.00%  |
| safari 10                 | 0.00%  |
| safari 11                 | 0.00%  |
| safari 12                 | 0.00%  |
| safari 15.2-15.3          | 0.00%  |
| safari 16.0               | 0.00%  |
| safari 17                 | 0.00%  |
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
| samsung 4                 | 0.00%  |
| samsung 5.0-5.4           | 0.00%  |
| samsung 6.2-6.4           | 0.00%  |
| samsung 7.2-7.4           | 0.00%  |
| samsung 8.2               | 0.00%  |
| samsung 9.2               | 0.00%  |

<!-- /USAGE -->

## Updating

Usage is based on our Google Analytics stats.

To update it, use [browserslist-ga-export](https://github.com/browserslist/browserslist-ga-export) to generate a new [browserslist-stats.json](./browserslist-stats.json) and replace the current one.

### Report content

Views:

- Editorial AUS Timezone
- Editorial UK Timezone
- Editorial US Timezone

Date range: Last 30 days

### Updating the readme

Then run `pnpm --filter="browserslist-config" update-readme` (from the root – `pnpm update-readme` from this directory) and publish the new version.
