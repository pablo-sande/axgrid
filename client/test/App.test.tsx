import { describe, test, expect, vi, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import App from '../src/App'
import io from 'socket.io-client'

vi.mock('socket.io-client', async (importOriginal) => {
    const mod = await importOriginal<typeof import('socket.io-client')>()
    mod.Socket.prototype.connect = vi.fn()
    mod.Socket.prototype.disconnect = vi.fn()
    return mod
})

describe('App component', () => {
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
})
