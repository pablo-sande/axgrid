import { render, screen, act, cleanup } from '@testing-library/react'
import { describe, test, expect, vi, afterEach } from 'vitest'
import AlertMessage from '../src/components/AlertMessage'

describe('AlertMessage', () => {
    afterEach(() => {
        cleanup()
    })

    test('renders null when alertMessageOpen is false', () => {
        render(
            <AlertMessage
                alertMessage={{
                    message: 'Test Message',
                    severity: 'success',
                    isOpen: false,
                }}
                setAlertMessage={vi.fn()}
            >
                Test Message
            </AlertMessage>
        )

        const alertElement = screen.queryByText('Test Message')
        expect(alertElement).toBeNull()
    })

    test('renders the message when alertMessageOpen is true', () => {
        render(
            <AlertMessage
                alertMessage={{
                    message: 'Test Message',
                    severity: 'success',
                    isOpen: true,
                }}
                setAlertMessage={vi.fn()}
            >
                Test Message
            </AlertMessage>
        )

        const alertElement = screen.getByText('Test Message')
        expect(alertElement).toBeDefined()
    })

    test('calls setAlertMessageOpen with false after 3000ms', async () => {
        vi.useFakeTimers()

        const setAlertMessageOpen = vi.fn()

        render(
            <AlertMessage
                alertMessage={{
                    message: 'Test Message',
                    severity: 'success',
                    isOpen: true,
                }}
                setAlertMessage={setAlertMessageOpen}
            >
                Test Message
            </AlertMessage>
        )

        act(() => {
            vi.advanceTimersByTime(3000)
        })

        expect(setAlertMessageOpen).toHaveBeenCalledWith({
            message: 'Test Message',
            severity: 'success',
            isOpen: false,
        })
    })
})
