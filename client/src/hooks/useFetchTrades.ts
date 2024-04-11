import { useEffect, useState } from 'react'
import { useGlobalContext } from '../contexts/GlobalContextProvider'

const useFetchTrades = () => {
	const { setAlertMessage } = useGlobalContext()!
	const [trades, setTrades] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal
		const URL = import.meta.env.VITE_API_URL
		const PORT = import.meta.env.VITE_API_PORT

		fetch(`${URL}:${PORT}/trades`, { signal })
			.then((res) => res.json())
			.then((data) => {
				setTrades(data.trades)
				setLoading(false)
			})
			.catch((err) => {
				console.error('Error fetching trades', err)
				setTrades(null)
				setLoading(false)
				setAlertMessage({
					message: 'Error fetching trades',
					severity: 'error',
					isOpen: true,
				})
			})

		return () => {
			setTrades(null)
			setLoading(false)
			controller.abort()
		}
	}, [])

	return { trades, loading }
}

export default useFetchTrades
