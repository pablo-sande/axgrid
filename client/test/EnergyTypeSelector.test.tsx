import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import EnergyTypeSelector from '../src/components/EnergyTypeSelector'
import { describe, test, expect, afterEach, vi } from 'vitest'

describe('EnergyTypeSelector component', () => {
    afterEach(() => {
        cleanup()
    })

    test('renders the component correctly', () => {
        const setTypeSelected = vi.fn()
        render(<EnergyTypeSelector setTypeSelected={setTypeSelected} />)

        const energyTypeSelector = screen.getByRole('combobox')
        expect(energyTypeSelector).toBeDefined()
    })

    test('calls setTypeSelected when selecting an energy type', () => {
        const setTypeSelected = vi.fn()
        render(<EnergyTypeSelector setTypeSelected={setTypeSelected} />)

        const energyTypeSelector = screen.getByTestId('energy-selector')
        expect(energyTypeSelector).toBeDefined()
        fireEvent.change(energyTypeSelector, { target: { value: 'WIND' } })

        expect(setTypeSelected).toHaveBeenCalledWith('WIND')
    })
})
