import Request from '@/utils/request'

class EventsService extends Request {
	constructor() {
		super({
			hostKey: GITHUB_API_BASE,
		})
	}

	/**
	 * 根据关键词搜索仓库
	 */
	getEventsList() {
		return this.get({
			url: `/events`,
			data: {},
		})
	}
}

export default new EventsService()
