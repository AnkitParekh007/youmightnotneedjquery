const replace     = require('replace-in-file');
let assetconfig = {
	projectName : 'amaze',
	assetCounter : 0,
	environments : {
		playground : 'pg',
		test       : 'test',
		prod       : '',
		hotfix     : 'hotfix'
	},
	getEnv : () => {
		return assetconfig.environments[process.env.npm_config_env];
	},
	getProject: () => {
		return assetconfig.projectName;
	},
	getDefaultAssstCdnUrl : () => {
		return ('https://'+assetconfig.getProject()+assetconfig.getEnv()+'-bm-cdn-asset1.bluemeteor.com/').toString();
	},
	getAssetCounter:() => {
		if (assetconfig.assetCounter > 5) {
			assetconfig.assetCounter = 0;
		}
		return (++assetconfig.assetCounter);
	},
	getLoaderUrl:() => {
		return assetconfig.getDefaultAssstCdnUrl() + 'assets/img/logo/new_03_06_2023/bm_bounce_ball.gif';
	},
	getLoaderChristmasUrl:() => {
		return assetconfig.getDefaultAssstCdnUrl() + 'assets/img/logo/new_03_06_2023/bm_christmas_bounce_ball.gif'
	},
	isChristmas:() => {
		var date = new Date().toISOString().split('T')[0].split('-');
		var christmasDays = ['12-23', '12-24', '12-25', '12-26', '12-27', '12-28', '12-29', '12-30', '12-31', '1-1'];
		return (christmasDays.includes(date[1] + '-' + date[2]));
	}
};
const holidays = {
	files : 'dist/index.html',
	from  : new RegExp(assetconfig.getLoaderUrl(), 'g'),
	to    : (match) => (assetconfig.isChristmas() ? assetconfig.getLoaderChristmasUrl() : assetconfig.getLoaderUrl())
};
const options = {
	files : 'dist/index.html',
	from  : new RegExp(assetconfig.getDefaultAssstCdnUrl(), 'g'),
	to    : (match) => ('https://'+assetconfig.getProject()+assetconfig.getEnv()+'-bm-cdn-asset'+assetconfig.getAssetCounter()+'.bluemeteor.com/')
};
try {
  	const holidayResults = replace.sync(holidays);
  	const results = replace.sync(options);
  	console.log('Post build results:', results, holidayResults);
}
catch (error) {
	console.error('Error occurred:', error);
}
