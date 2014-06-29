var requireAge = 18;

process.stdout.write('Please enter your age: ');

process.stdin.setEncoding('utf8');

process.stdin.on('data', function(data) {
	var age = parseInt(data, 10);
	if (isNaN(age)) {
		console.log('%s is not a valid number!', data);
	} else if (age < requireAge) {
		console.log('You must be at least %d to enter, come back in %d years', requireAge, requireAge - age);
	} else {
		enter();
	}
	process.stdin.pause();
});

process.stdin.resume();

function enter() {
	console.log('Welcome to The Program');
}
