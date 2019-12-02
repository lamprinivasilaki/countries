import { CountryEntity } from '../interfaces/country.interface';
import { ContinentEntity } from '../interfaces/continent.interface';

export function getFiftyFiftyHelp(
    countryId: string,
    countries: CountryEntity[],
    continents: ContinentEntity[],
): (string | null)[] {
    // get continent code
    const continentCode: string = countries
        .filter((country: CountryEntity) => country.code === countryId)
        .map((country: CountryEntity) => country.continent.code)[0];

    // get the remaining continent codes
    const remainingContinentCodes: string[] = continents
        .filter(
            (continent: ContinentEntity) => continent.code !== continentCode,
        )
        .map((continent: ContinentEntity) => continent.code);

    // get the number of the element to be removed
    let continentsLengthAfterHelp: number =
        remainingContinentCodes.length / 2 + 1;
    let randomRemainingContinentCodes: string[] = remainingContinentCodes;

    // remove random continents from the initial array
    for (let i: number = 0; i < continentsLengthAfterHelp; i++) {
        const randomContinentCode: string =
            randomRemainingContinentCodes[
                Math.floor(Math.random() * randomRemainingContinentCodes.length)
            ];

        const randomContinentIndex: number = randomRemainingContinentCodes.indexOf(
            randomContinentCode,
        );

        randomRemainingContinentCodes = randomRemainingContinentCodes
            .slice(0, randomContinentIndex)
            .concat(
                randomRemainingContinentCodes.slice(
                    randomContinentIndex + 1,
                    randomRemainingContinentCodes.length,
                ),
            );
    }

    // return the names of the remaining continent sorted
    const randomRemainingContinents: (
        | string
        | null
    )[] = randomRemainingContinentCodes
        .concat(continentCode)
        .map((code: string) =>
            continents.find(
                (continent: ContinentEntity) => continent.code === code,
            ),
        )
        .map((continent: ContinentEntity | undefined) =>
            continent ? continent.name : null,
        )
        .sort();

    return randomRemainingContinents;
}
