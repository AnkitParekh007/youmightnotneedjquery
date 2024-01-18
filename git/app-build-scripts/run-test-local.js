const fs = require('fs');
fs.copyFile(
	'src/environments/environment.test.ts',
	'src/environments/environment.ts', (err) => {
    if (err) {
		throw err;
	} else{
		console.log('source.txt was copied to destination.txt');
	}
});
