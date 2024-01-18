// const brotli = require('brotli');
// const fs = require('fs');
// const brotliSettings = {
// 	extension  : 'br',
// 	skipLarger : true,
// 	mode       : 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
// 	quality    : 10, // 0 - 11,
// 	lgwin      : 12 // default
// };
// fs.readdirSync('dist/').forEach(file => {
//   	if (file.endsWith('.js') || file.endsWith('.css')) {
//     	const result = brotli.compress(fs.readFileSync('dist/' + file), brotliSettings)
//     	fs.writeFileSync('dist/' + file, result);
//   	}
// });

const replace = require('replace-in-file');
const fs = require('fs');
const path = require('path');
const { Compress } = require('gzipper');
const brotli = new Compress('./dist', './dist', { 
	'brotli': true,
	'include' : 'js',
	'level'   : 9 
});
const gzip   = new Compress('./dist', './dist', {
	'include' : 'js'
});

async function gzipStart() {
	return await gzip.run();
};

try {
	(async() => {
		await gzipStart().then(function(){
			console.log("Gzip Done");
			const options = {
				files : 'dist/index.html',
				from  : new RegExp(new RegExp(/(.js)/i), 'g'),
				to    : '.js.gz'
			};
			const results = replace.sync(options);
			const resultsJson = replace.sync({
				files : 'dist/index.html',
				from  : '.js.gzon',
				to    : '.json'
			});
		});
	})();
} catch (err) {
	console.error(err);
}