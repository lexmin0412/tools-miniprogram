import Taro from '@tarojs/taro'
import Request from '@/utils/request'

class UserService extends Request {
	constructor() {
		super({
			hostKey: GITHUB_API_BASE,
		})
	}

	/**
	 * 获取用户信息
	 */
	getUserInfo(payload: { userName: string }) {
		const { userName } = payload
		return this.get({
			url: `/users/${userName}`,
			data: {},
		})
	}

	/**
	 * 获取用户仓库列表
	 */
	getUserRepositories(payload: {
		userName: string
		page?: number
		per_page?: number
	}): Promise<any> {
		const { userName, ...rest } = payload
		// return new Request({hostKey: GITHUB_API_BASE}).get({
		// 	url: `${GITHUB_API_BASE}/users/${userName}/repos`,
		// 	data: rest
		// }).then((res)=>{
		// 	console.log('请求完成', res);
		// 	return Promise.resolve(res)
		// })
		// return new Promise((resolve, reject)=>{
		// 	return new Request({ hostKey: GITHUB_API_BASE }).get({
		// 		url: `${GITHUB_API_BASE}/users/${userName}/repos`,
		// 		data: rest
		// 	})
		// 	// Taro.request({
		// 	// 	method: 'GET',
		// 	// 	url: `${GITHUB_API_BASE}/users/${userName}/repos?page=${rest.page}&per_page=${rest.per_page}`,
		// 	// 	success: res => {
		// 	// 		console.log('res', res);

		// 	// 		resolve(res.data)
		// 	// 	}
		// 	// })
		// })
		return this.get({
			url: `/users/${userName}/repos`,
			data: {
				...rest,
			},
		})
	}

	/**
	 * 获取用户star列表
	 */
	getUserStarredList(payload: {
		userName: string
		page?: number
		per_page?: number
	}): Promise<any> {
		const { userName, ...rest } = payload
		return this.get({
			url: `/users/${userName}/starred`,
			data: {
				...rest,
			},
		})
	}
}

export default new UserService()
