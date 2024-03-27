import React, { PropsWithChildren, useReducer, useEffect } from 'react'
import TradesContext, {
    TradesReducer,
    defaultTradesContextState,
} from './TradesContextProvider'
import { useGlobalContext } from './GlobalContextProvider'
import { Trade } from '../types/types'

export interface ITradesContextComponentProps extends PropsWithChildren {}

const TradesContextComponent: React.FunctionComponent<
    ITradesContextComponentProps
> = (props) => {
    const { children } = props
    const { socket } = useGlobalContext()!
    const { setAlertMessage } = useGlobalContext()!

    const [TradesState, TradesDispatch] = useReducer(
        TradesReducer,
        defaultTradesContextState
    )

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        fetch('http://localhost:4000/trades', { signal })
            .then((res) => res.json())
            .then((data) => {
                TradesDispatch({ type: 'SET_TRADES', payload: data.trades })
            })
            .catch((err) => {
                console.error('Error fetching trades', err)
                TradesDispatch({ type: 'SET_TRADES', payload: [] })
                setAlertMessage({
                    message: 'Error fetching trades',
                    severity: 'error',
                    isOpen: true,
                })
            })

        return () => {
            TradesDispatch({ type: 'SET_TRADES', payload: [] })
            controller.abort()
        }
    }, [])

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
    return (
        <TradesContext.Provider value={{ TradesState, TradesDispatch }}>
            {children}
        </TradesContext.Provider>
    )
}

export default TradesContextComponent
