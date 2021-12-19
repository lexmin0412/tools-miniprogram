export default {
	pages: ['index/index', 'profile/index', 'search/index'],
	subpackages: [
		{
			root: 'default',
			pages: ['404'],
		},
		{
			root: 'demo',
			pages: ['router/router', 'router/routerTarget'],
		},
	],
	tabBar: {
		custom: true,
		list: [
			{
				pagePath: 'index/index',
				text: 'Home',
			},
			{
				pagePath: 'search/index',
				text: 'Search',
			},
			{
				pagePath: 'profile/index',
				text: 'Profile',
			},
		],
	},
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black',
	},
}
