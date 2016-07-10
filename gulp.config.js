'use strict';

let path = require('path');

module.exports = () => {
	const dist = './dist/';
    const src = './src/';
  	const srcClient = './src/client/';
    const srcServer = './src/server/';
    const distClient = './dist/client/';
    const distServer = './dist/server/';

	let config = {
		src: src,
		dist: dist,
		srcClient: srcClient,
		srcServer: srcServer,
		distClient: distClient,
		distServer: distServer,

		nodeServer:  path.join(distServer, 'app.js'),
		defaultPort: '4000',
		

		/**
         * browser sync
         */
        browserSyncPort: 3000,
        browserReloadDelay: 1000,
	};

	return config;
};