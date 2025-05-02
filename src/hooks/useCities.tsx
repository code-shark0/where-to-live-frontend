import { useEffect, useState } from 'react';
import { injectCitiesWithMetaData } from '../utils/injectMetaData';
import { InjectedCity } from '../types/City';

export function useCities() {
	const [cities, setCities] = useState<Array<InjectedCity>>([]);
    console.log(cities);

	useEffect(() => {
		fetch('http://localhost:4000/api/cities') // adjust if port is different
			.then(res => res.json())
			.then((cities) => {
				const injectedCities = injectCitiesWithMetaData(cities);
				setCities(injectedCities)
			})
			.catch(console.error);
	}, []);

	return cities;
}
