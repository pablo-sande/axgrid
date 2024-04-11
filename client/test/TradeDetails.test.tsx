import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { TradeDetails } from '../src/components/Trades'
import { camelCaseToSeparatedWords } from '../src/utils/string-utils'
import { TradeStatus } from '../src/types/types'
import { hydroTrade } from './__mocks__/trades'

describe('TradeDetails component', () => {
    const setTradeDetails = vi.fn()
    const acceptTrade = vi.fn()
    const cancelTrade = vi.fn()

    beforeEach(() => {
        render(
            <TradeDetails
                tradeDetails={hydroTrade}
                setTradeDetails={setTradeDetails}
                acceptTrade={acceptTrade}
                cancelTrade={cancelTrade}
            />
        )
    })

    afterEach(() => {
        cleanup()
    })

    test('renders trade details keys', () => {
        const tradeDetailsTitle = screen.getByText('Trade Details')
        expect(tradeDetailsTitle).toBeDefined()

        const tradeDetailsKeys = Object.keys(hydroTrade)
        tradeDetailsKeys.forEach((key) => {
            const tradeDetailKey = screen.getByText(
                camelCaseToSeparatedWords(key)
            )
            expect(tradeDetailKey).toBeDefined()
        })
    })

    test('renders trade details plain values ', () => {
        const status = screen.getByText('CONFIRMED')
        expect(status).toBeDefined()
        const energyType = screen.getByText('HYDRO')
        expect(energyType).toBeDefined()
        const price = screen.getByText('1500')
        expect(price).toBeDefined()
        const minimumPurchaseQuantity = screen.getByText('10')
        expect(minimumPurchaseQuantity).toBeDefined()
        const contractTerms = screen.getByText('12 months')
        expect(contractTerms).toBeDefined()
        const paymentMethod = screen.getByText('BANK_TRANSFER')
        expect(paymentMethod).toBeDefined()
        const paymentDate = screen.getByText('2024-04-02')
        expect(paymentDate).toBeDefined()
        const waterFlowRate = screen.getByLabelText('waterFlowRate')
        expect(waterFlowRate).toBeDefined()
        const reservoirLevel = screen.getByLabelText('reservoirLevel')
        expect(reservoirLevel).toBeDefined()
        const flexibilityOfSupply = screen.getByLabelText('flexibilityOfSupply')
        expect(flexibilityOfSupply).toBeDefined()
        const energyStorage = screen.getByLabelText('energyStorage')
        expect(energyStorage).toBeDefined()
    })

    test('renders composed values', () => {
        const capacityValue = screen.getByText('100')
        expect(capacityValue).toBeDefined()
        const capacityUnits = screen.getByText('MW')
        expect(capacityUnits).toBeDefined()
        const regulatoryCompilance1 = screen.getByText('FINRA')
        expect(regulatoryCompilance1).toBeDefined()
        const regulatoryCompilance2 = screen.queryByText('SEC')
        expect(regulatoryCompilance2).toBeNull()
    })

    test('calls acceptTrade when accepting a trade', () => {
        const acceptButton = screen.getByText('Accept Trade')
        fireEvent.click(acceptButton)

        expect(setTradeDetails).toHaveBeenCalledWith(null)
        expect(acceptTrade).toHaveBeenCalledWith(hydroTrade)
    })

    test('calls cancelTrade when canceling a trade', () => {
        const cancelButton = screen.getByText('Cancel Trade')
        fireEvent.click(cancelButton)

        expect(setTradeDetails).toHaveBeenCalledWith(null)
        expect(cancelTrade).toHaveBeenCalledWith(hydroTrade)
    })

    test('closes the trade details dialog when clicking Close button', () => {
        const closeButton = screen.getByText('Close')
        fireEvent.click(closeButton)

        expect(setTradeDetails).toHaveBeenCalledWith(null)
    })

    test('only shows the Accept Trade button when trade status is CONFIRMED', () => {
        for (const status of ['PENDING', 'EXECUTED', 'DELIVERED', 'CANCELED']) {
            cleanup()
            render(
                <TradeDetails
                    tradeDetails={{
                        ...hydroTrade,
                        status: status as TradeStatus,
                    }}
                    setTradeDetails={setTradeDetails}
                    acceptTrade={acceptTrade}
                    cancelTrade={cancelTrade}
                />
            )
            const acceptButton = screen.queryByText('Accept Trade')
            expect(acceptButton?.classList).toContain('Mui-disabled')
        }
        cleanup()
        render(
            <TradeDetails
                tradeDetails={{
                    ...hydroTrade,
                    status: 'CONFIRMED',
                }}
                setTradeDetails={setTradeDetails}
                acceptTrade={acceptTrade}
                cancelTrade={cancelTrade}
            />
        )
        const acceptButton = screen.queryByText('Accept Trade')
        expect(acceptButton?.classList).not.toContain('Mui-disabled')
    })

    test('only shows the Cancel Trade button if trade status is not DELIVERED or CANCELED', () => {
        for (const status of ['DELIVERED', 'CANCELED']) {
            cleanup()
            render(
                <TradeDetails
                    tradeDetails={{
                        ...hydroTrade,
                        status: status as TradeStatus,
                    }}
                    setTradeDetails={setTradeDetails}
                    acceptTrade={acceptTrade}
                    cancelTrade={cancelTrade}
                />
            )
            const cancelButton = screen.queryByText('Cancel Trade')
            expect(cancelButton?.classList).toContain('Mui-disabled')
        }
        for (const status of ['PENDING', 'EXECUTED', 'CONFIRMED']) {
            cleanup()
            render(
                <TradeDetails
                    tradeDetails={{
                        ...hydroTrade,
                        status: status as TradeStatus,
                    }}
                    setTradeDetails={setTradeDetails}
                    acceptTrade={acceptTrade}
                    cancelTrade={cancelTrade}
                />
            )
            const cancelButton = screen.queryByText('Cancel Trade')
            expect(cancelButton?.classList).not.toContain('Mui-disabled')
        }
    })
})
