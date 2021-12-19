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
