import React, { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Route from '@/utils/route'
import { getTabbar } from '@/utils/wx'
import './index.scss'

interface TabbarItem {
	pagePath: string
	text: string
}

const list: TabbarItem[] = getTabbar().list.map(item => {
	return {
		...item,
		pagePath: item.pagePath.split('.html')[0],
	}
})

const CustomTabBar = (): JSX.Element => {
	const [currentTab, setCurrentTab] = useState('')

	const handleSwtich = (item: any) => {
		Taro.switchTab({
			url: `/${item.pagePath}`,
		})
	}

	useEffect(() => {
		// 默认选中当前页面
		const currentRoute = Route.getCurrentRoute()
		if (currentRoute) {
			setCurrentTab(currentRoute)
		}

		// 监听变化
		wx.onAppRoute((res: { path: string }) => {
			if (res.path) {
				setCurrentTab(res.path)
			}
		})
	}, [])

	return (
		<View className='tabbar-container'>
			{list.map(item => {
				return (
					<View
						onClick={() => handleSwtich(item)}
						key={item.pagePath}
						className={`tabbar-item ${
							item.pagePath === currentTab ? 'tabbar-item-selected' : ''
						}`}
					>
						<View className='tabbar-item-text'>{item.text}</View>
					</View>
				)
			})}
		</View>
	)
}

export default CustomTabBar
