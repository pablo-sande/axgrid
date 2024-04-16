import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { windTrade } from './__mocks__/trades'
import { Trades } from '../src/components/Trades'
import { TradesContextComponent } from '../src/contexts/TradesContextComponent'
import * as FetchTrades from '../src/hooks/useFetchTrades'

global.fetch = vi.fn()
const API_URL = import.meta.env.VITE_API_URL
const API_PORT = import.meta.env.VITE_API_PORT

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
            `${API_URL}:${API_PORT}/trades`,
            expect.any(Object)
        )
    })

    test('renders the trades when the fetch is successful', () => {
        vi.spyOn(FetchTrades, 'useFetchTrades').mockReturnValue({
            trades: [windTrade],
            loading: false,
        })

        render(
            <TradesContextComponent>
                <Trades />
            </TradesContextComponent>
        )

        const trade1Element = screen.queryByText('13579')
        expect(trade1Element).toBeTruthy()
    })

    test('shows loading text when loading', () => {
        vi.spyOn(FetchTrades, 'useFetchTrades').mockReturnValue({
            trades: null,
            loading: true,
        })

        render(
            <TradesContextComponent>
                <Trades />
            </TradesContextComponent>
        )

        const isLoading = screen.queryByText('Loading...')
        expect(isLoading).toBeTruthy()
    })
})
