import Request from '@/utils/request'

class SearchService extends Request {
	constructor() {
		super({
			hostKey: GITHUB_API_BASE,
		})
	}

	/**
	 * 获取用户信息
	 */
	searchRepositories(payload: { q: string }) {
		const { q } = payload
		return this.get({
			url: `/search/repositories`,
			data: {
				q,
			},
		})
	}
}

export default new SearchService()
