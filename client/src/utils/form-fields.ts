import {
	InputType,
	EnergyTypes,
	mandatoryFields,
	validateDynamicFormFieldsObj,
} from '../types/types.ts'
import { data } from '../data/data.ts'

export const getFormFields = (energyType: EnergyTypes) => {
	if (
		!(
			data &&
			data.energyTypes &&
			data.energyTypes.length &&
			data.default &&
			data.default.length
		)
	) {
		return null
	}
	const values =
		(energyType &&
			data.energyTypes.find(
				(_) => _.energyType.toLowerCase() === energyType.toLowerCase()
			)?.values) ||
		[]
	const defaultValues = data.default
	const allValues = [...values, ...defaultValues]
	const valuesWithInputType = allValues.map((_) => ({
		..._,
		inputType: _.inputType as InputType,
	}))

	return valuesWithInputType
}

export const validateDynamicFormFields = (values: any) => {
	if (!(values && values.length)) {
		return false
	}

	for (const value of values) {
		if (!(value && typeof value === 'object')) {
			console.error('Invalid field value:', value)
			return false
		}
		for (const key of Object.keys(value)) {
			if (!(key in validateDynamicFormFieldsObj)) {
				console.error('Invalid field:', key)
				return false
			}
		}
		for (const key of Object.keys(mandatoryFields)) {
			if (!(key in value)) {
				console.error('Missing mandatory field:', key)
				return false
			}
		}
	}

	return true
}
