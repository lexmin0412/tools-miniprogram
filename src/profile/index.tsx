/**
 * 个人中心页面
 */
import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Tabs, Cell, List, Loading } from '@taroify/core'
import { Arrow, StarOutlined } from '@taroify/icons'
import usersService from '@/services/github/users.service'
import { useList } from '@/hooks/useList'

import './index.scss'

const ProfileIndex = (): JSX.Element => {
	const userName = 'lexmin0412'

	const [value, setValue] = useState(0)

	const [repositories, loading, hasMore, scrollTop, loadMore] = useList({
		queryFunc: (...rest) => usersService.getUserRepositories(...rest),
		extraParams: {
			userName,
		},
	})

	const [
		starredList,
		starredLoading,
		starredHasMore,
		starredScrollTop,
		starredLoadMore,
	] = useList({
		queryFunc: (...rest) => usersService.getUserStarredList(...rest),
		extraParams: { userName },
	})

	useEffect(() => {
		if (value === 0) {
			loadMore()
		} else {
			starredLoadMore()
		}
	}, [value])

	return (
		<View className='user-index-page'>
			<Tabs
				animated
				swipeable
				sticky
				defaultValue={0}
				value={value}
				onChange={setValue}
			>
				<Tabs.TabPane title='Repositories'>
					<List
						loading={loading}
						hasMore={hasMore}
						scrollTop={scrollTop}
						onLoad={loadMore}
					>
						{repositories.map((item: any) => (
							<Cell
								key={item.id}
								title={item.name}
								rightIcon={<Arrow />}
								clickable
								brief={item.description}
							/>
						))}
						<List.Placeholder>
							{loading && <Loading>加载中...</Loading>}
							{!hasMore && '没有更多了'}
						</List.Placeholder>
					</List>
				</Tabs.TabPane>
				<Tabs.TabPane title='Stars'>
					<List
						loading={starredLoading}
						hasMore={starredHasMore}
						scrollTop={starredScrollTop}
						onLoad={starredLoadMore}
					>
						{starredList.map((item: any) => (
							<View className='list-item' key={item.id}>
								<View className='item-top'>
									<View className='item-title'>{item.name}</View>
									<View className='item-icons'>
										<View className='item-icon-star'>
											<StarOutlined />{' '}
											<View className='item-icon-star-text'>
												{item.stargazers_count}
											</View>
										</View>
										<Arrow />
									</View>
								</View>
								<View className='item-desc'>{item.description}</View>
							</View>
						))}
						<List.Placeholder>
							{loading && <Loading>加载中...</Loading>}
							{!hasMore && '没有更多了'}
						</List.Placeholder>
					</List>
				</Tabs.TabPane>
			</Tabs>
		</View>
	)
}

export default ProfileIndex
