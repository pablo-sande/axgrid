import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, cleanup, screen, act } from '@testing-library/react'
import App from '../src/App'
import io from 'socket.io-client'

vi.mock('socket.io-client', async (importOriginal) => {
    const mod = await importOriginal<typeof import('socket.io-client')>()
    mod.Socket.prototype.connect = vi.fn()
    mod.Socket.prototype.disconnect = vi.fn()
    return mod
})

describe('App component', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    afterEach(() => {
        cleanup()
    })

    test('renders the main page', () => {
        render(<App />)
        expect(document.querySelector('main')).toBeTruthy()
    })

    test('connects to the socket', () => {
        const mockSocket = io('http://localhost:3000')
        render(<App />)
        expect(mockSocket.connect).toHaveBeenCalled()
    })

    test('disconnects from the socket', () => {
        const mockSocket = io('http://localhost:3000')
        const { unmount } = render(<App />)
        unmount()
        expect(mockSocket.disconnect).toHaveBeenCalled()
    })

    test('shows loading when the socket is not connected', () => {
        render(<App />)
        expect(screen.getByText('Connecting to socket...')).toBeDefined()
    })

    test('shows error message when socket connection fails', () => {
        vi.useFakeTimers()
        render(<App />)

        expect(screen.queryByText('Connection to socket failed.')).toBeNull()

        act(() => {
            vi.advanceTimersByTime(5000)
        })

        expect(screen.getByText('Connection to socket failed.')).toBeDefined()
    })

    test('renders the content when the socket is connected', async () => {
        const mockUseSocket = await import('../src/hooks/useSocket')
        mockUseSocket.default = () => true
        render(<App />)
        expect(screen.getByText('Click to create a new Trade')).toBeDefined()
    })
})
