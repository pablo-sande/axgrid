import { Trade } from '../../types/types'
import { useCallback, useContext, useRef, useState } from 'react'
import { TradeDetails } from './TradeDetails'
import TradesContext from '../../contexts/TradesContextProvider'
import useTradeApi from '../../hooks/useApi'
import { useGlobalContext } from '../../contexts/GlobalContextProvider'
import { TradesGrid } from './TradesGrid'

export const Trades = () => {
    const { trades } = useContext(TradesContext).TradesState
    const [tradeDetails, setTradeDetails] = useState<string | null>(null)
    const oldTrades = useRef<Trade[]>(trades)
    const { setAlertMessage } = useGlobalContext()

    const URL_BASE = import.meta.env.VITE_API_URL
    const PORT = import.meta.env.VITE_API_PORT
    const URL = `${URL_BASE}:${PORT}`

    const { makeRequest: makePutRequest, error: putReturnError } = useTradeApi({
        url: URL + '/trades/change-status',
        method: 'PUT',
    })
    const { makeRequest: makeDeleteRequest, error: deleteReturnError } =
        useTradeApi({
            url: URL + '/trades/delete',
            method: 'DELETE',
        })

    const acceptTrade = async (trade: Trade) => {
        await makePutRequest({ ...trade, status: 'EXECUTED' })
        if (putReturnError) {
            setAlertMessage({
                severity: 'error',
                message: 'Error accepting trade',
                isOpen: true,
            })
        }
    }

    const cancelTrade = async (trade: Trade) => {
        await makeDeleteRequest({ ...trade, status: 'CANCELED' })
        if (deleteReturnError) {
            setAlertMessage({
                severity: 'error',
                message: 'Error canceling trade',
                isOpen: true,
            })
        }
    }

    const getNewTrades = (rows: Trade[]) => {
        return rows.filter(
            (row) =>
                !oldTrades.current.some(
                    (trade) => JSON.stringify(trade) === JSON.stringify(row)
                )
        )
    }

    // Add animations to the modified rows
    const addRowAnimations = (newTrades: Trade[]) => {
        newTrades.forEach((trade) => {
            const row = document.querySelector(`[data-id="${trade.id}"]`)
            if (row) {
                row.classList.add('animated-row-status')
                setTimeout(() => {
                    row.classList.remove('animated-row-status')
                }, 1000)
            }
        })
    }

    // We only need to check for new trades when the trades change
    const handleUpdates = useCallback(
        (trades: Trade[]) => {
            if (trades && trades.length) {
                const newTrades = getNewTrades(trades)
                if (newTrades.length) {
                    addRowAnimations(newTrades)
                    oldTrades.current = trades
                }
            }
        },
        [trades]
    )

    handleUpdates(trades)

    return (
        <>
            {trades && trades.length ? (
                <TradesGrid
                    trades={trades}
                    setTradeDetails={setTradeDetails}
                ></TradesGrid>
            ) : (
                <h1 className="text-3xl m-auto">No trades found</h1>
            )}
            {tradeDetails && (
                <TradeDetails
                    tradeDetails={
                        trades.find((t) => t.id === tradeDetails) as Trade
                    }
                    setTradeDetails={setTradeDetails}
                    acceptTrade={acceptTrade}
                    cancelTrade={cancelTrade}
                />
            )}
        </>
    )
}
