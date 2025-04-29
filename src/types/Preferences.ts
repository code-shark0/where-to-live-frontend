import type { City } from "./City";

// Omit 'name' and 'id' from City, then map all properties to number
type CityWithoutNameAndId = Omit<City, "name" | "id">;

export type Preferences = {
    [K in keyof CityWithoutNameAndId]: number;
};
