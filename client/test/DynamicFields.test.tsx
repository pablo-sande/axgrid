import {
    SelectorMatcherOptions,
    cleanup,
    render,
    screen,
} from '@testing-library/react'
import { describe, test, expect, vi, afterEach } from 'vitest'
import { DynamicFields } from '../src/components/Form'

const mockRegister = vi.fn().mockImplementation((name) => ({ name: name }))

vi.mock('react-hook-form', async (importOriginal) => {
    const original = await importOriginal<typeof import('react-hook-form')>()

    return {
        ...original,
        useFormContext: vi.fn().mockImplementation(() => ({
            register: mockRegister,
        })),
    }
})

describe('DynamicFields', () => {
    afterEach(() => {
        cleanup()
    })

    test('renders a number input control', () => {
        render(
            <DynamicFields
                fieldName={'capacity'}
                inputType={'number'}
                label={'Capacity'}
                defaultValue={10}
                units={[{ label: 'kW' }, { label: 'MW' }]}
            />
        )

        const numberInput = screen.queryByLabelText('Capacity')
        const inputValue = screen.getByDisplayValue(10)
        expect(numberInput).toBeDefined()
        expect(inputValue).toBeDefined()

        const unitsInput = screen.getByLabelText('Units')
        expect(unitsInput).toBeDefined()
        const unitsValue = screen.getByDisplayValue('kW')
        expect(unitsValue).toBeDefined()
    })

    test('renders a date input control', () => {
        render(
            <DynamicFields
                inputType="date"
                fieldName="paymentDate"
                defaultValue="2022-01-01"
                label={'Payment Date'}
            />
        )

        const dateInput = screen.getByLabelText('Payment Date')
        expect(dateInput).toBeDefined()
        const dateValue = screen.getByDisplayValue('2022-01-01')
        expect(dateValue).toBeDefined()
    })

    test('renders a text input control', () => {
        render(
            <DynamicFields
                inputType="text"
                fieldName="location"
                defaultValue="Madrid"
                label={'Location'}
            />
        )

        const textInput = screen.getByLabelText('Location')
        expect(textInput).toBeDefined()
        const textValue = screen.getByDisplayValue('Madrid')
        expect(textValue).toBeDefined()
    })

    test('renders a select input control', () => {
        render(
            <DynamicFields
                inputType="select"
                fieldName="reservoirLevel"
                defaultValue="MEDIUM"
                selectOptions={[
                    { label: 'Low', value: 'LOW' },
                    { label: 'Medium', value: 'MEDIUM' },
                    { label: 'High', value: 'HIGH' },
                ]}
                label={'Reservoir Level'}
            />
        )

        const selectInput = screen.getByLabelText('Reservoir Level')
        expect(selectInput).toBeDefined()
        const selectValue = screen.getByDisplayValue('MEDIUM')
        expect(selectValue).toBeDefined()
    })

    test('renders a checkbox input control', () => {
        render(
            <DynamicFields
                inputType="checkbox"
                fieldName="regulatoryCompilance"
                defaultValue={{ finra: true, sec: false }}
                selectOptions={[
                    { label: 'FINRA', value: true },
                    { label: 'SEC', value: false },
                ]}
                label={'Regulatory Compilance'}
            />
        )

        const checkbox1 = screen.getByLabelText('FINRA')
        expect(checkbox1).toBeDefined()
        const checkboxValue1 = screen.getByRole('checkbox', { name: 'FINRA' })
        expect(checkboxValue1).toHaveProperty('checked', true)
        const checkboxValue2 = screen.getByRole('checkbox', { name: 'SEC' })
        expect(checkboxValue2).toHaveProperty('checked', false)
    })

    test('renders a radio input control', () => {
        render(
            <DynamicFields
                inputType="radio"
                fieldName="flexibilityOfSupply"
                defaultValue="Yes"
                radioOptions={[{ value: 'Yes' }, { value: 'No' }]}
                label={'Flexibility of Supply'}
            />
        )

        const radio1 = screen.getByLabelText('Yes')
        expect(radio1).toHaveProperty('checked', true)
        const radio2 = screen.getByLabelText('No')
        expect(radio2).toHaveProperty('checked', false)
    })

    test('renders a default input control', () => {
        render(
            <DynamicFields
                // @ts-ignore
                inputType="unknown"
                fieldName="unknown"
                label="unknown"
            />
        )

        const defaultInput = screen.getByLabelText('unknown', {
            type: 'text',
        } as SelectorMatcherOptions)
        expect(defaultInput).toBeDefined()
    })

    test('calls register with correct arguments', () => {
        render(
            <DynamicFields
                inputType="text"
                fieldName="test"
                defaultValue="test"
                label={'Test'}
            />
        )

        expect(mockRegister).toHaveBeenCalledWith('test', expect.any(Object))
    })

    test('calls register with correct arguments for number input with units', () => {
        render(
            <DynamicFields
                inputType="number"
                fieldName="quantity"
                defaultValue={10}
                units={[{ label: 'kg' }, { label: 'lb' }]}
                label={'Quantity'}
            />
        )
        expect(mockRegister).toHaveBeenCalledWith(
            'quantity.value',
            expect.any(Object)
        )
        expect(mockRegister).toHaveBeenCalledWith(
            'quantity.units',
            expect.any(Object)
        )
    })

    test('calls register with correct arguments for checkbox input', () => {
        render(
            <DynamicFields
                inputType="checkbox"
                fieldName="regulatoryCompilance"
                defaultValue={{ finra: true, sec: false }}
                selectOptions={[
                    { label: 'FINRA', value: true },
                    { label: 'SEC', value: false },
                ]}
                label={'Regulatory Compilance'}
            />
        )

        expect(mockRegister).toHaveBeenCalledWith(
            'regulatoryCompilance.FINRA',
            expect.any(Object)
        )
        expect(mockRegister).toHaveBeenCalledWith(
            'regulatoryCompilance.SEC',
            expect.any(Object)
        )
    })

    test('calls register with correct arguments for radio input', () => {
        render(
            <DynamicFields
                inputType="radio"
                fieldName="flexibilityOfSupply"
                defaultValue="Yes"
                radioOptions={[{ value: 'Yes' }, { value: 'No' }]}
                label={'Flexibility of Supply'}
            />
        )

        expect(mockRegister).toHaveBeenCalledWith(
            'flexibilityOfSupply',
            expect.any(Object)
        )
    })

    test('calls register with correct arguments for select input', () => {
        render(
            <DynamicFields
                inputType="select"
                fieldName="reservoirLevel"
                defaultValue="MEDIUM"
                selectOptions={[
                    { label: 'Low', value: 'LOW' },
                    { label: 'Medium', value: 'MEDIUM' },
                    { label: 'High', value: 'HIGH' },
                ]}
                label={'Reservoir Level'}
            />
        )

        expect(mockRegister).toHaveBeenCalledWith(
            'reservoirLevel',
            expect.any(Object)
        )
    })

    test('calls register with correct arguments for date input', () => {
        render(
            <DynamicFields
                inputType="date"
                fieldName="paymentDate"
                defaultValue="2022-01-01"
                label={'Payment Date'}
            />
        )

        expect(mockRegister).toHaveBeenCalledWith(
            'paymentDate',
            expect.any(Object)
        )
    })

    test('calls register with correct arguments for text input', () => {
        render(
            <DynamicFields
                inputType="text"
                fieldName="location"
                defaultValue="Madrid"
                label={'Location'}
            />
        )

        expect(mockRegister).toHaveBeenCalledWith(
            'location',
            expect.any(Object)
        )
    })
})
