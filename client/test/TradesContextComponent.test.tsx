import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import TradesContextComponent from '../src/contexts/TradesContextComponent'
import { windTrade } from './__mocks__/trades'
import Trades from '../src/components/Trades'

global.fetch = vi.fn()

describe('TradesContextComponent', () => {
    const createFetchResponse = (data: any) => {
        return Promise.resolve({
            json: () => new Promise((resolve) => resolve(data)),
        })
    }
    const mockResponse = {
        trades: [windTrade],
    }

    beforeEach(() => {
        vi.resetAllMocks()
    })

    afterEach(() => {
        cleanup()
    })

    test('renders the component correctly', () => {
        vi.mocked(fetch).mockResolvedValue(
            createFetchResponse(mockResponse) as any
        )

        render(<TradesContextComponent />)

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:4000/trades',
            expect.any(Object)
        )
    })

    test('renders the trades when the fetch is successful', () => {
        vi.mocked(fetch).mockResolvedValue(
            createFetchResponse(mockResponse) as any
        )

        render(
            <TradesContextComponent>
                <Trades />
            </TradesContextComponent>
        )

        vi.waitFor(
            () => {
                const trade1Element = screen.queryByText('12345')
                expect(trade1Element).toBeTruthy()
            },
            { timeout: 1000 }
        )
    })

    test('renders the error message when the fetch fails', () => {
        vi.mocked(fetch).mockReturnValue(Promise.resolve(Promise.reject('')))
        render(
            <TradesContextComponent>
                <Trades />
            </TradesContextComponent>
        )

        vi.waitFor(
            () => {
                const errorElement = screen.queryByText('Error fetching trades')
                expect(errorElement).toBeTruthy()
            },
            { timeout: 1000 }
        )
    })
})
