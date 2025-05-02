import { City, InjectedCity } from "../types/City";

export const injectCitiesWithMetaData = (cities: Array<City>): Array<InjectedCity> => {

    const injectedCities = cities.map(city => ({
        ...city,
        costOfLivingIndex: {
            type: 'lowerIsBetter',
            value: city.costOfLivingIndex,
            min: 75,
            max: 90
        },
        crimeIndex: {
            type: 'lowerIsBetter',
            value: city.crimeIndex,
            min: 35,
            max: 60
        },
        medianIncome: {
            type: 'higherIsBetter',
            value: city.medianIncome,
            min: 57000,
            max: 92000,
        },
        walkabilityScore: {
            type: 'higherIsBetter',
            value: city.walkabilityScore,
            min: 41,
            max: 82,
        },
        averageTemperature: {
            type: 'specialCase',
            value: city.averageTemperature,
            min: 52,
            max: 77,
        },
    }));

    return injectedCities as Array<InjectedCity>;
}