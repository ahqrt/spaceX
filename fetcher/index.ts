import axios from 'axios'

const backendURL = 'https://api.spacexdata.com/v5'

export const axle = axios.create({
	baseURL: backendURL
})

export async function getLaunches(page: number, query: any = {}, limit: number = 12) {
	const data = await axle.post('/launches/query', {
		options: {
			page,
			limit,
			sort: { date_utc: 'desc' },
			select: ['id', 'name', 'date_utc', 'success', 'links']
		},
		query: {
			success: true,
			// date_utc: {
			// 	$gte: '2017-06-22T00:00:00.000Z',
			// 	$lte: '2017-06-25T00:00:00.000Z'
			// },
			$text: {
				$search: 'crs'
			}
		}
	})

	return data.data
}
