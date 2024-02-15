# avae

Streamline the generation of release notes/text from your changelog file effortlessly. Whether you're managing a large-scale project or a smaller development effort, `avae` empowers you to create professional and comprehensive release notes/text with ease.

`avae` read the changelog file from top to bottom and create release file from it. `avae` relies on version tags in the changelog as the parsing boundary. The version tags should follow sermantic versioning (`vX.Y.Z`).
<br>

[![Test](https://github.com/ambiere/avae/actions/workflows/continue-integration.yml/badge.svg)](https://github.com/ambiere/avae/actions/workflows/continue-integration.yml)
[![Publish](https://github.com/ambiere/avae/actions/workflows/continue-deployment.yml/badge.svg)](https://github.com/ambiere/avae/actions/workflows/continue-deployment.yml)
<br>

## Installation

To install `avae` into your project, run:

```bash
npm i @ambiere/avae
```

> NOTE: avae is also available as a command line interface which enables you to generate release notes effortlessly from the terminal. To install avae cli run:

```bash
npm i -g @ambiere/avae
```

For available commands, run:

```bash
avae help
```

## Example

To use it in your npm project, configure `avae` in your package.json file by running the following command:

```bash
npm pkg set scripts.avae=avae
```

To generate release text later on, run:

```bash
npm run avae

```

Above command will read `CHANGELOG.md` and generate `RELEASE.md` file in the root directory of the project. By default, the file to read from is `CHANGELOG.md` and output file to write to is `RELEASE.md`

Optionally, you can import avae into your javascript file and create release text by calling `createReleasetText` function.

```js
import * as createReleasetText from "avae"

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

To customize the default behaviour of avae, you can pass several options when runing avae.

1: `--read<path> || -r<path>` <br>
Specify the dir/filename path from which avae should read from. Example:

```bash
npm run avae --read "CHANGELOG.md"
```

2: `--out<path> || -o<path>`<br>
Specify the dir/filename path to which avae should output/write. Example:

```bash
npm run avae --out "RELEASE.md"
```

3: `--count<number> || -c<number>`<br>
Specify the number of releases that should be written to the output file. Example:

```bash
npm run avae --count 1
```

## CI/CD

For automation purposes, avae can be used together with `softprops/action-gh-release` to generate release notes on tags push.
Below is the workflow example that impliment `avae` and `softprops/action-gh-release` to generate release notes.

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
        run: pnpm run avae
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

Please refer to the [Contributing Guidelines](https://github.com/ambiere/avae/blob/main/CONTRIBUTING.md).

## license

Licensed under the **[MIT License](https://github.com/ambiere/avae/blob/main/LICENSE)**.
