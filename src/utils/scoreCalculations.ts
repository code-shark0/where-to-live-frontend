import { City, IndexData } from "../types/City";
import { Preferences } from "../types/Preferences";

export const calculateScore = (city: City, preferences: Preferences) => {    
    let score = 0
    Object.keys(city).forEach(key => {
        if(key === 'id' || key === 'name') return;
        const preferenceValue = preferences[key as keyof Preferences]
        const cityValue = city[key as keyof City] as IndexData;

        if (cityValue.type === 'higherIsBetter') {
            const change = (preferenceValue + 3) * (cityValue.value - cityValue.min) / (cityValue.max - cityValue.min) * 100 / 6;
            score += change;
        } else if (cityValue.type === 'lowerIsBetter') {
            const change = (preferenceValue + 3) *(cityValue.max - cityValue.value) / (cityValue.max - cityValue.min) * 100 / 6;
            score += change;
        } else if (cityValue.type === 'specialCase') {
        }
    })
    return score;
}
