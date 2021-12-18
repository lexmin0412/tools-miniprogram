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
}

export default new UserService()
