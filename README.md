# peni

Streamline the generation of release notes/text from your changelog file effortlessly. Whether you're managing a large-scale project or a smaller development effort, `peni` empowers you to create professional and comprehensive release notes/text with ease. `peni` read the changelog file from top to bottom and create release file from it. `peni` relies on version tags in the changelog as the parsing boundary. The version tags should follow sermantic versioning (`vX.Y.Z`).

[![Test](https://github.com/zhid0399123/peni/actions/workflows/continue-integration.yml/badge.svg)](https://github.com/zhid0399123/peni/actions/workflows/continue-integration.yml)
[![Publish](https://github.com/zhid0399123/peni/actions/workflows/continue-deployment.yml/badge.svg)](https://github.com/zhid0399123/peni/actions/workflows/continue-deployment.yml)
[![npm](https://img.shields.io/npm/v/peni.svg?style=flat-square&color=default)](https://www.npmjs.com/package/peni)
[![npm](https://img.shields.io/npm/dt/peni.svg?style=flat-square&color=default)](https://www.npmjs.com/package/peni)
[![License](https://img.shields.io/github/license/zhid0399123/peni.svg?style=flat-square&color=default)](https://opensource.org/licenses/MIT)
[![js-standard-style](https://img.shields.io/badge/style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

## Installation

To install `peni` into your project, run:

```bash
npm i peni
```

> NOTE: peni is also available as a command line interface which enables you to generate release notes effortlessly from the terminal. To install peni cli run:

```bash
npm i -g peni
```

For available commands, run:

```bash
peni help
```

## Example

To use it in your npm project, configure `peni` in your package.json file by running the following command:

```bash
npm pkg set scripts.peni=peni
```

To generate release text later on, run:

```bash
npm run peni

```

Above command will read `CHANGELOG.md` and generate `RELEASE.md` file in the root directory of the project. By default, the file to read from is `CHANGELOG.md` and output file to write to is `RELEASE.md`

Optionally, you can import peni into your javascript file and create release text by calling `createReleasetText` function.

```js
import * as createReleasetText from "peni"

const read = path.join(__dirname, "CHANGELOG.md")
const out = path.join(__dirname, "RELEASE.md")

createReleasetText(read, out, 1)
```

terminal logs:

```bash

[RELEASE]: writing RELEASE.md
[RELEASE]: saved RELEASE.md
+          RELEASE.md ++++++++++++++++++++++++++++++++
```

## Options

To customize the default behaviour of peni, you can pass several options when runing peni.

1: `--read<path> || -r<path>` <br>
Specify the dir/filename path from which peni should read from. Example:

```bash
npm run peni --read "CHANGELOG.md"
```

2: `--out<path> || -o<path>`<br>
Specify the dir/filename path to which peni should output/write. Example:

```bash
npm run peni --out "RELEASE.md"
```

3: `--count<number> || -c<number>`<br>
Specify the number of releases that should be written to the output file. Example:

```bash
npm run peni --count 1
```

## CI/CD

For automation purposes, peni can be used together with `softprops/action-gh-release` to generate release notes on tags push.
Below is the workflow example that impliment `peni` and `softprops/action-gh-release` to generate release notes.

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
        run: pnpm run peni
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

We welcome contributions and suggestions to enhance the functionality and robustness of the `peni`. Please refer to the [Contributing Guidelines](https://github.com/zhid0399123/peni/blob/main/CONTRIBUTING.md) to get started.

## Copyright and license

Copyright (c) 2024 Zidikhery Mchomvu

Licensed under the **[MIT License](https://github.com/zhid0399123/peni/blob/main/LICENSE)**.
