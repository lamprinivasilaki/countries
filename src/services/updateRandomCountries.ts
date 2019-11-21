import { CountryEntity } from '../interfaces/country.interface';
import { getRandomCountries } from './getRandomCountries';

export function updateRandomCountries(
    countries: CountryEntity[],
    existingRandomCountries: CountryEntity[],
    count: number,
): CountryEntity[] {
    const newRandomCountry: CountryEntity[] = getRandomCountries(
        countries,
        count,
    );
    const randomIndex: number = Math.floor(
        Math.random() * existingRandomCountries.length,
    );
    const newRandomCountries: CountryEntity[] = existingRandomCountries
        .slice(0, randomIndex)
        .concat(newRandomCountry)
        .concat(
            existingRandomCountries.slice(
                randomIndex + 1,
                existingRandomCountries.length,
            ),
        );

    return newRandomCountries;
}
