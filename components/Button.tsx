import { TouchableOpacity, Text, Image, GestureResponderEvent, StyleProp, ViewStyle, ImageSourcePropType, ColorValue } from 'react-native'

import { COLORS, SIZES, FONTS, SHADOWS } from '../constants'
import { FC } from 'react'

type TitleProps = keyof ViewStyle

type StyleProps = {
	[key in TitleProps]?: ViewStyle[key]
}

type CircleButtonProps = StyleProps & {
	imgUrl: ImageSourcePropType
	handlePress?: (event: GestureResponderEvent) => void
	relative?: boolean
	bgColor?: ColorValue
}

type RectButtonProps = StyleProps & {
	text: string
	minWidth: number
	fontSize: number
	handlePress?: (event: GestureResponderEvent) => void
}

export const CircleButton: FC<CircleButtonProps> = ({ imgUrl, handlePress, relative, bgColor, ...props }) => {
	return (
		<TouchableOpacity
			style={{
				width: 40,
				height: 40,
				backgroundColor: bgColor ? bgColor : COLORS.white,
				position: relative ? 'relative' : 'absolute',
				borderRadius: SIZES.extraLarge,
				alignItems: 'center',
				justifyContent: 'center',
				...SHADOWS.light,
				...props
			}}
			onPress={handlePress}
		>
			<Image source={imgUrl} resizeMode='contain' style={{ width: 24, height: 24 }} />
		</TouchableOpacity>
	)
}

export const RectButton: FC<RectButtonProps> = ({ text, minWidth, fontSize, handlePress, ...props }) => {
	return (
		<TouchableOpacity
			style={{
				backgroundColor: COLORS.primary,
				padding: SIZES.small,
				borderRadius: SIZES.extraLarge,
				minWidth: minWidth,
				justifyContent: 'center',
				alignItems: 'center',
				...props
			}}
			onPress={handlePress}
		>
			<Text
				style={{
					fontFamily: FONTS.semiBold,
					fontSize: fontSize,
					color: COLORS.white,
					textAlign: 'center'
				}}
			>
				{text}
			</Text>
		</TouchableOpacity>
	)
}

export const NoStyleButton: FC<RectButtonProps> = ({ text, minWidth, fontSize, handlePress, ...props }) => {
	return (
		<TouchableOpacity
			style={{
				padding: SIZES.small,
				borderRadius: SIZES.extraLarge,
				borderColor: COLORS.white,
				borderWidth: 1,
				minWidth: minWidth,
				justifyContent: 'center',
				alignItems: 'center',
				...props
			}}
			onPress={handlePress}
		>
			<Text
				style={{
					fontFamily: FONTS.semiBold,
					fontSize: fontSize,
					color: COLORS.white,
					textAlign: 'center'
				}}
			>
				{text}
			</Text>
		</TouchableOpacity>
	)
}
