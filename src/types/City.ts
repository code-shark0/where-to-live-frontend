export interface City {
	id: string;
	name: string;
	costOfLivingIndex: IndexData;     // Higher = more expensive
	crimeIndex: IndexData;            // Higher = more crime
	medianIncome: IndexData;          // In USD
	walkabilityScore: IndexData;      // 0–100
	averageTemperature: IndexData;    // In Fahrenheit
}

export interface IndexData {
    type: 'higherIsBetter' | 'lowerIsBetter' | 'specialCase';
    value: number;
    min: number;
    max: number;
}