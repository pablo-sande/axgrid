import { useFormContext } from 'react-hook-form'
import { DynamicFieldData } from '../types/types'
import {
    TextField,
    Checkbox,
    MenuItem,
    Input,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    FormControl,
} from '@mui/material'
import React, { useState } from 'react'

export const DynamicFields = ({
    inputType = 'text',
    fieldName = '',
    label = '',
    defaultValue,
    selectOptions = [],
    radioOptions = [],
    config = {},
    units = [],
}: DynamicFieldData) => {
    const { register } = useFormContext()
    const [checkboxState, setCheckboxState] = useState(
        inputType === 'checkbox'
            ? selectOptions.reduce(
                  (obj, item) =>
                      Object.assign(obj, { [item.label]: item.value }),
                  {}
              )
            : {}
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

    switch (inputType) {
        case 'number':
            return (
                <div className="flex flex-row w-full items-center">
                    <div className="flex flex-col w-full">
                        <label htmlFor={fieldName}>{label}</label>
                        <Input
                            id={fieldName}
                            type={inputType}
                            {...register(
                                (units &&
                                    units.length &&
                                    `${fieldName}.value`) ||
                                    fieldName,
                                config
                            )}
                            defaultValue={defaultValue}
                            className="bg-white w-full"
                        />
                    </div>
                    {units && units.length ? (
                        <div className="flex flex-col ml-4 min-w-26">
                            <TextField
                                label="Units"
                                select
                                {...register(`${fieldName}.units`, config)}
                                defaultValue={units[0].label}
                            >
                                {units.map((unit, index) => (
                                    <MenuItem
                                        key={unit.label + index}
                                        value={unit.label}
                                    >
                                        <label>{unit.label}</label>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    ) : null}
                </div>
            )

        case 'date':
            return (
                <>
                    <label htmlFor={fieldName}>{label}</label>
                    <Input
                        id={fieldName}
                        type={inputType}
                        {...register(fieldName, config)}
                        defaultValue={defaultValue}
                        className="bg-white"
                    />
                </>
            )

        case 'text':
            return (
                <TextField
                    label={label}
                    type={inputType}
                    {...register(fieldName, config)}
                    defaultValue={defaultValue}
                    className="bg-white"
                />
            )

        case 'select': {
            return (
                <TextField
                    label={label}
                    select
                    {...register(fieldName, config)}
                    defaultValue={defaultValue}
                    className="bg-white"
                >
                    {selectOptions.map((o) => {
                        if (typeof o.value !== 'string') {
                            return <></>
                        }
                        return (
                            <MenuItem key={o.label + o.value} value={o.value}>
                                <label>{o.label}</label>
                            </MenuItem>
                        )
                    })}
                </TextField>
            )
        }

        case 'checkbox': {
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
                                        {...register(
                                            `${fieldName}.${o.label}`,
                                            config
                                        )}
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

        case 'radio': {
            return (
                <FormControl aria-label={label}>
                    <label htmlFor={fieldName}>{label}</label>
                    <RadioGroup
                        aria-labelledby={fieldName}
                        row
                        defaultValue={defaultValue}
                    >
                        {radioOptions?.map((o, index) => {
                            return (
                                <FormControlLabel
                                    {...register(fieldName, config)}
                                    key={fieldName + o.value + index}
                                    control={<Radio />}
                                    label={o.value}
                                    value={o.value}
                                />
                            )
                        })}
                    </RadioGroup>
                </FormControl>
            )
        }

        default:
            return (
                <>
                    <TextField
                        label={label}
                        type="text"
                        {...register(fieldName, config)}
                        defaultValue={defaultValue}
                    />
                </>
            )
    }
}
