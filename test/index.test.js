const path = require("path")
const { test } = require("tap")
const replit = require("../index")
const fixtures = path.join(__dirname, "fixtures")

//TODO

test("should generate release.md file", async (t) => {
  replit(fixtures + "/CHANGELOG.md", fixtures + "/RELEASE.md")
  t.pass()
})
