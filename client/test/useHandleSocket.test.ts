import { renderHook, cleanup } from '@testing-library/react'
import { TradesContextActions } from '../src/contexts/TradesContextProvider'
import useHandleSocket from '../src/hooks/useHandleSocket'
import { describe, test, expect, afterEach, vi } from 'vitest'

const socket = {
	on: vi.fn(),
	off: vi.fn(),
}
vi.mock('../src/contexts/GlobalContextProvider', async (importOriginal) => {
	const original = await importOriginal<
		typeof import('../src/contexts/GlobalContextProvider')
	>()
	return {
		...original,
		useGlobalContext: vi.fn().mockImplementation(() => {
			return { socket }
		}),
	}
})

describe('useHandleSocket', () => {
	const socketon = vi.spyOn(socket, 'on')
	const socketoff = vi.spyOn(socket, 'off')
	const mockTradesDispatch: React.Dispatch<TradesContextActions> = vi.fn()

	afterEach(() => {
		vi.clearAllMocks()
	})

	test('should register socket event listeners and unregister them on cleanup', () => {
		renderHook(() => useHandleSocket(mockTradesDispatch))

		expect(socketon).toHaveBeenCalledTimes(4)
		expect(socketon).toHaveBeenCalledWith(
			'update-trades',
			expect.any(Function)
		)
		expect(socketon).toHaveBeenCalledWith('add-trade', expect.any(Function))
		expect(socketon).toHaveBeenCalledWith(
			'delete-trade',
			expect.any(Function)
		)
		expect(socketon).toHaveBeenCalledWith(
			'change-trade-status',
			expect.any(Function)
		)

		cleanup()

		expect(socketoff).toHaveBeenCalledTimes(4)
		expect(socketoff).toHaveBeenCalledWith('update-trades')
		expect(socketoff).toHaveBeenCalledWith('add-trade')
		expect(socketoff).toHaveBeenCalledWith('delete-trade')
		expect(socketoff).toHaveBeenCalledWith('change-trade-status')
	})
})
