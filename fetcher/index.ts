import axios from 'axios'

const backendURL = 'https://api.spacexdata.com/v5'

export const axle = axios.create({
	baseURL: backendURL
})

export async function getLaunches(page: number, sortType: string = '', query: any = {}, limit: number = 12) {
	const options = {
		page,
		limit,
		select: ['id', 'name', 'date_utc', 'success', 'links']
	}

	if (sortType) {
		options['sort'] = { date_utc: sortType }
	}

	const data = await axle.post('/launches/query', {
		options,
		query
	})

	return data.data
}
