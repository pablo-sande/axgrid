import { describe, test, expect, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { Trades } from '../src/components/Trades'
import { TradesContextProvider } from '../src/contexts/TradesContextProvider'
import { hydroTrade } from './__mocks__/trades'

describe('Trades', () => {
    afterEach(() => {
        cleanup()
    })

    test('renders "No trades found" message when trades is empty', () => {
        render(
            <TradesContextProvider
                value={{
                    TradesState: { trades: [] },
                    TradesDispatch: vi.fn(),
                }}
            >
                <Trades />
            </TradesContextProvider>
        )

        const noTradesElement = screen.getByText('No trades found')
        expect(noTradesElement).toBeDefined()
    })

    test('renders trades when trades is not empty', () => {
        render(
            <TradesContextProvider
                value={{
                    TradesState: { trades: [hydroTrade] },
                    TradesDispatch: vi.fn(),
                }}
            >
                <Trades />
            </TradesContextProvider>
        )

        const trade1Element = screen.getByText('12345')
        expect(trade1Element).toBeDefined()
    })

    test('renders trade details when trade is clicked', () => {
        const trades = render(
            <TradesContextProvider
                value={{
                    TradesState: { trades: [hydroTrade] },
                    TradesDispatch: vi.fn(),
                }}
            >
                <Trades />
            </TradesContextProvider>
        )

        const trade1Element = screen.getByText('12345')
        trade1Element.click()

        trades.rerender(
            <TradesContextProvider
                value={{
                    TradesState: { trades: [hydroTrade] },
                    TradesDispatch: vi.fn(),
                }}
            >
                <Trades />
            </TradesContextProvider>
        )

        const tradeDetailsTitle = screen.getByText('Trade Details')
        expect(tradeDetailsTitle).toBeDefined()
    })
})
