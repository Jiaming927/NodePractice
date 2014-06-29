// process.argv: an array of strings
var args = process.argv.slice(2); // args after the 2nd one

// process.stdin: ReadStream to read input
// process.stdout WriteStream to write (see below)

res.pipe(process.stdout); // Pipe to stdout

