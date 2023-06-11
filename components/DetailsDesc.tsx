import React, { useState } from 'react'
import { View, Text } from 'react-native'

import { LunchState, DetailTitle } from './SubInfo'
import { COLORS, SIZES, FONTS } from '../constants'

const DetailsDesc = ({ data }) => {
	const [text, setText] = useState(data.details?.slice(0, 100))
	const [hasMore, setHasMore] = useState(data.details?.length > 100)
	const [readMore, setReadMore] = useState(false)

	return (
		<>
			<View
				style={{
					width: '100%',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<DetailTitle
					title={data.name}
					subTitle={data.date_utc}
					titleSize={SIZES.extraLarge}
					subTitleSize={SIZES.font}
				/>

				<LunchState success={data.success} />
			</View>
			{text &&
				<View style={{ marginVertical: SIZES.extraLarge * 1.5 }}>

					<Text
						style={{
							fontSize: SIZES.font,
							fontFamily: FONTS.semiBold,
							color: COLORS.primary
						}}
					>
						Description
					</Text>
					<View
						style={{
							marginTop: SIZES.base
						}}
					>
						<Text
							style={{
								color: COLORS.secondary,
								fontSize: SIZES.small,
								fontFamily: FONTS.regular,
								lineHeight: SIZES.large
							}}
						>
							{text}
							{hasMore && (
								<>
									{!readMore && '...'}
									<Text
										style={{
											color: COLORS.primary,
											fontSize: SIZES.small,
											fontFamily: FONTS.semiBold
										}}
										onPress={() => {
											if (!readMore) {
												setText(data.details)
												setReadMore(true)
											} else {
												setText(data.details.slice(0, 100))
												setReadMore(false)
											}
										}}
									>
										{readMore ? ' Show Less' : ' Read More'}
									</Text>
								</>
							)}
						</Text>
					</View>
				</View>
			}
		</>
	)
}

export default DetailsDesc
