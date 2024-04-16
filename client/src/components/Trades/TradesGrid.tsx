import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Trade } from '../../types/types'
import Box from '@mui/material/Box/Box'

type TradesGridProps = {
    trades: Trade[]
    setTradeDetails: (id: string) => void
}

export const TradesGrid = ({ trades, setTradeDetails }: TradesGridProps) => {
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
                    setTradeDetails(params.id as string)
                }}
                pageSizeOptions={[10, 50, 100]}
            ></DataGrid>
        </Box>
    )
}
