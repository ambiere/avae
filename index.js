const fs = require("fs")
const split2 = require("split2")
const argv = require("yargs-parser")

function createReleaseText(filename = "CHANGELOG.md", output = "RELEASE.md", count = 1) {
  const set = []
  const regex = /v[0-9]+\.[0-9]+\.[0-9]+/gim
  const fileStream = fs.createReadStream(filename)

  fileStream
    .pipe(split2())
    .on("data", function (data) {
      if (set.length === 0) set.push(data + "\n")
      if (set[0] === data + "\n") return
      const releases = set.filter((v) => v.match(regex))
      if (releases.length - 1 === count) return
      else {
        if (data.match("# Features")) return set.push("### Minor Changes \n")
        if (data.match("# Fixes")) return set.push("### Patch Changes \n")
        if (data.match(regex)) return set.push(data + "\n")
        set.push(data + "\n")
      }
    })

    .on("close", function () {
      fileStream.close()
      set.pop()
      const newSet = set.filter((line) => line !== "")
      const data = newSet.join(",").replace(/,/gim, "")
      console.log(`\x1B[30m[RELEASE]: writing ${output}\x1B[0m`)
      fs.writeFile(output, data, (err) => {
        if (err) throw err
        console.log(`\x1B[30m[RELEASE]: saved ${output}\x1B[0m`)
        console.log(`\x1B[32m+\x1B[0m          \x1B[30m${output} ++++++++++++++++++++++++++++++++\x1B[0m`)
      })
    })

    .on("error", function (err) {
      throw err
    })
}

function cli(args) {
  const opts = argv(args)
  createReleaseText(opts.read || opts.r, opts.out || opts.o, opts.count || opts.c)
}

module.exports = { createReleaseText, cli }

if (require.main === module) {
  const opts = argv(process.argv)
  createReleaseText(opts.read || opts.r, opts.out || opts.o, opts.count || opts.c)
}
