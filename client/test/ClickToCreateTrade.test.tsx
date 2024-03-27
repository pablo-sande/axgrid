import { describe, test, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import ClickToCreateTrade from '../src/components/ClickToCreateTrade'

describe('ClickToCreateTrade component', () => {
    afterEach(() => {
        cleanup()
    })

    test('renders the AxpoLogo', () => {
        render(<ClickToCreateTrade />)
        const axpoLogo = screen.getByTitle('Axpo Logo')
        expect(axpoLogo).toBeDefined()
    })

    test('renders the "Click to create a new Trade" heading', () => {
        render(<ClickToCreateTrade />)
        const heading = screen.getByText('Click to create a new Trade')
        expect(heading).toBeDefined()
    })

    test('does not render the energy selector initially', () => {
        render(<ClickToCreateTrade />)
        const selector = screen.queryByRole('combobox')
        expect(selector).toBeNull()
    })

    test('renders the energy selector when the AxpoLogo is clicked', () => {
        render(<ClickToCreateTrade />)
        const axpoLogo = screen.getByTitle('Axpo Logo')
        fireEvent.click(axpoLogo)
        const selector = screen.getByRole('combobox')
        expect(selector).toBeDefined()
    })

    test('closes the energy selector when the closeForm function is called', () => {
        render(<ClickToCreateTrade />)
        const axpoLogo = screen.getByTitle('Axpo Logo')
        fireEvent.click(axpoLogo)
        const selector = screen.getByRole('combobox')
        expect(selector).toBeDefined()
        const closeFormButton = screen.getByText('Cancel')
        fireEvent.click(closeFormButton)
        const selectorAfterClose = screen.queryByRole('combobox')
        expect(selectorAfterClose).toBeNull()
    })
})
