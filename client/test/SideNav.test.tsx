import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { test, expect, describe, afterEach, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import SideNav from '../src/components/SideNav'
import { GlobalContextProvider } from '../src/contexts/GlobalContextProvider'
import userEvent from '@testing-library/user-event'

describe('SideNav', () => {
    afterEach(() => {
        cleanup()
    })

    test('renders SideNav component', () => {
        render(
            <BrowserRouter>
                <SideNav />
            </BrowserRouter>
        )

        const sideNavElement = screen.getByTestId('side-nav')
        expect(sideNavElement).toBeDefined()
    })

    test('expands and collapses SideNav on button click', () => {
        render(
            <GlobalContextProvider>
                <BrowserRouter>
                    <SideNav />
                </BrowserRouter>
            </GlobalContextProvider>
        )

        const sideNavElement = screen.getByTestId('side-nav')
        const buttonElement = screen.getByRole('button')

        expect(sideNavElement.classList).toContain('w-14')

        fireEvent.click(buttonElement)

        expect(sideNavElement.classList).toContain('w-64')

        fireEvent.click(buttonElement)

        expect(sideNavElement.classList).toContain('w-14')
    })

    test('navigates to correct route on NavLink click', async () => {
        const user = userEvent.setup()
        render(
            <BrowserRouter>
                <SideNav />
            </BrowserRouter>
        )

        const vendorsNavLink = screen.getByTestId('vendors-link')
        const customersNavLink = screen.getByTestId('customers-link')

        await user.click(customersNavLink)

        expect(customersNavLink.classList).toContain('bg-gray-700')

        await user.click(vendorsNavLink)

        expect(vendorsNavLink.classList).toContain('bg-gray-700')
    })
})
