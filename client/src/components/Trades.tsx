import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Trade } from '../types/types'
import { useContext, useState } from 'react'
import TradeDetails from './TradeDetails'
import { Box } from '@mui/material'
import TradesContext from '../contexts/TradesContextProvider'
import useTradeApi from '../hooks/useApi'
import { useGlobalContext } from '../contexts/GlobalContextProvider'

const Trades = () => {
    const { trades, loading } = useContext(TradesContext).TradesState
    const [tradeDetails, setTradeDetails] = useState<number | null>(null)
    const [oldTrades, setOldTrades] = useState([] as Trade[])
    const { setAlertMessage } = useGlobalContext()

    const { makeRequest: makePutRequest, error: putReturnError } = useTradeApi({
        url: 'http://localhost:4000/trades/change-status',
        method: 'PUT',
    })
    const { makeRequest: makeDeleteRequest, error: deleteReturnError } =
        useTradeApi({
            url: 'http://localhost:4000/trades/delete',
            method: 'DELETE',
        })

    const acceptTrade = async (trade: Trade) => {
        await makePutRequest({ ...trade, status: 'EXECUTED' })
        if (putReturnError) {
            console.error('Error accepting trade', putReturnError)
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
            console.error('Error canceling trade', deleteReturnError)
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
                !oldTrades.some(
                    (trade) => JSON.stringify(trade) === JSON.stringify(row)
                )
        )
    }

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

    const handleUpdates = (params: any) => {
        if (params.rows && oldTrades) {
            const rows = Object.keys(params.rows.dataRowIdToModelLookup).map(
                (key) => params.rows.dataRowIdToModelLookup[key]
            )
            const newTrades = getNewTrades(rows)
            if (newTrades.length) {
                addRowAnimations(newTrades)
            }

            if (newTrades.length) {
                setOldTrades(rows as Trade[])
            }
        }
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
        { field: 'energyType', headerName: 'Type', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
        {
            field: 'minimumPurchaseQuantity',
            headerName: 'Minimum Purchase Quantity',
            width: 200,
        },
        { field: 'contractTerms', headerName: 'Contact Terms', width: 200 },
        { field: 'paymentMethod', headerName: 'Payment Method', width: 200 },
        { field: 'paymentDate', headerName: 'Payment Date', width: 200 },
    ]

    return (
        <>
            {loading ? (
                <p className="relative m-auto">Loading...</p>
            ) : trades && trades.length ? (
                <div className="h-screen">
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'white',
                        }}
                        className="block"
                    >
                        <DataGrid
                            rows={trades as Trade[]}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 50 },
                                },
                            }}
                            getRowClassName={() => {
                                return `animated-row`
                            }}
                            disableRowSelectionOnClick
                            onRowClick={(params) => {
                                setTradeDetails(params.id as number)
                            }}
                            onStateChange={(params) => {
                                handleUpdates(params)
                            }}
                            pageSizeOptions={[10, 50, 100]}
                        ></DataGrid>
                    </Box>
                </div>
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

export default Trades
