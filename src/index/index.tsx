import React from 'react'
import { View, Text } from '@tarojs/components'
import { List, Loading } from '@taroify/core'
import eventService from '@/services/github/events.service'
import { useList } from '@/hooks/useList'

import './index.scss'

const Index = (): JSX.Element => {
	const [data, loading, hasMore, scrollTop, loadMore] = useList({
		queryFunc: () => eventService.getEventsList(),
	})

	return (
		<View className='index'>
			<View className='list-box'>
				<List
					loading={loading}
					hasMore={hasMore}
					scrollTop={scrollTop}
					onLoad={loadMore}
				>
					{data.map((item: any) => {
						const { display_login } = item.actor
						const parseActionText = () => {
							switch (item.type) {
								case 'PushEvent':
									return `pushed to ${item.repo.name} at ${item.created_at}`
								case 'IssuesEvent':
									return `${item.payload.action} a issue in ${item.repo.name} that received ${item.payload.issue.comments}`
								case 'IssueCommentEvent':
									return `${item.payload.action} a comment in issue: ${item.payload.issue.body} `
								case 'ReleaseEvent':
									return `${item.payload.action} a release of ${item.repo.name}`
								case 'CreateEvent':
									return `created a repository named ${item.repo.name}`
								case 'WatchEvent':
									return `${item.payload.action} watch ${item.repo.name}`
								case 'PullRequestEvent':
									return `${item.payload.action} a pull request in ${item.repo.name} that received ${item.payload.pull_request.comments}`
								case 'PullRequestReviewCommentEvent':
									return `created a review comment in ${item.repo.name}`
								case 'ForkEvent':
									return `forked ${item.repo.name} to ${item.payload.forkee.full_name}`
								case 'DeleteEvent':
									return `deleted ${item.payload.ref_type}:${item.payload.ref} of ${item.repo.name}`
								default:
									return 'did something unknown'
							}
						}
						return (
							<View key={item.id} className='list-item'>
								<Text className='item-name'>{display_login}</Text>
								<Text className='item-action-text'>{parseActionText()}</Text>
							</View>
						)
					})}
					<List.Placeholder>
						{loading && <Loading>加载中...</Loading>}
						{!hasMore && '没有更多了'}
					</List.Placeholder>
				</List>
			</View>
		</View>
	)
}

export default Index
