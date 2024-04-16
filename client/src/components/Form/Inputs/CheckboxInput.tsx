import { SelectOption } from '../../../types/types'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material'
import { useState } from 'react'

type CheckboxInputProps = {
    fieldName: string
    label: string
    selectOptions: SelectOption[]
    register: UseFormRegister<FieldValues>
    config: RegisterOptions
}

export const CheckboxInput = ({
    fieldName,
    label,
    selectOptions,
    register,
    config,
}: CheckboxInputProps) => {
    const [checkboxState, setCheckboxState] = useState(
        selectOptions.reduce(
            (obj, item) => Object.assign(obj, { [item.label]: item.value }),
            {}
        )
    )

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const eventLabel = event.target.name.substring(fieldName.length + 1)
        setCheckboxState({
            ...checkboxState,
            [eventLabel]: event.target.checked,
        })
    }

    return (
        <FormGroup row aria-label={label}>
            <label className="w-full" htmlFor={fieldName}>
                {label}
            </label>
            {selectOptions.map((o, index) => {
                if (typeof o.value === 'string') {
                    return <></>
                }
                return (
                    <FormControlLabel
                        key={index + o.value.toString()}
                        control={
                            <Checkbox
                                {...register(`${fieldName}.${o.label}`, config)}
                                onChange={handleCheckboxChange}
                                key={o.label + index}
                                checked={
                                    checkboxState[
                                        o.label as keyof typeof checkboxState
                                    ] || false
                                }
                            />
                        }
                        label={o.label}
                    />
                )
            })}
        </FormGroup>
    )
}
