import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Image } from 'react-native'

import { COLORS, SIZES, SHADOWS, assets } from '../constants'
import { LunchState, DetailTitle } from './SubInfo'
import { RectButton, CircleButton } from './Button'

const Card = ({ data }) => {
	const navigation = useNavigation()

	return (
		<View
			style={{
				backgroundColor: COLORS.white,
				borderRadius: SIZES.font,
				marginBottom: SIZES.extraLarge,
				margin: SIZES.base,
				...SHADOWS.dark
			}}
		>
			<View
				style={{
					width: '100%',
					height: 250
				}}
			>
				<Image
					source={{ uri: data.links.patch.small }}
					resizeMode='contain'
					style={{
						width: '100%',
						height: '100%',
						borderTopLeftRadius: SIZES.font,
						borderTopRightRadius: SIZES.font
					}}
				/>
			</View>

			<View style={{ width: '100%', padding: SIZES.font }}>
				<DetailTitle
					title={data.name}
					subTitle={data.date_utc}
					titleSize={SIZES.large}
					subTitleSize={SIZES.small}
				/>

				<View
					style={{
						marginTop: SIZES.font,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<LunchState success={data.success} />
					<RectButton
						text='LEARN MORE'
						minWidth={120}
						fontSize={SIZES.font}
						handlePress={() => navigation.navigate('Details', { data })}
					/>
				</View>
			</View>
		</View>
	)
}

export default Card
