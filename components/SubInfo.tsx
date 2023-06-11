import React, { FC } from 'react'
import { View, Image, Text } from 'react-native'

import { SIZES, FONTS, COLORS, assets } from '../constants'

interface DetailTitleProps {
	title: string
	subTitle: string
	titleSize: number
	subTitleSize: number
}

export const DetailTitle: FC<DetailTitleProps> = ({ title, subTitle, titleSize, subTitleSize }) => {
	return (
		<View>
			<Text
				style={{
					fontFamily: FONTS.semiBold,
					fontSize: titleSize,
					color: COLORS.primary
				}}
			>
				{title}
			</Text>
			<Text
				style={{
					fontFamily: FONTS.regular,
					fontSize: subTitleSize,
					color: COLORS.primary
				}}
			>
				by {subTitle}
			</Text>
		</View>
	)
}


interface LunchStateProps {
	success: boolean
}

export const LunchState: FC<LunchStateProps> = ({ success }) => {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<Image source={assets.eth} resizeMode='contain' style={{ width: 20, height: 20, marginRight: 2 }} />
			<Text
				style={{
					fontFamily: FONTS.medium,
					fontSize: SIZES.font,
					color: COLORS.primary
				}}
			>
				{success ? 'success' : 'failed'}
			</Text>
		</View>
	)
}

