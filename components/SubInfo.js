import React from 'react'
import { View, Image, Text } from 'react-native'

import { SIZES, FONTS, COLORS, SHADOWS, assets } from '../constants'

export const DetailTitle = ({ title, subTitle, titleSize, subTitleSize }) => {
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

export const LunchState = ({ success }) => {
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

