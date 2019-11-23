import { CountryEntity } from '../interfaces/country.interface';
import { getRandomCountries } from './getRandomCountries';

export function updateSelectedCountry(
    countries: CountryEntity[],
    existingRandomCountries: CountryEntity[],
    selectedCountryCode: string,
    count: number,
): CountryEntity[] {
    const newRandomCountry: CountryEntity[] = getRandomCountries(
        countries,
        count,
    );

    const selectedCountryIndex: number = existingRandomCountries.findIndex(
        (country: CountryEntity) => country.code === selectedCountryCode,
    );

    const newRandomCountries: CountryEntity[] = existingRandomCountries
        .slice(0, selectedCountryIndex)
        .concat(newRandomCountry)
        .concat(
            existingRandomCountries.slice(
                selectedCountryIndex + 1,
                existingRandomCountries.length,
            ),
        );

    return newRandomCountries;
}
