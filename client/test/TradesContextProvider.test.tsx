import { describe, test, expect, vi, afterEach } from 'vitest'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import { TradesContextProvider } from '../src/contexts/TradesContextProvider'
import TestTradesContextComponent from './TestTradesContext'

global.fetch = vi.fn()

describe('TradesContextProvider', () => {
    afterEach(() => {
        cleanup()
    })

    test('renders without errors', () => {
        render(
            <TradesContextProvider
                value={{
                    TradesState: {
                        trades: [],
                        loading: false,
                    },
                    TradesDispatch: function (): void {
                        throw new Error('Function not implemented.')
                    },
                }}
            >
                <div>Test Component</div>
            </TradesContextProvider>
        )

        const testComponent = screen.getByText('Test Component')
        expect(testComponent).toBeDefined()
    })

    test('sets the trades context state', () => {
        const nullTrade1 = screen.queryByText('67890')
        expect(nullTrade1).toBeNull()
        const nullTrade2 = screen.queryByText('13579')
        expect(nullTrade2).toBeNull()

        render(<TestTradesContextComponent />)

        const setTradesElement = screen.getByTestId('set-trades')
        fireEvent.click(setTradesElement)

        const tradeElement1 = screen.getByText('67890')
        expect(tradeElement1).toBeDefined()
        const tradeElement2 = screen.getByText('13579')
        expect(tradeElement2).toBeDefined()
    })

    test('adds a trade to the trades context state', () => {
        const nullElement = screen.queryByText('12345')
        expect(nullElement).toBeNull()

        render(<TestTradesContextComponent />)

        const addTradeElement = screen.getByTestId('add-trade')
        fireEvent.click(addTradeElement)

        const tradeElement = screen.getByText('12345')
        expect(tradeElement).toBeDefined()
    })

    test('removes a trade from the trades context state', () => {
        render(<TestTradesContextComponent />)

        const addTradeElement = screen.getByTestId('add-trade')
        fireEvent.click(addTradeElement)

        const tradeElement = screen.getByText('12345')
        expect(tradeElement).toBeDefined()

        const removeTradeElement = screen.getByTestId('remove-trade')
        fireEvent.click(removeTradeElement)

        const nullTradeElement = screen.queryByText('12345')
        expect(nullTradeElement).toBeNull()
    })

    test('updates a trade in the trades context state', async () => {
        render(<TestTradesContextComponent />)

        const addTradeElement = screen.getByTestId('add-trade')
        fireEvent.click(addTradeElement)

        const tradeElement = screen.getByText('12345')
        expect(tradeElement).toBeDefined()

        const tradeStatus = screen.getByText('CONFIRMED')
        expect(tradeStatus).toBeDefined()

        const updateTradeElement = screen.getByTestId('change-trade-status')
        fireEvent.click(updateTradeElement)

        const updatedTradeElement = screen.getByText('EXECUTED')
        expect(updatedTradeElement).toBeDefined()

        const previousTradeStatus = screen.queryByText('CONFIRMED')
        expect(previousTradeStatus).toBeNull()
    })
})
