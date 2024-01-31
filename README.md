# relit - Release Notes Generator

Streamline the generation of release notes from your changelog file effortlessly. Whether you're managing a large-scale project or a smaller development effort, Relit empowers you to create professional and comprehensive release notes with ease. Relit read the changelog file from top to bottom and create release file from it. Relit relies on version tags in the changelog as the parssing boundary. The version tags should follow sermantic versioning (`vX.Y.Z`).

[![Test](https://github.com/zhid0399123/relit/actions/workflows/continue-integration.yml/badge.svg)](https://github.com/zhid0399123/relit/actions/workflows/continue-integration.yml)
[![Publish](https://github.com/zhid0399123/relit/actions/workflows/continue-deployment.yml/badge.svg)](https://github.com/zhid0399123/relit/actions/workflows/continue-deployment.yml)
[![npm](https://img.shields.io/npm/v/@zhid0399123/relit.svg?style=flat-square&color=default)](https://www.npmjs.com/package/@zhid0399123/relit)
[![npm](https://img.shields.io/npm/dt/@zhid0399123/relit.svg?style=flat-square&color=default)](https://www.npmjs.com/package/@zhid0399123/relit)
[![License](https://img.shields.io/github/license/zhid0399123/relit.svg?style=flat-square&color=default)](https://opensource.org/licenses/MIT)
[![js-standard-style](https://img.shields.io/badge/style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

## Installation

To install relit into your project, run:

```bash
npm i @zhid0399123/relit
```

> NOTE: Relit is also available as a command line interface which enables you to generate release notes effortlessly from the terminal. To install relit cli run:

```bash
npm i -g @zhid0399123/relit
```

For available commands, run:

```bash
relit help
```

## Example

To use it in your project, configure `relit` in your package.json file by running the following command:

```bash
npm pkg set scripts.relit=relit
```

To generate release text later on, run:

```bash
npm run relit

```

Above command will read `CHANGELOG.md` and generate `RELEASE.md` file in the root directory of the project. By default, the file to read from is `CHANGELOG.md` and output file to write to is `RELEASE.md`

## Options

To customize the default behaviour of relit, you can pass several options when runing relit.

1. `--read || -r`
   Specify the dir/filename from which relit should read from. Example:

```bash
npm run relit --read "CHANGELOG.md"
```

2. `--out || -o`
   Specify the dir/filename to which relit should output/write. Example:

```bash
npm run relit --out "RELEASE.md"
```

3. `--count || -c`
   Specify the number of releases that should be written to the output file. Example:

```bash
npm run relit --count 1
```

## CI/CD

For automation purposes, relit can be used together with `softprops/action-gh-release` to generate release notes on tags push.
Below is the workflow example that impliment `relit` and `softprops/action-gh-release` to generate release notes.

```yaml
name: Release
on:
 push:
  tags:
    - "v*.*.*"
permissions:
  contents: read

jobs:
  releae:
    permissions:
    contents: write  # for softprops/action-gh-release to create GitHub release
    runs-on: ubuntu-latest
    environment: release
    steps:
    - name: Checkout
        uses: actions/checkout@v4
    - name: Install Node.js
        uses: actions/setup-node@v4
        with:
        node-version: 21
        name: Install dependencies
        run: npm ci
    - name: Publish Packages
        env:
            NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: |
        npm config set "//registry.npmjs.org/:_authToken" "${NPM_TOKEN}" # pnpm config set is broken
        pnpm release
    - name: Generate release description
        run: pnpm run relit
    - name: Release
        uses: softprops/action-gh-release@v1
        with:
        draft: true
        files: dist/*
        body_path: RELEASE.md


```

## TODO

Tailor release notes to meet your project's specific requirements using customizable templates and formatting options.

## Contributing

We welcome contributions and suggestions to enhance the functionality and robustness of the `relit`. Please refer to the [Contributing Guidelines](https://github.com/zhid0399123/relit/blob/main/CONTRIBUTING.md) to get started.

## Copyright and license

Copyright (c) 2024 Zidikhery Mchomvu

Licensed under the **[MIT License](https://github.com/zhid0399123/relit/blob/main/LICENSE)**.
