import { InjectedCity, IndexData } from "../types/City";
import { Preferences } from "../types/Preferences";
import { ValueType } from "../types/ValueType";

export const calculateScore = (city: InjectedCity, preferences: Preferences) => {    
    
    let score = 0
    Object.keys(city).forEach(key => {
        if(key === 'id' || key === 'name' || key === 'score' || key === 'rank') return;
        const preferenceValue = preferences[key as keyof Preferences];
        const cityValue = city[key as keyof InjectedCity] as IndexData;
        if (cityValue.value == null || cityValue.max == null || cityValue.min == null){
            console.warn("Invalid data for ", key, cityValue);
        } else {
            if (cityValue.type === ValueType.HigherIsBetter) {
                const change = (preferenceValue + 3) * (cityValue.value - cityValue.min) / (cityValue.max - cityValue.min) * 100 / 6;
                score += change;
            } else if (cityValue.type === ValueType.LowerIsBetter) {
                const change = (preferenceValue + 3) *(cityValue.max - cityValue.value) / (cityValue.max - cityValue.min) * 100 / 6;
                score += change;
            } else if (cityValue.type === ValueType.closestNumber) {
                const change = (preferenceValue + 3) * Math.abs(cityValue.value - cityValue.min) / (cityValue.max - cityValue.min) * 100 / 6;
                score += change;
            }
        }
    })

    console.log(score)
    return score;
}
