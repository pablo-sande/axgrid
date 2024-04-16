import { useEffect } from 'react'
import { Trade } from '../types/types'
import { TradesContextActions } from '../contexts/TradesContextProvider'

export const useInitializeTrades = (
	trades: Trade[] | null,
	TradesDispatch: React.Dispatch<TradesContextActions>
) => {
	useEffect(() => {
		if (trades) {
			console.log('asdfas', trades)
			TradesDispatch({ type: 'SET_TRADES', payload: trades })
		}
		return () => {
			TradesDispatch({ type: 'SET_TRADES', payload: [] })
		}
	}, [trades])
}
