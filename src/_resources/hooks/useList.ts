import { usePageScroll } from '@tarojs/taro'
import { useState, useEffect } from 'react'

export const useList = (config: {
	queryFunc: () => Promise<any>
	extraParams: any
}): any => {
	const { queryFunc, extraParams } = config

	const [hasMore, setHasMore] = useState(true)
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [list, setList] = useState([])

	const getData = async () => {
		if (!hasMore) {
			return
		}
		setLoading(true)
		const { code, data } = await queryFunc({
			page,
			per_page: 10,
			...extraParams,
		})
		setLoading(false)
		if (code === '0') {
			if (data && data.length) {
				setList(list.concat(data))
				setPage(page + 1)
			} else {
				setHasMore(false)
			}
		} else {
			setHasMore(false)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	const [scrollTop, setScrollTop] = useState(0)

	usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

	return [list, loading, hasMore, scrollTop, getData]
}
