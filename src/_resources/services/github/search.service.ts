import Request from '@/utils/request'

class SearchService extends Request {
	constructor() {
		super({
			hostKey: GITHUB_API_BASE,
		})
	}

	/**
	 * 根据关键词搜索仓库
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
