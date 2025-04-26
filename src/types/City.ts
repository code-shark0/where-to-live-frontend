export interface City {
	id: number;
	name: string;
	costOfLivingIndex: number;     // Higher = more expensive
	crimeIndex: number;            // Higher = more crime
	medianIncome: number;          // In USD
	walkabilityScore: number;      // 0–100
	averageTemperature: number;    // In Fahrenheit
}