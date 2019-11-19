import { ContinentEntity } from '../interfaces/continent.interface';
import { CountryEntity } from '../interfaces/country.interface';
import { ColumnEntity } from '../interfaces/column.interface';

export function getBoardData(
    continents: ContinentEntity[],
    countries: CountryEntity[],
) {
    const items: { [name: string]: CountryEntity } = {};
    countries.forEach((country: CountryEntity) => {
        items[country.code] = {
            ...country,
        };
    });

    const columns: { [title: string]: ColumnEntity } = {};
    columns['unordered'] = {
        id: 'unordered',
        title: 'Unordered',
        itemsIds: countries.map(country => country.code),
    };

    continents.forEach((continent: ContinentEntity) => {
        columns[continent.code] = {
            id: continent.code,
            title: continent.name,
            itemsIds: [],
        };
    });

    const columnsOrder: string[] = Object.keys(columns);

    return { items, columns, columnsOrder };
}
