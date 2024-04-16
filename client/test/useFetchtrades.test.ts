import { renderHook, waitFor } from '@testing-library/react'
import { useFetchTrades } from '../src/hooks/useFetchTrades'
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { gasTrade } from './__mocks__/trades'

describe('useFetchTrades', async () => {
	beforeEach(() => {
		global.fetch = vi.fn().mockResolvedValue({
			json: vi.fn().mockResolvedValue({ trades: [gasTrade] }),
		})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should fetch trades and set loading to false', async () => {
		const { result } = renderHook(() => useFetchTrades())

		expect(result.current.loading).toBe(true)
		expect(result.current.trades).toEqual(null)

		await waitFor(() => expect(result.current.loading).toBe(false))
		await waitFor(() => expect(result.current.trades).toEqual([gasTrade]))
	})

	test('should handle error when fetching trades', async () => {
		const spy = vi.spyOn(console, 'error')
		global.fetch = vi.fn().mockRejectedValueOnce(new Error('Fetch error'))

		renderHook(() => useFetchTrades())

		await waitFor(() =>
			expect(spy).toHaveBeenCalledWith(
				'Error fetching trades',
				new Error('Fetch error')
			)
		)
	})
})
