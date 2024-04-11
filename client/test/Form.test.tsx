import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { useForm } from 'react-hook-form'
import { Form } from '../src/components/Form'
import { getFormFields } from '../src/utils/form-fields'
import { energyTypes } from '../src/types/types'

describe('Form component', () => {
    const formMethods = useForm()
    const handleSubmit = vi.fn()
    const closeForm = vi.fn()

    vi.mock('react-hook-form', async (importOriginal) => {
        const original = await importOriginal<
            typeof import('react-hook-form')
        >()
        return {
            ...original,
            useForm: vi.fn().mockImplementation(() => ({
                register: vi.fn(),
                handleSubmit: vi.fn(),
                formState: {
                    errors: {
                        testField: {
                            type: 'required',
                            message: 'This field is required',
                        },
                    },
                    isSubmitting: false,
                },
            })),
        }
    })

    beforeEach(() => {
        vi.resetAllMocks()
        vi.restoreAllMocks()
    })

    afterEach(() => {
        cleanup()
    })

    test('renders form fields correctly', () => {
        energyTypes.forEach((type) => {
            render(
                <Form
                    handleSubmit={handleSubmit}
                    typeSelected={type}
                    formMethods={formMethods}
                    closeForm={closeForm}
                />
            )

            const fields = getFormFields(type)

            fields?.forEach((field) => {
                const inputField = screen.getByLabelText(field.label)
                expect(inputField).toBeDefined()
            })

            cleanup()
        })
    })

    test('calls handleSubmit when form is submitted', () => {
        render(
            <Form
                handleSubmit={handleSubmit}
                typeSelected="SOLAR"
                formMethods={formMethods}
                closeForm={closeForm}
            />
        )

        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        fireEvent.submit(form)
        expect(handleSubmit).toHaveBeenCalled()
    })

    test('calls closeForm when Cancel button is clicked', () => {
        render(
            <Form
                handleSubmit={handleSubmit}
                typeSelected="SOLAR"
                formMethods={formMethods}
                closeForm={closeForm}
            />
        )

        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        const cancelButton = screen.getByText('Cancel')
        expect(cancelButton).toBeDefined()

        fireEvent.click(cancelButton)
        expect(closeForm).toHaveBeenCalledWith(true)
    })

    test('displays error message when form fields are invalid', () => {
        vi.mock('getFormFields', () => {
            vi.fn().mockImplementationOnce(() => [{ wrongField: 'wrongValue' }])
        })

        render(
            <Form
                handleSubmit={handleSubmit}
                typeSelected="SOLAR"
                formMethods={formMethods}
                closeForm={closeForm}
            />
        )

        vi.waitFor(() => {
            const alertElement = screen.getByText('Invalid form fields')
            expect(alertElement).toBeDefined()
        })
    })
})
