import { CountryEntity } from '../interfaces/country.interface';

export function getRandomCountries(
    countries: CountryEntity[],
    count: number,
): CountryEntity[] {
    let randomCountries: CountryEntity[] = [];

    while (randomCountries.length < count) {
        const randomCountry: CountryEntity =
            countries[Math.floor(Math.random() * countries.length)];

        if (!randomCountries.includes(randomCountry)) {
            randomCountries.push(randomCountry);
        }
    }

    return randomCountries;
}
