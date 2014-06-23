var b = new Buffer("121234869");

console.log(b.length);

console.log(b);
// <Buffer 31 32 31 32 33 34 38 36 39>

// Buffer is like an array of raw data

writeInt16LE(); // Smaller int

writeUInt32LE(); // unsigned values

writeInt32BE(); // big-endian values

var c = new Buffer(4);
c.writeUInt32LE();

cnosole.log(c.length);

console.log(b);