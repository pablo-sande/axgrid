import { useEffect } from 'react'
import { useGlobalContext } from '../contexts/GlobalContextProvider'
import { Trade } from '../types/types'
import { TradesContextActions } from '../contexts/TradesContextProvider'

const useHandleSocket = (
	TradesDispatch: React.Dispatch<TradesContextActions>
) => {
	const { socket } = useGlobalContext()

	useEffect(() => {
		socket?.on('update-trades', (data: Trade[]) => {
			TradesDispatch({ type: 'SET_TRADES', payload: data })
		})
		socket?.on('add-trade', (data: Trade) => {
			TradesDispatch({ type: 'ADD_TRADE', payload: data })
		})
		socket?.on('delete-trade', (data: Trade) => {
			TradesDispatch({ type: 'REMOVE_TRADE', payload: data })
		})
		socket?.on('change-trade-status', (data: Trade) => {
			TradesDispatch({ type: 'CHANGE_TRADE_STATUS', payload: data })
		})
		return () => {
			socket?.off('update-trades')
			socket?.off('add-trade')
			socket?.off('delete-trade')
			socket?.off('change-trade-status')
		}
	}, [socket])
}

export default useHandleSocket
