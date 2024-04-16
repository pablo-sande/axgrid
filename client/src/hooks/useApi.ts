import { useState } from 'react'
import { Trade } from '../types/types'

export type TradeApiParams = {
	url: string
	method: 'POST' | 'PUT' | 'DELETE'
}

export type TradeApiReturn = {
	returnData: Trade | Trade[] | null
	loading: boolean
	error: Error | null
	makeRequest: (data: Trade) => Promise<void>
}

export default function useTradeApi({
	url,
	method,
}: TradeApiParams): TradeApiReturn {
	const [returnData, setReturnData] = useState(null)
	const [loading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const makeRequest = async (data: Trade) => {
		const requestOptions = {
			method: method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(data),
		}

		fetch(url, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setIsLoading(false)
				setReturnData(data)
			})
			.catch((error) => {
				console.error('There was an error!', error)
				setIsLoading(false)
				setError(error)
			})
	}
	return { returnData, loading, error, makeRequest }
}
