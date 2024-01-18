const replace = require('replace-in-file');
const fs      = require('fs');
const { version }           = require('../package.json');
const { resolve, relative } = require('path');
const { writeFileSync }     = require('fs-extra');

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
	}
};
try {
	const getResourcePath = function () {
		const oldName = 'https://[project][env]-bm-cdn-asset';
		return oldName.replace("[project]", config.getProject()).replace("[env]", config.getEnv());
	};
	var assetFilePath =  '$asset-cdn-versioned-path : "'+getResourcePath()+'" + random(6) + ".bluemeteor.com";' + '\n';
		assetFilePath += '$asset-cdn-path : $asset-cdn-versioned-path !default;';
  	fs.writeFile('src/theme/environments.scss', assetFilePath ,'utf8', function(){
  		console.log('Scss Files are pre-build');
  	});

	// Code Verionsing
	const getRepoInfo = require('git-repo-info');
	const gitInfo = getRepoInfo();
	gitInfo.version = version + 1;
	gitInfo.deployDate = new Date().toLocaleString();

	const versionFileContents = `
	// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
	/* tslint:disable */
	export const APP_VERSION_INFO = ${JSON.stringify(gitInfo, null, 4)};
	/* tslint:enable */
	`;
	fs.writeFile('src/environments/version.ts', versionFileContents ,'utf8', function(){
		console.log('Version Info Updated');
	});
} catch (error) {
	console.error('Error occurred:', error);
}
