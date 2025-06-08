import { City, InjectedCity, PoliticalLeaning } from "../types/City";
import { ValueType } from "../types/ValueType";

export const injectCitiesWithMetaData = (cities: Array<City>): Array<InjectedCity> => {
    if (cities.length === 0) {
        return [];
    }

    // Extract all property arrays for min/max calculation
    const costOfLivingIndices = cities.map(city => city.costOfLivingIndex);
    const medianRents = cities.map(city => city.medianRent);
    const medianHomePrices = cities.map(city => city.medianHomePrice);
    const medianIncomes = cities.map(city => city.medianIncome);
    const incomeToCostRatios = cities.map(city => city.incomeToCostRatio);
    const crimeIndices = cities.map(city => city.crimeIndex);
    const violentCrimeIndices = cities.map(city => city.violentCrimeIndex);
    const propertyCrimeIndices = cities.map(city => city.propertyCrimeIndex);
    const walkabilityScores = cities.map(city => city.walkabilityScore);
    const bikeabilityScores = cities.map(city => city.bikeabilityScore);
    const transitScores = cities.map(city => city.transitScore);
    const commuteTimes = cities.map(city => city.commuteTime);
    const trafficCongestionIndices = cities.map(city => city.trafficCongestionIndex);
    const averageAnnualTemperatures = cities.map(city => city.averageAnnualTemperature);
    const airQualityIndices = cities.map(city => city.airQualityIndex);
    const greenSpacePerCapitas = cities.map(city => city.greenSpacePerCapita);
    const naturalDisasterRisks = cities.map(city => city.naturalDisasterRisk);
    const healthcareAccessScores = cities.map(city => city.healthcareAccessScore);
    const educationIndices = cities.map(city => city.educationIndex);
    const universityProximities = cities.map(city => city.universityProximity);
    const diversityIndices = cities.map(city => city.diversityIndex);
    const nightlifeIndices = cities.map(city => city.nightlifeIndex);
    const religiousInstitutionsPerCapitas = cities.map(city => city.religiousInstitutionsPerCapita);
    const jobMarketIndices = cities.map(city => city.jobMarketIndex);
    const unemploymentRates = cities.map(city => city.unemploymentRate);
    const startupEcosystemRanks = cities.map(city => city.startupEcosystemRank);

    // Convert political leanings to numerical values for min/max calculation
    const politicalLeaningValues = cities.map(city => {
        switch (city.politicalLeaning) {
            case PoliticalLeaning.Left: return -1;
            case PoliticalLeaning.Center: return 0;
            case PoliticalLeaning.Right: return 1;
            default: return 0;
        }
    });

    const injectedCities = cities.map((city, index) => ({
        id: city.id,
        name: city.name,
        costOfLivingIndex: {
            type: ValueType.LowerIsBetter,
            value: city.costOfLivingIndex,
            min: Math.min(...costOfLivingIndices),
            max: Math.max(...costOfLivingIndices),
        },
        medianRent: {
            type: ValueType.LowerIsBetter,
            value: city.medianRent,
            min: Math.min(...medianRents),
            max: Math.max(...medianRents),
        },
        medianHomePrice: {
            type: ValueType.LowerIsBetter,
            value: city.medianHomePrice,
            min: Math.min(...medianHomePrices),
            max: Math.max(...medianHomePrices),
        },
        medianIncome: {
            type: ValueType.HigherIsBetter,
            value: city.medianIncome,
            min: Math.min(...medianIncomes),
            max: Math.max(...medianIncomes),
        },
        incomeToCostRatio: {
            type: ValueType.HigherIsBetter,
            value: city.incomeToCostRatio,
            min: Math.min(...incomeToCostRatios),
            max: Math.max(...incomeToCostRatios),
        },
        crimeIndex: {
            type: ValueType.LowerIsBetter,
            value: city.crimeIndex,
            min: Math.min(...crimeIndices),
            max: Math.max(...crimeIndices),
        },
        violentCrimeIndex: {
            type: ValueType.LowerIsBetter,
            value: city.violentCrimeIndex,
            min: Math.min(...violentCrimeIndices),
            max: Math.max(...violentCrimeIndices),
        },
        propertyCrimeIndex: {
            type: ValueType.LowerIsBetter,
            value: city.propertyCrimeIndex,
            min: Math.min(...propertyCrimeIndices),
            max: Math.max(...propertyCrimeIndices),
        },
        walkabilityScore: {
            type: ValueType.HigherIsBetter,
            value: city.walkabilityScore,
            min: Math.min(...walkabilityScores),
            max: Math.max(...walkabilityScores),
        },
        bikeabilityScore: {
            type: ValueType.HigherIsBetter,
            value: city.bikeabilityScore,
            min: Math.min(...bikeabilityScores),
            max: Math.max(...bikeabilityScores),
        },
        transitScore: {
            type: ValueType.HigherIsBetter,
            value: city.transitScore,
            min: Math.min(...transitScores),
            max: Math.max(...transitScores),
        },
        commuteTime: {
            type: ValueType.LowerIsBetter,
            value: city.commuteTime,
            min: Math.min(...commuteTimes),
            max: Math.max(...commuteTimes),
        },
        trafficCongestionIndex: {
            type: ValueType.LowerIsBetter,
            value: city.trafficCongestionIndex,
            min: Math.min(...trafficCongestionIndices),
            max: Math.max(...trafficCongestionIndices),
        },
        averageAnnualTemperature: {
            type: ValueType.closestNumber,
            value: city.averageAnnualTemperature,
            min: Math.min(...averageAnnualTemperatures),
            max: Math.max(...averageAnnualTemperatures),
        },
        airQualityIndex: {
            type: ValueType.LowerIsBetter,
            value: city.airQualityIndex,
            min: Math.min(...airQualityIndices),
            max: Math.max(...airQualityIndices),
        },
        greenSpacePerCapita: {
            type: ValueType.HigherIsBetter,
            value: city.greenSpacePerCapita,
            min: Math.min(...greenSpacePerCapitas),
            max: Math.max(...greenSpacePerCapitas),
        },
        naturalDisasterRisk: {
            type: ValueType.LowerIsBetter,
            value: city.naturalDisasterRisk,
            min: Math.min(...naturalDisasterRisks),
            max: Math.max(...naturalDisasterRisks),
        },
        healthcareAccessScore: {
            type: ValueType.HigherIsBetter,
            value: city.healthcareAccessScore,
            min: Math.min(...healthcareAccessScores),
            max: Math.max(...healthcareAccessScores),
        },
        educationIndex: {
            type: ValueType.HigherIsBetter,
            value: city.educationIndex,
            min: Math.min(...educationIndices),
            max: Math.max(...educationIndices),
        },
        universityProximity: {
            type: ValueType.HigherIsBetter,
            value: city.universityProximity,
            min: Math.min(...universityProximities),
            max: Math.max(...universityProximities),
        },
        diversityIndex: {
            type: ValueType.HigherIsBetter,
            value: city.diversityIndex,
            min: Math.min(...diversityIndices),
            max: Math.max(...diversityIndices),
        },
        politicalLeaning: {
            type: ValueType.closestNumber,
            value: politicalLeaningValues[index],
            min: -1,
            max: 1,
        },
        nightlifeIndex: {
            type: ValueType.HigherIsBetter,
            value: city.nightlifeIndex,
            min: Math.min(...nightlifeIndices),
            max: Math.max(...nightlifeIndices),
        },
        religiousInstitutionsPerCapita: {
            type: ValueType.HigherIsBetter,
            value: city.religiousInstitutionsPerCapita,
            min: Math.min(...religiousInstitutionsPerCapitas),
            max: Math.max(...religiousInstitutionsPerCapitas),
        },
        jobMarketIndex: {
            type: ValueType.HigherIsBetter,
            value: city.jobMarketIndex,
            min: Math.min(...jobMarketIndices),
            max: Math.max(...jobMarketIndices),
        },
        unemploymentRate: {
            type: ValueType.LowerIsBetter,
            value: city.unemploymentRate,
            min: Math.min(...unemploymentRates),
            max: Math.max(...unemploymentRates),
        },
        startupEcosystemRank: {
            type: ValueType.LowerIsBetter,
            value: city.startupEcosystemRank,
            min: Math.min(...startupEcosystemRanks),
            max: Math.max(...startupEcosystemRanks),
        },
    }));

    return injectedCities;
}