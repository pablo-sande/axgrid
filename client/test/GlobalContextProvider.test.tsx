import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import {
    GlobalContextProvider,
    useGlobalContext,
} from '../src/contexts/GlobalContextProvider'
import { AlertMessageType } from '../src/types/types'

describe('GlobalContextProvider', () => {
    test('renders children without crashing', () => {
        render(
            <GlobalContextProvider>
                <div>Test Child</div>
            </GlobalContextProvider>
        )

        const childElement = screen.getByText('Test Child')
        expect(childElement).toBeDefined()
    })

    test('provides the correct initial context values', () => {
        let contextValue: ReturnType<typeof useGlobalContext> | undefined

        const TestComponent = () => {
            contextValue = useGlobalContext()
            return null
        }

        render(
            <GlobalContextProvider>
                <TestComponent />
            </GlobalContextProvider>
        )

        expect(contextValue).toEqual({
            socket: null,
            setSocket: expect.any(Function),
            alertMessage: {
                message: '',
                severity: 'success',
                isOpen: false,
            },
            setAlertMessage: expect.any(Function),
            sidenavExpanded: false,
            setSidenavExpanded: expect.any(Function),
        })
    })

    test('updates the socket value correctly', () => {
        let contextValue: ReturnType<typeof useGlobalContext> | undefined

        const TestComponent = () => {
            contextValue = useGlobalContext()
            return null
        }

        const context = render(
            <GlobalContextProvider>
                <TestComponent />
            </GlobalContextProvider>
        )

        const newSocket = { foo: 'foo' } as any
        contextValue?.setSocket(newSocket)
        context.rerender(
            <GlobalContextProvider>
                <TestComponent />
            </GlobalContextProvider>
        )

        expect(contextValue?.socket).toBe(newSocket)
    })

    test('updates the alertMessage value correctly', () => {
        let contextValue: ReturnType<typeof useGlobalContext> | undefined

        const TestComponent = () => {
            contextValue = useGlobalContext()
            return null
        }

        const context = render(
            <GlobalContextProvider>
                <TestComponent />
            </GlobalContextProvider>
        )

        const newAlertMessage: AlertMessageType = {
            message: 'Test Message',
            severity: 'error',
            isOpen: true,
        }
        contextValue?.setAlertMessage(newAlertMessage)
        context.rerender(
            <GlobalContextProvider>
                <TestComponent />
            </GlobalContextProvider>
        )

        expect(contextValue?.alertMessage).toEqual(newAlertMessage)
    })

    test('updates the sidenavExpanded value correctly', () => {
        let contextValue: ReturnType<typeof useGlobalContext> | undefined

        const TestComponent = () => {
            contextValue = useGlobalContext()
            return null
        }

        const context = render(
            <GlobalContextProvider>
                <TestComponent />
            </GlobalContextProvider>
        )

        contextValue?.setSidenavExpanded(true)

        context.rerender(
            <GlobalContextProvider>
                <TestComponent />
            </GlobalContextProvider>
        )
        expect(contextValue?.sidenavExpanded).toBe(true)
    })
})
