import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { FormHandler } from '../src/components/FormHandler'
import { describe, test, expect, afterEach, vi } from 'vitest'
import { useState as useStateMock } from 'react'
import { EnergyTypes } from '../src/types/types'

vi.mock('react', async (importOriginal) => {
    const original = await importOriginal<typeof import('React')>()
    return {
        ...original,
        useState: vi.fn().mockImplementation((init) => [init, vi.fn()]),
    }
})
describe('Form component', () => {
    const typeSelected: EnergyTypes = 'SOLAR'
    const setTypeSelected = vi.fn()
    const closeForm = vi.fn()

    afterEach(() => {
        cleanup()
    })

    test('renders EnergyTypeSelector when typeSelected is null', () => {
        render(<FormHandler closeForm={closeForm} />)
        const energyTypeSelector = screen.getByRole('combobox')
        expect(energyTypeSelector).toBeDefined()
    })

    test('renders Form when typeSelected is not null', async () => {
        vi.mocked(useStateMock).mockImplementationOnce(() => [
            typeSelected,
            setTypeSelected,
        ])
        render(<FormHandler closeForm={closeForm} />)
        const form = screen.getByRole('form')
        expect(form).toBeDefined()
    })

    test('calls closeForm when Cancel button is clicked', () => {
        vi.mocked(useStateMock).mockImplementationOnce(() => [
            typeSelected,
            setTypeSelected,
        ])
        render(<FormHandler closeForm={closeForm} />)
        const form = screen.getByRole('form')
        expect(form).toBeDefined()
        const cancelButton = screen.getByText('Cancel')
        fireEvent.click(cancelButton)
        expect(closeForm).toHaveBeenCalledWith(true)
    })

    // test('calls onSubmit when form is submitted', () => {
    //     vi.mocked(useStateMock).mockImplementationOnce(() => [
    //         typeSelected,
    //         setTypeSelected,
    //     ])
    //     const onSubmit = vi.fn()
    //     const handleSubmit = vi.fn()
    //     const submitFunction = vi.fn()
    //     render(<FormHandler closeForm={closeForm} />)
    //     const form = screen.getByRole('form')
    //     expect(form).toBeDefined()
    //     fireEvent.submit(form)
    //     expect(onSubmit).toHaveBeenCalled()
    // })
})
