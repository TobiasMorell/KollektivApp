import asyncPlugin from 'preact-cli-plugin-async';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (config, env, helpers) => {
	asyncPlugin(config);
	if (env.production) {
		config.output.publicPath = '/osteklokken/';
	}
	config.plugins.push( new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: `*.*` }]) );

	config.devServer = {
		hot: true,
		quiet: true,
		publicPath: '/',
		historyApiFallback: true,
		proxy: [
			{
				path: '/api/**',
				target: 'http://localhost:5000'
			}
		]
	};
};