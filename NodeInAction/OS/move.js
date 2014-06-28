var fs = require('fs');

module.exports = function move(oldPath, newPath, callback) {
	fs.rename(oldPath, newPath, function (err) {
		if (err) {
			if (err.code === 'EXDEV') {
				copy();
			} else {
				callback(err);
			}
			return;
		}
		callback();
	});

	function copy() {
		var readStream = fs.createReadStream(oldPath);
		var writeStream = fs.createWriteStream(newPath);
		readStream.on('error', callback);
		readStream.on('error', callback);
		readStream.on('close', ifunction() {
			fs.unlink(oldPath, callback);
		});
		readStream.pipe(writeStream);
	}
}

fs.watchFile('/var/log/system.log', function(curr, prev) {
	if (curr.mtime.getTime() !== prev.mtime.getTime()) {
		console.log('"System.log" has been modified');
	}
});