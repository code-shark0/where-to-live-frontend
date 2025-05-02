export interface City {
	id: number;
	name: string;
	costOfLivingIndex: number;     // Higher = more expensive
	crimeIndex: number;            // Higher = more crime
	medianIncome: number;          // In USD
	walkabilityScore: number;      // 0–100
	averageTemperature: number;    // In Fahrenheit
}

export interface InjectedCity {
	id: number;
	name: string;
	costOfLivingIndex: IndexData;     // Higher = more expensive
	crimeIndex: IndexData;            // Higher = more crime
	medianIncome: IndexData;          // In USD
	walkabilityScore: IndexData;      // 0–100
	averageTemperature: IndexData;    // In Fahrenheit
}

export interface ScoredCity extends InjectedCity {
    score: number;
}

export interface IndexData {
    type: 'higherIsBetter' | 'lowerIsBetter' | 'specialCase';
    value: number;
    min: number;
    max: number;
}