import { ValueType } from "./ValueType";

export interface City {
	id: number;
	name: string;
	costOfLivingIndex: number;     // Higher = more expensive
	medianRent: number;
	medianHomePrice: number;
	medianIncome: number;
	incomeToCostRatio: number;
	crimeIndex: number;            // Higher = more crime
	violentCrimeIndex: number;
	propertyCrimeRate: number;
	walkabilityScore: number;      // 0–100
	bikeabilityScore: number;
	transitScore: number;
	commuteTime: number;
	trafficCongestionIndex: number;
	averageAnnualTemperature: number;    // In Fahrenheit
	airQualityIndex: number;
	greenSpacePerCapita: number;
	naturalDisasterRisk: number;
	healthcareAccessScore: number;
	educationIndex: number;
	universityProximity: number;
	diversityIndex: number;
	politicalLeaning: PoliticalLeaning;
	nightlifeIndex: number;
	religiousInstitutionsPerCapita: number;
	jobMarketIndex: number;
	unemploymentRate: number;
	startupEcosystemRank: number;
}

export interface InjectedCity {
	id: number;
	name: string;
	costOfLivingIndex: IndexData;
	medianRent: IndexData;
	medianHomePrice: IndexData;
	medianIncome: IndexData;
	incomeToCostRatio: IndexData;
	crimeIndex: IndexData;
	violentCrimeIndex: IndexData;
	propertyCrimeRate: IndexData;
	walkabilityScore: IndexData;
	bikeabilityScore: IndexData;
	transitScore: IndexData;
	commuteTime: IndexData;
	trafficCongestionIndex: IndexData;
	averageAnnualTemperature: IndexData;
	airQualityIndex: IndexData;
	greenSpacePerCapita: IndexData;
	naturalDisasterRisk: IndexData;
	healthcareAccessScore: IndexData;
	educationIndex: IndexData;
	universityProximity: IndexData;
	diversityIndex: IndexData;
	politicalLeaning: IndexData;
	nightlifeIndex: IndexData;
	religiousInstitutionsPerCapita: IndexData;
	jobMarketIndex: IndexData;
	unemploymentRate: IndexData;
	startupEcosystemRank: IndexData;

}

export interface ScoredCity extends InjectedCity {
    score: number;
}

export enum PoliticalLeaning {
    Left = 'left',
    Center = 'center',
    Right = 'right'
}

export interface IndexData {
    type: ValueType;
    value: number;
    min: number;
    max: number;
}