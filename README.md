# `Crypto Task`

This repository contains code for the task requested by coin-mena .

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `web`: the app that contains the logic for the task.
- `ui`: a stub component & utility library shared by all apps in the repo.
- `eslint-config-custom`: shared `eslint` configurations
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `design-system`: primitive `components`s used throughout the monorepo.
- `icons`: icons used throughout the monorepo.

Each package and app is 100% [TypeScript]

## IMPORTANT
- Due to APIS limitations on requests, I am using mock data, to use real apis, go to -> `apps/web/services/api/exchange.ts` comment mocks and uncomment `axios`

## Using this demo

Run the following command:

```sh
git clone https://github.com/m7mdBalboul/crupto-task.git
cd crypto-task
yarn install
yarn dev
```
