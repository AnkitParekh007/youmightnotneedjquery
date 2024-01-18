const jsonConcat = require("json-concat");

jsonConcat({
	src: "src/mocks/data",
	dest: "src/mocks/data.json",
}, function(json){
	console.log(json);
});
