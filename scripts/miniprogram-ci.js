const ci = require('miniprogram-ci')
;(async () => {
	const project = new ci.Project({
		appid: 'wx0b32dc740be4b1f5',
		type: 'miniProgram',
		projectPath: 'dist',
		privateKeyPath: 'private/private.wx0b32dc740be4b1f5.key',
		ignores: ['node_modules/**/*'],
	})
	const uploadResult = await ci.upload({
		project,
		version: '1.0.1',
		desc: '完成github api接入',
		setting: {
			es6: true,
		},
		onProgressUpdate: console.log,
	})
	console.log(uploadResult)
})()
