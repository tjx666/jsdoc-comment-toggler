import * as path from "path"
import * as Mocha from "mocha"
import * as glob from "glob"

export const run = (
  testsRoot: string,
  cb: (error: any, failures?: number) => void
): void => {
  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  })

  glob("**/**.test.js", { cwd: testsRoot }, (err, files) => {
    if (err) {
      console.error("glob err", err)
      return cb(err)
    }

    // Add files to the test suite
    files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)))

    try {
      // Run the mocha test
      return mocha.run((failures) => {
        cb(null, failures)
      })
    } catch (error) {
      console.error(error)
      return cb(error)
    }
  })
}
