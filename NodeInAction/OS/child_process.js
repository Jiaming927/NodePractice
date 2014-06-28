// child_process module

// cp.exec(); // Spawning commands and buffer hte results in a callback
// cp.spawn(); // Spawn a single command into a CP object
// cp.fork(); // Spawn additional Node process with a IPC channel

var cp = require('child_process');

room.on('message', function(user, message) {
	if (message[0] === '.') {
		var command = message.substring(1);
		cp.exec(command, {timeout: 15000},
			function(err, stdout, stderr) {
				if (err) {
					room.say(
						'Error executing command ' + command + " : " + err.message
					);
					room.say(stderr);
				} else {
					room.say('Command completed: ' + command);
					room.say(stdout);
				}
			}
		);
	}
});