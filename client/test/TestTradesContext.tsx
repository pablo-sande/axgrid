import { useReducer } from 'react'
import TradesContext, {
    TradesReducer,
    defaultTradesContextState,
} from '../src/contexts/TradesContextProvider'
import { Trade } from '../src/types/types'
import { hydroTrade, solarTrade, windTrade } from './__mocks__/trades'
import Trades from '../src/components/Trades'

export const TestTradesContextComponent: React.FunctionComponent = () => {
    const [TradesState, TradesDispatch] = useReducer(
        TradesReducer,
        defaultTradesContextState
    )

    const setTrades = (data: Trade[]) => {
        TradesDispatch({ type: 'SET_TRADES', payload: data })
    }

    const addTrade = (data: Trade) => {
        TradesDispatch({ type: 'ADD_TRADE', payload: data })
    }

    const removeTrade = (data: Trade) => {
        TradesDispatch({ type: 'REMOVE_TRADE', payload: data })
    }

    const changeTradeStatus = (data: Trade) => {
        TradesDispatch({ type: 'CHANGE_TRADE_STATUS', payload: data })
    }

    return (
        <TradesContext.Provider value={{ TradesState, TradesDispatch }}>
            <div
                data-testid="set-trades"
                onClick={() => setTrades([solarTrade, windTrade])}
            ></div>
            <div
                data-testid="add-trade"
                onClick={() => addTrade(hydroTrade)}
            ></div>
            <div
                data-testid="remove-trade"
                onClick={() => removeTrade(hydroTrade)}
            ></div>
            <div
                data-testid="change-trade-status"
                onClick={() =>
                    changeTradeStatus({ ...hydroTrade, status: 'EXECUTED' })
                }
            ></div>
            <Trades />
        </TradesContext.Provider>
    )
}

export default TestTradesContextComponent
