const replace     = require('replace-in-file');
let config = {
	projectName : 'amaze',
	assetCounter : 0,
	environments : {
		playground : 'pg',
		test       : 'test',
		prod       : '',
		hotfix     : 'hotfix'
	},
	getEnv : () => {
		return config.environments[process.env.npm_config_env];
	},
	getProject: () => {
		return config.projectName;
	},
	getCdnUrl : () => {
		return ('https://'+config.getProject()+config.getEnv()+'-bm-cdn-asset1.bluemeteor.com/').toString();
	},
	getCounter:() => {
		if (config.assetCounter > 5) {
			config.assetCounter = 0;
		}
		return (++config.assetCounter);
	}
};

const getResourcePath = function () {
	const oldName = 'https://[project][env]-bm-cdn-asset[assetVersion].bluemeteor.com';
	return oldName
			.replace("[project]"      , config.getProject())
			.replace("[env]"          , config.getEnv())
			.replace('[assetVersion]' , config.getCounter().toString());
};
try {
  	const results = replace.sync({
		files : 'src/assets/templates/pdp/minified/*.ts',
		from  : ['<!-- [startPoint] -->', '<!-- [EndPoint] -->'],
		to    : ['export const template = `', '`;']
	});
	const results2 = replace.sync({
		files : 'src/assets/templates/pdp/minified/*.ts',
		from  : [/\(resourceBasePath\)/g],
		to    : (match) => getResourcePath()
	});
  	console.log('PDP Ts Files are build');
}
catch (error) {
	console.error('Error occurred:', error);
}
