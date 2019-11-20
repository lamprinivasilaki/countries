import { CountryEntity } from '../interfaces/country.interface';
import { ColumnEntity } from '../interfaces/column.interface';

export function checkResults(
    countries: CountryEntity[],
    columns: { [id: string]: ColumnEntity },
): { result: boolean; message: string } {
    let classifiedCountries: CountryEntity[] = [];
    Object.values(columns).forEach((column: ColumnEntity) => {
        const countriesPerContinent = countries.filter(
            (country: CountryEntity) =>
                column.id === country.continent.code &&
                column.itemsIds.includes(country.code),
        );

        classifiedCountries.push(...countriesPerContinent);
    });

    return columns.unordered.itemsIds.length === 0 &&
        classifiedCountries.length === countries.length
        ? { result: true, message: `Great! Everything's correct!` }
        : {
              result: false,
              message: `Hmm, something is not right. Why don't you try again?`,
          };
}
