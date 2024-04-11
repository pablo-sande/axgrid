import React, { createContext } from 'react'
import { Trade } from '../types/types'

export type TradesContextState = { trades: Trade[] }

export const defaultTradesContextState: TradesContextState = {
    trades: [] as Trade[],
}

export type TradesContextActionsTypes =
    | 'SET_TRADES'
    | 'ADD_TRADE'
    | 'CHANGE_TRADE_STATUS'
    | 'REMOVE_TRADE'

export type TradesContextPayload = Trade[] | Trade

export type TradesContextActions = {
    type: TradesContextActionsTypes
    payload: TradesContextPayload
}

export const TradesReducer = (
    state: TradesContextState,
    action: TradesContextActions
) => {
    switch (action.type) {
        case 'SET_TRADES':
            return { trades: action.payload as Trade[] }
        case 'ADD_TRADE':
            return {
                ...state,
                trades: [...state.trades, action.payload as Trade],
            }
        case 'CHANGE_TRADE_STATUS':
            return {
                ...state,
                trades: state.trades.map((trade) => {
                    if (trade.id === (action.payload as Trade).id) {
                        return {
                            ...trade,
                            status: (action.payload as Trade).status,
                        }
                    }
                    return trade
                }),
            }
        case 'REMOVE_TRADE':
            return {
                ...state,
                trades: state.trades.filter(
                    (trade) => trade.id !== (action.payload as Trade).id
                ),
            }
        default:
            return state
    }
}

export type TradesContextProps = {
    TradesState: TradesContextState
    TradesDispatch: React.Dispatch<TradesContextActions>
}

const TradesContext = createContext<TradesContextProps>({
    TradesState: defaultTradesContextState,
    TradesDispatch: () => {},
})

export const TradesContextConsumer = TradesContext.Consumer
export const TradesContextProvider = TradesContext.Provider

export default TradesContext
