import { RegisterOptions } from "react-hook-form";

export type InputType = "text" | "select" | "number" | "checkbox" | "date" | "radio";

export type SelectOption = {
  label: string;
  value: string | boolean;
}

export type SelectUnits = {
  label: string;
}

export type RadioOption = {
  value: string;
}

export interface DynamicFieldData {
  label: string;
  inputType: InputType;
  fieldName: string;
  defaultValue: any;
  selectOptions?: SelectOption[] 
  radioOptions?: RadioOption[];
  config?: RegisterOptions;
  units? : SelectUnits[];
}

export const validateDynamicFormFieldsObj: DynamicFieldData = {
  label: "Energy Type",
  inputType: "select",
  fieldName: "energyType",
  defaultValue: "",
  selectOptions: [
    { label: "Solar", value: "SOLAR" },
  ],
  config: { required: true },
  units: [ {label: "kW"}],
  radioOptions: [
    { value: "option" },
  ],
}

export const mandatoryFields: DynamicFieldData = {
  label: "label",
  inputType: "text",
  fieldName: "name",
  defaultValue: "",
}

export const energyTypes: EnergyTypes[] = [
  "SOLAR", "HYDRO", "WIND", "THERMAL", "KINETIC", "GAS"
]

export type PaymentMethod = "CREDIT_CARD" | "BANK_TRANSFER" | "PAYPAL";

export type EnergyTypes = "SOLAR" | "HYDRO" | "WIND" | "THERMAL" | "KINETIC" | "GAS" | null;

export type Trade = EnergySource & (SolarEnergy | HydroEnergy | KineticEnergy | GasEnergy | WindEnergy | ThermalEnergy);

export type TradeStatus =  "EXECUTED" | "CANCELED" | "PENDING" | "CONFIRMED" | "DELIVERED";

interface EnergySource {
  id: string;
  status: TradeStatus;
  energyType: EnergyTypes;
  price: number;
  minimumPurchaseQuantity: number;
  contractTerms: string;
  paymentMethod: PaymentMethod; 
  paymentDate: string;
}

export type EnergyOutputPredictions = "LOW" | "MEDIUM" | "HIGH";
export type WaterFlowRate = "LOW" | "MEDIUM" | "HIGH";
export type ReservoirLevel = "LOW" | "MEDIUM" | "HIGH";
export type RegulatoryCompilanceType = "FINRA" | "SEC" | "FDA" | "NERC" | "FCA"

export type RegulatoryCompilance = {
  [key in RegulatoryCompilanceType]?: boolean;
}

export type NumberWithUnits = {
  value: number
  units: "kW" | "MW"
}

export type LengthWithUnits = {
  value: number
  units: "months" | "years"
}

export type TimeOfAvailability = {
  value: number
  units: "h/d" | "d/w"
}

type EnergyConversionEfficiency = "LOW" | "MEDIUM" | "HIGH";
type PredictabilityOfSource = "LOW" | "MEDIUM" | "HIGH";
type WindSpeedPredictions = "LOW" | "MEDIUM" | "HIGH";
type TurbineEfficiency = "LOW" | "MEDIUM" | "HIGH";
type HeartSourceStability = "LOW" | "MEDIUM" | "HIGH";
type DeliveryMethod = "PIPELINE" | "LNG";

export interface SolarEnergy extends EnergySource {
  capacity: NumberWithUnits;
  location: string;
  energyOutputPredictions: EnergyOutputPredictions // radiobutton
  timeOfAvailability: TimeOfAvailability;
  certifications: string;
}

export interface HydroEnergy extends EnergySource {
    capacity: NumberWithUnits;
    waterFlowRate: WaterFlowRate;
    reservoirLevel: ReservoirLevel;
    regulatoryCompilance: RegulatoryCompilance; 
    flexibilityOfSupply: string;
    energyStorage: string;
}

export interface KineticEnergy extends EnergySource {
    capacity: NumberWithUnits;
    location: string;
    energyConversionEfficiency: EnergyConversionEfficiency;
    predictabilityOfSource: PredictabilityOfSource;
}

export interface GasEnergy extends EnergySource {
    deliveryMethod: DeliveryMethod;
    flexibilityOfSupply: string;
    emissionsCreditsOrPenalties: `${number}%`;
    contractLength: LengthWithUnits;
}

export interface WindEnergy extends EnergySource {
    capacity: NumberWithUnits;
    location: string;
    windSpeedPredicions: WindSpeedPredictions; 
    turbineEfficiencty: TurbineEfficiency; 
    timeOfAvailability: TimeOfAvailability;
    certifications: string;
}

export interface ThermalEnergy extends EnergySource {
    capacity: NumberWithUnits;
    location: string;
    heatSourceStability: HeartSourceStability;
    temperatureGradient: number;
    conversionEfficiency: EnergyConversionEfficiency;
    environmentalImpactAndRegulation: string;
}

export type AlertMessageType = {
  message: string;
  severity: "error" | "warning" | "info" | "success";
  isOpen: boolean;
}