import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { XLoadMore } from 'taro-x-ui'
import searchService from '@/services/github/search.service'

import './index.scss'

const SearchIndex = (): JSX.Element => {
	const [data, setData] = useState([])

	useEffect(() => {
		console.log('process.env', process.env.TARO_ENV)
		console.log('TARO_API_BASE', TARO_API_BASE)
		queryData()
	}, [])

	const queryData = async () => {
		const {
			code,
			data: { items },
		} = await searchService.searchRepositories({
			q: 'taro',
		})
		if (code === '0') {
			setData(items)
		}
	}

	return (
		<View className='index'>
			<View className='list-box'>
				{data.map((item: any) => {
					return (
						<View key={item.id} className='list-item'>
							<View className='item-name'>{item.name}</View>
							<View className='item-desc'>{item.description}</View>
						</View>
					)
				})}
				<XLoadMore hasMore={false} />
			</View>
		</View>
	)
}

export default SearchIndex
