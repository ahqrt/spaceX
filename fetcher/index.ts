import { createAxle } from '@varlet/axle'

const backendURL = 'https://api.spacexdata.com/v5'

export const axle = createAxle({
  baseURL: backendURL,
})


export async function getLaunches(page: number, query: any = {}, limit: number = 12) {
  const data= await axle.post('/launches/query', {
    options: {
      page,
      limit,
    },
    query,
  })

  return data.data
}