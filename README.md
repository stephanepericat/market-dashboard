[![Build Status](https://travis-ci.org/stephanepericat/market-dashboard.svg?branch=master)](https://travis-ci.org/stephanepericat/market-dashboard)

[![Coverage Status](https://coveralls.io/repos/github/stephanepericat/market-dashboard/badge.svg?branch=master)](https://coveralls.io/github/stephanepericat/market-dashboard?branch=master)

# Market Dashboard

A demo market monitoring terminal built with Vue.js and Electron.

## Clone

```shell
git clone https://github.com/stephanepericat/market-dashboard.git
```

## Setup

 - Install the node.js dependencies
```shell
cd market-dashboard/
yarn
```
 - Create a file called `.env.local` at the root of the project
 - add your api token, as such: `VUE_APP_IEX_TOKEN=pk_463464364634646`

## Run the App Locally

```shell
yarn serve:electron
```

## Run Tests

```shell
yarn test
```

## Build

```shell
yarn build:electron
```

## Legal

[Data provided by IEX Cloud](https://iexcloud.io).
