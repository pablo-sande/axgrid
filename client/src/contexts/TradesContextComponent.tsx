import React, { PropsWithChildren, useReducer } from 'react'
import TradesContext, {
    TradesReducer,
    defaultTradesContextState,
} from './TradesContextProvider'
import { useFetchTrades } from '../hooks/useFetchTrades'
import useHandleSocket from '../hooks/useHandleSocket'
import { useInitializeTrades } from '../hooks/useInitializeTrades'

export const TradesContextComponent: React.FunctionComponent<
    PropsWithChildren
> = (props) => {
    const { children } = props

    const [TradesState, TradesDispatch] = useReducer(
        TradesReducer,
        defaultTradesContextState
    )

    const { trades, loading } = useFetchTrades()
    useInitializeTrades(trades, TradesDispatch)
    useHandleSocket(TradesDispatch)

    if (loading) {
        return <p className="relative m-auto">Loading...</p>
    }

    return (
        <TradesContext.Provider value={{ TradesState, TradesDispatch }}>
            {children}
        </TradesContext.Provider>
    )
}
