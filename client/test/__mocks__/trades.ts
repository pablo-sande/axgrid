import { Trade } from '../../src/types/types'

export const hydroTrade: Trade = {
	id: '12345',
	status: 'CONFIRMED',
	energyType: 'HYDRO',
	price: 1500,
	minimumPurchaseQuantity: 10,
	contractTerms: '12 months',
	paymentMethod: 'BANK_TRANSFER',
	paymentDate: '2024-04-02',
	flexibilityOfSupply: 'Yes',
	energyStorage: 'No',
	waterFlowRate: 'LOW',
	capacity: {
		value: 100,
		units: 'MW',
	},
	reservoirLevel: 'LOW',
	regulatoryCompilance: {
		FINRA: true,
		SEC: false,
	},
}

export const solarTrade: Trade = {
	id: '67890',
	status: 'PENDING',
	energyType: 'SOLAR',
	price: 2000,
	minimumPurchaseQuantity: 20,
	contractTerms: '24 months',
	paymentMethod: 'CREDIT_CARD',
	paymentDate: '2024-04-02',
	timeOfAvailability: {
		value: 4,
		units: 'd/w',
	},
	capacity: {
		value: 200,
		units: 'MW',
	},
	energyOutputPredictions: 'HIGH',
	certifications: 'ISO 9001',
	location: 'Zurich',
}

export const windTrade: Trade = {
	id: '13579',
	status: 'CANCELED',
	energyType: 'WIND',
	price: 2500,
	energyOutputPredictions: 'MEDIUM',
	turbineEfficiencty: 'MEDIUM',
	minimumPurchaseQuantity: 30,
	contractTerms: '36 months',
	paymentMethod: 'PAYPAL',
	paymentDate: '2024-04-02',
	windSpeedPredicions: 'HIGH',
	certifications: 'ISO 14001',
	timeOfAvailability: {
		value: 12,
		units: 'h/d',
	},
	capacity: {
		value: 300,
		units: 'MW',
	},
	location: 'Texas',
}

export const kineticTrade: Trade = {
	id: '24680',
	status: 'EXECUTED',
	energyType: 'KINETIC',
	price: 3000,
	minimumPurchaseQuantity: 40,
	contractTerms: '48 months',
	paymentMethod: 'PAYPAL',
	paymentDate: '2024-04-02',
	capacity: {
		value: 30,
		units: 'kW',
	},
	energyConversionEfficiency: 'HIGH',
	location: 'New York',
	predictabilityOfSource: 'HIGH',
}

export const gasTrade: Trade = {
	id: '36912',
	status: 'DELIVERED',
	energyType: 'GAS',
	price: 3500,
	minimumPurchaseQuantity: 50,
	contractTerms: '60 months',
	paymentMethod: 'BANK_TRANSFER',
	paymentDate: '2024-04-02',
	capacity: {
		value: 40,
		units: 'kW',
	},
	deliveryMethod: 'PIPELINE',
	flexibilityOfSupply: 'Yes',
	emissionsCreditsOrPenalties: '-25%',
	contractLength: {
		value: 5,
		units: 'years',
	},
}

export const thermalTrade: Trade = {
	id: '48126',
	status: 'CONFIRMED',
	energyType: 'THERMAL',
	price: 4000,
	minimumPurchaseQuantity: 60,
	contractTerms: '72 months',
	paymentMethod: 'CREDIT_CARD',
	paymentDate: '2024-04-02',
	capacity: {
		value: 50,
		units: 'kW',
	},
	conversionEfficiency: 'LOW',
	location: 'California',
	temperatureGradient: 20,
	heatSourceStability: 'HIGH',
	environmentalImpactAndRegulation: 'Non regulated',
}
