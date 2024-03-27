export const data = {
    "default": [
        {
            "fieldName": "price",
            "inputType": "number",
            "label": "Price",
            "defaultValue": 0
        },
        {   
            "fieldName": "minimumPurchaseQuantity",
            "inputType": "number",
            "label": "Minimum Purchase Quantity",
            "defaultValue": 0
        },
        {   
            "fieldName": "contractTerms",
            "inputType": "text",
            "label": "Contract Terms",
            "defaultValue": ""
        },
        {   
            "fieldName": "paymentDate",
            "inputType": "date",
            "label": "Payment Date",
            "defaultValue": "2024-04-02"
        },
        {   
            "fieldName": "paymentMethod",
            "inputType": "select",
            "label": "Payment Method",
            "defaultValue": "BANK_TRANSFER",
            "selectOptions": [
                {
                    "label": "Credit Card",
                    "value": "CREDIT_CARD"
                },
                {
                    "label": "Bank Transfer",
                    "value": "BANK_TRANSFER"
                },
                {
                    "label": "Paypal",
                    "value": "PAYPAL"
                }
            ]
        }
    ],
    "energyTypes": [
        {
            "energyType": "hydro",
            "values": [  
                {   
                    "fieldName": "capacity",
                    "inputType": "number",
                    "label": "Capacity",
                    "defaultValue": 0,
                    "units": [
                        {
                            "label": "kW",
                        },
                        {
                            "label": "MW",
                        }
                    ]
                },
                {   
                    "fieldName": "waterFlowRate",
                    "inputType": "select",
                    "label": "Water Flow Rate",
                    "defaultValue": "MEDIUM",
                    "selectOptions": [
                        {
                            "label": "Low",
                            "value": "LOW"
                        },
                        {
                            "label": "Medium",
                            "value": "MEDIUM"
                        },
                        {
                            "label": "High",
                            "value": "HIGH"
                        }
                    ]
                },
                {   
                    "fieldName": "reservoirLevel",
                    "inputType": "select",
                    "label": "Reservoir Level",
                    "defaultValue": "MEDIUM",
                    "selectOptions": [
                        {
                            "label": "Low",
                            "value": "LOW"
                        },
                        {
                            "label": "Medium",
                            "value": "MEDIUM"
                        },
                        {
                            "label": "High",
                            "value": "HIGH"
                        }
                    ]
                },
                {   
                    "fieldName": "regulatoryCompilance",
                    "inputType": "checkbox",
                    "label": "Regulatory Compilance",
                    "defaultValue": {},
                    "selectOptions": [
                        {
                            "label": "FINRA",
                            "value": true,
                        },
                        {
                            "label": "SEC",
                            "value": false,
                        },
                        {
                            "label": "FDA",
                            "value": false,
                        },
                        {
                            "label": "NERC",
                            "value": false,
                        },
                        {
                            "label": "FCA",
                            "value": false,
                        }
                    ]
                },
                {   
                    "fieldName": "flexibilityOfSupply",
                    "inputType": "radio",
                    "label": "Flexibility of Supply",
                    "defaultValue": "Yes",
                    "radioOptions": [
                        {
                            "value": "Yes",
                        },
                        {
                            "value": "No",
                        }
                    ]
                },
                {   
                    "fieldName": "energyStorage",
                    "inputType": "radio",
                    "label": "Energy Storage",
                    "defaultValue": "Yes",
                    "radioOptions": [
                        {
                            "value": "Yes",
                        },
                        {
                            "value": "No",
                        }
                    ]
                },
            ]
        },
        {
            "energyType": "wind",
            "values": [
                {   
                    "fieldName": "capacity",
                    "inputType": "number",
                    "label": "Capacity",
                    "defaultValue": 0,
                    "units": [
                        {
                            "label": "kW",
                        },
                        {
                            "label": "MW",
                        }
                    ]
                },
                {   
                    "fieldName": "location",
                    "inputType": "text",
                    "label": "Location",
                    "defaultValue": ""
                },
                {   
                    "fieldName": "energyOutputPredictions",
                    "inputType": "select",
                    "label": "Energy Output Predictions",
                    "defaultValue": "MEDIUM",
                    "selectOptions": [
                        {
                            "label": "Low",
                            "value": "LOW"
                        },
                        {
                            "label": "Medium",
                            "value": "MEDIUM"
                        },
                        {
                            "label": "High",
                            "value": "HIGH"
                        }
                    ]
                },
                {   
                    "fieldName": "timeOfAvailability",
                    "inputType": "number",
                    "label": "Time of Availability",
                    "defaultValue": 0
                },
                {   
                    "fieldName": "certifications",
                    "inputType": "text",
                    "label": "Certifications",
                    "defaultValue": ""
                },
            ]
        },   
        {
            "energyType": "solar",
            "values": [
                {   
                    "fieldName": "capacity",
                    "inputType": "number",
                    "label": "Capacity",
                    "defaultValue": 0,
                    "units": [
                        {
                            "label": "kW",
                        },
                        {
                            "label": "MW",
                        }
                    ]
                },
                {   
                    "fieldName": "location",
                    "inputType": "text",
                    "label": "Location",
                    "defaultValue": ""
                },
                {   
                    "fieldName": "energyOutputPredictions",
                    "inputType": "select",
                    "label": "Energy Output Predictions",
                    "defaultValue": "MEDIUM",
                    "selectOptions": [
                        {
                            "label": "Low",
                            "value": "LOW"
                        },
                        {
                            "label": "Medium",
                            "value": "MEDIUM"
                        },
                        {
                            "label": "High",
                            "value": "HIGH"
                        }
                    ]
                },
                {   
                    "fieldName": "timeOfAvailability",
                    "inputType": "number",
                    "label": "Time of Availability",
                    "defaultValue": 0
                },
                {   
                    "fieldName": "certifications",
                    "inputType": "text",
                    "label": "Certifications",
                    "defaultValue": ""
                }
            ]
        },
        {
            "energyType": "gas",
            "values": [
                {   
                    "fieldName": "deliveryMethod",
                    "inputType": "select",
                    "label": "Delivery Method",
                    "defaultValue": "PIPELINE",
                    "selectOptions": [
                        {
                            "label": "Pipeline",
                            "value": "PIPELINE"
                        },
                        {
                            "label": "LNG",
                            "value": "LNG"
                        }
                    ]
                },
                {   
                    "fieldName": "flexibilityOfSupply",
                    "inputType": "radio",
                    "label": "Flexibility of Supply",
                    "defaultValue": "Yes",
                    "radioOptions": [
                        {
                            "value": "Yes",
                        },
                        {
                            "value": "No",
                        }
                    ]
                },
                {   
                    "fieldName": "emissionsCreditsOrPenalties",
                    "inputType": "text",
                    "label": "Emissions Credits or Penalties",
                    "defaultValue": "0%"
                },
                {   
                    "fieldName": "contractLength",
                    "inputType": "number",
                    "label": "Contract Length",
                    "defaultValue": 0,
                    "units": [
                        {
                            "label": "months",
                        },
                        {
                            "label": "years",
                        }
                    ]
                }
            ]
        },
        {
            "energyType": "kinetic",
            "values": [
                {   
                    "fieldName": "capacity",
                    "inputType": "number",
                    "label": "Capacity",
                    "defaultValue": 0,
                    "units": [
                        {
                            "label": "kW",
                        },
                        {
                            "label": "MW",
                        }
                    ]
                },
                {   
                    "fieldName": "location",
                    "inputType": "text",
                    "label": "Location",
                    "defaultValue": ""
                },
                {   
                    "fieldName": "energyConversionEfficiency",
                    "inputType": "select",
                    "label": "Energy Conversion Efficiency",
                    "defaultValue": "MEDIUM",
                    "selectOptions": [
                        {
                            "label": "Low",
                            "value": "LOW"
                        },
                        {
                            "label": "Medium",
                            "value": "MEDIUM"
                        },
                        {
                            "label": "High",
                            "value": "HIGH"
                        }
                    ]
                },
                {   
                    "fieldName": "predictabilityOfSource",
                    "inputType": "select",
                    "label": "Predictability of Source",
                    "defaultValue": "MEDIUM",
                    "selectOptions": [
                        {
                            "label": "Low",
                            "value": "LOW"
                        },
                        {
                            "label": "Medium",
                            "value": "MEDIUM"
                        },
                        {
                            "label": "High",
                            "value": "HIGH"
                        }
                    ]
                }
            ]
        },
        {
            "energyType": "thermal",
            "values": [
                {
                    "fieldName": "capacity",
                    "inputType": "number",
                    "label": "Capacity",
                    "defaultValue": 0,
                    "units": [
                        {
                            "label": "kW",
                        },
                        {
                            "label": "MW",
                        }
                    ]
                },
                {
                    "fieldName": "location",
                    "inputType": "text",
                    "label": "Location",
                    "defaultValue": ""
                },
                {
                    "fieldName": "heatSourceStability",
                    "inputType": "select",
                    "label": "Heat Source Stability",
                    "defaultValue": "HIGH",
                    "selectOptions": [
                        {
                            "label": "Low",
                            "value": "LOW"
                        },
                        {
                            "label": "Medium",
                            "value": "MEDIUM"
                        },
                        {
                            "label": "High",
                            "value": "HIGH"
                        }
                    ]
                },
                {
                    "fieldName": "temperatureGradient",
                    "inputType": "number",
                    "label": "Temperature Gradient",
                    "defaultValue": 0
                },
                {
                    "fieldName": "conversionEfficiency",
                    "inputType": "select",
                    "label": "Conversion Efficiency",
                    "defaultValue": "MEDIUM",
                    "selectOptions": [
                        {
                            "label": "Low",
                            "value": "LOW"
                        },
                        {
                            "label": "Medium",
                            "value": "MEDIUM"
                        },
                        {
                            "label": "High",
                            "value": "HIGH"
                        }
                    ]
                },
                {
                    "fieldName": "environmentalImpactAndRegulation",
                    "inputType": "text",
                    "label": "Environmental Impact and Regulation",
                    "defaultValue": ""
                }
            ]
        }
    ]
}